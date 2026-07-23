import { useState } from "react";
import "./App.css";
import LoadingScreen from "./pages/introLoading";
import IntroTitle from "./pages/introTitle";
import Home from "./pages/home";
import Tracks from "./pages/tracks";
import LaserScene from "./pages/laserScene";
import Contact from "./pages/contact";
import About from "./pages/about";
import { Routes, Route } from "react-router-dom";

function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "loading") {
    return <LoadingScreen onComplete={() => setScreen("intro")} />;
  }

  if (screen === "intro") {
    return <IntroTitle onComplete={() => setScreen("home")} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/laser" element={<LaserScene />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
