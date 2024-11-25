async function handleLogin(event) {
            event.preventDefault(); // Evita el envío tradicional del formulario

            // Obtener los datos del formulario
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Preparar los datos para la solicitud POST
            const loginData = {
                user: username,
                password: password
            };

            try {
                // Hacer la solicitud POST a la API
                const response = await fetch('https://localhost:7187/api/User/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData)
                });

                // Verificar si la respuesta fue exitosa
                if (response.ok) {
                    // Si el inicio de sesión es exitoso, redirigir o almacenar el token
                    const data = await response.json();
                    sessionStorage.setItem('authToken', data.token); // Almacena el token de autenticación
                    if (data.isAdmin) {
                        window.location.href = 'http://127.0.0.1:5500/administrador.html'; // Redirige a la página de administración
                    } else {
                        window.location.href = 'http://127.0.0.1:5500/factura.html'
                    }
                } else {
                    // Si el inicio de sesión falla, mostrar el mensaje de error
                    const errorMessage = await response.json();
                    showError(errorMessage.message || 'Usuario o contraseña incorrectos');
                }
            } catch (error) {
                // Manejar cualquier error de red o de la API
                console.error('Error de red:', error);
                showError('Hubo un problema al intentar iniciar sesión.');
            }
        }

        // Mostrar el mensaje de error
        function showError(message) {
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = 'block';
        }