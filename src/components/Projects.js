'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Check, Code, Terminal, Layers, Globe, LayoutGrid, List, Sparkles } from 'lucide-react';
import { playHover, playClick } from '@/utils/audio';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const projects = [
  {
    id: "01",
    title: "CineStream",
    subtitle: "Modern Next.js Streaming & Discovery Platform",
    category: "Full-Stack Web",
    url: "https://cinestream-core.io",
    tagline: "High-performance streaming portal with dynamic TMDB caching & video modals",
    description: "A cinematic entertainment streaming web app designed with sub-second page transitions, dynamic TMDB API movie queries, instant search indexing, and custom video trailer modals.",
    stack: ["Next.js 16", "React 19", "Tailwind CSS", "REST API", "Framer Motion"],
    highlights: [
      "Sub-second page navigation powered by Next.js 16 App Router",
      "Dynamic movie & TV discovery consuming live TMDB REST endpoints",
      "Responsive trailer modal player with keyboard escape controls"
    ],
    github: "https://github.com/Rahulsaini356/cinestream-",
    demo: "https://github.com/Rahulsaini356/cinestream-",
    gradient: "from-indigo-600/30 via-slate-900 to-[#070b13]",
    accent: "#6366f1",
    badge: "FEATURED PROJECT"
  },
  {
    id: "02",
    title: "Aura Apparel",
    subtitle: "Minimalist E-Commerce Shopping Experience",
    category: "Frontend & State",
    url: "https://aura-apparel.store",
    tagline: "Minimalist fashion store with fluid cart drawer mechanics and smooth transitions",
    description: "An elegant e-commerce interface featuring high-resolution image previews, persistent shopping drawer with gesture dismiss, dynamic product filters, and responsive design.",
    stack: ["React 19", "Framer Motion", "Tailwind CSS", "Context API"],
    highlights: [
      "Smooth slide-out cart drawer with gesture dismiss and state persistence",
      "Interactive category filters with instant client-side re-indexing",
      "Optimized WebP asset delivery with zero layout shifts"
    ],
    github: "https://github.com/Rahulsaini356/CLOTHING-STORE-SITE",
    demo: "https://github.com/Rahulsaini356/CLOTHING-STORE-SITE",
    gradient: "from-sky-600/30 via-slate-900 to-[#070b13]",
    accent: "#38bdf8",
    badge: "MODERN COMMERCE"
  },
  {
    id: "03",
    title: "Atmos Weather",
    subtitle: "Live Weather Analytics & Forecast Dashboard",
    category: "Web Application",
    url: "https://atmos-telemetry.app",
    tagline: "Live atmospheric mapping and 7-day predictive weather forecasts",
    description: "An intuitive meteorology web app delivering real-time weather analytics, 7-day hourly forecasts, wind velocity vectors, UV index indicators, and geolocation city tracking.",
    stack: ["JavaScript ES6+", "OpenWeather API", "CSS Grid", "HTML5"],
    highlights: [
      "Live weather condition icons synced with current solar conditions",
      "Interactive 24-hour temperature and wind velocity breakdown",
      "Persistent user preference storage with instant local caching"
    ],
    github: "https://github.com/Rahulsaini356/weather-app",
    demo: "https://github.com/Rahulsaini356/weather-app",
    gradient: "from-emerald-600/30 via-slate-900 to-[#070b13]",
    accent: "#10b981",
    badge: "WEATHER ANALYTICS"
  },
  {
    id: "04",
    title: "Cinematic Studio",
    subtitle: "Dark Editorial Portfolio & Video Showcase",
    category: "Creative Frontend",
    url: "https://visual-studio.agency",
    tagline: "High-contrast dark showcase crafted for cinematic creators and videographers",
    description: "A dark-mode editorial showcase optimized for video creators and visual artists, featuring custom video players, typography pacing, and micro-interactions.",
    stack: ["HTML5 Canvas", "Advanced CSS3", "JavaScript ES6+", "Responsive Media"],
    highlights: [
      "Custom video frame scrubbing with high-performance canvas",
      "Smooth layout transitions between showreels and project details",
      "Monochromatic typography rhythm inspired by editorial magazines"
    ],
    github: "https://github.com/Rahulsaini356/EDITING-SITE",
    demo: "https://github.com/Rahulsaini356/EDITING-SITE",
    gradient: "from-violet-600/30 via-slate-900 to-[#070b13]",
    accent: "#a855f7",
    badge: "CREATIVE SHOWCASE"
  }
];

export default function Projects() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'editorial'

  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/[0.08]" id="projects">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with View Switcher */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
              <span>05 // SELECTED WORK</span>
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              FEATURED <span className="metallic-text">PROJECTS</span>
            </h2>
          </div>

          {/* Switcher Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090d16] border border-white/[0.08] shadow-inner">
            <button
              onClick={() => {
                playClick();
                setViewMode('grid');
              }}
              onMouseEnter={playHover}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Grid View</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setViewMode('editorial');
              }}
              onMouseEnter={playHover}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                viewMode === 'editorial'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List size={13} />
              <span>List View</span>
            </button>
          </div>
        </div>

        {/* View 1: 2x2 Showcase Grid */}
        {viewMode === 'grid' && (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onMouseEnter={playHover}
                className="glass-panel rounded-3xl border border-white/[0.1] hover:border-indigo-400/40 transition-all flex flex-col justify-between overflow-hidden group shadow-2xl"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="p-6 bg-[#05070e] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                      <span className="text-[11px] text-zinc-500 ml-2 font-mono">{proj.url}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-sky-300 border border-white/[0.06]">
                      {proj.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 sm:p-8">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300 uppercase mb-3">
                      <Sparkles size={10} />
                      <span>{proj.badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 group-hover:text-indigo-200 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mb-4">
                      {proj.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                      {proj.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6 bg-black/30 p-4 rounded-xl border border-white/[0.04]">
                      {proj.highlights.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.stack.map((stk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.06] text-zinc-400"
                        >
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-[#05070e]/80 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl btn-tech-primary text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md group/btn"
                  >
                    <span>Live Preview</span>
                    <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl glass-panel hover:border-white/20 text-zinc-400 hover:text-white transition-all"
                    title="View Source Code"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View 2: Editorial Magazine List */}
        {viewMode === 'editorial' && (
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                onMouseEnter={playHover}
                className="group p-6 sm:p-8 rounded-2xl glass-panel hover:border-indigo-400/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start md:items-center gap-6">
                  <span className="font-mono text-base text-zinc-600 group-hover:text-sky-400 transition-colors">
                    0{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-black text-white group-hover:text-indigo-200 transition-colors tracking-tight">
                        {proj.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
                      {proj.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                  <div className="hidden sm:flex items-center gap-2">
                    {proj.stack.slice(0, 3).map((stk, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-mono text-zinc-500 bg-black/40 px-2 py-1 rounded border border-white/[0.05]">
                        {stk}
                      </span>
                    ))}
                  </div>

                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 flex items-center justify-center transition-all"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
