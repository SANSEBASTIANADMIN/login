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
const paymentHistory2023 = document.getElementById("paymentHistory2023");
const paymentHistory2024 = document.getElementById("paymentHistory2024");
var loggedIn = true

// Definición de la función updatePaymentHistory fuera del ámbito del evento submit
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

            // Otras asignaciones de datos omitidas para brevedad

            if (selectYear.value === "2023") { // Usar selectYear.value en lugar de selectedYear
                paymentHistory2023.style.display = "block";
                paymentHistory2024.style.display = "none";
                console.log("Selecion 2023");
                console.log(dic2023);

            } else if (selectYear.value === "2024") {
                paymentHistory2023.style.display = "none";
                paymentHistory2024.style.display = "block";
                console.log("Selecion 2024")
                console.log(ene2024);
            } else {
                paymentHistory2023.style.display = "none";
                paymentHistory2024.style.display = "none";
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioInput = document.getElementById("nombre").value;
    const contraseñaInput = document.getElementById("contrasena").value;

    fetch("https://sheet.best/api/sheets/e2001717-5bc2-4628-b943-edb102107a49")
        .then((response) => response.json())
        .then((data) => {
            const correos = data.map((fila) => fila.correo);
            const contraseñas = data.map((fila) => fila.contraseñas);

            const indice = correos.findIndex((correo) => correo === usuarioInput);
            if (indice !== -1 && contraseñas[indice] === contraseñaInput) {
                console.log("Inicio de sesión exitoso");
                home.classList.toggle("oculto");
                inicio.classList.toggle("oculto");

                const cliente = data[indice].Cliente; // Accede directamente al cliente en lugar de usar map
                const domicilio = data[indice].dom; // Accede directamente al domicilio en lugar de usar map
                const tag1 = data[indice].tag1
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

                var homeElement = document.getElementById("home");
                if (homeElement) {
                    homeElement.style.display = "none";
                }

                updatePaymentHistory(); // Llama a la función updatePaymentHistory después de actualizar los datos
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch((error) => {
            console.error(error);
        });
});
