const formulario = document.getElementById("formulario");
const home = document.getElementById("home");
const inicio = document.getElementById("inicio");
const propietarioSpan = document.getElementById("propietario");
const domicilioSpan = document.getElementById("domicilio");
const correoSpan = document.getElementById("correo"); // Agregado el span para mostrar el correo
const tag1Span = document.getElementById("tag1");
const tag2Span = document.getElementById("tag2");
const tag3Span = document.getElementById("tag3");
const tag4Span = document.getElementById("tag4");
const tag5Span = document.getElementById("tag5");
const tag6Span = document.getElementById("tag6");
const statusSpan = document.getElementById("status");
const ene2024Span = document.getElementById("ene2024");
const feb2024Span = document.getElementById("feb2024");
const mar2024Span = document.getElementById("mar2024");
const abr2024Span = document.getElementById("abr2024");
const may2024Span = document.getElementById("may2024");
const jun2024Span = document.getElementById("jun2024");
const jul2024Span = document.getElementById("jul2024");
const ago2024Span = document.getElementById("ago2024");
const sep2024Span = document.getElementById("sep2024");
const oct2024Span = document.getElementById("oct2024");
const nov2024Span = document.getElementById("nov2024");
const dic2024Span = document.getElementById("dic2024");
const ene2023Span = document.getElementById("ene2023");
const feb2023Span = document.getElementById("feb2023");
const mar2023Span = document.getElementById("mar2023");
const abr2023Span = document.getElementById("abr2023");
const may2023Span = document.getElementById("may2023");
const jun2023Span = document.getElementById("jun2023");
const jul2023Span = document.getElementById("jul2023");
const ago2023Span = document.getElementById("ago2023");
const sep2023Span = document.getElementById("sep2023");
const oct2023Span = document.getElementById("oct2023");
const nov2023Span = document.getElementById("nov2023");
const dic2023Span = document.getElementById("dic2023");
const selectYear = document.getElementById("selectYear"); // Cambiado de value a selectYear
const tags = document.getElementById("tags");
const paymentHistory2024 = document.getElementById("paymentHistory2024");
const homepage = document.getElementById("homepage");
const botones = document.getElementById("botones");
const divbotonhistorico = document.getElementById("divbotonhistorico");
const divbotonpago = document.getElementById("divbotonpago");
const divbotonreservar = document.getElementById("divbotonreservar");
const divbotonvisitas = document.getElementById("divbotonvisitas");
const divregreso = document.getElementById("divregreso");
const divingresos = document.getElementById("divingresos");
const btnenviaringreso = document.getElementById("btnenviaringreso");
const confirmacion = document.getElementById("confirmacion");
const formulario2 = document.getElementById("formulario2");
const segurichat = document.getElementById("segurichat");
const divqr = document.getElementById("divqr");
const iniciodatos = document.getElementById("iniciodatos");
const datoscorrectosvisitas  = document.getElementById("datoscorrectosvisitas");
const btnenborrar  = document.getElementById("btnenborrar");
const divnuevoregistro  = document.getElementById("nuevoregistro");
const divcalendario  = document.getElementById("divcalendario");






var today = new Date().toISOString().split('T')[0];
document.getElementById('fechavisita').setAttribute('min', today);


document.getElementById("divbotonhistorico").addEventListener("click", updatePaymentHistory);
document.getElementById("divbotonpago").addEventListener("click", redireccionarPagos);
document.getElementById("divregreso").addEventListener("click", regresar);
document.getElementById("divbotonvisitas").addEventListener("click", ingresos);
document.getElementById("divbotonvisitas").addEventListener("click", ingresos);
document.getElementById("btnenviaringreso").addEventListener("click", enviarsdei);
document.getElementById("datoscorrectosvisitas").addEventListener("click", confirmacionvyp);
document.getElementById("nuevoregistro").addEventListener("click", nuevoregistro);
document.getElementById("divbotonreservar").addEventListener("click", calendario);





