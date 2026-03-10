import '../style.css';
import { createNavbar } from '../navbar.js';

export function showStats(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Estadísticas Generales</h2>
      <div class="stats-overview">
        <div class="stat-card">
          <h3>Total de Goles</h3>
          <div class="number">1200</div>
        </div>
        <div class="stat-card">
          <h3>Partidos Jugados</h3>
          <div class="number">380</div>
        </div>
        <div class="stat-card">
          <h3>Asistencias</h3>
          <div class="number">450</div>
        </div>
        <div class="stat-card">
          <h3>Tarjetas Rojas</h3>
          <div class="number">25</div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}