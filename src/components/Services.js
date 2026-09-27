'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Sparkles, Cpu, Check, ArrowUpRight } from 'lucide-react';
import { playHover, playClick } from '@/utils/audio';

const services = [
  {
    icon: <Monitor size={22} className="text-sky-400" />,
    badge: "FRONTEND",
    title: "Modern Web Engineering",
    tagline: "Fast, responsive web applications built with Next.js & React.",
    description: "Designing and developing responsive, accessible web software using modern component architectures, fluid layout systems, and clean code principles.",
    points: [
      "Responsive design across mobile, tablet, and desktop",
      "Next.js App Router, Server Components & SEO",
      "Tactile micro-interactions with Framer Motion",
      "Clean CSS architecture with modern Tailwind CSS"
    ],
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "JavaScript ES6+"]
  },
  {
    icon: <Sparkles size={22} className="text-indigo-400" />,
    badge: "CREATIVE 3D",
    title: "Interactive 3D & WebGL",
    tagline: "Engaging 3D canvases, shaders, and particle systems.",
    description: "Elevating web interfaces beyond flat pages by incorporating real-time 3D graphics, Three.js geometries, and GPU-accelerated visual experiments.",
    points: [
      "Interactive 3D models with mouse & scroll tracking",
      "Custom GLSL vertex and fragment shader effects",
      "High-performance particle swarm simulations",
      "Fluid integration with React Three Fiber"
    ],
    tech: ["Three.js", "WebGL", "GLSL", "React Three Fiber"]
  },
  {
    icon: <Cpu size={22} className="text-emerald-400" />,
    badge: "DATA & LOGIC",
    title: "Python & Logic Engineering",
    tagline: "Data wrangling, automation scripts, and API pipelines.",
    description: "Writing Python routines for dataset manipulation, integrating RESTful web APIs, and applying computer science algorithms to real-world challenges.",
    points: [
      "Data analysis and cleaning with NumPy & Pandas",
      "RESTful API integration & JSON data pipelines",
      "Algorithmic problem-solving in Python & C/C++",
      "Student hackathon rapid prototyping"
    ],
    tech: ["Python", "NumPy", "Pandas", "REST APIs", "C / C++"]
  }
];

export default function Services() {
  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/[0.08]" id="services">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
              <span>03 // SPECIALIZATIONS</span>
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              WHAT I <span className="metallic-text">DO</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
            Core areas where I combine design intuition, clean frontend architecture, and technical problem-solving.
          </p>
        </div>

        {/* 3 Clean Modern Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={playHover}
              className="glass-panel p-8 rounded-2xl border border-white/[0.08] hover:border-indigo-400/40 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-indigo-300 mb-4">
                  {item.tagline}
                </p>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Focus Points */}
                <div className="space-y-2 mb-8 bg-black/30 p-4 rounded-xl border border-white/[0.04]">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {item.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
