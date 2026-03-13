import '../style.css';
import { createNavbar } from '../navbar.js';

export async function showTeamDetail(app, teamId, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Detalles del Equipo</h2>
      <div id="loading">Cargando detalles del equipo...</div>
      <div id="team-detail">
        <!-- Los detalles del equipo se cargarán aquí -->
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);

  // Cargar detalles del equipo
  loadTeamDetail(teamId);

  async function loadTeamDetail(id) {
    try {
      const loading = document.getElementById('loading');
      const teamDetail = document.getElementById('team-detail');

      loading.style.display = 'block';

      // Obtener datos del equipo
      const teamResponse = await fetch(`http://localhost:8000/api/teams/${id}`);
      if (!teamResponse.ok) {
        throw new Error(`HTTP ${teamResponse.status}: ${teamResponse.statusText}`);
      }
      const teamData = await teamResponse.json();
      const team = teamData[0]; // Asumiendo que devuelve un array con un elemento

      // Obtener jugadores del equipo (última temporada disponible)
      const playersResponse = await fetch(`http://localhost:8000/api/players/?team=${id}&season=2023`);
      const playersData = await playersResponse.json();

      loading.style.display = 'none';

      // Mostrar detalles del equipo
      teamDetail.innerHTML = `
        <div class="team-header">
          <img src="${team.team.logo}" alt="${team.team.name}" class="team-logo">
          <div class="team-info">
            <h3>${team.team.name}</h3>
            <p><strong>País:</strong> ${team.team.country}</p>
            <p><strong>Año de Fundación:</strong> ${team.team.founded}</p>
            <p><strong>Estadio:</strong> ${team.venue.name} (${team.venue.city})</p>
            <p><strong>Capacidad:</strong> ${team.venue.capacity}</p>
          </div>
        </div>

        <div class="team-stats">
          <h4>Estadísticas del Equipo</h4>
          <div class="stats-grid">
            <!-- Aquí podríamos agregar más estadísticas si la API las proporciona -->
            <div class="stat-item">
              <span class="stat-label">Jugadores:</span>
              <span class="stat-value">${playersData.length}</span>
            </div>
          </div>
        </div>

        <div class="team-players">
          <h4>Jugadores del Equipo</h4>
          <div class="players-list">
            ${playersData.map(player => `
              <div class="player-card">
                <img src="${player.player.photo}" alt="${player.player.name}" class="player-photo">
                <div class="player-info">
                  <h5><a href="#/players/${player.player.id}">${player.player.name}</a></h5>
                  <p><strong>Posición:</strong> ${player.statistics[0]?.games?.position || 'N/A'}</p>
                  <p><strong>Edad:</strong> ${player.player.age}</p>
                  <p><strong>Nacionalidad:</strong> ${player.player.nationality}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="team-strategy">
          <h4>Estrategia del Equipo</h4>
          <p>Información sobre la estrategia no disponible en la API actual. Podríamos agregar análisis basado en formaciones comunes o estadísticas de partidos.</p>
          <!-- Aquí podríamos agregar más datos sobre estrategia si están disponibles -->
        </div>
      `;

    } catch (error) {
      console.error('Error loading team detail:', error);
      document.getElementById('loading').style.display = 'none';
      document.getElementById('team-detail').innerHTML = '<p>Error al cargar los detalles del equipo.</p>';
    }
  }
}