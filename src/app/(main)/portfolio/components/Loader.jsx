import React from 'react';
import {  Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className='canvas-load'></span>
      <p className='canvas-load-text'>
        <b>{progress.toFixed(2)}%</b>
      </p>
    </Html>
  );
};

export default CanvasLoader