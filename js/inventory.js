    //Tooltip Initializer
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    
    // Declare Index Table & edit index
    let carrito = [];
    let indiceEdicion = -1;

    //

    // Modals & Modal Triggers

    var delModal = new bootstrap.Modal(document.getElementById("deleteModal"));
    var editModal = new bootstrap.Modal(document.getElementById("editModal"));
    var observeModal = new bootstrap.Modal(document.getElementById("observeModal"));
    var alertModal = new bootstrap.Modal(document.getElementById("alertModal"));

    // Index Table Functions

    function agregarProducto() {
      const referencia = document.getElementById('referencia').value;
      const cantidad = document.getElementById('cantidad').value;
      const precio = document.getElementById('precio').value;
      const talla = document.getElementById('talla').value;

      const campos = [
        { value: referencia, name: 'Referencia' },
        { value: cantidad, name: 'Cantidad' },
        { value: precio, name: 'Precio' },
        { value: talla, name: 'Talla' }
      ];

      // Alerts <p> on Modal
      qAlert = document.getElementById('quantityalert');
      pAlert = document.getElementById('pricealert');
      bAlert = document.getElementById('blankalert');


      // Form Comprobations
      for(let campo of campos){
        if(!campo.value.trim()){
          bAlert.style.display = "block";

          qAlert.style.display = "none";
          pAlert.style.display = "none";

          alertModal.show();
          return;
        }
      }

      // -- Data Validator --
      
      if(!/^\d{1,10}$/.test(cantidad)){
        qAlert.style.display = "block";

        pAlert.style.display = "none";
        bAlert.style.display = "none";

        alertModal.show();
        return
      }

      if(!/^d[0-9]{20}$/){
        pAlert.style.display = "block";

        qAlert.style.display = "none";
        bAlert.style.display = "none";

        alertModal.show();
        return;
      }

      // End
      
      const producto = { 
        referencia, 
        cantidad: parseInt(cantidad), 
        precio: parseFloat(precio), 
        talla,
        observacion: ''
      };

      carrito.push(producto);
      actualizarCarrito();
      limpiarFormulario();
    }

    function limpiarFormulario() {
      document.getElementById('referencia').value = '';
      document.getElementById('cantidad').value = '';
      document.getElementById('precio').value = '';
      document.getElementById('talla').value = 'S';
    }

    //Table Products updater
    function actualizarCarrito() {
      const tbody = document.getElementById('carrito');
      tbody.innerHTML = '';

      let total = 0;
      carrito.forEach((producto, index) => {
        const subtotal = producto.cantidad * producto.precio;
        total += subtotal;

        const fila = `
          <tr>
            <td>${producto.referencia}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>${producto.talla}</td>
            <td>${subtotal.toFixed(2)}</td>
            <td>
              <button class="btn-action btn-delete" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Eliminar" data-bs-target="#deleteModal" id="btnDel">🗑️</button>
              <button class="btn-action btn-edit" data-bs-toggle="tooltip" data-bs-target="#editModal" title="Editar" onclick="editarProducto(${index})" id="btnEdit">✏️</button>
              <button class="btn-action btn-observe" data-bs-toggle="tooltip" data-bs-target="#observeModal" title="Observación" onclick="observarProducto(${index})" id="btnObs">📝</button>
            </td>
          </tr>
        `;
        tbody.innerHTML += fila;
      });

      document.getElementById('total').innerText = total.toFixed(2);

      //Tooltips Triggers re-initiliaze
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }

    // Edit and Observe Modal Functions

    function eliminar(index){
      carrito.splice(index, 1);
      actualizarCarrito();
    }

    function editarProducto(index) {
      indiceEdicion = index;
      const producto = carrito[index];
      
      document.getElementById('editReferencia').value = producto.referencia;
      document.getElementById('editCantidad').value = producto.cantidad;
      document.getElementById('editPrecio').value = producto.precio;
      document.getElementById('editTalla').value = producto.talla;
    }

    function cerrarModal() {
      indiceEdicion = -1;
    }

    function guardarEdicion() {
      if(indiceEdicion === -1) return;
      
      carrito[indiceEdicion] = {
        referencia: document.getElementById('editReferencia').value,
        cantidad: parseInt(document.getElementById('editCantidad').value),
        precio: parseFloat(document.getElementById('editPrecio').value),
        talla: document.getElementById('editTalla').value,
        observacion: carrito[indiceEdicion].observacion || ''
      };
      
      actualizarCarrito();
    }

    function observarProducto(index) {
      indiceEdicion = index;
      document.getElementById('observaciones').value = carrito[index].observacion || '';
    }

    function guardarObservacion() {
      if(indiceEdicion === -1) return;
      
      carrito[indiceEdicion].observacion = document.getElementById('observaciones').value;
      cerrarModal();
    }

    // Modal Shows and Close --

    document.getElementById('carrito').addEventListener("click", function(event) {
      // Verifica si el elemento clicado tiene la clase 'btn-delete'
      if (event.target.classList.contains("btn-delete")) {
          btndelModal = document.getElementById('btnDel');
          delTooltip = bootstrap.Tooltip.getOrCreateInstance(btndelModal);
          delTooltip.hide();
          delModal.show();
      }
      // Verifica si el elemento clicado tiene la clase 'btn-edit'
      else if (event.target.classList.contains("btn-edit")) {
          btneditModal = document.getElementById('btnEdit');
          editTooltip = bootstrap.Tooltip.getOrCreateInstance(btneditModal);
          editTooltip.hide();
          editModal.show();
      }
      // Verifica si el elemento clicado tiene la clase 'btn-observe'
      else if (event.target.classList.contains("btn-observe")) {
          btnobsModal = document.getElementById('btnObs');
          obsTooltip = bootstrap.Tooltip.getOrCreateInstance(btnobsModal);
          obsTooltip.hide();
          observeModal.show();
      }
  });