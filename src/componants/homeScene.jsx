import { use, useEffect, useRef, useState } from "react";
import { Line, PerspectiveCamera, Text } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, DoubleSide } from "three";
import Door from "./door";
export default function HomeScene({
  phase,
  onApproachComplete,
  doorOpenDelay,
  onDoorOpen,
}) {
  const cameraRef = useRef();
  const timerRef = useRef(0);
  const box = useRef();
  const doorOpenedRef = useRef(false);
  const font = "https://cdn.jsdelivr.net/fontsource/fonts/orbitron@latest/latin-700-normal.woff";

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
    // if (isPlaying && cameraRef.current) {
    //   cameraRef.current.position.z -= delta * 2; // Move forward; adjust speed
    // }
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
        position={[0, 0, 0.13]}
        fontSize={1.5}
        color="red"
        anchorX="center"
        anchorY="middle"
        font={font}
      >
        D
      </Text>

      <Text
        position={[-1.3, 0, 0.13]}
        fontSize={1.5}
        color="red"
        anchorX="center"
        anchorY="middle"
        font={font}
      >
        E
      </Text>

      <Text
        position={[1.4, 0, 0.13]}
        fontSize={1.5}
        color="red"
        anchorX="center"
        anchorY="middle"
        font={font}
      >
        M
      </Text>

      <Door position={[0, 0, -0.5]} isOpen={phase === "drop"} />

     
      <mesh ref={box} position={[0, 0, -20]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"#ff0000"}/>
      </mesh>

      {/* Background Plane with Center Hole */}
      <mesh position={[0, 0, -100]} scale={[250, 250, 1]} frustumCulled={false}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#000000" 
          depthWrite={true}
        />  
      </mesh>
      <mesh position={[0, 0, 0]} scale={[200, 200, 1]} renderOrder={-1} frustumCulled={false}>
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
              float width = 0.4 / 2.0;
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

      {/* Post-processing for Neon Glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={15}
        />
      </EffectComposer>

      {/* If playing, add future elements like doors here */}
    </>
  );
}
