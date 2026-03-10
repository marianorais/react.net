import '../style.css';
import { createNavbar } from '../navbar.js';

export function showRanking(app, logoutCallback) {
  app.innerHTML = `
    ${createNavbar()}
    <section class="section">
      <h2>Tabla de Posiciones - La Liga</h2>
      <table class="ranking-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Equipo</th>
            <th>Puntos</th>
            <th>Victorias</th>
            <th>Derrotas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>FC Barcelona</td>
            <td>85</td>
            <td>28</td>
            <td>5</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Real Madrid</td>
            <td>82</td>
            <td>26</td>
            <td>6</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Atlético Madrid</td>
            <td>78</td>
            <td>24</td>
            <td>8</td>
          </tr>
        </tbody>
      </table>
    </section>
  `;

  document.getElementById('nav-logout').addEventListener('click', logoutCallback);
}