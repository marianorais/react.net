import '../style.css';
import { createNavbar } from '../navbar.js';

export function showPlayers(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Lista de Jugadores</h2>
      <div class="player-list">
        <div class="player-card">
          <h3><a href="#/players/1">Lionel Messi</a></h3>
          <div class="stats">
            <div class="stat">
              <div class="number">25</div>
              <div class="label">Goles</div>
            </div>
            <div class="stat">
              <div class="number">15</div>
              <div class="label">Asistencias</div>
            </div>
            <div class="stat">
              <div class="number">8.5</div>
              <div class="label">Rating</div>
            </div>
          </div>
        </div>
        <div class="player-card">
          <h3><a href="#/players/2">Cristiano Ronaldo</a></h3>
          <div class="stats">
            <div class="stat">
              <div class="number">22</div>
              <div class="label">Goles</div>
            </div>
            <div class="stat">
              <div class="number">10</div>
              <div class="label">Asistencias</div>
            </div>
            <div class="stat">
              <div class="number">8.7</div>
              <div class="label">Rating</div>
            </div>
          </div>
        </div>
        <div class="player-card">
          <h3><a href="#/players/3">Kylian Mbappé</a></h3>
          <div class="stats">
            <div class="stat">
              <div class="number">20</div>
              <div class="label">Goles</div>
            </div>
            <div class="stat">
              <div class="number">12</div>
              <div class="label">Asistencias</div>
            </div>
            <div class="stat">
              <div class="number">8.8</div>
              <div class="label">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}