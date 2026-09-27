'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  Rocket, Orbit, Sparkles, Activity, Terminal, ExternalLink, ArrowUpRight, 
  Layers, Cpu, Zap, Code2, Globe, Monitor, Radio, Compass, RefreshCw
} from 'lucide-react';
import { playHover, playClick, playWarp, playBeep } from '@/utils/audio';

// =========================================================================
// 3D Celestial Core & Orbital Particle Visualizer
// =========================================================================
function HolographicCyberPlanet({ mode, speedMultiplier }) {
  const planetRef = useRef();
  const ringRef = useRef();
  const outerRingRef = useRef();
  const particlesRef = useRef();

  // Particle positions
  const count = 1200;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2.4 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      pos[i3] = radius * Math.cos(phi) * Math.sin(theta);
      pos[i3 + 1] = radius * Math.sin(phi);
      pos[i3 + 2] = radius * Math.cos(phi) * Math.cos(theta);
      scl[i] = Math.random();
    }
    return [pos, scl];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speedMultiplier;
    
    if (planetRef.current) {
      planetRef.current.rotation.y = t * 0.2;
      planetRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.25;
      ringRef.current.rotation.x = 1.1 + Math.sin(t * 0.15) * 0.1;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.15;
      outerRingRef.current.rotation.y = Math.cos(t * 0.1) * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
      if (mode === 'warp') {
        particlesRef.current.rotation.z += 0.02 * speedMultiplier;
      }
    }
  });

  return (
    <group>
      {/* Central Cyber Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial
          color={mode === 'flare' ? '#4f46e5' : '#080d1a'}
          roughness={0.2}
          metalness={0.8}
          emissive={mode === 'flare' ? '#4338ca' : '#1e1b4b'}
          emissiveIntensity={mode === 'flare' ? 0.6 : 0.2}
        />
      </mesh>

      {/* Wireframe Hologram Halo */}
      <mesh>
        <icosahedronGeometry args={[1.42, 2]} />
        <meshBasicMaterial 
          color={mode === 'warp' ? '#38bdf8' : '#818cf8'} 
          wireframe 
          transparent 
          opacity={0.45} 
        />
      </mesh>

      {/* Primary Equatorial Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.3, 0.025, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Secondary Tilted Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.35} />
      </mesh>

      {/* Starlight Orbital Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={mode === 'warp' ? 0.07 : 0.045}
          color={mode === 'warp' ? '#67e8f9' : '#a5b4fc'}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

const projectsSummary = [
  {
    name: "CineStream",
    category: "Full-Stack Media",
    stack: "Next.js 16 • TMDB API • Tailwind",
    status: "Live & Deployed",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    desc: "High-performance movie streaming & discovery portal with video modals.",
    link: "https://github.com/Rahulsaini356/cinestream-"
  },
  {
    name: "Aura Apparel",
    category: "Modern E-Commerce",
    stack: "React 19 • Framer Motion • Context",
    status: "Live & Deployed",
    statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/25",
    desc: "Minimalist editorial commerce interface with animated cart drawer.",
    link: "https://github.com/Rahulsaini356/CLOTHING-STORE-SITE"
  },
  {
    name: "Atmos Weather",
    category: "Real-Time Dashboard",
    stack: "JavaScript • OpenWeather • Geolocation",
    status: "Production Ready",
    statusColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
    desc: "Live meteorological forecasting dashboard with 7-day forecast analytics.",
    link: "https://github.com/Rahulsaini356/weather-app"
  },
  {
    name: "Cinematic Studio",
    category: "Creative Showcase",
    stack: "HTML5 Canvas • CSS3 • Responsive Media",
    status: "Portfolio Project",
    statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    desc: "Dark editorial motion showcase tailored for videographers and directors.",
    link: "https://github.com/Rahulsaini356/EDITING-SITE"
  }
];

export default function Dashboard() {
  const [visualMode, setVisualMode] = useState('orbit'); // 'orbit' | 'warp' | 'flare'
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [isWarping, setIsWarping] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [dashboardTab, setDashboardTab] = useState('telemetry'); // 'telemetry' | 'projects'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWarpBoost = () => {
    playWarp();
    setIsWarping(true);
    setVisualMode('warp');
    setSpeedMultiplier(3.5);
    setTimeout(() => {
      setSpeedMultiplier(1.0);
      setIsWarping(false);
    }, 2500);
  };

  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/[0.08]" id="dashboard">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
              <span>DEV COMMAND CENTER</span>
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              INTERACTIVE <span className="metallic-indigo">DEV CONSOLE</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-3 font-light leading-relaxed">
              Real-time interactive 3D visualizer, live repository telemetry, and developer workspace metrics.
            </p>
          </div>

          {/* Status HUD Badge */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start md:self-auto text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-zinc-300">ACTIVE BUILDER • CLASS OF &apos;28</span>
          </div>
        </div>

        {/* Main Dashboard Stage: 2 Columns */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* Left Column: 3D Holographic Cyber Planet & Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#070b13]/90 rounded-3xl border border-white/[0.1] shadow-2xl relative overflow-hidden flex flex-col justify-between group h-[520px]">
            
            {/* Top HUD Controls Overlay */}
            <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                <Orbit size={13} className="text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>3D SPACE CORE // 60 FPS</span>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/10 backdrop-blur-md pointer-events-auto">
                {[
                  { id: 'orbit', label: 'ORBIT' },
                  { id: 'warp', label: 'WARP' },
                  { id: 'flare', label: 'FLARE' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      playClick();
                      setVisualMode(m.id);
                    }}
                    onMouseEnter={playHover}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all ${
                      visualMode === m.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3D Canvas Viewport */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              {mounted && (
                <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1.2} />
                  <pointLight position={[-5, -5, -5]} intensity={0.8} color="#38bdf8" />
                  <HolographicCyberPlanet mode={visualMode} speedMultiplier={speedMultiplier} />
                </Canvas>
              )}
            </div>

            {/* Bottom HUD Bar with Interactive Warp Drive Trigger */}
            <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between bg-black/60 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
                  <Activity size={13} />
                  <span>{visualMode.toUpperCase()} SIMULATION</span>
                </span>
                <span className="hidden sm:inline text-zinc-600">|</span>
                <span className="hidden sm:inline text-zinc-500">GLSL / WEBGL 2.0</span>
              </div>

              <button
                onClick={handleWarpBoost}
                onMouseEnter={playHover}
                disabled={isWarping}
                className="px-4 py-2 rounded-xl btn-tech-primary text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:border-indigo-400/60"
              >
                <Rocket size={13} className={isWarping ? "animate-bounce text-sky-300" : "text-indigo-300"} />
                <span>{isWarping ? "WARPING..." : "TRIGGER WARP SPEED"}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Developer Telemetry & Projects Console (5 cols) */}
          <div className="lg:col-span-5 bg-[#070b13]/90 rounded-3xl p-6 sm:p-7 border border-white/[0.1] shadow-2xl flex flex-col justify-between h-[520px]">
            
            <div>
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-indigo-400" />
                  <span className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                    SYSTEM TELEMETRY
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
                  <button
                    onClick={() => { playClick(); setDashboardTab('telemetry'); }}
                    onMouseEnter={playHover}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all ${
                      dashboardTab === 'telemetry' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    METRICS
                  </button>
                  <button
                    onClick={() => { playClick(); setDashboardTab('projects'); }}
                    onMouseEnter={playHover}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono transition-all ${
                      dashboardTab === 'projects' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    PROJECTS
                  </button>
                </div>
              </div>

              {/* Dynamic Tab Body */}
              <AnimatePresence mode="wait">
                {dashboardTab === 'telemetry' && (
                  <motion.div
                    key="telemetry"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Stat Card 1 */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">ACTIVE SPECIALIZATION</span>
                        <span className="text-sky-400 font-bold">NEXT.JS 16 &amp; THREE.JS</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                        Full-stack React ecosystem combined with GPU WebGL visual experiences.
                      </p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">DATA &amp; LOGIC</span>
                        <span className="text-emerald-400 font-bold">PYTHON &amp; C/C++</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                        Algorithmic problem-solving, discrete math, and data analysis with NumPy/Pandas.
                      </p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">DEPLOYED PROJECTS</span>
                        <span className="text-indigo-400 font-bold">4 PRODUCTION REPOS</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                        CineStream Core, Aura Apparel, Atmos Weather, and Cinematic Studio.
                      </p>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-zinc-400">CURRENT STATUS</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          OPEN FOR COLLABS
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                        Available for student hackathons, open-source builds, and developer internships.
                      </p>
                    </div>
                  </motion.div>
                )}

                {dashboardTab === 'projects' && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5 overflow-y-auto max-h-[360px] pr-1"
                  >
                    {projectsSummary.map((p, idx) => (
                      <div
                        key={p.name}
                        onClick={() => {
                          playClick();
                          setActiveProjectIdx(idx);
                        }}
                        onMouseEnter={playHover}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          activeProjectIdx === idx
                            ? 'bg-indigo-950/40 border-indigo-400/50 shadow-md'
                            : 'bg-black/40 border-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white tracking-tight">{p.name}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${p.statusColor}`}>
                            {p.status}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-indigo-300 mb-1">{p.stack}</div>
                        <p className="text-[11px] text-zinc-400 font-light leading-tight mb-2">{p.desc}</p>
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-mono text-sky-400 hover:text-white transition-colors"
                        >
                          <span>View on GitHub</span>
                          <ArrowUpRight size={10} />
                        </a>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Footer Info */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>SYSTEM HEALTH: 100%</span>
              </span>
              <span>DEV METRICS ACTIVE</span>
            </div>

          </div>

        </div>

        {/* 4 Bottom Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "FRONTEND STACK", val: "Next.js 16 + React 19", sub: "App Router & Turbopack" },
            { label: "CREATIVE 3D", val: "Three.js & WebGL", sub: "Shaders & Physics" },
            { label: "DATA & SCRIPTING", val: "Python + NumPy", sub: "Tabular & Algorithmic" },
            { label: "LOCATION", val: "Rajasthan, India", sub: "Available Worldwide" }
          ].map((item, i) => (
            <div key={i} onMouseEnter={playHover} className="p-4 rounded-2xl glass-panel border border-white/[0.06] hover:border-indigo-400/30 transition-all">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-sm font-bold text-white font-mono tracking-tight">{item.val}</div>
              <div className="text-[11px] text-indigo-300 font-mono mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
