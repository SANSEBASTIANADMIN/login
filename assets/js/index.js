const sheetID = "20758fb4-773d-43c9-995b-dcc92cc09071";

// app.js

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const divescaner = document.getElementById("inicio");
const divverde = document.getElementById("contenedorhomeverde");
const divrojo = document.getElementById("contenedorrojo");
const divrojoyauqr = document.getElementById("qryautilizado");
const divqrconotrafecha = document.getElementById("qrconotrafecha");


const btnScanQR = document.getElementById("btn-scan-qr");
let scanning = false;

const encenderCamara = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

const cerrarCamara = () => {
  video.srcObject.getTracks().forEach((track) => {
    track.stop();
  });
  canvasElement.hidden = true;
  btnScanQR.hidden = false;
};

const activarSonido = () => {
  var audio = document.getElementById("audioScaner");
  audio.play();
};

qrcode.callback = (respuesta) => {
  if (respuesta) {
    try {
      const datosQR = JSON.parse(respuesta);
      const { Casa, Nombre, Fecha, Tipo, ID } = datosQR;
      console.log(
        `Fecha: ${Fecha}, Nombre: ${Nombre}, Tipo: ${Tipo}, ID: ${ID}`
      );

      const obtenerFechaHoy = () => {
        const hoy = new Date();
        return new Intl.DateTimeFormat('es-ES', { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit' }).format(hoy);
      };
      // Formatear la fecha para obtener el formato YYYY-MM-DD
      const formatearFecha = (fecha) => {
        const partes = fecha.split('/');
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
      };

      const fechaHoy = formatearFecha(obtenerFechaHoy());
      console.log("Validando fecha")
      console.log(fechaHoy)
      console.log(Fecha)

      if (Fecha !== fechaHoy) {
        // La fecha del QR no es la de hoy
        divqrconotrafecha.style.display = "block";
        divescaner.style.display = "none";
        cerrarCamara();
      } else {
        verificarConSheets(Casa, Fecha, Nombre, Tipo, ID); // Pass ID here
      }
    } catch (error) {
      console.error("Error al parsear el código QR", error);
      Swal.fire("Error al leer el código QR");
      cerrarCamara();
    }
  }
};

window.addEventListener("load", (e) => {
  encenderCamara();
});

const verificarConSheets = async (Casa, Nombre, Fecha, Tipo, id) => {
  // Add id parameter
  const url = `https://sheet.best/api/sheets/${sheetID}/tabs/visitas`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Verificar si el registro existe en la hoja de cálculo
    const registroIndex = data.findIndex((registro) => registro.idunico === id); // Use id here

    if (registroIndex !== -1) {
      const registro = data[registroIndex];

      if (registro.ingresoc1) {
        // Ya hay un valor en ingresoc1
        divrojoyauqr.style.display = "block";
        divescaner.style.display = "none";
      } else {
        // No hay valor en ingresoc1, se puede registrar
        const hoy = new Date();
        const fechaHoy = hoy.toISOString().split("T")[0];
        const horaHoy = hoy.toTimeString().split(" ")[0];
        console.log(`Índice del registro: ${registroIndex}`);
        await actualizarIngreso(sheetID, registroIndex, fechaHoy, horaHoy);
        
        document.getElementById("dom").innerText = Casa;
        document.getElementById("nom").innerText = Fecha;
        document.getElementById("fecha").innerText = Nombre;
        document.getElementById("tipo").innerText = Tipo;
        document.getElementById("idUnico").innerText = id;

        divescaner.style.display = "none";
        divverde.style.display = "block";

        activarSonido();
      }
    } else {
      // QR no válido
      Swal.fire("Código QR no válido");
      divrojo.style.display = "block";
      divescaner.style.display = "none";
    }
  } catch (error) {
    console.error("Error al verificar el código QR en Google Sheets", error);
    Swal.fire("Error al verificar el código QR");
  }

  cerrarCamara();
};

const actualizarIngreso = async (sheetID, rowIndex, fecha, hora) => {
  const url = `https://sheet.best/api/sheets/${sheetID}/tabs/visitas/${rowIndex}`;

  const opciones = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingresoc1: `${fecha} ${hora}` }),
  };

  try {
    const response = await fetch(url, opciones);
    if (!response.ok) {
      throw new Error("Error al actualizar la hoja de cálculo");
    }
  } catch (error) {
    console.error("Error al actualizar la hoja de cálculo", error);
    Swal.fire("Error al actualizar la hoja de cálculo");
  }
};



document.getElementById("cerrarsesion").addEventListener("click", function() {
  localStorage.removeItem('correoCifradoInput'); // Elimina el correo cifrado del localStorage
  console.log("Borrando Usuario");
  localStorage.removeItem('contraseñasCifrada'); // Elimina la contraseña cifrada del localStorage
  console.log("Borrando contraseña"); 
  window.location.href = "index.html";
});


document.addEventListener("DOMContentLoaded", function() {

  function obtenerdomconmora() {
    console.log("Obteniendo registros de morosos...");
    const url = `https://sheet.best/api/sheets/${sheetID}/tabs/propietarios`;
    fetch(url)    
        .then((response) => response.json())
        .then((data) => {
            // Filtrar y agregar los registros con estado "Moroso" (sin importar la fecha)
            const registrosMorosos = data.filter((registro) => registro.status.startsWith("Moroso"));
            agregarRegistrosMorosos("morosos-registros", registrosMorosos);
        })
        .catch((error) => {
            console.error(error);
        });
  }
    // Función para agregar registros de morosos
    function agregarRegistrosMorosos(contenedorId, registros) {
        const contenedor = document.getElementById(contenedorId);
        // Vaciar el contenedor antes de agregar nuevos registros
        contenedor.innerHTML = '';
        registros.forEach(registro => {
            const registroHTML = `
                <div id="div${registro.dom}" class="registro-item-mora">
                    <p><strong>Domicilio:</strong> ${atob(registro.dom)}</p>
                    <p><strong>Adeudo Total:</strong> ${registro.adeudo}</p>
                </div>
            `;
            contenedor.insertAdjacentHTML('beforeend', registroHTML);
        });
    }


      // Event listener para el clic en el elemento details
      document.getElementById("calle-morosos").addEventListener("toggle", function() {
        if (this.open) {
            obtenerdomconmora();
        }
    });  
});

