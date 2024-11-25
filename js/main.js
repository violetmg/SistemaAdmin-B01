//Tooltip Initializer
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

//Login function
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Aquí iría la lógica de autenticación
  // Por ahora solo simulamos
  if (username === 'admin' && password === 'admin123') {
      window.location.href = 'administrador.html';
  } else {
      document.getElementById('error-message').style.display = 'block';
  }
  
  return false;
}

// Función para exportar datos
function exportarDatos() {
    alert('Exportando datos...');
    // Aquí iría la lógica para exportar a Excel o CSV
  }

  // Función para mostrar/ocultar filtros
  function mostrarFiltros() {
    const filtros = document.querySelectorAll('.filters');
    filtros.forEach(filtro => {
      filtro.style.display = filtro.style.display === 'none' ? 'flex' : 'none';
    });
  }

  // Función para aplicar filtros en ventas
  function aplicarFiltros() {
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;
    // Aquí iría la lógica para filtrar los datos
    console.log('Aplicando filtros:', {fechaInicio, fechaFin});
  }

  // Función para aplicar filtros en inventario
  function aplicarFiltrosInventario() {
    // Aquí iría la lógica para filtrar el inventario
    console.log('Aplicando filtros de inventario');
  }

  // Función para actualizar datos en tiempo real (simulación)
  function actualizarDatos() {
    // Aquí iría la lógica para actualizar los datos en tiempo real
    console.log('Actualizando datos...');
  }

  // Actualizar datos cada 5 minutos
  setInterval(actualizarDatos, 300000);


  // ... Modals Logic ... //

  // Profile Edit //

  var profname = document.getElementById('toeditNombre');
  var email = document.getElementById('toeditEmail');
  var contact = document.getElementById('toeditContact');

  function editarUsuario(){
    document.getElementById('editNombre').value = profname.innerHTML;
    document.getElementById('editEmail').value = email.innerHTML;
    document.getElementById('editContact').value = contact.innerHTML;

  }

  function guardarUsuario(){
    profname.innerHTML = document.getElementById('editNombre').value;
    email.innerHTML = document.getElementById('editEmail').value;
    contact.innerHTML = document.getElementById('editContact').value;
  }

  // profileModal = new bootstrap.Modal(document.getElementById("editProfileModal"));

  // document.getElementById('btnProfileEdit').addEventListener("click", function(event){
  //   editarUsuario();
  //   profileModal.show();
  // });

  document.getElementById("Btnconsultar").addEventListener("click", async function() {
        try {
            const response = await fetch('https://localhost:7187/api/invoice/invoices', {
                method: 'GET', // o 'POST' si necesitas enviar datos
                headers: {
                    'Content-Type': 'application/json'
                    // Aquí puedes agregar otros encabezados si es necesario
                }
            });

            if (response.ok) {
                const facturas = await response.json();
                
                // Limpia la tabla antes de agregar nuevos datos
                const tabla = document.getElementById("ventas-tabla");
                tabla.innerHTML = ''; // Elimina todas las filas actuales

                // Agregar una fila por cada factura
                facturas.forEach(factura => {
                    const nuevaFila = document.createElement("tr");

                    // Crear celdas para cada propiedad de la factura
                    const celdaId = document.createElement("td");
                    celdaId.textContent = factura.facturaId; // Puedes ajustar el formato
                    nuevaFila.appendChild(celdaId);

                    const celdaTalla = document.createElement("td");
                    celdaTalla.textContent = factura.total // Aquí usaré NombreEmpresa como "Talla"
                    nuevaFila.appendChild(celdaTalla);

             

                    const celdaStockMinimo = document.createElement("td");
                    celdaStockMinimo.textContent = factura.nombreEmpresa; // Aquí puedes poner un valor estático o calculado
                    nuevaFila.appendChild(celdaStockMinimo);

                    const celdaUltimoIngreso = document.createElement("td");
                    celdaUltimoIngreso.textContent = factura.fechaCreacion.split('T')[0]; // Formatea la fecha (YYYY-MM-DD)
                    nuevaFila.appendChild(celdaUltimoIngreso);

                    const celdaEstado = document.createElement("td");
                    const estadoSpan = document.createElement("span");
                    estadoSpan.classList.add("status-badge");
                    estadoSpan.classList.add(factura.Total < 100 ? "status-pending" : "status-completed");
                    estadoSpan.textContent = factura.Total < 100 ? "Stock Bajo" : "OK";
                    celdaEstado.appendChild(estadoSpan);
                    nuevaFila.appendChild(celdaEstado);

                    // Agregar la fila a la tabla
                    tabla.appendChild(nuevaFila);
                });
            } else {
                console.error('Error en la consulta: ' + response.status);
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        }
  });

function ValidarAdministrador() {
    const authToken = sessionStorage.getItem('authToken');

// Verificar si el token existe
    if (authToken) {
      console.log('Token de autenticación:', authToken);
    } else {
      console.log('No se ha encontrado el token de autenticación.');
    }
  }

