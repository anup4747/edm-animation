import { use, useEffect, useRef, useState } from "react";
import { Line, PerspectiveCamera, Text } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, DoubleSide } from "three";
import Door from "./door";
import LuckyAnimation from "./LuckyAnimation";
export default function HomeScene({
  phase,
  onApproachComplete,
  doorOpenDelay,
  onDoorOpen,
  selectedSong,
  isPlaying,
}) {
  const cameraRef = useRef();
  const timerRef = useRef(0);
  const box = useRef();
  const doorOpenedRef = useRef(false);
  const playStartRef = useRef(null);
  const prevIsPlayingRef = useRef(false);
  const [showSecondWall, setShowSecondWall] = useState(false);
  const font =
    "https://cdn.jsdelivr.net/fontsource/fonts/orbitron@latest/latin-700-normal.woff";

  // Door geometry constants (must match values in Door)
  const DOOR_HALF_WIDTH = 0.45; // each door half width
  const DOOR_FULL_WIDTH = DOOR_HALF_WIDTH * 2.0; // full door width
  const DOOR_HEIGHT = 1.0; // door full height

  // Notify parent immediately when the door starts opening (phase === 'drop')
  useEffect(() => {
    if (phase === "drop" && !doorOpenedRef.current) {
      doorOpenedRef.current = true;
      if (onDoorOpen) onDoorOpen();
    } else if (phase !== "drop") {
      doorOpenedRef.current = false;
    }
  }, [phase, onDoorOpen]);

  // Camera movement in useFrame
  useFrame((state, delta) => {
    if (phase === "approaching" && cameraRef.current) {
      cameraRef.current.position.z -= delta * 3; // Smooth forward movement
      timerRef.current += delta;

      // Trigger drop after delay
      if (timerRef.current >= doorOpenDelay - 0.5) {
        // 1 sec early for anticipation
        onApproachComplete();
      }
    }

    if (phase === "drop" && cameraRef.current) {
      cameraRef.current.position.z -= delta * 4; // Speed up after drop!
    }

    // Keep track of play start time to measure intro duration
    if (isPlaying && !prevIsPlayingRef.current) {
      prevIsPlayingRef.current = true;
      playStartRef.current = performance.now();
      // When playback starts, reset second wall visibility until intro end
      setShowSecondWall(false);
    }
    if (!isPlaying && prevIsPlayingRef.current) {
      prevIsPlayingRef.current = false;
      playStartRef.current = null;
      setShowSecondWall(false);
    }

    // When Lucky is playing, determine if intro (first 4 bars) has finished
    if (
      isPlaying &&
      selectedSong &&
      selectedSong.name === "Lucky" &&
      playStartRef.current
    ) {
      const elapsed = (performance.now() - playStartRef.current) / 1000; // seconds
      const bars = 4; // first 4 bars
      const beatsPerBar = 4;
      const introDuration =
        (bars * beatsPerBar * 60) / (selectedSong.bpm || 120); // seconds

      if (elapsed >= introDuration) {
        if (!showSecondWall) setShowSecondWall(true);
      }
    }
  });

  return (
    <>
      {/* set size of renderer to full width and full height like fit */}

      {/* Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        fov={60}
      />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#00aaff" />

      {/* Neon Blue Lines - Track Perspective */}
      {/* Top horizontal line */}

      <Line
        points={[
          [-5, 2, 0],
          [5, 2, 0],
        ]}
        color="#fc0303"
        lineWidth={10}
        dashed={false}
      />
      {/* Left diagonal */}
      <Line
        points={[
          [-5, 2, 0],
          [0, -3, 0],
        ]}
        color="#fc0303"
        lineWidth={10}
        dashed={false}
      />
      {/* Right diagonal */}
      <Line
        points={[
          [5, 2, 0],
          [0, -3, 0],
        ]}
        color="#fc0303"
        lineWidth={10}
        dashed={false}
      />

      {/* "TRACK" Text */}
      <Text
        position={[0, 0, 0.1]}
        fontSize={1.5}
        color="red"
        anchorX="center"
        anchorY="middle"
        font={font}
      >
        D
      </Text>

      <Text
        position={[-1.3, 0, 0.1]}
        fontSize={1.5}
        color="red"
        anchorX="center"
        anchorY="middle"
        font={font}
      >
        E
      </Text>

      <Text
        position={[1.4, 0, 0.1]}
        fontSize={1.5}
        color="red"
        anchorX="center"
        anchorY="middle"
        font={font}
      >
        M
      </Text>

      <Door position={[0, 0, 0]} isOpen={phase === "drop"} />

      {/* <mesh ref={box} position={[0, 0, -20]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"#ff0000"} />
      </mesh> */}

      {/* Background Plane (fully opaque black, always behind) */}
      <mesh
        position={[0, 0, -0.01]}
        scale={[250, 250, 1]}
        frustumCulled={false}
        renderOrder={-2}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#000000"
          depthWrite={true}
          depthTest={true}
          transparent={false}
          opacity={1}
          side={DoubleSide}
        />
      </mesh>
      <mesh
        position={[0, 0, -0.01]}
        scale={[200, 200, 1]}
        renderOrder={-1}
        frustumCulled={false}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          side={DoubleSide}
          transparent={false}
          depthWrite={true}
          uniforms={{
            time: { value: 0 },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              vec2 centered = vUv - 0.5;
              // widened hole to match door width
              float width = 0.9 / 2.0;
              float height = 1.0 / 1.2;
              
              // Check if pixel is within the hole (door opening)
              if (abs(centered.x) < width && abs(centered.y) < height) {
                discard;
              }
              
              // draw opaque black background
              gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            }
          `}
        />
      </mesh>

      {/* Lucky intro animation (stationary, visible only through the hole & behind the door) */}
      {selectedSong &&
        selectedSong.name === "Lucky" &&
        (() => {
          // place the wormhole slightly behind the door at z = -6 so it is only visible through the hole
          const baseZ = -6;
          // introActive: isPlaying and less than 4 bars
          const introDuration = (4 * 4 * 60) / (selectedSong.bpm || 120);
          const elapsed = (performance.now() - playStartRef.current) / 1000;
          const introActive = elapsed < introDuration;
          return introActive ? (
            <LuckyAnimation
              active={true}
              baseZ={baseZ}
              count={20}
              spacing={1.8}
            />
          ) : null;
        })()}

      {/* Post-processing for Neon Glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={20}
        />
      </EffectComposer>

      {/* If playing, add future elements like doors here */}
    </>
  );
}
