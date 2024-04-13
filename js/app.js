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
const selectYear = document.getElementById("selectYear"); 
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
const divpagos = document.getElementById("divpagos");
const btnenviaringreso = document.getElementById("btnenviaringreso");
const confirmacion = document.getElementById("confirmacion");
const formulario2 = document.getElementById("formulario2");
const segurichat = document.getElementById("segurichat");
const divqr = document.getElementById("divqr");
const iniciodatos = document.getElementById("iniciodatos");
const datoscorrectosvisitas  = document.getElementById("datoscorrectosvisitas");
const btnenborrar  = document.getElementById("btnenborrar");
const divnuevoregistro  = document.getElementById("nuevoregistro");
const divamenidades  = document.getElementById("divamenidades");
const divreservar  = document.getElementById("divreservar");
const confirmarreserca  = document.getElementById("confirmarreserca");
const divmisreservas  = document.getElementById("divmisreservas");
var today = new Date().toISOString().split('T')[0];
var loggedIn = true

function cifrarCorreo(valor) {
    var texto = JSON.stringify(valor);
    var bytes = new TextEncoder().encode(texto);
    var cifrado = btoa(String.fromCharCode.apply(null, bytes));
    return cifrado;
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioInput = document.getElementById("username").value;
    console.log(usuarioInput)

    const contraseñaInput = document.getElementById("contrasena").value;
    console.log(contraseñaInput)


    if ((usuarioInput === "CENTINELA" && contraseñaInput === "SANSEBASTIAN") || (usuarioInput === "AGCH" && contraseñaInput === "LARIOJA")) {
        // Redirigir a la página deseada
        window.location.href = "index2.html";
    } else {
        fetch("https://sheet.best/api/sheets/37c91a6b-da47-4255-be74-0abb82402f7e")
            //actualización
            .then((response) => response.json())
            .then((data) => {

                const correoCifradoInput = cifrarCorreo(usuarioInput);
                console.log(usuarioInput)
                console.log(correoCifradoInput)
                const correosCifrados = data.map((fila) => fila.correo);
                const indice = correosCifrados.findIndex((correoCifrado) => correoCifrado === correoCifradoInput);
                const contraseñasCifradas = data.map((fila) => fila.password);
                console.log(indice)

                //console.log(indice)
                if (indice !== -1) {
                    
                    const contraseñaCifrada = contraseñasCifradas[indice];
                    console.log(contraseñaCifrada)

                    const contraseñaCifradoInput = cifrarCorreo(contraseñaInput);
                    console.log(contraseñaCifradoInput)

                    if (contraseñaCifrada === contraseñaCifradoInput) {
                        console.log("Inicio de sesión exitoso");

                        const cliente = atob(data[indice].Cliente);
                        const clientecod = data[indice].Cliente; // Accede directamente al cliente en lugar de usar map

                        const domicilio = atob(data[indice].dom); // Accede directamente al domicilio en lugar de usar map
                        const domiciliocod = data[indice].dom; // Accede directamente al domicilio en lugar de usar map

                        const tag1 = atob(data[indice].tag1);
                        const tag2 = atob(data[indice].tag2);
                        const tag3 = atob(data[indice].tag3);
                        const tag4 = atob(data[indice].tag4);
                        const tag5 = atob(data[indice].tag5);
                        const tag6 = atob(data[indice].tag6);
                        const status = atob(data[indice].status);
                        const statuscod = data[indice].status;

                        ene2023Span.textContent = (data[indice].ene2023);
                        feb2023Span.textContent = (data[indice].feb2023);
                        mar2023Span.textContent = (data[indice].mar2023);
                        abr2023Span.textContent = (data[indice].abr2023);
                        may2023Span.textContent = (data[indice].may2023);
                        jun2023Span.textContent = (data[indice].jun2023);
                        jul2023Span.textContent = (data[indice].jul2023);
                        ago2023Span.textContent = (data[indice].ago2023);
                        sep2023Span.textContent = (data[indice].sep2023);
                        oct2023Span.textContent = (data[indice].oct2023);
                        nov2023Span.textContent = (data[indice].nov2023);
                        dic2023Span.textContent = (data[indice].dic2023);
                        ene2024Span.textContent = (data[indice].ene2024);
                        feb2024Span.textContent = (data[indice].feb2024);
                        mar2024Span.textContent = (data[indice].mar2024);
                        abr2024Span.textContent = (data[indice].abr2024);
                        may2024Span.textContent = (data[indice].may2024);
                        jun2024Span.textContent = (data[indice].jun2024);
                        jul2024Span.textContent = (data[indice].jul2024);
                        ago2024Span.textContent = (data[indice].ago2024);
                        sep2024Span.textContent = (data[indice].sep2024);
                        oct2024Span.textContent = (data[indice].oct2024);
                        nov2024Span.textContent = (data[indice].nov2024);
                        dic2024Span.textContent = (data[indice].dic2024);
                        

                        propietarioSpan.textContent = cliente;
                        domicilioSpan.textContent = domicilio;
                        correoSpan.textContent = usuarioInput; // Muestra el correo ingresado
                        tag1Span.textContent = tag1;
                        tag2Span.textContent = tag2;
                        tag3Span.textContent = tag3;
                        tag4Span.textContent = tag4;
                        tag5Span.textContent = tag5;
                        tag6Span.textContent = tag6;
                        statusSpan.textContent = status;

                        homepage.style.display = "none";
                        tags.style.display = "block";
                        inicio.style.display = "block";
                        botones.style.display = "block";


                        document.getElementById('fechavisita').setAttribute('min', today);
                        document.getElementById('fechareserva').setAttribute('min', today);

                        document.getElementById("divbotonhistorico").addEventListener("click", updatePaymentHistory);
                        document.getElementById("divbotonpago").addEventListener("click", redireccionarPagos);
                        document.getElementById("divregreso").addEventListener("click", regresar);
                        document.getElementById("divbotonvisitas").addEventListener("click", ingresos);
                        document.getElementById("divbotonvisitas").addEventListener("click", ingresos);
                        document.getElementById("btnenviaringreso").addEventListener("click", enviarsdei);
                        document.getElementById("datoscorrectosvisitas").addEventListener("click", confirmacionvyp);
                        document.getElementById("nuevoregistro").addEventListener("click", nuevoregistro);
                        document.getElementById("divbotonreservar").addEventListener("click", calendario);
                        document.getElementById("confirmarreserca").addEventListener("click", registrarReserva);
                        document.getElementById("misreservsas").addEventListener("click", toggleMisReservas);

                        function updatePaymentHistory() {
                                    paymentHistory2024.style.display = "block";
                                    tags.style.display = "none";
                                    divbotonhistorico.style.display = "none";
                                    divbotonpago.style.display = "none";
                                    divbotonreservar.style.display = "none";
                                    divbotonvisitas.style.display = "none";
                                    segurichat.style.display = "none";
                                    divregreso.style.display = "block";
                        }

                        function registrarReserva() {
                            const fechareserva = document.getElementById("fechareserva").value;
                            const horaInicio = document.getElementById("horaInicio").value;
                            const horaFin = document.getElementById("horaFin").value;
                            const tiporeserva = document.getElementById("tiporeserva").value;
                            const fechaHoraActual = new Date();
                            const fechaHoraFormateada = fechaHoraActual.toLocaleString();

                            
                            const datos = {
                                registro: fechaHoraFormateada,
                                dom: domiciliocod,
                                nombre: clientecod,
                                fecha: fechareserva,
                                amenidad: tiporeserva,
                                inicio: horaInicio,
                                fin: horaFin,
                            };
                        
                            if (statuscod === "IkFsIENvcnJpZW50ZSI=") {
                                
                                const url = "https://sheet.best/api/sheets/37c91a6b-da47-4255-be74-0abb82402f7e/tabs/reservaciones";
                                const opciones = {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(datos)
                                };
                        
                                // Verificar disponibilidad antes de enviar los datos
                                verificarDisponibilidad(fechareserva, tiporeserva)
                                    .then(disponible => {
                                        if (disponible) {
                                            fetch(url, opciones)
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    // Alerta de éxito después de enviar los datos
                                                    alert("Tu reservación para usar " + tiporeserva + " el " + fechareserva + " fue enviada");
                                                    console.log(fechareserva)
                                                    console.log(tiporeserva)
                                                    console.log(fechaHoraFormateada)
                                                    console.log(domiciliocod)
                                                    console.log(clientecod)
                                                    console.log(fechareserva)
                                                    console.log(tiporeserva)
                                                    console.log(horaInicio)
                                                    console.log(horaFin)
                        
                                                    // Limpiar los campos del formulario después de enviar los datos
                                                    document.getElementById("fechareserva").value = "";
                                                    document.getElementById("horaInicio").value = "";
                                                    document.getElementById("horaFin").value = "";
                                                    document.getElementById("tiporeserva").value = "";
                                                })
                                                .catch((error) => {
                                                    console.error("Error al enviar los datos a la hoja de cálculo", error);
                                                });
                                        } else {
                                            alert("Sin disponibilidad para reservar " + tiporeserva + " en la fecha seleccionada.");
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Error al verificar disponibilidad:", error);
                                    });
                            } else {
                                alert("Domicilio tiene adeudo, actualmente no tiene derecho al reservar amenidades");
                            }
                        }
                        
                        function verificarDisponibilidad(fecha, tiporeserva) {
                            const url = "https://sheet.best/api/sheets/37c91a6b-da47-4255-be74-0abb82402f7e/tabs/reservaciones";
                            
                            // Realizar una consulta para obtener los registros en la misma fecha y amenidad
                            return fetch(url)
                                .then(response => response.json())
                                .then(data => {
                                    const registrosMismaFecha = data.filter(registro => registro.fecha === fecha && registro.amenidad === tiporeserva);
                                    const cantidadRegistros = registrosMismaFecha.length;
                        
                                    // Verificar disponibilidad según la cantidad de registros
                                    if (tiporeserva === "Asador") {
                                        return cantidadRegistros < 4; // Devuelve true si hay disponibilidad, de lo contrario, false
                                    } else if (tiporeserva === "Casa Club") {
                                        return cantidadRegistros < 1; // Devuelve true si hay disponibilidad, de lo contrario, false
                                    } else if (tiporeserva === "Alberca") {
                                        // La alberca siempre está disponible
                                        return true;
                                    }
                                })
                                .catch(error => {
                                    console.error("Error al verificar disponibilidad:", error);
                                    throw error;
                                });
                        }
                        
                        function toggleMisReservas() {
                            console.log("actualizándose")
                            const domicilio = domicilioSpan.textContent;
                            fetch("https://sheet.best/api/sheets/37c91a6b-da47-4255-be74-0abb82402f7e/tabs/reservaciones")
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log(domiciliocod);
                                    // Filtrar los registros que coinciden con domicilioSpan
                                    const registrosFiltrados = data.filter((registro) => registro.dom.startsWith(domiciliocod));
                                    console.log(registrosFiltrados);
                                    // Procesar los datos filtrados y agregarlos a los contenedores de calle
                                    agregarRegistros("divmisreservas", registrosFiltrados);
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }
                        
                        
                        function agregarRegistros(divmisreservas, registros) {
                            const contenedor = document.getElementById(divmisreservas);
                            contenedor.innerHTML = ''; // Limpiar el contenido del contenedor
                        
                            const fechaActual = new Date(); // Obtener la fecha y hora actual
                            const fechaAyer = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - 1); // Obtener la fecha de ayer
                        
                            registros.forEach((registro, index) => {
                                // Convertir la fecha de la reserva a un objeto Date
                                const fechaReserva = new Date(registro.fecha);
                                
                                // Verificar si la fecha de la reserva está entre hoy y ayer (sin hora)
                                if (fechaReserva >= fechaAyer) {
                                    const registroHTML = `<div class="registro-item">
                                        <p><strong>Amenidad:</strong>${registro.amenidad}</p>
                                        <p><strong>Fecha:</strong>${registro.fecha}</p>
                                        <p><strong>Estatus:</strong>${registro.estatus}</p>
                                    </div>`;
                            
                                    contenedor.insertAdjacentHTML('beforeend', registroHTML);
                                }
                            });
                        }
                        
                        
                        function calendario(){
                            divingresos.style.display = "none";
                            paymentHistory2024.style.display = "none";
                            tags.style.display = "none";
                            divbotonhistorico.style.display = "none";
                            divbotonpago.style.display = "none";
                            divbotonreservar.style.display = "none";
                            divbotonvisitas.style.display = "none";
                            segurichat.style.display = "none";
                            divamenidades.style.display = "block";
                            divreservar.style.display = "block";
                            divregreso.style.display = "block";
                        
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
                            divamenidades.style.display = "none";
                            borrarElementos();
                        }
                        
                        
                        function confirmacionvyp() {
                            confirmacion.style.display = "none";
                            divqr.style.display = "block";  
                            datoscorrectosvisitas.style.display = "block"; 
                            divnuevoregistro.style.display = "block";
                            divregreso.style.display = "block";
                            const domicilio = domicilioSpan.textContent;
                            const propietario = propietarioSpan.textContent;
                            const namevisitaSpan = document.getElementById("namevisita").value;
                            const fechavisitaSpan = document.getElementById("fechavisita").value;
                            const fechaHoraActual = new Date();
                            const fechaHoraFormateada = fechaHoraActual.toLocaleString();
                        
                            const propietarioAbreviado = propietario.slice(0, 2).toUpperCase();
                            const domicilioAbreviado = domicilio.slice(0, 2).toUpperCase();
                            const namevisitaAbreviado = namevisitaSpan.slice(0, 2).toUpperCase();
                            const fechaSinEspacios = fechavisitaSpan.replace(/\s/g, ''); // Eliminar espacios de la fecha
                            const fechaHoraRegistroSinEspacios = fechaHoraFormateada.replace(/\s/g, ''); // Eliminar espacios de la fechaHoraRegistro
                            const idUnico = `${propietarioAbreviado}${domicilioAbreviado}${namevisitaAbreviado}${fechaSinEspacios}${fechaHoraRegistroSinEspacios}`;
                            console.log(idUnico)
                        
                        
                            const tipoSpan = document.getElementById("tipo").value;
                            console.log(domicilio, propietario, namevisitaSpan, tipoSpan, fechavisitaSpan, tipoSpan);
                        
                            const datos = {
                                propietario: clientecod,
                                domicilio: domiciliocod,
                                namevisita: namevisitaSpan,
                                fecha: fechavisitaSpan,
                                tipo: tipoSpan,
                                fechaHoraRegistro: fechaHoraFormateada,
                                idunico: idUnico,
                            };
                        
                            const qrData = {
                                Casa: domicilio,
                                Nombre: namevisitaSpan,
                                Fecha: fechavisitaSpan,
                                Tipo: tipoSpan,
                            };
                        
                            const url = "https://sheet.best/api/sheets/37c91a6b-da47-4255-be74-0abb82402f7e/tabs/visitas";
                        
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
                                    alert("Tu solicitud para el ingreso de " + namevisitaSpan + " el " + fechavisitaSpan + " fue enviada");
                                    
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
                            divregreso.style.display = "block";
                        }
                        
                        function enviarsdei() { 
                            const namevisitaSpan = document.getElementById("namevisita").value;
                            const tipoSpan = document.getElementById("tipo").value;
                            const fechavisitaSpan = document.getElementById("fechavisita").value;
                        
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
                        
                            if (statuscod === "IkFsIENvcnJpZW50ZSI=") {
                                console.log(namevisitaSpan);
                                console.log(fechavisitaSpan); // Mostrar la fecha formateada
                                console.log(tipoSpan);
                        
                                confirmacion.style.display = "block";
                                formulario2.style.display = "none";
                                divregreso.style.display = "block";
                        
                        
                                namevisita2Span.textContent = namevisitaSpan;
                                fechavisita2Span.textContent = fechavisitaSpan;
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
                            divamenidades.style.display = "none";
                            divreservar.style.display = "none";
                            divpagos.style.display = "none";

                        
                        }

                        function redireccionarPagos() {
                            divingresos.style.display = "none";
                            paymentHistory2024.style.display = "none";
                            tags.style.display = "none";
                            divbotonhistorico.style.display = "none";
                            divbotonpago.style.display = "none";
                            divbotonreservar.style.display = "none";
                            divbotonvisitas.style.display = "none";
                            segurichat.style.display = "none";
                            divreservar.style.display = "none";
                            btnenborrar.style.display = "none";
                            divregreso.style.display = "block";
                            divpagos.style.display = "block";
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
                            divreservar.style.display = "none";
                            btnenborrar.style.display = "block";
                            divregreso.style.display = "block";
                        
                            if (!namevisitaSpan || namevisitaSpan === "") {
                                divnuevoregistro.style.display = "none";
                            } else {
                                divnuevoregistro.style.display = "block";
                            }
                        }
    } else {
         alert("Usuario o contraseña incorrectos");
        }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

});

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("contrasena");
    var eyeOpen = document.getElementById("ojoabierto");
    var eyeClosed = document.getElementById("ojocerrado");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeOpen.style.display = "none";
        eyeClosed.style.display = "block";
    } else {
        passwordInput.type = "password";
        eyeOpen.style.display = "block";
        eyeClosed.style.display = "none";
    }
}

