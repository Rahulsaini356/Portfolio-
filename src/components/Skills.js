'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Terminal, Cpu, Layers, GitBranch, Layout, Box } from 'lucide-react';
import { playHover } from '@/utils/audio';

const skillGroups = [
  {
    category: "Frontend & Web",
    icon: <Layout size={18} className="text-sky-400" />,
    description: "Core frameworks and styling tools for building modern web applications.",
    skills: [
      { name: "Next.js 16", tag: "App Router" },
      { name: "React 19", tag: "Components & Hooks" },
      { name: "Tailwind CSS v4", tag: "Responsive Design" },
      { name: "JavaScript ES6+", tag: "Modern Syntax" },
      { name: "HTML5 & CSS3", tag: "Semantic Markup" }
    ]
  },
  {
    category: "3D & Motion",
    icon: <Sparkles size={18} className="text-indigo-400" />,
    description: "Interactive canvas graphics, particle simulations, and UI physics.",
    skills: [
      { name: "Three.js", tag: "3D Canvases" },
      { name: "WebGL & GLSL", tag: "Fragment Shaders" },
      { name: "React Three Fiber", tag: "Declarative 3D" },
      { name: "Framer Motion", tag: "Spring Physics" }
    ]
  },
  {
    category: "Languages & Core",
    icon: <Code2 size={18} className="text-emerald-400" />,
    description: "Programming languages and core computer science fundamentals.",
    skills: [
      { name: "Python", tag: "Data & Scripting" },
      { name: "NumPy & Pandas", tag: "Data Analysis" },
      { name: "C / C++ Basics", tag: "Data Structures" },
      { name: "Problem Solving", tag: "Algorithmic Logic" }
    ]
  },
  {
    category: "Tools & Workflow",
    icon: <GitBranch size={18} className="text-purple-400" />,
    description: "Version control, development environment, and deployment pipelines.",
    skills: [
      { name: "Git & GitHub", tag: "Version Control" },
      { name: "VS Code", tag: "Editor Setup" },
      { name: "Vercel", tag: "Continuous Deployment" },
      { name: "REST APIs", tag: "Integration & Fetch" }
    ]
  }
];

export default function Skills() {
  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/[0.08]" id="skills">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
              <span>04 // TECHNICAL STACK</span>
              <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              SKILLS &amp; <span className="metallic-indigo">TECHNOLOGIES</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
            Languages, libraries, and tools I use to design, develop, and deploy software.
          </p>
        </div>

        {/* 4 Skill Category Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className="glass-panel p-7 rounded-2xl border border-white/[0.08] hover:border-indigo-400/30 transition-all shadow-xl"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  {group.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {group.category}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    {group.description}
                  </p>
                </div>
              </div>

              {/* Skill Chips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    onMouseEnter={playHover}
                    className="p-3 rounded-xl bg-black/40 border border-white/[0.04] hover:border-indigo-400/30 hover:bg-white/[0.03] transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {skill.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {skill.tag}
                      </div>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 group-hover:bg-sky-400 group-hover:shadow-[0_0_6px_#38bdf8] transition-all" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
