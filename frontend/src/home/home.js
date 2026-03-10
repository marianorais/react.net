import '../style.css';
import { createNavbar } from '../navbar.js';

export function showHome(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Bienvenido a Fútbol YAT</h2>
      <p>Tu plataforma para estadísticas y partidos de fútbol en tiempo real.</p>
      <div class="summary-cards">
        <div class="summary-card">
          <h3>Partidos Hoy</h3>
          <div class="number">3</div>
        </div>
        <div class="summary-card">
          <h3>Goles Totales</h3>
          <div class="number">45</div>
        </div>
        <div class="summary-card">
          <h3>Jugadores Activos</h3>
          <div class="number">250</div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Últimos Resultados</h2>
      <div class="match-card">
        <h3>Barcelona 2 - 1 Real Madrid</h3>
        <p>Estadio: Camp Nou | Fecha: Ayer</p>
      </div>
      <div class="match-card">
        <h3>Atlético Madrid 1 - 0 Sevilla</h3>
        <p>Estadio: Wanda Metropolitano | Fecha: Hace 2 días</p>
      </div>
    </section>
  `;

  // Setup logout
  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}