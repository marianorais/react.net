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
};

function parseRoute(hash) {
  const path = hash.replace('#', '');
  const parts = path.split('/');
  if (parts.length === 3 && routes[`/${parts[1]}/:id`]) {
    return { route: `/${parts[1]}/:id`, param: parts[2] };
  }
  return { route: `/${parts[1]}` || '/login', param: null };
}

function navigate() {
  const hash = window.location.hash || '#/login';
  const { route, param } = parseRoute(hash);
  const view = routes[route];
  if (view) {
    if (param) {
      view(app, param, () => { window.location.hash = '#/login'; navigate(); });
    } else {
      view(app, () => { window.location.hash = '#/login'; navigate(); });
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