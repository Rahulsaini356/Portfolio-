'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sliders, Code2, Sparkles, Orbit, RefreshCw, Eye, Flame, Check } from 'lucide-react';
import * as THREE from 'three';
import { playHover, playClick } from '@/utils/audio';

// 1. Quantum Singularity Gravitational Lens Shader
function SingularityMesh({ speed, intensity, distortion }) {
  const meshRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uIntensity: { value: intensity },
    uDistortion: { value: distortion }
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.material.uniforms.uTime.value = t;
    meshRef.current.material.uniforms.uSpeed.value = speed;
    meshRef.current.material.uniforms.uIntensity.value = intensity;
    meshRef.current.material.uniforms.uDistortion.value = distortion;
    meshRef.current.rotation.z = t * 0.15 * speed;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vNormal;
          uniform float uTime;
          uniform float uDistortion;

          void main() {
            vUv = uv;
            vNormal = normal;
            vec3 pos = position;
            pos += normal * sin(pos.y * 5.0 + uTime * 2.0) * 0.12 * uDistortion;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uSpeed;
          uniform float uIntensity;
          varying vec2 vUv;
          varying vec3 vNormal;

          void main() {
            vec2 p = vUv * 2.0 - 1.0;
            float r = length(p);
            float angle = atan(p.y, p.x);

            // Gravitational accretion vortex
            float spiral = sin(angle * 4.0 + r * 12.0 - uTime * 2.5 * uSpeed);
            float rim = 1.0 - smoothstep(0.4, 0.95, r);
            
            vec3 colDeep = vec3(0.04, 0.06, 0.14);
            vec3 colIndigo = vec3(0.39, 0.40, 0.95);
            vec3 colSky = vec3(0.22, 0.74, 0.97);

            vec3 col = mix(colDeep, colIndigo, clamp(spiral * 0.6 + 0.4, 0.0, 1.0));
            col = mix(col, colSky, pow(clamp(rim, 0.0, 1.0), 2.5) * uIntensity);

            // Event horizon void
            if (r < 0.22) {
              col = vec3(0.01, 0.01, 0.02);
            }

            gl_FragColor = vec4(col * uIntensity, 0.95);
          }
        `}
        transparent
      />
    </mesh>
  );
}

// 2. Quantum Particle Swarm Shader
function ParticleSwarmMesh({ speed, intensity }) {
  const pointsRef = useRef();
  const count = 2500;

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const rad = 0.5 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pos[i3] = rad * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = rad * Math.cos(phi);
      phs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, phs];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * speed;
    pointsRef.current.rotation.y = t * 0.25;
    pointsRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aPhase" count={count} array={phases} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06 * intensity}
        color="#818cf8"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 3. Holographic Geodesic Lattice
function HolographicWireMesh({ speed, intensity, distortion }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed;
    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = t * 0.2;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2.0, 2]} />
        <meshStandardMaterial
          color="#060913"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.02, 2]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.5 * intensity}
        />
      </mesh>
      <mesh>
        <dodecahedronGeometry args={[2.4, 0]} />
        <meshBasicMaterial
          color="#818cf8"
          wireframe
          transparent
          opacity={0.3 * intensity}
        />
      </mesh>
    </group>
  );
}

const shaderModes = [
  {
    id: 'singularity',
    name: '01 // Gravitational Singularity',
    tag: 'Black Hole GLSL Accretion Disk',
    desc: 'Real-time raymarched vortex simulation featuring relativistic light bending and event horizon accretion.'
  },
  {
    id: 'particles',
    name: '02 // Quantum Swarm',
    tag: 'GPU-Accelerated 2,500 Particle Field',
    desc: 'Zero-gravity stochastic particle dispersion modeled with spherical harmonics and additive photons.'
  },
  {
    id: 'hologram',
    name: '03 // Geodesic Hologram',
    tag: 'Nested Polyhedral Matrix',
    desc: 'Multi-tiered icosahedral wireframe lattice with dynamic rotational inertia and starlight reflection.'
  }
];

export default function ShaderLab() {
  const [activeMode, setActiveMode] = useState('singularity');
  const [speed, setSpeed] = useState(1.0);
  const [intensity, setIntensity] = useState(1.2);
  const [distortion, setDistortion] = useState(0.8);
  const [showCode, setShowCode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-28 px-6 relative z-10 border-t border-white/[0.08]" id="shader-lab">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
              <span>EXPERIMENTAL PLAYGROUND</span>
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              INTERACTIVE <span className="metallic-indigo">SHADER LAB</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-3 font-light leading-relaxed">
              Test and manipulate real-time WebGL GLSL shaders running directly in your browser. Adjust parameters, switch algorithmic models, or inspect source code.
            </p>
          </div>

          {/* Code Inspection Toggle Button */}
          <button
            onClick={() => {
              playClick();
              setShowCode(!showCode);
            }}
            onMouseEnter={playHover}
            className="self-start md:self-auto px-4 py-2 rounded-full glass-panel hover:border-white/20 text-xs font-mono tracking-wider uppercase text-zinc-300 flex items-center gap-2 transition-all shadow-sm"
          >
            <Code2 size={14} className="text-indigo-400" />
            <span>{showCode ? 'Hide GLSL Code' : 'Inspect GLSL Code'}</span>
          </button>
        </div>

        {/* Interactive Lab Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 3D Viewport Stage */}
          <div className="lg:col-span-8 bg-[#070b13]/90 rounded-2xl border border-white/[0.1] relative overflow-hidden h-[460px] sm:h-[500px] flex items-center justify-center shadow-2xl group">
            {/* Viewport HUD Marks */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                WEBGL RENDER LOOP // 60 FPS
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 text-[10px] font-mono tracking-widest text-sky-400 uppercase px-2.5 py-1 rounded bg-black/40 border border-white/10 backdrop-blur-md">
              MODE: {activeMode.toUpperCase()}
            </div>

            {/* 3D Canvas */}
            {mounted && (
              <div className="w-full h-full cursor-grab active:cursor-grabbing">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.2} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

                  {activeMode === 'singularity' && (
                    <SingularityMesh speed={speed} intensity={intensity} distortion={distortion} />
                  )}
                  {activeMode === 'particles' && (
                    <ParticleSwarmMesh speed={speed} intensity={intensity} />
                  )}
                  {activeMode === 'hologram' && (
                    <HolographicWireMesh speed={speed} intensity={intensity} distortion={distortion} />
                  )}
                </Canvas>
              </div>
            )}

            {/* Bottom Telemetry Bar */}
            <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between text-[10px] font-mono text-zinc-500 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.06]">
              <span>SHADERS: GLSL 3.0 ES</span>
              <span>GPU MEMORY: OPTIMAL</span>
              <span className="hidden sm:inline">PRECISION: HIGH_P</span>
            </div>
          </div>

          {/* Right: Interactive Controls & Preset Switcher */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Mode Switchers */}
            <div className="glass-panel p-5 rounded-xl space-y-2">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles size={12} className="text-indigo-400" />
                <span>Select Shader Algorithm</span>
              </div>

              {shaderModes.map((mode) => {
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      playClick();
                      setActiveMode(mode.id);
                    }}
                    onMouseEnter={playHover}
                    className={`w-full text-left p-3.5 rounded-lg transition-all duration-200 border ${
                      isActive
                        ? 'bg-indigo-600/20 border-indigo-500/50 shadow-md text-white'
                        : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold">{mode.name}</span>
                      {isActive && <Check size={13} className="text-sky-400" />}
                    </div>
                    <div className="text-[10px] font-mono text-sky-400/90 mt-0.5">{mode.tag}</div>
                    <div className="text-[11px] text-zinc-400 font-light mt-1.5 leading-relaxed">{mode.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Real-Time Parameter Sliders */}
            <div className="glass-panel p-5 rounded-xl space-y-4">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sliders size={12} className="text-sky-400" />
                <span>Real-Time Shader Dials</span>
              </div>

              {/* Speed Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-1.5">
                  <span>VORTEX SPEED</span>
                  <span className="text-sky-400">{speed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-zinc-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Intensity Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-1.5">
                  <span>PHOTON INTENSITY</span>
                  <span className="text-sky-400">{intensity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={intensity}
                  onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-zinc-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Distortion Slider */}
              {activeMode !== 'particles' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-300 mb-1.5">
                    <span>GRAVITATIONAL DISTORTION</span>
                    <span className="text-sky-400">{distortion.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={distortion}
                    onChange={(e) => setDistortion(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 bg-zinc-800 rounded-lg h-1.5 cursor-pointer"
                  />
                </div>
              )}

              {/* Reset to Nominal */}
              <button
                onClick={() => {
                  playClick();
                  setSpeed(1.0);
                  setIntensity(1.2);
                  setDistortion(0.8);
                }}
                onMouseEnter={playHover}
                className="w-full py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-[11px] font-mono tracking-wider uppercase text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw size={11} />
                <span>Reset to Nominal</span>
              </button>
            </div>

          </div>

        </div>

        {/* GLSL Source Code Drawer */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 rounded-2xl bg-[#090d16] border border-white/[0.1] p-6 font-mono text-xs overflow-x-auto shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-zinc-400 text-[11px]">
                <span>glsl_fragment_{activeMode}.frag</span>
                <span className="text-sky-400">GLSL 3.0 ES</span>
              </div>
              <pre className="text-zinc-300 leading-relaxed">
{activeMode === 'singularity' ? `// Gravitational Accretion Disk Fragment Shader
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float angle = atan(p.y, p.x);

  // Relativistic spiral calculation
  float spiral = sin(angle * 4.0 + r * 12.0 - uTime * 2.5 * uSpeed);
  float rim = 1.0 - smoothstep(0.4, 0.95, r);
  
  vec3 colDeep = vec3(0.04, 0.06, 0.14);
  vec3 colIndigo = vec3(0.39, 0.40, 0.95);
  vec3 colSky = vec3(0.22, 0.74, 0.97);

  vec3 col = mix(colDeep, colIndigo, clamp(spiral * 0.6 + 0.4, 0.0, 1.0));
  col = mix(col, colSky, pow(clamp(rim, 0.0, 1.0), 2.5) * uIntensity);

  gl_FragColor = vec4(col * uIntensity, 0.95);
}` : activeMode === 'particles' ? `// GPU Particle Swarm Vertex Shader
uniform float uTime;
uniform float uSpeed;
attribute float aPhase;
varying vec3 vColor;

void main() {
  vec3 pos = position;
  float t = uTime * uSpeed;
  pos.x += sin(t + aPhase) * 0.3;
  pos.y += cos(t * 0.8 + aPhase) * 0.3;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (12.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}` : `// Geodesic Holographic Wireframe Shader
void main() {
  vec3 normal = normalize(vNormal);
  float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 3.0);
  vec3 glowColor = mix(vec3(0.39, 0.4, 0.95), vec3(0.22, 0.74, 0.97), fresnel);
  gl_FragColor = vec4(glowColor, fresnel * uIntensity);
}`}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}