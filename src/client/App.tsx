import "./styles.css";
import { scaffoldStatus } from "../shared/scaffold";

export function App() {
  return (
    <main className="app-shell">
      <section className="status-panel" aria-labelledby="app-title">
        <p className="eyebrow">Living Video Panel</p>
        <h1 id="app-title">Strange Dreamz</h1>
        <p>{scaffoldStatus}</p>
      </section>
    </main>
  );
}
