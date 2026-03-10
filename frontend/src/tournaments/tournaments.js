import '../style.css';
import { createNavbar } from '../navbar.js';

export function showTournaments(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Torneos Disponibles</h2>
      <div class="tournament-list">
        <div class="tournament-card">
          <h3>La Liga</h3>
          <p>Temporada 2023-2024</p>
          <p>Equipos: 20</p>
        </div>
        <div class="tournament-card">
          <h3>Champions League</h3>
          <p>Temporada 2023-2024</p>
          <p>Equipos: 32</p>
        </div>
        <div class="tournament-card">
          <h3>Copa del Rey</h3>
          <p>Temporada 2023-2024</p>
          <p>Equipos: 16</p>
        </div>
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}