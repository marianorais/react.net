import '../style.css';
import { createNavbar } from '../navbar.js';

export async function showPlayers(app, logoutCallback) {
  // Fetch players from Barcelona using TheSportsDB API (free, no key required)
  const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=133739');
  const data = await response.json();
  const players = data.player.slice(0, 30); // Limit to 30 players for display

  const playersHTML = players.map((player, index) => `
    <div class="player-card">
      <h3><a href="#/players/${index + 1}">${player.strPlayer}</a></h3>
      <div class="stats">
        <div class="stat">
          <div class="number">${player.strPosition || 'N/A'}</div>
          <div class="label">Posición</div>
        </div>
        <div class="stat">
          <div class="number">${player.dateBorn || 'N/A'}</div>
          <div class="label">Fecha Nacimiento</div>
        </div>
        <div class="stat">
          <div class="number">${player.strNationality || 'N/A'}</div>
          <div class="label">Nacionalidad</div>
        </div>
      </div>
    </div>
  `).join('');

  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Lista de Jugadores</h2>
      <div class="player-list">
        ${playersHTML}
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}