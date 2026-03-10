import '../style.css';
import { createNavbar, setupNavbarEvents } from '../navbar.js';

export function showTeams(app, logoutCallback, showDashboard, showPlayers, showMatches) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Equipos Destacados</h2>
      <div class="team-card">
        <h3>FC Barcelona</h3>
        <div class="stats">
          <div class="stat">
            <div class="number">85</div>
            <div class="label">Puntos</div>
          </div>
          <div class="stat">
            <div class="number">28</div>
            <div class="label">Victorias</div>
          </div>
          <div class="stat">
            <div class="number">5</div>
            <div class="label">Derrotas</div>
          </div>
        </div>
        <button>Ver Estadísticas</button>
      </div>
      <div class="team-card">
        <h3>Real Madrid</h3>
        <div class="stats">
          <div class="stat">
            <div class="number">82</div>
            <div class="label">Puntos</div>
          </div>
          <div class="stat">
            <div class="number">26</div>
            <div class="label">Victorias</div>
          </div>
          <div class="stat">
            <div class="number">6</div>
            <div class="label">Derrotas</div>
          </div>
        </div>
        <button>Ver Estadísticas</button>
      </div>
      <div class="team-card">
        <h3>Atlético Madrid</h3>
        <div class="stats">
          <div class="stat">
            <div class="number">78</div>
            <div class="label">Puntos</div>
          </div>
          <div class="stat">
            <div class="number">24</div>
            <div class="label">Victorias</div>
          </div>
          <div class="stat">
            <div class="number">8</div>
            <div class="label">Derrotas</div>
          </div>
        </div>
        <button>Ver Estadísticas</button>
      </div>
    </section>
  `;

  setupNavbarEvents(logoutCallback, showDashboard, showTeams, showPlayers, showMatches);
}