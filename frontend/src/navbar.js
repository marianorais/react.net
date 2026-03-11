export function createNavbar() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return `
    <nav class="navbar">
      <div class="navbar-brand">
        <h2>⚽ Fútbol YAT</h2>
      </div>
      <ul class="navbar-links">
        <li><a href="#/home" id="nav-home">Inicio</a></li>
        <li><a href="#/matches" id="nav-matches">Partidos</a></li>
        <li><a href="#/teams" id="nav-teams">Equipos</a></li>
        <li><a href="#/players" id="nav-players">Jugadores</a></li>
        <li><a href="#/stats" id="nav-stats">Estadísticas</a></li>
        <li><a href="#/tournaments" id="nav-tournaments">Torneos</a></li>
        <li><a href="#/ranking" id="nav-ranking">Ranking</a></li>
        <li><a href="#/games" id="nav-games">Juegos</a></li>
      </ul>
      <ul class="navbar-right">
        <li><a href="#/profile" ${!isLoggedIn ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>Mi Perfil</a></li>
        <li><a href="#" id="nav-logout">Cerrar Sesión</a></li>
      </ul>
    </nav>
  `;
}

export function setupNavbarEvents(logoutCallback, showDashboard, showTeams, showPlayers, showMatches) {
  // Home - navegación normal
  const navHome = document.getElementById('nav-home');
  if (navHome) {
    navHome.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/home';
    });
  }

  // Matches
  const navMatches = document.getElementById('nav-matches');
  if (navMatches) {
    navMatches.addEventListener('click', (e) => {
      e.preventDefault();
      showMatches();
    });
  }

  // Teams
  const navTeams = document.getElementById('nav-teams');
  if (navTeams) {
    navTeams.addEventListener('click', (e) => {
      e.preventDefault();
      showTeams();
    });
  }

  // Players
  const navPlayers = document.getElementById('nav-players');
  if (navPlayers) {
    navPlayers.addEventListener('click', (e) => {
      e.preventDefault();
      showPlayers();
    });
  }

  // Stats - navegación normal
  const navStats = document.getElementById('nav-stats');
  if (navStats) {
    navStats.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/stats';
    });
  }

  // Tournaments - navegación normal
  const navTournaments = document.getElementById('nav-tournaments');
  if (navTournaments) {
    navTournaments.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/tournaments';
    });
  }

  // Ranking - navegación normal
  const navRanking = document.getElementById('nav-ranking');
  if (navRanking) {
    navRanking.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/ranking';
    });
  }

  // Games - navegación normal
  const navGames = document.getElementById('nav-games');
  if (navGames) {
    navGames.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/games';
    });
  }

  // Logout
  const navLogout = document.getElementById('nav-logout');
  if (navLogout) {
    navLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logoutCallback();
    });
  }
}