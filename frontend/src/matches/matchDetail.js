import '../style.css';
import { createNavbar } from '../navbar.js';

export function showMatchDetail(app, matchId, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Detalle del Partido ${matchId}</h2>
      <div class="match-detail">
        <h3>Barcelona vs Real Madrid</h3>
        <p>Estadio: Camp Nou | Fecha: Hoy 20:00</p>
        <div class="score">
          <div class="team">
            <h4>Barcelona</h4>
            <div class="number">2</div>
          </div>
          <span>vs</span>
          <div class="team">
            <h4>Real Madrid</h4>
            <div class="number">1</div>
          </div>
        </div>
        <div class="events">
          <h4>Eventos</h4>
          <ul>
            <li>10' Gol de Messi (Barcelona)</li>
            <li>25' Gol de Benzema (Real Madrid)</li>
            <li>45' Gol de Pedri (Barcelona)</li>
          </ul>
        </div>
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}