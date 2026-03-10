export function createNavbar() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return `
    <nav class="navbar">
      <div class="navbar-brand">
        <h2>⚽ Fútbol YAT</h2>
      </div>
      <ul class="navbar-links">
        <li><a href="#/home">Inicio</a></li>
        <li><a href="#/matches">Partidos</a></li>
        <li><a href="#/players">Jugadores</a></li>
        <li><a href="#/stats">Estadísticas</a></li>
        <li><a href="#/tournaments">Torneos</a></li>
        <li><a href="#/ranking">Ranking</a></li>
        <li><a href="#/games">Juegos</a></li>
      </ul>
      <ul class="navbar-right">
        <li><a href="#/profile" ${!isLoggedIn ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>Mi Perfil</a></li>
        <li><a href="#" id="nav-logout">Cerrar Sesión</a></li>
      </ul>
    </nav>
  `;
}

export function setupNavbarEvents(logoutCallback, showDashboard, showTeams, showPlayers, showMatches) {
  document.getElementById('nav-dashboard').addEventListener('click', (e) => {
    e.preventDefault();
    showDashboard();
  });
  document.getElementById('nav-teams').addEventListener('click', (e) => {
    e.preventDefault();
    showTeams();
  });
  document.getElementById('nav-players').addEventListener('click', (e) => {
    e.preventDefault();
    showPlayers();
  });
  document.getElementById('nav-matches').addEventListener('click', (e) => {
    e.preventDefault();
    showMatches();
  });
  document.getElementById('nav-logout').addEventListener('click', (e) => {
    e.preventDefault();
    logoutCallback();
  });
}