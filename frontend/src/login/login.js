import '../style.css';
import typescriptLogo from '../typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from '../counter.ts';   

const app = document.querySelector('#app');

if (app) {
  app.innerHTML = `
    <div>
      <p class="">
        Login 
      </p>
      <a href="https://vite.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <h1>Login</h1>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      
      <form action="#" id="loginForm">
        <div class="card">
            <input id="username" type="text" placeholder="Usuario" required />
            <input id="password" type="text" placeholder="Contraseña" required />
        </div>
        <div class="card">
            <button id="login" type="submit">Login</button>
        </div>
      </form>

      <p class="read-the-docs">
        Ejemplo de Login
      </p>
    </div>
  `;
}

const counterBtn = document.querySelector('#counter');
if (counterBtn) {
  setupCounter(counterBtn);
}

const loguearse = document.querySelector('#loginForm');
if (loguearse) {
  loguearse.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    console.log('Usuario:', username, 'Contraseña:', password);
  });
}