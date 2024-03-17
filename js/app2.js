// Función para obtener los datos del API y agregar los registros
function obtenerYAgregarRegistros2() {
    console.log("actualziandose");
    fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Imprime los datos obtenidos desde la API

            // Filtrar los registros para obtener solo los de hoy
            const registrosHoy = data.filter((fila) => esFechaHoy(fila.fecha) ); 

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
            const registroHTML =
                `<div id="div${registro.idunico}" class="registro-item">
                <p><strong>Domicilio:</strong> ${registro.domicilio}</p>
                <p><strong>Nombre:</strong> ${registro.namevisita}</p>
                <p><strong>Fecha:</strong> ${registro.fecha}</p>
                <p><strong>Tipo:</strong> ${registro.tipo}</p>
                <div id="registro-${registro.idunico}">
                    <div class="contenedor-input">
                        <div class="contenedor" id="registroentarda-${registro.idunico}" style="${registro.fechaentrada ? 'display:none;' : 'display:block;'}">
                            <label for="placa-${registro.idunico}">Placa Vehicular:</label>
                            <input type="text" id="placa-${registro.idunico}" name="placa-${registro.idunico}">
                            <label for="marca-${registro.idunico}">Marca:</label>
                            <input type="text" id="marca-${registro.idunico}" name="marca-${registro.idunico}">
                            <label for="modelo-${registro.idunico}">Modelo:</label>
                            <input type="text" id="modelo-${registro.idunico}" name="modelo-${registro.idunico}">
                            <label for="color-${registro.idunico}">Color:</label>
                            <input type="text" id="color-${registro.idunico}" name="color-${registro.idunico}">
                            <label for="personasenvhe-${registro.idunico}">Personas abordo entrando:</label>
                            <input type="number" id="personasenvhe-${registro.idunico}" name="personasenvhe-${registro.idunico}" min="0">
                            <p></p>
                            <button id="entro-${registro.idunico}" data-registro-id="${registro.idunico}" ${registro.fechaentrada ? 'disabled' : ''} onclick="toggleEntrada(${registro.idunico})">
                            ${registro.fechaentrada ? 'Entrada registrada' : 'Registrar Entrada'}
                            </button>
                        </div>
                        <div id="datosycapturados-${registro.idunico}" class="contenedor">
                            <div class="fecha-entrada" id="fecha-entrada-${registro.idunico}" style="display:block;">${registro.fechaentrada ? 'Fecha de entrada: ' + registro.fechaentrada : ''}</div>
                            <div class="placa-vehicular" id="placa-vehicular-${registro.idunico}" style="display:block;" onclick="editField('placa-vehicular-${registro.idunico}')">${registro.placa ? 'Placa Vehicular: ' + registro.placa : ''}</div>
                            <div class="marca" id="marca-${registro.idunico}" style="display:block;" onclick="editField('marca-${registro.idunico}')">${registro.marca ? 'Marca: ' + registro.marca : ''}</div>
                            <div class="modelo" id="modelo-${registro.idunico}" style="display:block;" onclick="editField('modelo-${registro.idunico}')">${registro.modelo ? 'Modelo: ' + registro.modelo : ''}</div>
                            <div class="color" id="color-${registro.idunico}" style="display:block;" onclick="editField('color-${registro.idunico}')">${registro.color ? 'Color: ' + registro.color : ''}</div>
                            <div class="personasenvhe" id="personasenvheo-${registro.idunico}" style="display:block;" onclick="editField('personasenvhe-${registro.idunico}')">${registro.personasenvhe ? 'Personas abordo entrando: ' + registro.personasenvhe : ''}</div>
                            <div class="personasenvhe" id="fecha-salida-${registro.idunico}" style="display:block;" onclick="editField('personasenvhe-${registro.idunico}')">${registro.fechasalida ? 'Fecha Salida ' + registro.fechasalida : ''}</div>
                        </div>
                        <div class="contenedor" id="registrosalida-${registro.idunico}">
                            <div id="salidapersonas-${registro.idunico}">
                                <p>
                                <label for="personasenvhs-${registro.idunico}">Personas abordo salida:</label>
                                <input type="number" id="personasenvhs-${registro.idunico}" name="personasenvhs-${registro.idunico}" min="0">
                                <p>
                                <button class="salio" id="salio-${registro.idunico}" data-registro-id="${registro.idunico}">Registrar Salida</button>
                            </div>
                            <button class="terminar-registro" data-registro-id="${registro.idunico}">Terminar Servicio</button>
                        <div>

                    </div>
                </div>
            </div>`;
            contenedor.insertAdjacentHTML('beforeend', registroHTML);
        }
    });

    contenedor.addEventListener('click', function(event) {
        const target = event.target;

        if (target.matches('button[id^="entro-"]')) {
            const registroId = target.getAttribute('data-registro-id');
            const fechaEntradaDiv = document.getElementById(`fecha-entrada-${registroId}`);
            const fechaActual = new Date().toLocaleString();
        
            // Verifica si el botón está deshabilitado (es decir, la entrada ya está registrada)
            if (!target.disabled) {
                const placaInput = document.getElementById(`placa-${registroId}`).value;
                const marcaInput = document.getElementById(`marca-${registroId}`).value;
                const modeloInput = document.getElementById(`modelo-${registroId}`).value;
                const colorInput = document.getElementById(`color-${registroId}`).value;
                const personasenvheInput = document.getElementById(`personasenvhe-${registroId}`).value;
                
                // Verificar si todos los campos no están vacíos
                if (placaInput.trim() !== '' && marcaInput.trim() !== '' && modeloInput.trim() !== '' && colorInput.trim() !== '' && personasenvheInput.trim() !== '') {
                    const placa = placaInput;
                    const marca = marcaInput;
                    const modelo = modeloInput;
                    const color = colorInput;
                    const personasenvhe = personasenvheInput;
                    
                    // Continuar con el resto del código
                    fechaEntradaDiv.textContent = `Fecha de entrada: ${fechaActual}`;
                    fechaEntradaDiv.style.display = 'block';
                    
                    target.disabled = true;
            
                    // Llamada a la función enviarFechaEntrada con un valor para usuarioInput
                    enviarFechaEntrada(registroId, placa, marca, modelo, color, personasenvhe, fechaActual);
                } else {
                    // Mostrar un mensaje de error o tomar alguna otra acción si los campos están vacíos
                    alert('Por favor, complete todos de entarda');
                }
            } else {
                fechaEntradaDiv.textContent = '';
                fechaEntradaDiv.style.display = 'none';
            }
        } else if (target.matches('button[id^="salio-"]')) {
            const registroId = target.getAttribute('data-registro-id');
            const personasenvhs = document.getElementById(`personasenvhs-${registroId}`).value;
            const fechaActual = new Date().toLocaleString();

            const fechaSalidaDiv = document.getElementById(`fecha-salida-${registroId}`);
            // Verificar si la fecha de salida ya está registrada
            if (fechaSalidaDiv.textContent !== '') {

                const divSalida = document.getElementById(`salidapersonas-${registroId}`);
                divSalida.style.display = 'none';
                alert('La salida ya está registrada.');
                
                return;
            }
            
            fechaSalidaDiv.textContent = `Fecha de salida: ${fechaActual}`;
            fechaSalidaDiv.style.display = 'block';
            target.disabled = true;
            
            // Llamada a la función enviarFechaSalida con un valor para usuarioInput
            enviarFechaSalida(registroId, fechaActual, personasenvhs);
        } else if (target.matches('.terminar-registro')) {
            // Obtener el ID del registro
            const registroId = target.getAttribute('data-registro-id');
            
            // Obtener el valor del campo de placa vehicular
            
            // Obtener la fecha actual
            const fechaActual = new Date().toLocaleString();

            // Llamar a la función para enviar los datos al Sheets
            enviarDatosRegistro(registroId, fechaActual);
        }
    }
);
}

