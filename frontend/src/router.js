import { showHome } from './home/home.js';
import { showMatches } from './matches/matches.js';
import { showMatchDetail } from './matches/matchDetail.js';
import { showPlayers } from './players/players.js';
import { showPlayerDetail } from './players/playerDetail.js';
import { showStats } from './stats/stats.js';
import { showTournaments } from './tournaments/tournaments.js';
import { showRanking } from './ranking/ranking.js';
import { showProfile } from './profile/profile.js';
import { showLogin } from './login/login.js';
import { showGames } from './games/games.js';
import { showTeams } from './teams/teams.js';
import { showTeamDetail } from './teams/teamDetail.js';

const app = document.querySelector('#app');

const routes = {
  '/home': showHome,
  '/matches': showMatches,
  '/matches/:id': showMatchDetail,
  '/players': showPlayers,
  '/players/:id': showPlayerDetail,
  '/stats': showStats,
  '/tournaments': showTournaments,
  '/ranking': showRanking,
  '/profile': showProfile,
  '/login': showLogin,
  '/games': showGames,
  '/teams': showTeams,
  '/teams/:id': showTeamDetail,
};

function parseRoute(hash) {
  const path = hash.replace('#', '');
  const parts = path.split('/');
  if (parts.length === 3 && routes[`/${parts[1]}/:id`]) {
    return { route: `/${parts[1]}/:id`, param: parts[2] };
  }
  return { route: `/${parts[1]}` || '/login', param: null };
}

async function navigate() {
  const hash = window.location.hash || '#/login';
  const { route, param } = parseRoute(hash);
  const view = routes[route];
  if (view) {
    const logoutCallback = () => { localStorage.removeItem('loggedIn'); window.location.hash = '#/login'; navigate(); };
    const showDashboard = () => {};
    const showPlayersFunc = () => {};
    const showMatchesFunc = () => {};
    if (param) {
      await view(app, param, logoutCallback);
    } else if (route === '/teams') {
      await view(app, logoutCallback, showDashboard, showPlayersFunc, showMatchesFunc);
    } else {
      await view(app, logoutCallback);
    }
  } else {
    showLogin(app, () => { window.location.hash = '#/login'; navigate(); });
  }
}

window.addEventListener('hashchange', navigate);

export function initRouter() {
  navigate();
}

initRouter();