'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Code2, Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { playHover } from '@/utils/audio';

const timelineEvents = [
  {
    period: "2024 — Present",
    badge: "CURRENT FOCUS",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    role: "B.Tech Undergraduate (1st Year)",
    institution: "Engineering College, Rajasthan",
    description: "Pursuing my Bachelor of Technology degree. Balancing academic engineering foundations (mathematics, C/C++, basic data structures) with self-directed building in modern full-stack web engineering and interactive 3D WebGL.",
    highlights: [
      "Studying engineering mathematics, computer systems, and algorithmic problem-solving",
      "Architected CineStream (Next.js streaming app) and Aura Apparel (React e-commerce)",
      "Deepening practical knowledge of Python, NumPy, and Pandas for data manipulation",
      "Experimenting with Three.js canvases, React Three Fiber, and custom GLSL fragment shaders"
    ],
    skills: ["Next.js 16", "React 19", "Three.js", "Python", "C / C++", "Tailwind CSS"],
    icon: <GraduationCap size={18} className="text-sky-400" />
  },
  {
    period: "2023 — 2024",
    badge: "SELF-TAUGHT",
    badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/25",
    role: "Creative Web & Frontend Exploration",
    institution: "Independent Project Lab",
    description: "Immersed myself in modern web technologies through project-based learning. Transitioned from core HTML/CSS to JavaScript ES6+, React component architectures, REST API integration, and Framer Motion micro-interactions.",
    highlights: [
      "Learned component lifecycles, state management, and reusable UI architectures with React",
      "Built real-time weather analytics application consuming OpenWeather geolocation APIs",
      "Mastered responsive design with Tailwind CSS, Flexbox, CSS Grid, and dark-mode themes",
      "Adopted Git version control, semantic commits, and continuous deployment workflows on Vercel"
    ],
    skills: ["React", "JavaScript ES6+", "Tailwind CSS", "REST APIs", "Git & GitHub"],
    icon: <Code2 size={18} className="text-indigo-400" />
  },
  {
    period: "2022 — 2023",
    badge: "FOUNDATIONS",
    badgeColor: "text-zinc-400 bg-zinc-500/10 border-zinc-500/25",
    role: "Senior Secondary (PCM Science)",
    institution: "Senior Secondary Schooling, Rajasthan",
    description: "Completed higher secondary education with a strong analytical focus on Physics, Chemistry, and Mathematics (PCM). Built the mathematical foundations that ignited my passion for computer science.",
    highlights: [
      "Focused study on calculus, vectors, algebra, probability, and analytical geometry",
      "First exposure to programming logic, algorithms, and algorithmic thinking with basic Python",
      "Secured admission into Bachelor of Technology engineering program"
    ],
    skills: ["Mathematics", "Physics", "Python Basics", "Analytical Logic"],
    icon: <Briefcase size={18} className="text-emerald-400" />
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/[0.08]" id="experience">
      <div ref={ref} className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
            <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            <span>02 // EDUCATION &amp; JOURNEY</span>
            <span className="w-5 h-[1px] bg-indigo-500/50"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            MY JOURNEY &amp; <span className="metallic-indigo">EDUCATION</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-3 font-light leading-relaxed">
            A chronological timeline of my academic milestones, self-directed exploration, and practical coding experience.
          </p>
        </motion.div>

        {/* Vertical Timeline Structure */}
        <div className="relative pl-6 sm:pl-10 border-l border-white/[0.12] space-y-12">
          {timelineEvents.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onMouseEnter={playHover}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-[#06080d] border border-white/20 flex items-center justify-center group-hover:border-indigo-400 group-hover:scale-110 transition-all shadow-sm">
                <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-sky-300 transition-colors" />
              </div>

              {/* Event Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-indigo-500/30 transition-all shadow-xl group-hover:translate-x-1 duration-200">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 font-semibold">
                      {item.period}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <MapPin size={12} className="text-zinc-400" />
                    <span>Rajasthan, India</span>
                  </div>
                </div>

                {/* Role & Institution */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                    {item.role}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-zinc-400 mt-0.5">
                    {item.institution}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 mb-6 bg-black/30 p-4 rounded-xl border border-white/[0.04]">
                  {item.highlights.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                  {item.skills.map((stk, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.06] text-zinc-400"
                    >
                      {stk}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
