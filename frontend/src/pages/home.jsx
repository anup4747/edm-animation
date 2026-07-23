import WaveBackground from "../componants/waveBackground";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-shell">
      <div className="page-background">
        <WaveBackground />
      </div>
      <div className="page-overlay" />

      <div className="page-content">
        <nav className="nav-bar">
          <div className="logo">singularity</div>

          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tracks">Tracks</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="home-lobby">
          <div className="hero-copy home-panel">
            <p className="eyebrow">singularity • live laser system</p>
            <h1 className="page-title">singularity</h1>
            <p className="page-subtitle">Current song · Enemy · Third Party</p>
            <div className="cta-row">
              <Link className="btn btn-primary" to="/tracks">
                Enter show
              </Link>
              <button className="btn" type="button">
                Settings
              </button>
            </div>
          </div>

          <div className="glass-panel home-status">
            <div className="status-line">
              <span>System</span>
              <strong>Ready</strong>
            </div>
            <div className="status-line">
              <span>Signal</span>
              <strong>Stable</strong>
            </div>
            <div className="status-line">
              <span>Mode</span>
              <strong>Laser Red</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
