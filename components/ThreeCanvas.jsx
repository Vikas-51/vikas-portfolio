"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "./ThemeProvider";

function ParticleSwarm() {
  const ref = useRef();
  const { theme } = useTheme();
  
  // Custom random generator to create points in a sphere shell
  const particles = useMemo(() => {
    const count = 1200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a nice spherical shell distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      // Radius between 0.8 and 2.5
      const r = 0.8 + Math.random() * 1.7;
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smooth automatic rotation
    ref.current.rotation.x += delta * 0.03;
    ref.current.rotation.y += delta * 0.05;
    
    // React to mouse movement
    const { x, y } = state.pointer; // Mouse values between -1 and 1
    ref.current.rotation.x += (y * 0.2 - ref.current.rotation.x) * 0.02;
    ref.current.rotation.y += (x * 0.2 - ref.current.rotation.y) * 0.02;
  });

  // Dynamic particle color based on theme
  const particleColor = theme === "dark" ? "#2dd4bf" : "#0d9488"; // Teal-400 vs Teal-600

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={particleColor}
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={theme === "dark" ? 0.65 : 0.45}
      />
    </Points>
  );
}

export default function ThreeCanvas() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none transition-opacity duration-1000">
      <Canvas 
        camera={{ position: [0, 0, 2], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={theme === "dark" ? 0.3 : 0.6} />
        <directionalLight position={[5, 5, 2]} intensity={theme === "dark" ? 0.4 : 0.8} />
        <ParticleSwarm />
      </Canvas>
      {/* Dynamic backdrop shadow overlay matching theme */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_rgba(0,0,0,0.15)] dark:bg-radial-[circle_at_center,_transparent_50%,_rgba(0,0,0,0.65)] pointer-events-none" />
    </div>
  );
}
