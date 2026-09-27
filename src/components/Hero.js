'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, MousePointer, ArrowUpRight } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { playHover, playClick } from '@/utils/audio';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

// Interactive Draggable 3D Core
function InteractiveDraggableCore() {
  const meshRef = useRef();
  const ringRef = useRef();
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0.003, y: 0.006 });

  useFrame((state) => {
    if (!meshRef.current) return;
    if (!isDragging.current) {
      meshRef.current.rotation.y += rotVelocity.current.y;
      meshRef.current.rotation.x += rotVelocity.current.x;
      rotVelocity.current.y *= 0.985;
      rotVelocity.current.x *= 0.985;
      rotVelocity.current.y += 0.0002;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.012;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.4;
    }
  });

  return (
    <group
      onPointerDown={(e) => {
        isDragging.current = true;
        prevPointer.current = { x: e.clientX, y: e.clientY };
        playClick();
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
      onPointerLeave={() => {
        isDragging.current = false;
      }}
      onPointerMove={(e) => {
        if (!isDragging.current || !meshRef.current) return;
        const dx = e.clientX - prevPointer.current.x;
        const dy = e.clientY - prevPointer.current.y;
        meshRef.current.rotation.y += dx * 0.012;
        meshRef.current.rotation.x += dy * 0.012;
        rotVelocity.current = { x: dy * 0.004, y: dx * 0.004 };
        prevPointer.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#0a0f1d"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.51, 1]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.3, 0.03, 16, 64]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

const words = [
  "Creative Web Developer",
  "Next.js & React Builder",
  "Interactive 3D & Three.js",
  "CS Undergrad & Problem Solver"
];

export default function Hero() {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId;
    const typeSpeed = isDeleting ? 40 : 100;
    const fullWord = words[wordIndex];

    if (!isDeleting && currentWord === fullWord) {
      timeoutId = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentWord === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeoutId = setTimeout(() => {
        setCurrentWord(fullWord.substring(0, currentWord.length + (isDeleting ? -1 : 1)));
      }, typeSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [currentWord, isDeleting, wordIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 z-10 overflow-hidden" id="home">
      
      {/* Subtle Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-8 text-xs font-mono text-zinc-300 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
        <span>Computer Science Undergrad • Creative Developer</span>
      </motion.div>

      {/* Main Title & Typewriter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="max-w-5xl relative"
      >
        {/* Ambient Starlight Flare */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent blur-2xl pointer-events-none" />

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-black tracking-tighter leading-none mb-4">
          <span className="metallic-text drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            RAHUL
          </span>{' '}
          <span className="metallic-indigo drop-shadow-[0_4px_30px_rgba(99,102,241,0.25)]">
            SAINI
          </span>
        </h1>

        {/* Dynamic Typewriter Role */}
        <div className="h-10 flex items-center justify-center text-base sm:text-xl md:text-2xl font-light mb-4">
          <span className="text-indigo-400 font-mono text-sm sm:text-base mr-2">&gt;</span>
          <span className="text-zinc-400 font-mono text-sm sm:text-base">Focus: </span>
          <span className="font-semibold text-white tracking-wide ml-1.5">{currentWord}</span>
          <span className="w-[2px] h-5 bg-sky-400 ml-1.5 animate-pulse"></span>
        </div>

        {/* Interactive 3D Draggable Celestial Core */}
        {mounted && (
          <div className="w-full max-w-xs h-40 mx-auto my-3 relative group cursor-grab active:cursor-grabbing">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-zinc-400 group-hover:text-sky-300 transition-colors pointer-events-none select-none">
              <MousePointer size={11} className="text-sky-400 animate-pulse" />
              <span>INTERACTIVE 3D • DRAG TO ROTATE</span>
            </div>
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <pointLight position={[0, 0, 0]} intensity={1.5} color="#818cf8" />
              <InteractiveDraggableCore />
            </Canvas>
          </div>
        )}

        {/* Clean Editorial Subtitle */}
        <p className="max-w-2xl mx-auto text-zinc-300/80 text-sm sm:text-base font-light leading-relaxed mb-8 px-4">
          Passionate about crafting interactive web experiences, modern user interfaces, and creative digital code. Currently studying Computer Science and building projects with Next.js, Three.js, and Python.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="#projects"
            onClick={() => playClick()}
            onMouseEnter={playHover}
            className="px-8 py-3.5 rounded-full btn-tech-primary text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-2xl transition-all duration-300 hover:border-indigo-400/60"
          >
            <span>Explore Projects</span>
            <ArrowDown size={14} className="text-indigo-400" />
          </a>

          <a
            href="#contact"
            onClick={() => playClick()}
            onMouseEnter={playHover}
            className="px-7 py-3.5 rounded-full glass-panel hover:border-white/25 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all shadow-md"
          >
            <span>Contact Me</span>
          </a>
        </div>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <a
            href="https://github.com/Rahulsaini356"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="p-2.5 rounded-full glass-panel hover:border-white/25 text-zinc-400 hover:text-white transition-all"
            title="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/rahul-saini-041306404/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="p-2.5 rounded-full glass-panel hover:border-white/25 text-zinc-400 hover:text-white transition-all"
            title="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="mailto:rahulsainirs029@gmail.com"
            onMouseEnter={playHover}
            className="p-2.5 rounded-full glass-panel hover:border-white/25 text-zinc-400 hover:text-white transition-all"
            title="Email"
          >
            <MailIcon />
          </a>
        </div>
      </motion.div>
      
      {/* Scroll Down Cue */}
      <motion.a 
        href="#about"
        onMouseEnter={playHover}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group cursor-pointer"
        aria-label="Scroll to About"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">EXPLORE</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-white/40 transition-colors shadow-sm">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-sky-400"
          />
        </div>
      </motion.a>
    </section>
  );
}
