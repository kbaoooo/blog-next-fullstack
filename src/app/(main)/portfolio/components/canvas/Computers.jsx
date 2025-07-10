"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import CONSTANTS from "@/utils/constants";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor="black" />
      <ambientLight intensity={0.5} />
      <pointLight 
        intensity={3}
        position={[0, 1, -0.75]}
      />
      <spotLight
        position={[-20, 50, -10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.75}
        position={isMobile ? [0, -1.3 , -1.2] : [0, -2.25, -1.5]}
        rotation={[0, 0.1, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${CONSTANTS.MOBILE_WIDTH}px)`);

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

 return (
  <Canvas
    shadows
    frameloop="demand"
    camera={{
      position: [20, 3, 5],
      fov: 25,
    }}gl={{
      preserveDrawingBuffer: true,
    }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Computers isMobile={isMobile}/>
    </Suspense>
    <Preload all />
  </Canvas>
 );
};

export default ComputersCanvas;