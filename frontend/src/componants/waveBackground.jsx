import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const noise = createNoise3D();

function Wave() {
  const width = 450;
  const depth = 450;
  const spacing = 0.19;

  //   learn useMemo
  const geometry = useMemo(() => {
    const positions = [];

    for (let x = -width / 4; x < width / 4; x++) {
      for (let z = -depth / 4; z < depth / 4; z++) {
        positions.push(x * spacing, 0, z * spacing);
      }
    }

    // whats bufferGeometry
    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    return geo;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    const positions = geometry.attributes.position.array;

    let ptr = 0;

    for (let x = -width / 2; x < width / 2; x++) {
      for (let z = -depth / 2; z < depth / 2; z++) {
        positions[ptr + 1] = noise(x * 0.08, z * 0.08, time * 0.35) * 1.5;

        ptr += 3;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geometry} rotation={[-Math.PI / 22.8, 0, 0]}>
      <pointsMaterial color="red" size={0.05} sizeAttenuation />
    </points>
  );
}

export default function WaveBackground() {
  return (
    <Canvas
      camera={{
        position: [0, 4, 6],
        fov: 45,
      }}
    >
      <color attach="background" args={["black"]} />

      <fog attach="fog" args={["black", 12, 15]} />

      <Wave />
    </Canvas>
  );
}
