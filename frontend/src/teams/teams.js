import '../style.css';
import { createNavbar, setupNavbarEvents } from '../navbar.js';

export async function showTeams(app, logoutCallback, showDashboard, showPlayers, showMatches) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Equipos</h2>
      <div class="filters">
        <div class="filter-group">
          <label for="country-select">País:</label>
          <select id="country-select">
            <option value="" selected>Todos los países</option>
            <option value="England">Inglaterra</option>
            <option value="Spain">España</option>
            <option value="Germany">Alemania</option>
            <option value="Italy">Italia</option>
            <option value="France">Francia</option>
            <option value="Argentina">Argentina</option>
          </select>
        </div>
      </div>
      <div id="loading">Cargando equipos...</div>
      <div class="team-list" id="team-list">
        <!-- Los equipos se cargarán aquí dinámicamente -->
      </div>
    </section>
  `;

  // Cargar equipos desde la API
  loadTeams();

  // Event listeners para los filtros
  document.getElementById('country-select').addEventListener('change', loadTeams);

  // setupNavbarEvents se llama al final de loadTeams

  async function loadTeams() {
    try {
      const country = document.getElementById('country-select').value;
      const loading = document.getElementById('loading');
      const teamList = document.getElementById('team-list');

      const params = new URLSearchParams();
      let url;
      
      if (country) {
        // Si se selecciona un país específico, usar el endpoint por país
        url = `http://localhost:8000/api/teams/country/${country}`;
      } else {
        // Si no hay país seleccionado, usar un país aleatorio con el endpoint por país
        const countries = ['England', 'Spain', 'Germany', 'Italy', 'France', 'Argentina'];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        url = `http://localhost:8000/api/teams/country/${randomCountry}`;
      }
      loading.style.display = 'block';
      loading.innerHTML = 'Cargando equipos...';

      console.log('Fetching teams URL:', url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const teams = await response.json();

      console.log('Equipos recibidos:', teams);
      if (teams.length > 0) {
        console.log('Estructura del primer equipo:', JSON.stringify(teams[0], null, 2));
        console.log('Keys del primer equipo:', Object.keys(teams[0]));
      }
      loading.style.display = 'none';

      if (!teams || teams.length === 0) {
        teamList.innerHTML = '<p>No hay equipos disponibles para esta búsqueda.</p>';
        return;
      }

      const teamsHTML = teams.map(team => {
        // Debug: mostrar qué datos tiene cada equipo
        console.log('Procesando equipo:', team);
        
        return `
        <div class="team-card">
          <h3>${team.team?.name || team.name || 'Equipo sin nombre'}</h3>
          <div class="stats">
            <div class="stat">
              <div class="number">${team.team?.founded || team.founded || 'N/A'}</div>
              <div class="label">Año Fundación</div>
            </div>
            <div class="stat">
              <div class="number">${team.venue?.name || team.venue || 'N/A'}</div>
              <div class="label">Estadio</div>
            </div>
            <div class="stat">
              <div class="number">${team.team?.country || team.country || 'N/A'}</div>
              <div class="label">País</div>
            </div>
          </div>
          <button onclick="window.location.hash = '#/teams/${team.team?.id || team.id}'">Ver Estadísticas</button>
        </div>
      `}).join('');

      teamList.innerHTML = teamsHTML;

    } catch (error) {
      console.error('Error loading teams:', error);
      const loading = document.getElementById('loading');
      loading.innerHTML = `<span style="color: #ff6b6b;">❌ Error: ${error.message}</span>`;
    }

    // Configurar eventos del navbar después de cargar todo
    setupNavbarEvents(logoutCallback, showDashboard, showTeams, showPlayers, showMatches);
  }
}