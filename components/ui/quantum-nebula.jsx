"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const particleCount = 18000;
const boxSize = 5.4;

export default function QuantumNebula({ variant = "background" }) {
  const mountRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(68, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(mount.clientWidth, mount.clientHeight), 0.72, 0.48, 0.08)
    );

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 0.45) * boxSize;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * boxSize;

      positions[i3] = Math.cos(angle) * radius * 0.46;
      positions[i3 + 1] = height * 0.55;
      positions[i3 + 2] = Math.sin(angle) * radius * 0.46;

      color.setHSL(0.76 + Math.random() * 0.12, 0.92, 0.58 + Math.random() * 0.22);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uPointSize: { value: 0.022 * renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uPointSize;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uPointSize * (16.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          float strength = smoothstep(0.5, 0.0, d);
          if (strength < 0.02) discard;
          gl_FragColor = vec4(vColor, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let frameId = 0;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001;
      const positionArray = geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positionArray[i3];
        const y = positionArray[i3 + 1];
        const z = positionArray[i3 + 2];
        const swirl = elapsed * 0.28 + y * 0.9;
        const forceX = Math.sin(y * 1.8 + elapsed) * 0.0008 + Math.cos(swirl) * 0.0009;
        const forceY = Math.sin(z * 1.5 + elapsed * 0.8) * 0.0006;
        const forceZ = Math.cos(x * 1.7 + elapsed) * 0.0008 + Math.sin(swirl) * 0.0009;
        const mouseX = mouseRef.current.x * 1.2;
        const mouseY = mouseRef.current.y * 0.8;
        const dist = Math.hypot(x - mouseX, y - mouseY);
        const repulse = dist < 1.3 ? (1.3 - dist) * 0.0008 : 0;

        velocities[i3] = (velocities[i3] + forceX + (x - mouseX) * repulse) * 0.955;
        velocities[i3 + 1] = (velocities[i3 + 1] + forceY + (y - mouseY) * repulse) * 0.955;
        velocities[i3 + 2] = (velocities[i3 + 2] + forceZ) * 0.955;

        positionArray[i3] += velocities[i3];
        positionArray[i3 + 1] += velocities[i3 + 1];
        positionArray[i3 + 2] += velocities[i3 + 2];

        if (Math.abs(positionArray[i3]) > boxSize / 2) positionArray[i3] *= -0.92;
        if (Math.abs(positionArray[i3 + 1]) > boxSize / 2) positionArray[i3 + 1] *= -0.92;
        if (Math.abs(positionArray[i3 + 2]) > boxSize / 2) positionArray[i3 + 2] *= -0.92;
      }

      geometry.attributes.position.needsUpdate = true;
      particles.rotation.y = elapsed * 0.08;
      particles.rotation.z = Math.sin(elapsed * 0.22) * 0.08;
      camera.position.x += (mouseRef.current.x * 0.2 - camera.position.x) * 0.025;
      camera.position.y += (-mouseRef.current.y * 0.12 - camera.position.y) * 0.025;
      camera.position.z += (5 - camera.position.z) * 0.03;
      camera.lookAt(0, 0, 0);
      composer.render();
      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    const handleMouseMove = (event) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    animate();
    window.addEventListener("resize", handleResize);
    mount.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("mousemove", handleMouseMove);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const isBackground = variant === "background";

  return (
    <div
      className={
        isBackground
          ? "absolute inset-0 overflow-hidden bg-[#0a0118]"
          : "relative min-h-[430px] overflow-hidden rounded-lg border border-purple-500/20 bg-[#0a0118] shadow-[0_30px_110px_rgba(91,43,214,0.22)] sm:min-h-[540px]"
      }
    >
      <div ref={mountRef} className="absolute inset-0" />
      {/* Radial vignette overlay for depth */}
      <div
        className={
          isBackground
            ? "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,transparent_0%,rgba(10,1,24,0.14)_38%,rgba(10,1,24,0.72)_82%),linear-gradient(90deg,rgba(10,1,24,0.66),rgba(10,1,24,0.12)_50%,rgba(10,1,24,0.38)_100%)]"
            : "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(10,1,24,0.08)_42%,rgba(10,1,24,0.72)_100%)]"
        }
      />
    </div>
  );
}
