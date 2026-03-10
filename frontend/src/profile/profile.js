import '../style.css';
import { createNavbar } from '../navbar.js';

export function showProfile(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Mi Perfil</h2>
      <div class="profile-info">
        <h3>Usuario: fanfutbolero</h3>
        <p>Email: fan@futbol.com</p>
        <p>Equipo Favorito: FC Barcelona</p>
        <p>Partidos Vistos: 150</p>
        <button>Editar Perfil</button>
      </div>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}