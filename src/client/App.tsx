import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import {
  deterministicRoomSnapshot,
  type PaneSnapshot,
  type RoomMode,
  type RoomSnapshot,
  type ThemeSnapshot,
} from "../shared/roomSnapshot";

type InteractiveRoomSnapshot = RoomSnapshot & {
  handle?: string;
};

const modeFromPath = (pathname: string): RoomMode =>
  pathname === "/display" ? "display" : "interactive";

const createSessionId = () =>
  window.crypto?.randomUUID?.() ?? `session-${Date.now()}-${Math.random()}`;

const getSessionId = () => {
  const existing = window.localStorage.getItem("strangedreamz.sessionId");

  if (existing) {
    return existing;
  }

  const sessionId = createSessionId();
  window.localStorage.setItem("strangedreamz.sessionId", sessionId);

  return sessionId;
};

const requestRoom = async <TBody,>(
  path: string,
  body?: TBody,
): Promise<InteractiveRoomSnapshot> => {
  const response = await fetch(path, {
    body: body ? JSON.stringify(body) : undefined,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    method: body ? "POST" : "GET",
  });

  if (!response.ok) {
    const error = (await response.json()) as { error?: string };
    throw new Error(error.error ?? "Room action failed.");
  }

  return (await response.json()) as InteractiveRoomSnapshot;
};

function Pane({
  hasHandle,
  isDisplayMode,
  onVote,
  pane,
}: {
  hasHandle: boolean;
  isDisplayMode: boolean;
  onVote: (paneId: string) => void;
  pane: PaneSnapshot;
}) {
  const canVote = hasHandle && pane.canVote;

  return (
    <article
      aria-label={`Panel ${pane.position}: ${pane.name}`}
      className={`dream-pane dream-pane--${pane.palette}${
        !isDisplayMode ? " dream-pane--interactive" : ""
      }`}
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
      {!isDisplayMode ? (
        <button
          className="pane-vote"
          disabled={!canVote}
          onClick={() => {
            onVote(pane.id);
          }}
          type="button"
        >
          Vote for {pane.name}
        </button>
      ) : null}
    </article>
  );
}

function ThemeRow({
  isDisplayMode,
  onBoost,
  theme,
}: {
  isDisplayMode: boolean;
  onBoost: (themeId: string) => void;
  theme: ThemeSnapshot;
}) {
  return (
    <li>
      <span>
        <strong>{theme.text}</strong>
        <small>
          submitted by {theme.submittedBy} / {theme.boosts}{" "}
          {theme.boosts === 1 ? "boost" : "boosts"}
        </small>
      </span>
      {!isDisplayMode ? (
        <button
          disabled={!theme.canBoost}
          onClick={() => {
            onBoost(theme.id);
          }}
          type="button"
        >
          Boost {theme.text}
        </button>
      ) : null}
    </li>
  );
}

export function App() {
  const mode = modeFromPath(window.location.pathname);
  const isDisplayMode = mode === "display";
  const [sessionId] = useState(() => (isDisplayMode ? "" : getSessionId()));
  const [room, setRoom] = useState<InteractiveRoomSnapshot>(deterministicRoomSnapshot);
  const [handleDraft, setHandleDraft] = useState("");
  const [themeDraft, setThemeDraft] = useState("");
  const [message, setMessage] = useState("");
  const topBoostableTheme = useMemo(
    () => room.themes.find((theme) => theme.canBoost),
    [room.themes],
  );

  useEffect(() => {
    if (isDisplayMode) {
      setRoom(deterministicRoomSnapshot);
      return;
    }

    void requestRoom(`/api/room?sessionId=${encodeURIComponent(sessionId)}`)
      .then(setRoom)
      .catch((error: unknown) => {
        setMessage(error instanceof Error ? error.message : "Room snapshot failed.");
      });
  }, [isDisplayMode, sessionId]);

  const claimHandle = async () => {
    const nextRoom = await requestRoom("/api/handles", {
      handle: handleDraft,
      sessionId,
    });

    setRoom(nextRoom);
    setMessage("");
  };

  const submitTheme = async () => {
    const submittedTheme = themeDraft;
    const nextRoom = await requestRoom("/api/themes", {
      sessionId,
      theme: submittedTheme,
    });

    setThemeDraft("");
    setRoom(nextRoom);
    setMessage(`${submittedTheme.trim()} entered the queue`);
  };

  const boostTheme = async (themeId: string) => {
    const nextRoom = await requestRoom(`/api/themes/${themeId}/boosts`, {
      sessionId,
    });

    setRoom(nextRoom);
    setMessage("Boost landed");
  };

  const votePane = async (paneId: string) => {
    const nextRoom = await requestRoom(`/api/panes/${paneId}/votes`, {
      sessionId,
    });

    setRoom(nextRoom);
    setMessage("Pane influence shifted");
  };

  const runAction = (action: () => Promise<void>) => {
    void action().catch((error: unknown) => {
      setMessage(error instanceof Error ? error.message : "Room action failed.");
    });
  };

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
            <Pane
              hasHandle={Boolean(room.handle)}
              isDisplayMode={isDisplayMode}
              key={pane.id}
              onVote={(paneId) => {
                runAction(() => votePane(paneId));
              }}
              pane={pane}
            />
          ))}
        </section>

        <aside className="social-panel" aria-label="Room activity">
          {!isDisplayMode ? (
            <>
              <section aria-labelledby="handle-title">
                <p className="panel-label">Handle</p>
                <h2 id="handle-title">Claim your signal</h2>
                {room.handle ? (
                  <p className="status-line">{room.handle} is steering this room</p>
                ) : (
                  <form
                    className="room-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      runAction(claimHandle);
                    }}
                  >
                    <label htmlFor="handle-input">Choose handle</label>
                    <input
                      id="handle-input"
                      onChange={(event) => {
                        setHandleDraft(event.target.value);
                      }}
                      value={handleDraft}
                    />
                    <button type="submit">Enter room</button>
                  </form>
                )}
              </section>

              <form
                className="room-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  runAction(submitTheme);
                }}
              >
                <label htmlFor="theme-input">Theme submission</label>
                <textarea
                  disabled={!room.handle}
                  id="theme-input"
                  onChange={(event) => {
                    setThemeDraft(event.target.value);
                  }}
                  value={themeDraft}
                />
                <div className="action-row" aria-label="Room actions">
                  <button disabled={!room.handle} type="submit">
                    Submit theme
                  </button>
                  <button
                    disabled={!topBoostableTheme}
                    onClick={() => {
                      if (topBoostableTheme) {
                        runAction(() => boostTheme(topBoostableTheme.id));
                      }
                    }}
                    type="button"
                  >
                    Boost top theme
                  </button>
                </div>
              </form>

              {message ? <p className="status-line">{message}</p> : null}
            </>
          ) : null}

          <section aria-labelledby="queue-title">
            <p className="panel-label">Queue</p>
            <h2 id="queue-title">Themes gathering heat</h2>
            <ol className="theme-list">
              {room.themes.map((theme) => (
                <ThemeRow
                  isDisplayMode={isDisplayMode}
                  key={theme.id}
                  onBoost={(themeId) => {
                    runAction(() => boostTheme(themeId));
                  }}
                  theme={theme}
                />
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
