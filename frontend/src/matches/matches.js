import '../style.css';
import { createNavbar } from '../navbar.js';

export function showMatches(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Lista de Partidos</h2>
      <div class="match-list">
        <div class="match-card">
          <h3><a href="#/matches/1">Barcelona vs Real Madrid</a></h3>
          <p>Estadio: Camp Nou | Fecha: Hoy 20:00</p>
          <div class="stats">
            <div class="stat">
              <div class="number">2</div>
              <div class="label">Goles Barcelona</div>
            </div>
            <div class="stat">
              <div class="number">1</div>
              <div class="label">Goles Real Madrid</div>
            </div>
          </div>
        </div>
        <div class="match-card">
          <h3><a href="#/matches/2">Atlético Madrid vs Sevilla</a></h3>
          <p>Estadio: Wanda Metropolitano | Fecha: Mañana 18:30</p>
          <div class="stats">
            <div class="stat">
              <div class="number">-</div>
              <div class="label">Próximo</div>
            </div>
          </div>
        </div>
        <div class="match-card">
          <h3><a href="#/matches/3">Valencia vs Villarreal</a></h3>
          <p>Estadio: Mestalla | Fecha: Mañana 21:00</p>
          <div class="stats">
            <div class="stat">
              <div class="number">-</div>
              <div class="label">Próximo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}