function procesarArchivo() {
    const archivo = document.getElementById('archivo').files[0];
    if (!archivo) {
        alert('Por favor, seleccione un archivo PDF o una imagen.');
        return;
    }

    const lector = new FileReader();
    lector.onload = function(evento) {
        const datos = evento.target.result;
        if (archivo.type === 'application/pdf') {
            procesarPDF(datos);
        } else if (archivo.type.startsWith('image/')) {
            procesarImagen(datos);
        } else {
            alert('Tipo de archivo no compatible. Por favor, seleccione un archivo PDF o una imagen.');
        }
    };
    lector.readAsArrayBuffer(archivo);
}

function procesarPDF(datos) {
    pdfjsLib.getDocument(datos).promise.then(function(pdf) {
        pdf.getPage(1).then(function(pagina) {
            pagina.getTextContent().then(function(contenido) {
                const texto = contenido.items.map(function(item) {
                    return item.str;
                }).join(' ');

                // Buscar el monto
                const regexMonto = /\$\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/; // Coincide con el formato de monto: $XXX,XXX.XX o $XXX.XX
                const montoMatch = texto.match(regexMonto);
                const monto = montoMatch ? montoMatch[1] : null;

                // Buscar la fecha
                const regexFecha = /(\d{1,2}\s+de\s+[a-zA-Z]+\s+de\s+\d{4})/; // Coincide con el formato de fecha: dd de mes de aaaa
                const fechaMatch = texto.match(regexFecha);
                const fecha = fechaMatch ? fechaMatch[0] : null;

                // Buscar el beneficiario
                const regexBeneficiario = /COLONOS\sSAN\sSEBASTIAN\sAC/; // Coincide con "COLONOS SAN SEBASTIAN AC"
                const beneficiarioMatch = texto.match(regexBeneficiario);
                const beneficiario = beneficiarioMatch ? beneficiarioMatch[0] : null;

                // Mostrar los datos en el HTML
                document.getElementById('fechaPago').innerText = fecha || 'No se encontró fecha';
                document.getElementById('montoPago').innerText = monto || 'No se encontró monto';
                document.getElementById('beneficiarioPago').innerText = beneficiario || 'No se encontró beneficiario';
            });
        });
    });
}

