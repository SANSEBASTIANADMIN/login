document.addEventListener("DOMContentLoaded", function() {
    // Variable para almacenar los idunico ya agregados
    const idunicosAgregados = new Set();

    // Función para obtener los datos del API y agregar los registros de hoy
    function obtenerYAgregarRegistros2() {
        console.log("actualizando");
        fetch("https://sheet.best/api/sheets/f0115907-7bd6-484a-b9be-a5e10b4fe3bd/tabs/visitas")
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Imprime los datos obtenidos desde la API

                // Filtrar los registros para obtener solo los de hoy
                const registrosHoy = data.filter((fila) => esFechaHoy(fila.fecha)); 

                // Procesar los datos y agregarlos a los contenedores de calle
                agregarRegistros("alba-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkFMQk")));
                agregarRegistros("caballeros-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkNBQkFMTEVST")));
                agregarRegistros("esmeralda-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkVTTUVSQUxEQ")));
                agregarRegistros("eros-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkVST1")));
                agregarRegistros("magdalena-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("Ik1BR0RBTEVOQ")));
                agregarRegistros("ibiza-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IklCSVpBI")));
                agregarRegistros("hierro-registros", registrosHoy.filter((registro) => registro.domicilio.startsWith("IkhJRVJSTy")));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Función para obtener y agregar registros de morosos
    function obtenerdomconmora() {
        console.log("Obteniendo registros de morosos...");
        fetch("https://sheet.best/api/sheets/f0115907-7bd6-484a-b9be-a5e10b4fe3bd/tabs/propietarios")
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

    // Función para agregar registros a un contenedor de calle
    function agregarRegistros(contenedorId, registros) {
        const contenedor = document.getElementById(contenedorId);
        registros.forEach(registro => {
            // Verificar si el idunico ya se ha agregado
            if (!idunicosAgregados.has(registro.idunico)) {
                const registroHTML = `
                    <div id="div${registro.idunico}" class="registro-item">
                        <p><strong>Domicilio:</strong> ${atob(registro.domicilio)}</p>
                        <p><strong>Nombre:</strong> ${registro.namevisita}</p>
                        <p><strong>Fecha:</strong> ${registro.fecha}</p>
                        <p><strong>Tipo:</strong> ${registro.tipo}</p>
                    </div>
                `;
                contenedor.insertAdjacentHTML('beforeend', registroHTML);
                // Agregar el idunico al conjunto de idunico ya agregados
                idunicosAgregados.add(registro.idunico);
            }
        });
    }

    // Función para convertir una fecha de texto en un objeto de fecha
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

    // Función para verificar si una fecha es hoy
    function esFechaHoy(fechaComparar) {
        // Verificar si fechaComparar es null antes de intentar usarla
        if (!fechaComparar) {
            return false;
        }

        const fechaCompararObj = obtenerFechaObj(fechaComparar);
        const fechaActual = new Date();
        return fechaCompararObj && fechaCompararObj.toDateString() === fechaActual.toDateString();
    }

    // Event listener para el clic en la página
    document.addEventListener("click", function() {
        obtenerYAgregarRegistros2();
    });

    // Event listener para el clic en el elemento details
    document.getElementById("calle-morosos").addEventListener("toggle", function() {
        if (this.open) {
            obtenerdomconmora();
        }
    });

    // Llamar a las funciones una vez al cargar la página para cargar los registros iniciales
    obtenerYAgregarRegistros2();
});
