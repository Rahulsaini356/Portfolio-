'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Sparkles, Terminal, Copy, Check, GraduationCap, MapPin, Laptop, Heart } from 'lucide-react';
import { playHover, playClick } from '@/utils/audio';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const codeSnippet = `const rahul = {
  name: "Rahul Saini",
  role: "Creative Web Developer",
  education: "1st Year B.Tech (Class of '28)",
  location: "Rajasthan, India",
  coreStack: ["Next.js", "React", "Three.js", "Python"],
  passions: ["Interactive 3D", "Clean UI/UX", "Micro-Interactions"],
  status: "Building & Learning Daily"
};`;

  const handleCopyCode = () => {
    playClick();
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen py-32 px-6 relative z-10 flex items-center justify-center" id="about">
      <div ref={ref} className="max-w-6xl w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
            <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            <span>01 // ABOUT ME</span>
            <span className="w-5 h-[1px] bg-indigo-500/50"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            CRAFTING CODE WITH <span className="metallic-text">CURIOSITY</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-3 font-light leading-relaxed">
            A 1st-year computer science undergraduate blending modern frontend engineering with interactive 3D visual experiences.
          </p>
        </motion.div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Box 1: Story & Persona (7 cols) */}
          <div className="md:col-span-7 glass-panel rounded-2xl p-7 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-4">
                <Laptop size={15} />
                <span>My Background &amp; Story</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                Building at the intersection of design and code.
              </h3>

              <div className="space-y-4 text-zinc-300 text-sm font-light leading-relaxed">
                <p>
                  Hey! I&apos;m <span className="text-white font-medium">Rahul Saini</span>, a 1st-year undergraduate student from Rajasthan, India. I fell in love with creative programming when I discovered how lines of code could come to life on the web as tactile, fluid, and memorable digital experiences.
                </p>
                <p>
                  My work centers around modern web engineering with <span className="text-sky-300 font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.05]">Next.js</span> and <span className="text-sky-300 font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.05]">React</span>, alongside creative 3D canvases powered by <span className="text-indigo-300 font-mono text-xs px-1.5 py-0.5 rounded bg-white/[0.05]">Three.js</span> and GLSL shaders.
                </p>
                <p>
                  When I&apos;m not studying engineering mathematics and computer science fundamentals, I spend my time building open-source projects, participating in student hackathons, and refining UI micro-interactions.
                </p>
              </div>
            </div>

            {/* Quick Info Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6 mt-6 border-t border-white/[0.06] text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-zinc-500 text-[10px] block">ACADEMICS</span>
                <span className="text-white font-semibold text-[11px]">1st Year B.Tech</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-zinc-500 text-[10px] block">LOCATION</span>
                <span className="text-white font-semibold text-[11px]">Rajasthan, IN</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-zinc-500 text-[10px] block">FOCUS</span>
                <span className="text-sky-300 font-semibold text-[11px]">Web &amp; 3D</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-zinc-500 text-[10px] block">STATUS</span>
                <span className="text-emerald-400 font-semibold text-[11px]">Active</span>
              </div>
            </div>
          </div>

          {/* Bento Box 2: Code Profile (5 cols) */}
          <div className="md:col-span-5 bg-[#070b13] rounded-2xl p-6 sm:p-7 border border-white/[0.08] shadow-2xl flex flex-col justify-between">
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="text-[11px] font-mono text-zinc-400 ml-1">developer.config.ts</span>
                </div>

                <button
                  onClick={handleCopyCode}
                  onMouseEnter={playHover}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-all"
                  title="Copy code snippet"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Code Content */}
              <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-300 space-y-1 py-1">
                <p><span className="text-indigo-400">const</span> <span className="text-white font-semibold">rahul</span> = &#123;</p>
                <p className="pl-4"><span className="text-sky-300">name</span>: <span className="text-emerald-300">&quot;Rahul Saini&quot;</span>,</p>
                <p className="pl-4"><span className="text-sky-300">education</span>: <span className="text-amber-200">&quot;1st Year Undergrad&quot;</span>,</p>
                <p className="pl-4"><span className="text-sky-300">location</span>: <span className="text-emerald-300">&quot;Rajasthan, India&quot;</span>,</p>
                <p className="pl-4"><span className="text-sky-300">coreStack</span>: [</p>
                <p className="pl-8 text-indigo-300">&quot;Next.js 16&quot;, &quot;React 19&quot;,</p>
                <p className="pl-8 text-indigo-300">&quot;Three.js&quot;, &quot;Python&quot;</p>
                <p className="pl-4">],</p>
                <p className="pl-4"><span className="text-sky-300">loves</span>: [</p>
                <p className="pl-8 text-zinc-400">&quot;Interactive 3D Web&quot;,</p>
                <p className="pl-8 text-zinc-400">&quot;Tactile Micro-Interactions&quot;</p>
                <p className="pl-4">],</p>
                <p className="pl-4"><span className="text-sky-300">openToCollabs</span>: <span className="text-emerald-400">true</span></p>
                <p>&#125;;</p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Ready to build</span>
              </span>
              <span>Class of 2028</span>
            </div>
          </div>

          {/* Bottom 3 Cards: Core Pillars */}
          {[
            {
              icon: <Sparkles size={20} className="text-sky-400" />,
              title: "Creative 3D Experiences",
              desc: "Infusing web interfaces with custom Three.js scenes, GPU-accelerated particle fields, and smooth Framer Motion spring physics."
            },
            {
              icon: <Code2 size={20} className="text-indigo-400" />,
              title: "Modern Web Engineering",
              desc: "Crafting fast, responsive web software using Next.js App Router, React 19, and Tailwind CSS with obsessive attention to UI craft."
            },
            {
              icon: <GraduationCap size={20} className="text-emerald-400" />,
              title: "Foundations & Growth",
              desc: "Deepening my knowledge of data structures, algorithms, discrete mathematics, and Python data manipulation through consistent practice."
            }
          ].map((card, i) => (
            <div
              key={i}
              onMouseEnter={playHover}
              className="md:col-span-4 glass-panel rounded-2xl p-6 border border-white/[0.08] hover:border-indigo-400/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
