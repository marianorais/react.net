import '../style.css';
import { createNavbar, setupNavbarEvents } from '../navbar.js';

export async function showTeams(app, logoutCallback, showDashboard, showPlayers, showMatches) {
  // Fetch teams from TheSportsDB API (free, no key required)
  const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga');
  const data = await response.json();
  const teams = data.teams.slice(0, 30); // Limit to 30 teams for display

  const teamsHTML = teams.map(team => `
    <div class="team-card">
      <h3>${team.strTeam}</h3>
      <div class="stats">
        <div class="stat">
          <div class="number">${team.intFormedYear || 'N/A'}</div>
          <div class="label">Año Fundación</div>
        </div>
        <div class="stat">
          <div class="number">${team.strStadium || 'N/A'}</div>
          <div class="label">Estadio</div>
        </div>
        <div class="stat">
          <div class="number">${team.strWebsite ? 'Sí' : 'No'}</div>
          <div class="label">Sitio Web</div>
        </div>
      </div>
      <button>Ver Estadísticas</button>
    </div>
  `).join('');

  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Equipos Destacados</h2>
      ${teamsHTML}
    </section>
  `;

  setupNavbarEvents(logoutCallback, showDashboard, showTeams, showPlayers, showMatches);
}