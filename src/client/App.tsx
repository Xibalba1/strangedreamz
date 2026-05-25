import "./styles.css";
import {
  deterministicRoomSnapshot,
  type PaneSnapshot,
  type RoomMode,
  type ThemeSnapshot,
} from "../shared/roomSnapshot";

const modeFromPath = (pathname: string): RoomMode =>
  pathname === "/display" ? "display" : "interactive";

function Pane({ pane }: { pane: PaneSnapshot }) {
  return (
    <article
      aria-label={`Panel ${pane.position}: ${pane.name}`}
      className={`dream-pane dream-pane--${pane.palette}`}
    >
      <div className="pane-visual" aria-hidden="true">
        <span className="pane-pulse" />
      </div>
      <div className="pane-copy">
        <p className="pane-kicker">Panel {pane.position}</p>
        <h2>{pane.name}</h2>
        <p>{pane.traits.join(" / ")}</p>
      </div>
      <div className="pane-meta">
        <span>{pane.age}</span>
        <span>{pane.influence}% influence</span>
      </div>
    </article>
  );
}

function ThemeRow({ theme }: { theme: ThemeSnapshot }) {
  return (
    <li>
      <span>{theme.text}</span>
      <strong>{theme.boosts}</strong>
    </li>
  );
}

export function App() {
  const room = deterministicRoomSnapshot;
  const mode = modeFromPath(window.location.pathname);
  const isDisplayMode = mode === "display";

  return (
    <main className={`app-shell app-shell--${mode}`}>
      <section className="room-header" aria-labelledby="app-title">
        <div>
          <p className="eyebrow">
            {isDisplayMode ? "Display mode" : "Interactive room"}
          </p>
          <h1 id="app-title">{room.brand}</h1>
        </div>
        <dl className="cycle-strip" aria-label="Cycle status">
          <div>
            <dt>Phase</dt>
            <dd>{room.phase}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{room.countdown}</dd>
          </div>
          <div>
            <dt>Boosts</dt>
            <dd>{room.boostsRemaining}</dd>
          </div>
        </dl>
      </section>

      <section className="wall-layout">
        <section className="video-wall" aria-label="Living video wall">
          {room.panes.map((pane) => (
            <Pane key={pane.id} pane={pane} />
          ))}
        </section>

        <aside className="social-panel" aria-label="Room activity">
          {!isDisplayMode ? (
            <div className="action-row" aria-label="Room actions">
              <button type="button">Submit theme</button>
              <button type="button">Boost top theme</button>
            </div>
          ) : null}

          <section aria-labelledby="queue-title">
            <p className="panel-label">Queue</p>
            <h2 id="queue-title">Themes gathering heat</h2>
            <ol className="theme-list">
              {room.themes.map((theme) => (
                <ThemeRow key={theme.id} theme={theme} />
              ))}
            </ol>
          </section>

          <section aria-labelledby="murmurs-title">
            <p className="panel-label">Murmurs</p>
            <h2 id="murmurs-title">Room whispers</h2>
            <ul className="murmur-list">
              {room.murmurs.map((murmur) => (
                <li key={murmur}>{murmur}</li>
              ))}
            </ul>
          </section>
        </aside>
      </section>
    </main>
  );
}