function enviarDatosRegistro(registroId, fechaActual) {
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




function enviarFechaEntrada(registroId, placa, marca, modelo, color, personasenvhe, fechaActual) {
    // Verificar si todos los campos están llenos
    if (placa && marca && modelo && color && personasenvhe) {
        // Obtener los datos de la hoja de cálculo
        fetch("https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30")
            .then((response) => response.json())
            .then((data) => {
                console.log("Busqueda 2");
                console.log(data);

                // Buscar el índice del registro con el ID único proporcionado por el usuario
                const index = data.findIndex((fila) => fila.idunico === registroId);

                // Verificar si se encontró el registro
                if (index !== -1) {
                    // Actualizar la fecha de entrada del registro encontrado
                    console.log("Registro encontrado");
                    console.log(data[index]);

                    // Preparar los datos actualizados para enviarlos de vuelta a la hoja de cálculo
                    const datosActualizados = {
                        fechaentrada: fechaActual,
                        marca: marca,
                        placa: placa,
                        modelo: modelo,
                        color: color,
                        personasenvhe: personasenvhe,
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
    } else {
        console.error("Por favor, complete todos los campos antes de enviar los datos.");
    }
}

function enviarFechaSalida(usuarioInput, fechaActual, personasenvhs) {
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
                data[index].personasenvhs = personasenvhs; // Agregar el valor de personasenvhs

                // Construir la URL del registro específico
                const url = `https://sheet.best/api/sheets/ef7150db-3f89-42e9-8abd-790a804eab30/${index}`;

                // Enviar los datos actualizados a la hoja de cálculo usando el método PATCH
                fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data[index]) // Enviar el registro completo
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