var loggedIn = true

function calendario(){
    divingresos.style.display = "none";
    paymentHistory2024.style.display = "none";
    tags.style.display = "none";
    divbotonhistorico.style.display = "none";
    divbotonpago.style.display = "none";
    divbotonreservar.style.display = "none";
    divbotonvisitas.style.display = "none";
    segurichat.style.display = "none";
    divcalendario.style.display = "block";


}

function nuevoregistro(){
    divqr.style.display = "none";
    divnuevoregistro.style.display = "none";
    paymentHistory2024.style.display = "none";
    tags.style.display = "block";
    divbotonhistorico.style.display = "block";
    divbotonpago.style.display = "block";
    divbotonreservar.style.display = "block";
    divbotonvisitas.style.display = "block";
    divingresos.style.display = "none";
    segurichat.style.display = "none";
    divnuevoregistro.style.display = "none";


    borrarElementos();
}

function confirmacionvyp() {
    confirmacion.style.display = "none";
    divqr.style.display = "block";  
    datoscorrectosvisitas.style.display = "block"; 
    divnuevoregistro.style.display = "block";


    const domicilio = domicilioSpan.textContent;
    const propietario = propietarioSpan.textContent;
    const namevisitaSpan = document.getElementById("namevisita").value;
    const fechavisita2Span = document.getElementById("fechavisita2").value;
    const fechaHoraActual = new Date();
    const fechaHoraFormateada = fechaHoraActual.toLocaleString();

    const tipoSpan = document.getElementById("tipo").value;
    console.log(domicilio, propietario, namevisitaSpan, tipoSpan, fechavisita2Span, tipoSpan);

    const datos = {
        propietario: propietario,
        domicilio: domicilio,
        namevisita: namevisitaSpan,
        fecha: fechavisita2Span,
        tipo: tipoSpan,
        fechaHoraRegistro: fechaHoraFormateada
    };

    const qrData = {
        Casa: domicilio,
        Nombre: namevisitaSpan,
        Fecha: fechavisita2Span,
        Tipo: tipoSpan,
    };

    const url = "https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30";

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    };

    // Enviar los datos a la hoja de cálculo
    fetch(url, opciones)
        .then((response) => response.json())
        .then((data) => {
            // Alerta de éxito después de enviar los datos
            alert("Tu solicitud para el ingreso de " + namevisitaSpan + " el " + fechavisita2Span + " fue enviada");
            
            // Generar el contenido para el QR
            const qrContent = JSON.stringify(qrData);
            
            // Generar el código QR y mostrarlo en la página
            new QRCode(qrElement, qrContent);
            
            // Obtener el contenedor donde se desea agregar el código QR
            const contenedorQR = document.getElementById('qrElement');
            
            // Agregar el código QR al contenedor
            contenedorQR.appendChild(qrElement);



            // Llamar a las funciones para borrar elementos y regresar
            //borrarElementos();
            //regresar();
        })
        .catch((error) => {
            console.error("Error al enviar los datos a la hoja de cálculo", error);
        });
}


function borrarElementos() {
    const namevisita2Span = document.getElementById("namevisita2");
    const fechavisita2Span = document.getElementById("fechavisita2");
    const tipo2Span = document.getElementById("tipo2");
    const namevisitaSpan = document.getElementById("namevisita");
    const fechavisitaSpan = document.getElementById("fechavisita");
    const tipoSpan = document.getElementById("tipo");
    const contenedorQR = document.getElementById('qrElement');

    // Eliminar el contenido de los elementos
    namevisita2Span.value = "";
    fechavisita2Span.value = "";
    tipo2Span.value = 0;
    namevisitaSpan.value = "";
    fechavisitaSpan.value = "";
    tipoSpan.value = 0;
    contenedorQR.innerHTML = '';





    formulario2.style.display = "block";
    divingresos.style.display = "block";
    paymentHistory2024.style.display = "none";
    tags.style.display = "none";
    divbotonhistorico.style.display = "none";
    divbotonpago.style.display = "none";
    divbotonreservar.style.display = "none";
    divbotonvisitas.style.display = "none";
    confirmacion.style.display = "none"
    // También puedes reiniciar el valor de los campos de entrada si es necesario
    // Por ejemplo, si 'fechavisita' es un campo de entrada, podrías hacer lo siguiente:
    // document.getElementById("fechavisita").value = "";

    // O si 'tipo' es un campo de selección, podrías restablecerlo de esta manera:
    // document.getElementById("tipo").selectedIndex = 0;
}

