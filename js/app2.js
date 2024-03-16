// Función para obtener los datos del API y agregar los registros

function obtenerYAgregarRegistros2() {
    console.log("actualziandose")
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Imprime los datos obtenidos desde la API

            // Filtrar los registros para obtener solo los de hoy
            const registrosHoy = data.filter((fila) => esFechaHoy(fila.fecha));
            
            // Procesar los datos y agregarlos a los contenedores de calle
            agregarRegistros("alba-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("ALBA")));
            agregarRegistros("caballeros-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("CABALLEROS")));
            agregarRegistros("esmeralda-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("ESMERALDA")));
            agregarRegistros("eros-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("EROS")));
            agregarRegistros("magdalena-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("MAGDALENA")));
            agregarRegistros("ibiza-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IBIZA")));
            agregarRegistros("hierro-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("HIERRO")));
        })
        .catch((error) => {
            console.error(error);
        });
}



function obtenerFechaObj(fechaTexto) {
    // Verificar si fechaTexto es null antes de intentar dividirla
    if (!fechaTexto) {
        return null;
    }
    
    // Dividir la fecha por el carácter '-' en lugar de ' '
    const partes = fechaTexto.split('-');
    const año = parseInt(partes[0]);
    const mes = parseInt(partes[1]) - 1; // Restar 1 al mes ya que en JavaScript los meses van de 0 a 11
    const dia = parseInt(partes[2]);
    
    return new Date(año, mes, dia);
}

function esFechaHoy(fechaComparar) {
    // Verificar si fechaComparar es null antes de intentar usarla
    if (!fechaComparar) {
        return false;
    }
    
    const fechaCompararObj = obtenerFechaObj(fechaComparar);
    const fechaActual = new Date();
    return fechaCompararObj && fechaCompararObj.toDateString() === fechaActual.toDateString();
}



// Función para agregar registros a un contenedor de calle
function agregarRegistros(contenedorId, registros) {
    const contenedor = document.getElementById(contenedorId);
    registros.forEach((registro, index) => {
        // Verificar si el registro no tiene cierre y no está ya agregado
        if (!registro.cierre && !document.getElementById(`div${registro.idunico}`)) {
            const registroHTML = `<div id="div${registro.idunico}" class="registro-item">
                <p><strong>Nombre:</strong> ${registro.namevisita}</p>
                <p><strong>Fecha:</strong> ${registro.fecha}</p>
                <p><strong>Tipo:</strong> ${registro.tipo}</p>
                <label for="entro-${registro.idunico}">¿Entró?</label>
                <input type="checkbox" id="entro-${registro.idunico}" data-registro-id="${registro.idunico}" ${registro.fechaentrada ? 'disabled' : ''}>
                <label for="salio-${registro.idunico}">¿Salió?</label>
                <input type="checkbox" id="salio-${registro.idunico}" data-registro-id="${registro.idunico}">
                <div class="fecha-entrada" id="fecha-entrada-${registro.idunico}" style="display:block;">${registro.fechaentrada ? 'Fecha de entrada: ' + registro.fechaentrada : ''}</div>
                <div class="fecha-salida" id="fecha-salida-${registro.idunico}" style="display:none;">${registro.fechasalida ? 'Fecha de salida: ' + registro.fechasalida : ''}</div>
                <label for="placa-${registro.idunico}">Placa Vehicular:</label>
                <input type="text" id="placa-${registro.idunico}" name="placa-${registro.idunico}">
                <button class="terminar-registro" data-registro-id="${registro.idunico}">Terminar Servicio</button>
            </div>`;
            contenedor.insertAdjacentHTML('beforeend', registroHTML);
        }
    });




    contenedor.addEventListener('click', function(event) {
        const target = event.target;

        if (target.matches('input[type="checkbox"][id^="entro-"]')) {
            const registroId = target.getAttribute('data-registro-id');
            const fechaEntradaDiv = document.getElementById(`fecha-entrada-${registroId}`);
            if (target.checked) {
                const fechaActual = new Date().toLocaleString();
                fechaEntradaDiv.textContent = `Fecha de entrada: ${fechaActual}`;
                fechaEntradaDiv.style.display = 'block';
                target.disabled = true;

                // Llamada a la función enviarFechaEntrada con un valor para usuarioInput
                const usuarioInput = target.getAttribute('data-registro-id');
                enviarFechaEntrada(usuarioInput, fechaActual);
            } else {
                fechaEntradaDiv.textContent = '';
                fechaEntradaDiv.style.display = 'none';
            }
        } else if (target.matches('input[type="checkbox"][id^="salio-"]')) {
            const registroId = target.getAttribute('data-registro-id');
            const fechaSalidaDiv = document.getElementById(`fecha-salida-${registroId}`);
            if (target.checked) {
                const fechaActual = new Date().toLocaleString();
                fechaSalidaDiv.textContent = `Fecha de salida: ${fechaActual}`;
                fechaSalidaDiv.style.display = 'block';
                target.disabled = true;
                const usuarioInput = target.getAttribute('data-registro-id');
                enviarFechaSalida(usuarioInput, fechaActual);
            } else {
                fechaSalidaDiv.textContent = '';
                fechaSalidaDiv.style.display = 'none';
            }
        } else if (target.matches('.terminar-registro')) {
            // Obtener el ID del registro
            const registroId = target.getAttribute('data-registro-id');
            
            // Obtener el valor del campo de placa vehicular
            const placaVehicular = document.getElementById(`placa-${registroId}`).value;
            
            // Obtener la fecha actual
            const fechaActual = new Date().toLocaleString();

            // Llamar a la función para enviar los datos al Sheets
            enviarDatosRegistro(registroId, fechaActual, placaVehicular);
        }
        }
    );
}

function enviarDatosRegistro(registroId, fechaActual, placaVehicular) {
    // Obtener los datos de la hoja de cálculo
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {

            // Buscar el índice del registro con el ID único proporcionado por el usuario
            const index = data.findIndex((fila) => fila.idunico === registroId);

            // Verificar si se encontró el registro
            if (index !== -1) {
                // Verificar si hay fecha de entrada y placa vehicular
                if (data[index].fechaentrada && data[index].fechasalida) {
                    // Actualizar la fecha de entrada y la placa vehicular del registro encontrado
                    console.log("Registro encontrado");
                    console.log(data[index]);

                    // Preparar los datos actualizados para enviarlos de vuelta a la hoja de cálculo
                    const datosActualizados = {
                        cierre: fechaActual,
                        placa: placaVehicular
                    };

                    const url = `https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30/${index}`;
                    console.log(url);

                    fetch(url, {
                        method: "PATCH",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(datosActualizados)
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Datos actualizados correctamente:", data);
                        // Ocultar el div asociado al registro
                        const fechaEntradaDiv = document.getElementById(`div${registroId}`);
                        console.log(fechaEntradaDiv)
                        fechaEntradaDiv.style.display = 'none';
                    })
                    .catch((error) => {
                        console.error("Error al actualizar los datos:", error);
                    });
                } else {
                    alert("Por favor, primero complete la fecha de entrada, fecha de salida y la placa vehicular antes terminar con el servicio.");
                }
            } else {
                console.error("Registro no encontrado");
            }
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
}

function enviarFechaEntrada(usuarioInput, fechaActual) {
    // Obtener los datos de la hoja de cálculo
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {
            console.log("Busqueda 2");
            console.log(data);

            // Buscar el índice del registro con el ID único proporcionado por el usuario
            const index = data.findIndex((fila) => fila.idunico === usuarioInput);

            // Verificar si se encontró el registro
            if (index !== -1) {
                // Actualizar la fecha de entrada del registro encontrado
                console.log("Registro encontrado");
                console.log(data[index]);

                // Preparar los datos actualizados para enviarlos de vuelta a la hoja de cálculo
                const datosActualizados = {
                    fechaentrada: fechaActual
                };

                const url = `https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30/${index}`;
                console.log(url);

                fetch(url, {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosActualizados)
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Datos actualizados correctamente:", data);
                })
                .catch((error) => {
                    console.error("Error al actualizar los datos:", error);
                });
            } else {
                console.error("Registro no encontrado");
            }
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
}

function enviarFechaSalida(usuarioInput, fechaActual) {
    // Obtener los datos de la hoja de cálculo
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {
            // Buscar el índice del registro con el ID único proporcionado por el usuario
            const index = data.findIndex((fila) => fila.idunico === usuarioInput);

            // Verificar si se encontró el registro
            if (index !== -1) {
                // Actualizar la fecha de salida del registro encontrado
                data[index].fechasalida = fechaActual;

                // Preparar los datos actualizados para enviarlos de vuelta a la hoja de cálculo
                const datosActualizados = {
                    idunico: usuarioInput,
                    fechasalida: fechaActual
                };

                // Construir la URL del registro específico
                const url = `https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30/${index}`;

                // Enviar los datos actualizados a la hoja de cálculo usando el método PATCH
                fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosActualizados)
                })
                .then((response) => response.json())
                .then((data) => {
                    // Mostrar un mensaje de éxito
                    console.log("Fecha de salida actualizada correctamente:", data);
                })
                .catch((error) => {
                    // Manejar errores en caso de que la solicitud falle
                    console.error("Error al actualizar la fecha de salida:", error);
                });
            } else {
                // Si no se encuentra el registro, mostrar un mensaje de error
                console.error("Registro no encontrado");
            }
        })
        .catch((error) => {
            // Manejar errores en caso de que la solicitud falle
            console.error("Error al obtener los datos de la hoja de cálculo:", error);
        });
}


obtenerYAgregarRegistros2();
