import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei'; // Best and easiest way!

export default function Door({ position = [0, 0, 0], isOpen }) {
  const leftRef = useRef();
  const rightRef = useRef();
 
  useFrame((state, delta) => {
    if (isOpen && leftRef.current && rightRef.current) {
      leftRef.current.position.x -= delta * 2;  // Slightly faster for impact
      rightRef.current.position.x += delta * 2;
    }
  });

  return (
    <group position={position}>
      {/* Left Door */}
      <mesh ref={leftRef} position={[-0.225, 0, 0]} castShadow>
        <planeGeometry args={[0.45, 1]} />
        <meshStandardMaterial color={"#000000"}/>

        {/* Red Glowing Edges */}
        <Edges
          scale={1}
          threshold={15} // Lower = sharper edges
          color="#ff0000" // Pure red
          linewidth={5}   // Thick glow (works with Bloom!)
        />
      </mesh>

     

      {/* Right Door */}
      <mesh ref={rightRef} position={[0.225, 0, 0.001]} castShadow>
        <planeGeometry args={[0.45, 1]} />
        <meshStandardMaterial color={"#000000"}/>

        {/* Red Glowing Edges */}
        <Edges
          scale={1}
          threshold={15}
          color="#ff0000"
          linewidth={5}
        />
      </mesh>

      {/* Optional: Subtle door frame (invisible but helps with depth) */}
      {/* <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[1.1, 1.1, 0.1]} />
        <meshBasicMaterial color="#00aaff" opacity={0} transparent />
      </mesh> */}
    </group>
  );
}