function enviarsdei() {
    const namevisitaSpan = document.getElementById("namevisita").value;
    const tipoSpan = document.getElementById("tipo").value;
    const fechavisitaSpan = document.getElementById("fechavisita").value;

    // Verificar si los campos están vacíos
    if (namevisitaSpan.trim() === "" || tipoSpan.trim() === "" || fechavisitaSpan.trim() === "") {
        alert("Por favor, complete todos los campos.");
        return; // Detener la ejecución si algún campo está vacío
    }

    const namevisita2Span = document.getElementById("namevisita2");
    const fechavisita2Span = document.getElementById("fechavisita2");
    const tipo2Span = document.getElementById("tipo2");

    const domicilio = domicilioSpan.textContent;
    const correo = correoSpan.textContent;
    const status = statusSpan.textContent;

    // Obtener la fecha actual
    const fecha = new Date();

    // Función para obtener el nombre del mes en español
    function obtenerNombreMes(mes) {
        const nombresMeses = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        return nombresMeses[mes];
    }

    // Función para agregar un cero delante si el número es menor que 10
    function agregarCero(numero) {
        return numero < 10 ? '0' + numero : numero;
    }

    // Formatear la fecha
    const fechaFormateada = `${agregarCero(fecha.getDate())} de ${obtenerNombreMes(fecha.getMonth())} de ${fecha.getFullYear()}`;

    // Asignar la fecha formateada al elemento HTML
    fechavisita2Span.value = fechaFormateada;


    if (status === "Al Corriente") {
        console.log(namevisitaSpan);
        console.log(fechaFormateada); // Mostrar la fecha formateada
        console.log(tipoSpan);

        confirmacion.style.display = "block";
        formulario2.style.display = "none";

        namevisita2Span.textContent = namevisitaSpan;
        fechavisita2Span.textContent = fechaFormateada;
        tipo2Span.textContent = tipoSpan;


    } else {
        alert("Domicilio con adeudo, actualmente no tiene derecho al ingreso de visitas o proveedores");
    }
}

function regresar() {
    paymentHistory2024.style.display = "none";
    tags.style.display = "block";
    divbotonhistorico.style.display = "block";
    divbotonpago.style.display = "block";
    divbotonreservar.style.display = "block";
    divbotonvisitas.style.display = "block";
    divingresos.style.display = "none";
    segurichat.style.display = "block";
    divnuevoregistro.style.display = "none";
    divcalendario.style.display = "none";



}

function ingresos() {
    divingresos.style.display = "block";
    paymentHistory2024.style.display = "none";
    tags.style.display = "none";
    divbotonhistorico.style.display = "none";
    divbotonpago.style.display = "none";
    divbotonreservar.style.display = "none";
    divbotonvisitas.style.display = "none";
    segurichat.style.display = "none";
    divcalendario.style.display = "none";


}

function redireccionarPagos() {
    window.location.href = "https://sites.google.com/view/sansebastianprivada/mantenimiento/pagos";
}

