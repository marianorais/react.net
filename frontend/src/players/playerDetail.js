import '../style.css';
import { createNavbar } from '../navbar.js';

export async function showPlayerDetail(app, playerId, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Perfil del Jugador</h2>
      <div id="loading">Cargando perfil del jugador...</div>
      <div id="player-profile">
        <!-- El perfil del jugador se cargará aquí -->
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);

  // Cargar perfil del jugador
  loadPlayerDetail(playerId);

  async function loadPlayerDetail(id) {
    try {
      const loading = document.getElementById('loading');
      const playerProfile = document.getElementById('player-profile');

      loading.style.display = 'block';

      const response = await fetch(`http://localhost:8000/api/players/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const playerData = await response.json();
      const player = playerData[0]; // Asumiendo que devuelve un array con un elemento

      loading.style.display = 'none';

      // Mostrar perfil del jugador
      playerProfile.innerHTML = `
        <div class="player-header">
          <img src="${player.player.photo}" alt="${player.player.name}" class="player-photo-large">
          <div class="player-info">
            <h3>${player.player.name}</h3>
            <p><strong>Edad:</strong> ${player.player.age}</p>
            <p><strong>Nacionalidad:</strong> ${player.player.nationality}</p>
            <p><strong>Altura:</strong> ${player.player.height}</p>
            <p><strong>Peso:</strong> ${player.player.weight}</p>
          </div>
        </div>

        <div class="player-stats">
          <h4>Estadísticas (Temporada 2023)</h4>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">Apariciones:</span>
              <span class="stat-value">${player.statistics[0]?.games?.appearences || 0}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Minutos jugados:</span>
              <span class="stat-value">${player.statistics[0]?.games?.minutes || 0}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Posición:</span>
              <span class="stat-value">${player.statistics[0]?.games?.position || 'N/A'}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Rating:</span>
              <span class="stat-value">${player.statistics[0]?.games?.rating || 'N/A'}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Goles:</span>
              <span class="stat-value">${player.statistics[0]?.goals?.total || 0}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Asistencias:</span>
              <span class="stat-value">${player.statistics[0]?.goals?.assists || 0}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Tarjetas amarillas:</span>
              <span class="stat-value">${player.statistics[0]?.cards?.yellow || 0}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Tarjetas rojas:</span>
              <span class="stat-value">${player.statistics[0]?.cards?.red || 0}</span>
            </div>
          </div>
        </div>
      `;

    } catch (error) {
      console.error('Error loading player detail:', error);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('player-profile').innerHTML = '<p>Error al cargar el perfil del jugador.</p>';
    }
  }
}