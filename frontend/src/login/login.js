import '../style.css';
import viteLogo from '/vite.svg';
import { showHome } from '../home/home.js';
import { createNavbar } from '../navbar.js';

const app = document.querySelector('#app');

export function showLogin(app, logoutCallback = null) {
  app.innerHTML = `
    ${createNavbar()}
    <div class="login-container">
      <header class="login-header">
        <img src="${viteLogo}" class="logo" alt="Fútbol Logo" />
        <h1>⚽ Login - Fútbol YAT</h1>
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

  // Disable navbar links in login
  const navLinks = document.querySelectorAll('.navbar-links a');
  navLinks.forEach(link => {
    if (link.id !== 'nav-logout') {
      link.style.pointerEvents = 'none';
      link.style.opacity = '0.5';
    }
  });

  const loguearse = document.querySelector('#loginForm');
  if (loguearse) {
    loguearse.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
      const errorMsg = document.querySelector('#error-message');

      try {
        const response = await fetch('http://localhost:8000/api/login', {
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
          localStorage.setItem('loggedIn', 'true');
          window.location.hash = '#/home';
          // Trigger navigation
          window.dispatchEvent(new Event('hashchange'));
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