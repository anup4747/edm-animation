import { useEffect, useRef } from "react";
import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ShaderMaterial, DoubleSide } from "three";

export default function LuckyAnimation({
  active,
  baseZ = -40,
  count = 10,
  spacing = 2.0,
}) {
  const ringRefs = useRef([]);
  const startRef = useRef(null);

  // Track activation start
  useEffect(() => {
    if (active) {
      startRef.current = performance.now();
      console.log("LuckyAnimation activated");
    } else {
      startRef.current = null;
    }
  }, [active]);

  const firstShapePosition = -5;
  const firstShapeSpacing = 1.8;
  const firstShapeCount = 30;

  const secondShapePosition = -60;
  const secondShapeSpacing = 1.8;
  const secondShapeCount = 34;

  // No per-frame transformations — triangles remain static in place
  // Keep startRef just to know when the animation is active
  // (no useFrame-driven changes so the camera exclusively provides motion)

  // make triangle intensiry toggle or glow by using useFrame per beat of the song 128 bpm

  return (
    <group position={[0, 0, 4]}>
      {Array.from({ length: firstShapeCount }).map((_, i) => (
        <group
          key={i}
          ref={(el) => (ringRefs.current[i] = el)}
          position={[0, 0, firstShapePosition - i * firstShapeSpacing]} // slight downward offset so base aligns visually
          rotation={[0, 0, Math.PI / 2]} // rotate so the base (flat side) is down
          scale={[1, 1, 1]}
        >
          {/* Triangular plane (CircleGeometry with 3 segments) - static */}
          <mesh>
            <circleGeometry args={[2.2 - i * 0.08, 3]} />
            <meshBasicMaterial color="#000000" transparent={true} opacity={0} />
            <Edges scale={1} threshold={15} color="#00264d" linewidth={2} />
          </mesh>

          {/* Glow overlay (slightly larger) */}
          <mesh scale={[1.03, 1.03, 1.03]}>
            <circleGeometry args={[2.25 - i * 0.08, 3]} />
            <meshBasicMaterial color="#000000" transparent={true} opacity={0} />
            <Edges scale={1} threshold={15} color="#66a3ff" linewidth={8} />
          </mesh>
        </group>
      ))}

      <mesh
        position={[0, 0, -59]}
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

      {Array.from({ length: secondShapeCount }).map((_, i) => (
        <group
          key={i}
          ref={(el) => (ringRefs.current[i] = el)}
          position={[0, 0, secondShapePosition - i * secondShapeSpacing]} // slight downward offset so base aligns visually
          rotation={[0, 0, Math.PI / 2]} // rotate so the base (flat side) is down
          scale={[1, 1, 1]}
        >
          {/* Triangular plane (CircleGeometry with 3 segments) - static */}
          <mesh>
            <circleGeometry args={[2.2 - i * 0.08, 7]} />
            <meshBasicMaterial color="#000000" transparent={true} opacity={0} />
            <Edges scale={1} threshold={15} color="#00264d" linewidth={2} />
          </mesh>

          {/* Glow overlay (slightly larger) */}
          <mesh scale={[1.09, 1.09, 1.09]}>
            <circleGeometry args={[2.25 - i * 0.08, 7]} />
            <meshBasicMaterial color="#000000" transparent={true} opacity={0} />
            <Edges scale={1} threshold={15} color="#66a3ff" linewidth={8} />
          </mesh>
        </group>
      ))}

      <mesh
        position={[0, 0, -119.5]}
        scale={[250, 250, 1]}
        frustumCulled={false}
        renderOrder={-2}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#ff5500"
          depthWrite={true}
          depthTest={true}
          transparent={false}
          opacity={1}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
