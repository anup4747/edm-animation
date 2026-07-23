import WaveBackground from "../componants/waveBackground";
import { Link } from "react-router-dom";

const tracks = [
  {
    title: "plam of my hand",
    meta: "06 · Ambient Pulse",
    desc: "A slow, luminous build that glows across the horizon.",
    path: "/tracks",
  },
  {
    title: "Phase Line",
    meta: "09 · Digital Echo",
    desc: "High-energy motion with clipped rhythm and electric texture.",
    path: "/tracks",
  },
  {
    title: "Signal Bloom",
    meta: "12 · Halo Bass",
    desc: "Warm undercurrent shaped by a sharp, synthetic flare.",
    path: "/tracks",
  },
  {
    title: "Sleepless Night",
    meta: "01 · Martin Garrix x Armin van Buuren",
    desc: "Open the laser chamber with this live visual entry.",
    path: "/laser",
  },
];

export default function Tracks() {
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

        <div className="hero-copy">
          <p className="eyebrow">Tracks</p>
          <h1 className="page-title">Live collection</h1>
          <p className="page-subtitle">
            Each track is presented as a luminous chapter in a broader visual
            sequence.
          </p>
        </div>

        <div className="track-list">
          {tracks.map((track) => (
            <Link
              key={track.title}
              to={track.path}
              className="glass-panel track-card"
            >
              <div className="track-title">{track.title}</div>
              <div className="track-meta">{track.meta}</div>
              <p className="track-desc">{track.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
