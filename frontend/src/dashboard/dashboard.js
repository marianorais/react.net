export function showDashboard(app, logoutCallback) {
  app.innerHTML = `
    <header>
      <h1>⚽ Fútbol Dashboard</h1>
      <p>Partidos en vivo y estadísticas de equipos y jugadores</p>
      <button id="logout-btn" class="logout-btn">Cerrar Sesión</button>
    </header>

    <section class="section">
      <h2>Partidos en Vivo</h2>
      <div class="match-card">
        <h3>Barcelona vs Real Madrid</h3>
        <p>Estadio: Camp Nou | Fecha: Hoy 20:00</p>
        <div class="stats">
          <div class="stat">
            <div class="number">2</div>
            <div class="label">Goles Barcelona</div>
          </div>
          <div class="stat">
            <div class="number">1</div>
            <div class="label">Goles Real Madrid</div>
          </div>
        </div>
        <button>Ver Detalles</button>
      </div>
      <div class="match-card">
        <h3>Atlético Madrid vs Sevilla</h3>
        <p>Estadio: Wanda Metropolitano | Fecha: Mañana 18:30</p>
        <div class="stats">
          <div class="stat">
            <div class="number">-</div>
            <div class="label">Próximo</div>
          </div>
        </div>
        <button>Ver Detalles</button>
      </div>
    </section>

    <section class="section">
      <h2>Equipos Destacados</h2>
      <div class="team-card">
        <h3>FC Barcelona</h3>
        <div class="stats">
          <div class="stat">
            <div class="number">85</div>
            <div class="label">Puntos</div>
          </div>
          <div class="stat">
            <div class="number">28</div>
            <div class="label">Victorias</div>
          </div>
          <div class="stat">
            <div class="number">5</div>
            <div class="label">Derrotas</div>
          </div>
        </div>
        <button>Ver Estadísticas</button>
      </div>
      <div class="team-card">
        <h3>Real Madrid</h3>
        <div class="stats">
          <div class="stat">
            <div class="number">82</div>
            <div class="label">Puntos</div>
          </div>
          <div class="stat">
            <div class="number">26</div>
            <div class="label">Victorias</div>
          </div>
          <div class="stat">
            <div class="number">6</div>
            <div class="label">Derrotas</div>
          </div>
        </div>
        <button>Ver Estadísticas</button>
      </div>
    </section>

    <section class="section">
      <h2>Jugadores Estrella</h2>
      <div class="player-card">
        <h3>Lionel Messi</h3>
        <div class="stats">
          <div class="stat">
            <div class="number">25</div>
            <div class="label">Goles</div>
          </div>
          <div class="stat">
            <div class="number">15</div>
            <div class="label">Asistencias</div>
          </div>
          <div class="stat">
            <div class="number">8.5</div>
            <div class="label">Rating</div>
          </div>
        </div>
        <button>Ver Perfil</button>
      </div>
      <div class="player-card">
        <h3>Cristiano Ronaldo</h3>
        <div class="stats">
          <div class="stat">
            <div class="number">22</div>
            <div class="label">Goles</div>
          </div>
          <div class="stat">
            <div class="number">10</div>
            <div class="label">Asistencias</div>
          </div>
          <div class="stat">
            <div class="number">8.7</div>
            <div class="label">Rating</div>
          </div>
        </div>
        <button>Ver Perfil</button>
      </div>
    </section>
  `;

  const logoutBtn = document.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutCallback);
  }
}