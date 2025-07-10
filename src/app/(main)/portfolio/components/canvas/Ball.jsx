'use client';

import React, {Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Decal, Float, useTexture, Preload } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Ball = (props) => {
  const { imgUrl } = props;
  
  const [decal] = useTexture([imgUrl]);
  return ( 
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 1]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal 
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1.1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      shadows
      gl={{ preserveDrawingBuffer: true }} 
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon.src} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas