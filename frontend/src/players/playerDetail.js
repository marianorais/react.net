import '../style.css';
import { createNavbar } from '../navbar.js';

export function showPlayerDetail(app, playerId, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Perfil del Jugador ${playerId}</h2>
      <div class="player-profile">
        <h3>Lionel Messi</h3>
        <p>Equipo: FC Barcelona</p>
        <p>Posición: Delantero</p>
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
          <div class="stat">
            <div class="number">150</div>
            <div class="label">Partidos Jugados</div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}