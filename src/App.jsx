import { Canvas } from "@react-three/fiber";
import HomeScene from "./componants/homeScene";
import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";
// import "./index.css";
function App() {
  const [phase, setPhase] = useState("menu");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHoveringStart, setIsHoveringStart] = useState(false);
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);

  const songs = [
    {
      name: "Lucky",
      path: "/songs/MORTEN & David Guetta - Lucky (Extended Mix).mp3",
      doorOpenDelay: 2,
      artist: "David Guetta",
      thumbnail: "/thumbnails/lucky.jpg",
    },
    {
      name: "Rumble",
      path: "/songs/Rumble.mp3",
      doorOpenDelay: 2,
      artist: "Skrillex",
      thumbnail: "/thumbnails/rumble.jpg",
    },
    {
      name: "The Future Is Now",
      path: "/songs/David_Guetta___MORTEN_-_The_Future_Is_Now_[Visualizer](128k).mp3",
      doorOpenDelay: 2,
      artist: "David Guetta",
      thumbnail: "/thumbnails/futureisnow.jpg",
    },
    {
      name: "Night In Detroit",
      path: "/songs/MORTEN & David Guetta - Night In Detroit (feat. Fedde Le Grand) [Extended Mix].mp3",
      doorOpenDelay: 2,
      artist: "David Guetta",
      thumbnail: "/thumbnails/nightindetroit.jpg",
    },
    {
      name: "DA BASS",
      path: "/songs/R3HAB___Vion_Konger_-_DA_BASS__Extended_Mix_(128k).m4a",
      doorOpenDelay: 2,
      artist: "R3HAB",
      thumbnail: "/thumbnails/dabass.jpg",
    },
    // Add your EDM tracks here
  ];
  const [selectedSong, setSelectedSong] = useState(songs[0]);

  const startExperience = () => {
    setPhase("approaching"); // Hide menu, start moving toward door
  };

  // Preloaded sound (created when song is selected, NOT auto-played)
  const preloadRef = useRef(null);
  const currentSongRef = useRef(null);

  const nextSong = () => {
    const currentIndex = songs.findIndex((s) => s.name === selectedSong.name);
    const nextIndex = (currentIndex + 1) % songs.length;
    setSelectedSong(songs[nextIndex]);
  };

  const previousSong = () => {
    const currentIndex = songs.findIndex((s) => s.name === selectedSong.name);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setSelectedSong(songs[prevIndex]);
  };

  const triggerDrop = () => {
    if (phase !== "drop") {
      setPhase("drop");
    }
  };

  // Preload the selected song but do NOT autoplay it
  useEffect(() => {
    // Unload previous preloaded sound
    if (preloadRef.current) {
      try {
        preloadRef.current.unload();
      } catch (e) {
        console.warn("Error unloading previous Howl:", e);
      }
      preloadRef.current = null;
    }

    const howl = new Howl({
      src: [selectedSong.path],
      preload: true,
      autoplay: false,
      volume: 0.8,
      onload: () => {
        console.log("Preloaded:", selectedSong.name);
      },
      onloaderror: (_, err) => console.error("Preload error:", err),
    });

    preloadRef.current = howl;

    // Cleanup on unmount or when selectedSong changes
    return () => {
      if (preloadRef.current) {
        try {
          preloadRef.current.unload();
        } catch (e) {
          console.warn("Error unloading Howl on cleanup:", e);
        }
        preloadRef.current = null;
      }
    };
  }, [selectedSong.path]);

  // Play the preloaded song once the door is fully open
  const handleDoorOpen = useCallback(() => {
    const howl = preloadRef.current;
    if (!howl) return;

    // If not loaded yet, wait for load then play
    if (howl.state && howl.state() !== "loaded") {
      howl.once("load", () => {
        howl.play();
        currentSongRef.current = selectedSong.path;
        setIsPlaying(true);
      });
    } else {
      howl.play();
      currentSongRef.current = selectedSong.path;
      setIsPlaying(true);
    }

    howl.once("end", () => {
      setIsPlaying(false);
      currentSongRef.current = null;
    });
  }, [selectedSong.path]);

  return (
    <div
      style={{
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
        margin: 0,
        padding: 0,
        overflow: "hidden", // Prevent scrollbars
        position: "relative",
        background: "black",
      }}
    >
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <HomeScene
          phase={phase}
          onApproachComplete={triggerDrop} // Called after delay
          doorOpenDelay={selectedSong.doorOpenDelay}
          onDoorOpen={handleDoorOpen}
          selectedSong={selectedSong}
        />
      </Canvas>

      {/* Overlay UI - Shown only if not playing */}
      {phase === "menu" && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.95))",
            paddingBottom: "1.5rem",
            paddingTop: "3rem",
          }}
        >
          {/* Main Control Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              pointerEvents: "auto",
              background: "rgba(10, 10, 10, 0.85)",
              padding: "16px 32px",
              borderRadius: "12px",
              border: "1px solid rgba(0, 170, 255, 0.3)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.6)",
              marginBottom: "1rem",
            }}
          >
            {/* Headphones Icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingRight: "20px",
                borderRight: "1px solid rgba(252, 3, 3, 0.3)",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🎧</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#fc0303",
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Use Headphones
              </span>
            </div>

            {/* Track Selection with Hover Panel */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                position: "relative",
                padding: "8px 0",
              }}
              onMouseEnter={() => setIsHoveringTrack(true)}
              onMouseLeave={() => setIsHoveringTrack(false)}
            >
              {/* Invisible Bridge Area */}
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "0",
                  right: "0",
                  height: "20px",
                  pointerEvents: isHoveringTrack ? "auto" : "none",
                }}
              />

              {/* Thumbnail */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                  backgroundImage: `url(${selectedSong.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                  border: "2px solid #00aaff",
                  boxShadow: "0 0 15px rgba(0, 170, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  transition: "all 0.3s ease",
                  transform: isHoveringTrack ? "scale(1.1)" : "scale(1)",
                }}
              >
                {/* decorative icon fallback - hidden when image present */}
                <span style={{ opacity: 0 }}>🎵</span>
              </div>

              {/* Track Info */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#00ddff",
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    textShadow: "0 0 10px rgba(0, 221, 255, 0.4)",
                  }}
                >
                  {selectedSong.name}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#fc0303",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: "600",
                  }}
                >
                  {selectedSong.artist}
                </span>
              </div>

              {/* Hover Panel */}
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 4px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(10, 10, 10, 0.95)",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  border: "2px solid #00aaff",
                  backdropFilter: "blur(20px)",
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 170, 255, 0.3)",
                  display: isHoveringTrack ? "flex" : "none",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                  minWidth: "280px",
                  opacity: isHoveringTrack ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 1000,
                  pointerEvents: "auto",
                }}
              >
                {/* Now Selected Label */}
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#888",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: "600",
                  }}
                >
                  Now Selected
                </div>

                {/* Large Thumbnail */}
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "12px",
                    backgroundImage: `url(${selectedSong.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    border: "3px solid #00aaff",
                    boxShadow:
                      "0 0 30px rgba(0, 170, 255, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3.5rem",
                  }}
                >
                  {/* decorative icon fallback - hidden when image present */}
                  <span style={{ opacity: 0 }}>🎵</span>
                </div>

                {/* Controls and Info Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    width: "100%",
                  }}
                >
                  {/* Previous Button */}
                  <button
                    onClick={previousSong}
                    style={{
                      background:
                        "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                      border: "2px solid #00aaff",
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#00aaff",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      boxShadow: "0 0 15px rgba(0, 170, 255, 0.2)",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#00aaff";
                      e.target.style.color = "#000";
                      e.target.style.boxShadow =
                        "0 0 25px rgba(0, 170, 255, 0.6)";
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)";
                      e.target.style.color = "#00aaff";
                      e.target.style.boxShadow =
                        "0 0 15px rgba(0, 170, 255, 0.2)";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    ◀
                  </button>

                  {/* Track Info */}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#00ddff",
                        fontFamily: "'Exo 2', sans-serif",
                        fontWeight: "700",
                        marginBottom: "4px",
                        textShadow: "0 0 10px rgba(0, 221, 255, 0.4)",
                      }}
                    >
                      {selectedSong.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#fc0303",
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: "600",
                        letterSpacing: "1px",
                      }}
                    >
                      {selectedSong.artist}
                    </div>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextSong}
                    style={{
                      background:
                        "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                      border: "2px solid #00aaff",
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "#00aaff",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      boxShadow: "0 0 15px rgba(0, 170, 255, 0.2)",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#00aaff";
                      e.target.style.color = "#000";
                      e.target.style.boxShadow =
                        "0 0 25px rgba(0, 170, 255, 0.6)";
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)";
                      e.target.style.color = "#00aaff";
                      e.target.style.boxShadow =
                        "0 0 15px rgba(0, 170, 255, 0.2)";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>

            {/* START Button */}
            <button
              style={{
                pointerEvents: "auto",
                padding: "12px 36px",
                background: isHoveringStart
                  ? "linear-gradient(135deg, #fc0303 0%, #ff3333 100%)"
                  : "linear-gradient(135deg, #000000 0%, #1a0000 100%)",
                color: isHoveringStart ? "#000" : "#fc0303",
                border: "2px solid #fc0303",
                borderRadius: "30px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "900",
                fontFamily: "'Orbitron', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "3px",
                transition: "all 0.3s ease",
                transform: isHoveringStart ? "scale(1.05)" : "scale(1)",
                boxShadow: isHoveringStart
                  ? "0 0 30px rgba(252, 3, 3, 0.8), 0 0 60px rgba(252, 3, 3, 0.4)"
                  : "0 0 15px rgba(252, 3, 3, 0.4), 0 0 30px rgba(252, 3, 3, 0.2)",
                marginLeft: "12px",
              }}
              onMouseEnter={() => setIsHoveringStart(true)}
              onMouseLeave={() => setIsHoveringStart(false)}
              onClick={startExperience}
            >
              <span style={{ marginRight: "8px" }}>▶</span>
              START
            </button>
          </div>

          {/* Footer */}
          <p
            style={{
              fontSize: "0.7rem",
              color: "#444",
              letterSpacing: "2px",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: "500",
              textTransform: "uppercase",
              margin: "8px 0 0 0",
            }}
          >
            ═══ Enter The Portal ═══
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
