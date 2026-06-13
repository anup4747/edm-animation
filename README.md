# SYNAPSE

> An immersive audio-reactive WebGL experience where music generates and controls a living neural universe.

SYNAPSE is a procedural music visualization built with **Three.js**, **WebGL**, and the **Web Audio API**. Inspired by interactive audio-visual experiences, it transforms sound into a constantly evolving network of glowing nodes, particles, and energy streams.

Every visit generates a unique universe, creating a different visual experience each time.

---

## Features

### Audio-Reactive Visuals

* Real-time audio frequency analysis
* Bass-driven energy pulses
* Mid-frequency neural growth
* High-frequency particle bursts
* Dynamic color transitions

### Procedural Generation

* Randomized neural network structures
* Unique scene layouts
* Procedural camera paths
* Dynamic color palettes
* Different experience on every refresh

### Visual Effects

* Bloom effects
* Particle systems
* Energy waves
* Shader-based animations
* Cinematic camera movement

### Performance Optimized

* GPU-powered rendering
* Instanced meshes
* Efficient particle systems
* Adaptive scene generation

---

## Tech Stack

### Core

* Three.js
* JavaScript (ES6+)
* WebGL
* Web Audio API

### Animation

* GSAP

### Post Processing

* postprocessing

### Graphics

* GLSL Shaders
* Procedural Geometry

---

## Project Structure

```text
src/
├── audio/
│   ├── AudioManager.js
│   └── FrequencyAnalyzer.js
│
├── scene/
│   ├── Camera.js
│   ├── Lighting.js
│   └── World.js
│
├── generators/
│   ├── NeuralNetworkGenerator.js
│   ├── ParticleGenerator.js
│   └── SeedManager.js
│
├── shaders/
│   ├── neuralVertex.glsl
│   ├── neuralFragment.glsl
│   ├── particleVertex.glsl
│   └── particleFragment.glsl
│
├── effects/
│   ├── Bloom.js
│   ├── Noise.js
│   ├── Vignette.js
│   └── Composer.js
│
├── utils/
│   ├── Random.js
│   └── MathHelpers.js
│
├── main.js
└── style.css
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/synapse.git
```

Move into the project directory:

```bash
cd synapse
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## How It Works

### 1. Audio Analysis

The Web Audio API analyzes incoming audio and extracts frequency data in real time.

```javascript
const analyser = new THREE.AudioAnalyser(sound, 128);
const frequencies = analyser.getFrequencyData();
```

### 2. Frequency Mapping

| Frequency Range | Visual Effect   |
| --------------- | --------------- |
| Bass            | Energy pulses   |
| Mid             | Network growth  |
| High            | Particle bursts |

### 3. Procedural Generation

On startup, the application generates:

* Neural nodes
* Connection paths
* Camera routes
* Particle distributions
* Color schemes

This ensures every session is unique.

---

## Controls

| Key   | Action             |
| ----- | ------------------ |
| Space | Play / Pause Music |
| M     | Mute Audio         |
| F     | Toggle Fullscreen  |
| R     | Regenerate Scene   |

---

## Visual Theme

### Concept

A living digital brain floating through an endless universe.

### Style

* Futuristic
* Abstract
* Neon
* Organic
* Audio-reactive

### Primary Colors

* Electric Blue
* Neon Purple
* Cyan
* Magenta
* White

---

## Future Features

* WebXR / VR Support
* User Music Upload
* AI Generated Themes
* Multiplayer Experiences
* Beat Detection System
* Dynamic Environment Transitions
* Mobile Optimization
* MIDI Controller Support

---

## Inspiration

Inspired by:

* Audio-reactive visualizers
* Generative art
* Neural networks
* Interactive music experiences
* Three.js creative projects

---

## Performance Targets

| Device  | Target FPS |
| ------- | ---------- |
| Desktop | 60 FPS     |
| Laptop  | 45+ FPS    |
| Mobile  | 30+ FPS    |

---

## License

MIT License

Feel free to use, modify, and distribute this project for personal or commercial purposes.

---

## Author

Built by **Your Name**

Music and visual design created for the SYNAPSE experience.