"use client";

import { useState, Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {Points, PointMaterial, Preload} from "@react-three/drei";
import { inSphere } from 'maath/random';

const Stars = (props) => {
  const ref = useRef();

  const sphere = useMemo(() => {
    const arr = new Float32Array(5000 * 3); // mỗi điểm 3 giá trị xyz
    inSphere(arr, { radius: 1.2 });
    return arr;
  }, []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group
      rotation={[0, 0, Math.PI / 4]}
    >
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial 
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarsCanvas