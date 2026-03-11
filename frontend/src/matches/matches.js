import '../style.css';
import { createNavbar } from '../navbar.js';

export function showMatches(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Partidos en Vivo</h2>
      <div id="loading">Cargando partidos en vivo...</div>
      <div class="match-list" id="match-list">
        <!-- Los partidos se cargarán aquí dinámicamente -->
      </div>
    </section>
  `;

  // Cargar partidos en vivo desde la API
  loadLiveMatches();

  // Event listener para el logout
  const navLogout = document.getElementById('nav-logout');
  if (navLogout) {
    navLogout.addEventListener('click', logoutCallback);
  }

  async function loadLiveMatches() {
    try {
      const loading = document.getElementById('loading');
      const matchList = document.getElementById('match-list');
      
      const url = 'http://localhost:8000/api/matches/live';
      loading.style.display = 'block';
      loading.innerHTML = 'Cargando partidos en vivo...';
      
      console.log('Fetching live matches:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const fixtures = await response.json();
      
      console.log('Partidos en vivo recibidos:', fixtures);
      loading.style.display = 'none';
      
      if (!fixtures || fixtures.length === 0) {
        matchList.innerHTML = '<p>No hay partidos en vivo en este momento.</p>';
        return;
      }

      // Mapeo de códigos de estado a textos legibles
      const statusMap = {
        'NS': 'No Comenzado',
        'TBD': 'Por Definir',
        '1H': 'Primer Tiempo',
        'HT': 'Descanso',
        '2H': 'Segundo Tiempo',
        'ET': 'Tiempo Extra',
        'P': 'Pendiente',
        'FT': 'Finalizado',
        'AET': 'Finalizado (Prórroga)',
        'PEN': 'Finalizado (Penales)',
        'CANC': 'Cancelado',
        'ABD': 'Abandonado',
        'AWD': 'Gana por Castigo',
        'WO': 'No Comparecencia'
      };
      
      matchList.innerHTML = fixtures.map(fixture => {
        const homeTeam = fixture.teams?.home?.name || 'Equipo Local';
        const awayTeam = fixture.teams?.away?.name || 'Equipo Visitante';
        const date = fixture.fixture?.date ? new Date(fixture.fixture.date).toLocaleString('es-ES') : 'Fecha no disponible';
        const venue = fixture.fixture?.venue?.name || 'Estadio no disponible';
        const statusCode = fixture.fixture?.status?.short || 'NS';
        const statusText = statusMap[statusCode] || statusCode;
        
        let scoreDisplay = '';
        const homeGoals = fixture.goals?.home;
        const awayGoals = fixture.goals?.away;
        
        
        if (homeGoals !== null && homeGoals !== undefined && awayGoals !== null && awayGoals !== undefined) {
          scoreDisplay = `
            <div class="match-score-container">
              <div class="team-score home-team">
                <div class="team-name">${homeTeam}</div>
                <div class="goals-big">${homeGoals}</div>
              </div>
              <div class="vs">vs</div>
              <div class="team-score away-team">
                <div class="goals-big">${awayGoals}</div>
                <div class="team-name">${awayTeam}</div>
              </div>
            </div>
          `;
        } else {
          scoreDisplay = `
            <div class="match-score-container">
              <div class="team-score home-team">
                <div class="team-name">${homeTeam}</div>
              </div>
              <div class="vs">vs</div>
              <div class="team-score away-team">
                <div class="team-name">${awayTeam}</div>
              </div>
            </div>
          `;
        }
        
        return `
          <div class="match-card">
            <div class="match-header">
              <div class="match-status ${statusCode.toLowerCase()}">${statusText}</div>
              <div class="match-date">${date}</div>
            </div>
            <div class="match-content">
              ${scoreDisplay}
            </div>
            <div class="match-footer">
              <span class="venue">📍 ${venue}</span>
            </div>
          </div>
        `;
      }).join('');
    } catch (error) {
      const loading = document.getElementById('loading');
      const matchList = document.getElementById('match-list');
      loading.style.display = 'none';
      
      console.error('Error al cargar partidos:', error);
      matchList.innerHTML = `<div class="error-message" style="color: red; padding: 20px; text-align: center;">
        Error al cargar los partidos: ${error.message}
      </div>`;
    }
  }
}