function procesarImagen(datos) {
    Tesseract.recognize(
        datos,
        'spa', // Idioma de reconocimiento (puedes cambiarlo según tus necesidades)
        { logger: m => console.log(m) } // Opciones adicionales, como el registro de mensajes
    ).then(({ data: { text } }) => {
        // Imprimir el texto completo reconocido en la consola
        console.log('Texto reconocido:', text);

        // Buscar el monto
        const regexMonto = /\$\s?(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/; // Coincide con el formato de monto: $XXX,XXX.XX o $XXX.XX
        const montoMatch = text.match(regexMonto);
        const monto = montoMatch ? montoMatch[1] : null;

        // Buscar la fecha
        
        const regexFecha = /(\d{1,2}\s+de\s+[a-zA-Z]+\s+de\s+\d{4})/; // Coincide con el formato de fecha: dd de mes de aaaa
        const fechaMatch = text.match(regexFecha);
        const fecha = fechaMatch ? fechaMatch[0] : null;

        // Buscar el beneficiario
        const regexBeneficiario = /COLONOS\sSAN\sSEBASTIAN\sAC/; // Coincide con "COLONOS SAN SEBASTIAN AC"
        const beneficiarioMatch = text.match(regexBeneficiario);
        const beneficiario = beneficiarioMatch ? beneficiarioMatch[0] : null;

        // Imprimir los datos en la consola
        console.log('Fecha:', fecha || 'No se encontró fecha');
        console.log('Monto:', monto || 'No se encontró monto');
        console.log('Beneficiario:', beneficiario || 'No se encontró beneficiario');

        document.getElementById('fechaPago').innerText = fecha || 'No se encontró fecha';
        document.getElementById('montoPago').innerText = monto || 'No se encontró monto';
        document.getElementById('beneficiarioPago').innerText = beneficiario || 'No se encontró beneficiario';
    });
}



  
