'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#06080d]/85 backdrop-blur-2xl py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <a href="#home" className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <span className="font-mono tracking-widest text-zinc-100">RAHUL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></span>
            <span className="font-mono tracking-widest text-zinc-400 font-light">SAINI</span>
          </a>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <p className="text-xs text-zinc-400 font-mono">
            Undergraduate Student &amp; Creative Web Developer.
          </p>
        </div>

        {/* Center: Tech Credits */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
          <span>Engineered with Next.js 16, Three.js &amp; Python</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="group flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-white/20 text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-white transition-all shadow-sm"
        >
          <span>Back to top</span>
          <ArrowUp size={13} className="group-hover:-translate-y-1 transition-transform text-sky-400" />
        </button>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 gap-2">
        <span>© {new Date().getFullYear()} Rahul Saini • Class of 2028. Built with passion &amp; code.</span>
        <span>Academic Status: 1st Year Undergrad</span>
      </div>
    </footer>
  );
}
