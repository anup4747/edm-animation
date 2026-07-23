import WaveBackground from "../componants/waveBackground";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page-shell">
      <div className="page-background">
        <WaveBackground />
      </div>
      <div className="page-overlay" />

      <div className="page-content">
        <nav className="nav-bar">
          <div className="logo">Singularity</div>
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

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">About</p>
            <h1 className="page-title">A digital audio universe</h1>
            <p className="page-subtitle">
              This experience blends immersive visuals, coded motion, and
              ambient energy into a single luminous atmosphere.
            </p>
          </div>

          <div className="glass-panel feature-list">
            <div className="feature-card">
              <h3>Atmosphere</h3>
              <p>
                Soft gradients, luminous light trails, and a cinematic pulse.
              </p>
            </div>
            <div className="feature-card">
              <h3>Motion</h3>
              <p>
                Animated waveforms and synced transitions inspired by loading
                states.
              </p>
            </div>
            <div className="feature-card">
              <h3>Sound</h3>
              <p>Every track is framed as a visual event, not just a file.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
