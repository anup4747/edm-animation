import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import {
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  MeshBasicMaterial,
} from "three";

const laserModelUrl = new URL(
  "../assets/3d componants/laser/source/laser.fbx",
  import.meta.url,
);

function useFBXModel(url) {
  const [object, setObject] = useState(null);

  useEffect(() => {
    const loader = new FBXLoader();
    let isMounted = true;

    loader.load(
      url,
      (loaded) => {
        loaded.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = new MeshBasicMaterial({ color: 0xaaaaaa });
            child.material.needsUpdate = true;

            const edgeGeo = new EdgesGeometry(child.geometry, 15);
            const edgeMat = new LineBasicMaterial({
              color: 0x000000,
              linewidth: 1,
            });
            const edgeLines = new LineSegments(edgeGeo, edgeMat);
            edgeLines.renderOrder = 999;
            edgeLines.material.depthTest = true;
            edgeLines.material.depthWrite = false;
            child.add(edgeLines);
          }
        });

        if (isMounted) {
          setObject(loaded);
        }
      },
      undefined,
      () => {
        // ignore load errors for now
      },
    );

    return () => {
      isMounted = false;
    };
  }, [url]);

  return object;
}

function LaserModel() {
  const fbx = useFBXModel(laserModelUrl.href);

  if (!fbx) {
    return null;
  }

  return (
    <primitive
      object={fbx}
      scale={[0.014, 0.014, 0.014]}
      position={[0, -1, 0]}
      color={["red"]}
    />
  );
}

function Room() {
  return (
    <group position={[0, -1.1, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 14]} />
        <meshBasicMaterial color="#0a0a10" />
      </mesh>

      <mesh position={[0, 1.8, -6.8]}>
        <planeGeometry args={[16, 4.5]} />
        <meshBasicMaterial color="#08090e" />
      </mesh>

      <mesh position={[-7.9, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[14, 4.5]} />
        <meshBasicMaterial color="#08090e" />
      </mesh>

      <mesh position={[7.9, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[14, 4.5]} />
        <meshBasicMaterial color="#08090e" />
      </mesh>
    </group>
  );
}

export default function LaserScene() {
  return (
    <div className="laser-scene-screen">
      <Canvas camera={{ position: [10, 10, -10], fov: 40 }}>
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 8, 18]} />
        <Suspense fallback={null}>
          <LaserModel />
          <Room />
        </Suspense>
      </Canvas>

      <div className="laser-scene-ui">
        <Link to="/tracks" className="btn laser-back-button">
          Back to tracks
        </Link>

        <div className="laser-scene-copy">
          <p className="eyebrow">Laser chamber</p>
          <h1 className="page-title">Sleepless Night</h1>
          <p className="page-subtitle">
            The laser model is loaded into a fixed 3D environment. Lighting will
            be added next.
          </p>
        </div>
      </div>
    </div>
  );
}
