import WaveBackground from "../componants/waveBackground";
import { Link } from "react-router-dom";

export default function Contact() {
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

        <div className="contact-grid">
          <div className="hero-copy">
            <p className="eyebrow">Contact</p>
            <h1 className="page-title">Send a signal</h1>
            <p className="page-subtitle">
              Connect with the studio to discuss new soundscapes,
              collaborations, or live visuals.
            </p>
          </div>

          <div className="glass-panel contact-card">
            <input className="input" placeholder="Name" />
            <input className="input" placeholder="Email" />
            <textarea placeholder="Your message" />
            <a className="btn btn-primary" href="#">
              Transmit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
