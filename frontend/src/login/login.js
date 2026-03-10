import '../style.css';
import viteLogo from '/vite.svg';
import { showDashboard } from '../dashboard/dashboard.js';

const app = document.querySelector('#app');

function showLogin() {
  app.innerHTML = `
    <div class="login-container">
      <header class="login-header">
        <img src="${viteLogo}" class="logo" alt="Fútbol Logo" />
        <h1>⚽ Login - Fútbol Dashboard</h1>
        <p>Ingresa tus credenciales para acceder al panel de estadísticas</p>
      </header>
      
      <form action="#" id="loginForm" class="login-form">
        <div class="input-group">
          <label for="username">Usuario</label>
          <input id="username" type="text" placeholder="Ingresa tu usuario" required />
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input id="password" type="password" placeholder="Ingresa tu contraseña" required />
        </div>
        <button type="submit" class="login-btn">Iniciar Sesión</button>
        <div id="error-message" class="error-message"></div>
      </form>
    </div>
  `;

  const loguearse = document.querySelector('#loginForm');
  if (loguearse) {
    loguearse.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
      const errorMsg = document.querySelector('#error-message');

      try {
        const response = await fetch('http://localhost:5091/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          errorMsg.style.display = 'none';
          console.log('Login exitoso:', data);
          showDashboard(app, () => showLogin());

        } else {
          errorMsg.textContent = data.message || 'Credenciales inválidas';
          errorMsg.style.display = 'block';
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        errorMsg.textContent = 'Error al conectar con el servidor';
        errorMsg.style.display = 'block';
      }
    });
  }
}

// Inicializar con login
showLogin();