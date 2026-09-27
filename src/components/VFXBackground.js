'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function CelestialConstellation() {
  const pointsRef = useRef();
  const particleCount = 6000;

  const [positions, colors, randoms, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount);
    const phs = new Float32Array(particleCount);

    // Luxury high-tech palette
    const colorWhite = new THREE.Color('#ffffff');
    const colorTitanium = new THREE.Color('#cbd5e1');
    const colorIndigo = new THREE.Color('#6366f1');
    const colorSky = new THREE.Color('#38bdf8');
    const colorViolet = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Cosmic orbital disk with spherical core
      const radius = Math.pow(Math.random(), 1.8) * 45;
      const spinAngle = radius * 0.35;
      const branchAngle = ((i % 5) * 2 * Math.PI) / 5;
      
      const x = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 4;
      const z = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * (10 / (radius * 0.15 + 1));

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      // Color gradation: central titanium white, mid-field electric indigo, outer arctic sky & violet
      const mixRatio = radius / 45;
      let finalColor;
      if (mixRatio < 0.15) finalColor = colorWhite;
      else if (mixRatio < 0.4) finalColor = colorTitanium;
      else if (mixRatio < 0.7) finalColor = colorIndigo;
      else if (mixRatio < 0.85) finalColor = colorSky;
      else finalColor = colorViolet;

      col[i3] = finalColor.r;
      col[i3 + 1] = finalColor.g;
      col[i3 + 2] = finalColor.b;

      rnd[i] = Math.random();
      phs[i] = Math.random() * Math.PI * 2;
    }

    return [pos, col, rnd, phs];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      pointsRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} rotation-x={Math.PI * 0.18}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={particleCount} array={randoms} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={particleCount} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          attribute vec3 color;
          attribute float aRandom;
          attribute float aPhase;
          varying vec3 vColor;
          
          void main() {
              vColor = color;
              vec3 pos = position;
              
              // Organic stellar drift
              pos.y += sin(uTime * 0.8 + aPhase) * 0.4 * aRandom;
              pos.x += cos(uTime * 0.5 + aPhase) * 0.2 * aRandom;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              // Crisp pinpoint particle sizes
              gl_PointSize = (7.5 / -mvPosition.z) * (1.0 + aRandom * 0.8);
              gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              // Soft radial gaussian falloff
              float alpha = smoothstep(0.5, 0.05, dist) * 0.85;
              gl_FragColor = vec4(vColor, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Warp Speed Space Dust — Flying particles giving sensation of flight through cosmos
function WarpSpaceDust() {
  const pointsRef = useRef();
  const dustCount = 1500;
  const warpMultiplier = useRef(1);

  useEffect(() => {
    const handleWarp = () => {
      warpMultiplier.current = 15;
    };
    window.addEventListener('engage-warp', handleWarp);
    return () => window.removeEventListener('engage-warp', handleWarp);
  }, []);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(dustCount * 3);
    const spd = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 55;
      pos[i3 + 1] = (Math.random() - 0.5) * 40;
      pos[i3 + 2] = -30 + Math.random() * 65;
      spd[i] = 0.08 + Math.random() * 0.16;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    // Smoothly decay warp boost back to normal
    if (warpMultiplier.current > 1) {
      warpMultiplier.current += (1 - warpMultiplier.current) * 0.04;
    }

    const posArr = pointsRef.current.geometry.attributes.position.array;
    const boost = warpMultiplier.current;

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      posArr[i3 + 2] += speeds[i] * boost;
      if (posArr[i3 + 2] > 36) {
        posArr[i3 + 2] = -30;
        posArr[i3] = (Math.random() - 0.5) * 55;
        posArr[i3 + 1] = (Math.random() - 0.5) * 40;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    if (pointsRef.current.material) {
      pointsRef.current.material.size = 0.15 + (boost - 1) * 0.07;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={dustCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#c7d2fe"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Floating Zero-Gravity 3D Celestial Polyhedron
function FloatingArtifact({ position, rotationSpeed, scale = 1, type = 'icosahedron', glowColor = '#6366f1' }) {
  const meshRef = useRef();
  const initialY = position[1];
  const initialX = position[0];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += rotationSpeed.x;
    meshRef.current.rotation.y += rotationSpeed.y;
    meshRef.current.rotation.z += rotationSpeed.z;
    
    // Zero-gravity orbital drift
    meshRef.current.position.y = initialY + Math.sin(t * 0.65 + initialX) * 0.7;
    meshRef.current.position.x = initialX + Math.cos(t * 0.45 + initialY) * 0.4;
  });

  return (
    <group position={position} ref={meshRef} scale={scale}>
      <mesh>
        {type === 'icosahedron' && <icosahedronGeometry args={[1.2, 0]} />}
        {type === 'dodecahedron' && <dodecahedronGeometry args={[1.1, 0]} />}
        {type === 'octahedron' && <octahedronGeometry args={[1.3, 0]} />}
        <meshStandardMaterial
          color="#0b0f19"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Luminous wireframe exoskeleton */}
      <mesh>
        {type === 'icosahedron' && <icosahedronGeometry args={[1.205, 0]} />}
        {type === 'dodecahedron' && <dodecahedronGeometry args={[1.105, 0]} />}
        {type === 'octahedron' && <octahedronGeometry args={[1.305, 0]} />}
        <meshBasicMaterial
          color={glowColor}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// Orbital Gyroscope System with Concentric Rotating Rings
function OrbitalGyroscope({ position = [0, 2, -6], scale = 2.4 }) {
  const outerRingRef = useRef();
  const midRingRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.12;
      outerRingRef.current.rotation.y = t * 0.16;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y = -t * 0.18;
      midRingRef.current.rotation.z = t * 0.14;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.3;
      coreRef.current.rotation.y = t * 0.4;
      const s = 1 + Math.sin(t * 2) * 0.06;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Outer Gyroscopic Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.2, 0.022, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>
      {/* Middle Gyroscopic Ring */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[1.65, 0.02, 16, 64]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.35} />
      </mesh>
      {/* Inner Glowing Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#6366f1"
          emissiveIntensity={0.9}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Zero-G Camera Parallax Controller with Hyperspace Lunge
function ZeroGCameraRig() {
  const warpShake = useRef(0);

  useEffect(() => {
    const handleWarp = () => {
      warpShake.current = 1.0;
    };
    window.addEventListener('engage-warp', handleWarp);
    return () => window.removeEventListener('engage-warp', handleWarp);
  }, []);

  useFrame((state) => {
    const targetX = state.pointer.x * 4;
    const targetY = 12 + state.pointer.y * 3;
    
    if (warpShake.current > 0.01) {
      warpShake.current *= 0.93;
      const shakeX = (Math.random() - 0.5) * warpShake.current * 0.8;
      const shakeY = (Math.random() - 0.5) * warpShake.current * 0.8;
      state.camera.position.x += (targetX - state.camera.position.x) * 0.05 + shakeX;
      state.camera.position.y += (targetY - state.camera.position.y) * 0.05 + shakeY;
      state.camera.position.z = 38 - warpShake.current * 8; // Dramatic forward warp lunge!
    } else {
      state.camera.position.x += (targetX - state.camera.position.x) * 0.025;
      state.camera.position.y += (targetY - state.camera.position.y) * 0.025;
      state.camera.position.z += (38 - state.camera.position.z) * 0.05;
    }
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function VFXBackground() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#06080d] overflow-hidden">
      {/* Subtle tech grid */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Refined ambient illumination pools */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-sky-950/15 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-violet-950/20 rounded-full blur-[140px]" />

      {mounted && (
        <Canvas
          camera={{ position: [0, 12, 38], fov: 52 }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <fog attach="fog" args={['#06080d', 18, 70]} />
          
          {/* Deep Space Zero-G Lighting */}
          <ambientLight intensity={0.45} />
          <directionalLight position={[15, 20, 10]} intensity={0.9} color="#e0e7ff" />
          <pointLight position={[0, 1, -8]} intensity={1.8} color="#818cf8" distance={25} />

          {/* Zero-G Parallax Camera Rig */}
          <ZeroGCameraRig />

          {/* Starfield & Flying Warp Dust */}
          <CelestialConstellation />
          <WarpSpaceDust />

          {/* Central Orbital Gyroscope Ring System */}
          <OrbitalGyroscope position={[0, 1, -8]} scale={2.6} />

          {/* Floating Zero-Gravity 3D Celestial Artifacts */}
          <FloatingArtifact
            position={[-18, 10, -5]}
            rotationSpeed={{ x: 0.003, y: 0.005, z: 0.002 }}
            scale={1.4}
            type="icosahedron"
            glowColor="#38bdf8"
          />
          <FloatingArtifact
            position={[19, 8, -4]}
            rotationSpeed={{ x: -0.004, y: 0.003, z: 0.005 }}
            scale={1.3}
            type="dodecahedron"
            glowColor="#818cf8"
          />
          <FloatingArtifact
            position={[-16, -6, 2]}
            rotationSpeed={{ x: 0.005, y: -0.004, z: 0.003 }}
            scale={1.1}
            type="octahedron"
            glowColor="#a855f7"
          />
          <FloatingArtifact
            position={[17, -8, 0]}
            rotationSpeed={{ x: -0.003, y: 0.004, z: -0.005 }}
            scale={1.25}
            type="icosahedron"
            glowColor="#38bdf8"
          />
          <FloatingArtifact
            position={[2, -14, -12]}
            rotationSpeed={{ x: 0.002, y: 0.005, z: 0.001 }}
            scale={1.8}
            type="dodecahedron"
            glowColor="#6366f1"
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.85} height={250} intensity={0.95} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
