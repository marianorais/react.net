import '../style.css';
import { createNavbar } from '../navbar.js';

export function showGames(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Juegos</h2>
      <p>Disfruta de juegos relacionados con el fútbol.</p>
      <ul class="games-list">
        <li><a href="https://www.footy-games.com.ar/solo-bot" target="_blank">Ta Te Ti</a></li>
        <li><a href="https://www.footy-games.com.ar/penalty-shootout" target="_blank">Penalty Shootout</a></li>
        <li><a href="https://www.footy-games.com.ar/football-legends" target="_blank">Football Legends</a></li>
        <li><a href="https://www.footy-games.com.ar/soccer-skills" target="_blank">Soccer Skills</a></li>
      </ul>
    </section>
  `;

  // Setup logout
  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}