import '../style.css';
import { createNavbar } from '../navbar.js';

export async function showPlayers(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Lista de Jugadores</h2>
      <div id="loading">Cargando jugadores...</div>
      <div class="player-list" id="player-list">
        <!-- Los jugadores se cargarán aquí dinámicamente -->
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);

  // Cargar jugadores
  loadPlayers();

  async function loadPlayers() {
    try {
      const loading = document.getElementById('loading');
      const playerList = document.getElementById('player-list');

      loading.style.display = 'block';

      // Obtener jugadores de un equipo popular (ej. Barcelona, ID 529)
      const response = await fetch('http://localhost:8000/api/players/?team=529&season=2023');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const playersData = await response.json();

      loading.style.display = 'none';

      const playersHTML = playersData.map(player => `
        <div class="player-card">
          <img src="${player.player.photo}" alt="${player.player.name}" class="player-photo">
          <div class="player-info">
            <h5><a href="#/players/${player.player.id}">${player.player.name}</a></h5>
            <p><strong>Posición:</strong> ${player.statistics[0]?.games?.position || 'N/A'}</p>
            <p><strong>Edad:</strong> ${player.player.age}</p>
            <p><strong>Nacionalidad:</strong> ${player.player.nationality}</p>
          </div>
        </div>
      `).join('');

      playerList.innerHTML = playersHTML;

    } catch (error) {
      console.error('Error loading players:', error);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('player-list').innerHTML = '<p>Error al cargar los jugadores.</p>';
    }
  }
}