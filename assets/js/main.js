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

  profileModal = new bootstrap.Modal(document.getElementById("editProfileModal"));

  document.getElementById('btnProfileEdit').addEventListener("click", function(event){
    editarUsuario();
    profileModal.show();
  });