function updatePaymentHistory() {
    const domicilio = domicilioSpan.textContent;
    const usuarioInput = correoSpan.textContent; // Utiliza el correo mostrado
    fetch("https://sheet.best/api/sheets/e2001717-5bc2-4628-b943-edb102107a49")
        .then((response) => response.json())
        .then((data) => {
            // Aquí se omiten las definiciones de datos que no están siendo utilizadas
            const indice = data.findIndex((fila) => fila.correo === usuarioInput); // Encuentra el índice por el correo

            ene2023Span.textContent = data[indice].ene2023;
            feb2023Span.textContent = data[indice].feb2023;
            mar2023Span.textContent = data[indice].mar2023;
            abr2023Span.textContent = data[indice].abr2023;
            may2023Span.textContent = data[indice].may2023;
            jun2023Span.textContent = data[indice].jun2023;
            jul2023Span.textContent = data[indice].jul2023;
            ago2023Span.textContent = data[indice].ago2023;
            sep2023Span.textContent = data[indice].sep2023;
            oct2023Span.textContent = data[indice].oct2023;
            nov2023Span.textContent = data[indice].nov2023;
            dic2023Span.textContent = data[indice].dic2023;
            ene2024Span.textContent = data[indice].ene2024;
            feb2024Span.textContent = data[indice].feb2024;
            mar2024Span.textContent = data[indice].mar2024;
            abr2024Span.textContent = data[indice].abr2024;
            may2024Span.textContent = data[indice].may2024;
            jun2024Span.textContent = data[indice].jun2024;
            jul2024Span.textContent = data[indice].jul2024;
            ago2024Span.textContent = data[indice].ago2024;
            sep2024Span.textContent = data[indice].sep2024;
            oct2024Span.textContent = data[indice].oct2024;
            nov2024Span.textContent = data[indice].nov2024;
            dic2024Span.textContent = data[indice].dic2024;

            paymentHistory2024.style.display = "block";
            tags.style.display = "none";
            divbotonhistorico.style.display = "none";
            divbotonpago.style.display = "none";
            divbotonreservar.style.display = "none";
            divbotonvisitas.style.display = "none";
            divregreso.style.display = "block";
            segurichat.style.display = "none";


        })
        .catch((error) => {
            console.error(error);
        });
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioInput = document.getElementById("username").value;
    const contraseñaInput = document.getElementById("contrasena").value;

    fetch("https://sheet.best/api/sheets/e2001717-5bc2-4628-b943-edb102107a49")
        .then((response) => response.json())
        .then((data) => {
            const correos = data.map((fila) => fila.correo);
            const contraseñas = data.map((fila) => fila.contraseñas);

            const indice = correos.findIndex((correo) => correo === usuarioInput);
            if (indice !== -1 && contraseñas[indice] === contraseñaInput) {
                console.log("Inicio de sesión exitoso");

                const cliente = data[indice].Cliente; // Accede directamente al cliente en lugar de usar map
                console.log(cliente);

                const domicilio = data[indice].dom; // Accede directamente al domicilio en lugar de usar map
                console.log(domicilio);

                const tag1 = data[indice].tag1
                console.log(tag1);

                const tag2 = data[indice].tag2
                const tag3 = data[indice].tag3
                const tag4 = data[indice].tag4
                const tag5 = data[indice].tag5
                const tag6 = data[indice].tag6
                const status = data[indice].status

                propietarioSpan.textContent = cliente;
                domicilioSpan.textContent = domicilio;
                correoSpan.textContent = usuarioInput; // Muestra el correo ingresado
                tag1Span.textContent = tag1
                tag2Span.textContent = tag2
                tag3Span.textContent = tag3
                tag4Span.textContent = tag4
                tag5Span.textContent = tag5
                tag6Span.textContent = tag6
                statusSpan.textContent = status

                homepage.style.display = "none";
                tags.style.display = "block";
                inicio.style.display = "block";
                botones.style.display = "block";
                botonhistoricodepagos.style.display = "block";
                retorno.style.display="retorno";

            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch((error) => {
            console.error(error);
        });
});





  



  

  



  
