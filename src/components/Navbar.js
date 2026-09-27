'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, toggleSound, subscribeSound, playHover, playClick } from '@/utils/audio';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(isSoundEnabled());
    return subscribeSound((val) => setSoundActive(val));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scroll-spy active section detection
      const sections = ['home', 'dashboard', 'about', 'experience', 'services', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#06080d]/80 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        } px-6 md:px-12 flex justify-between items-center`}
      >
        {/* Brand Logo */}
        <a href="#home" className="group flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <span className="tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            RAHUL <span className="text-zinc-500 font-light">SAINI</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0b0f17]/70 border border-white/[0.08] backdrop-blur-xl px-3 py-1.5 rounded-full shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={playHover}
                className={`relative px-4 py-1.5 text-[11px] font-mono tracking-widest uppercase transition-all duration-200 rounded-full ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/[0.08] border border-white/15 rounded-full -z-10 shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right CTA, Sound Toggle & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Audio Equalizer Toggle Button */}
          <button
            onClick={() => toggleSound()}
            onMouseEnter={playHover}
            aria-label="Toggle Sound Effects"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
              soundActive
                ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                : 'bg-white/[0.04] border border-white/[0.08] text-zinc-500 hover:text-zinc-300 hover:border-white/20'
            }`}
            title={soundActive ? "Audio FX Active (Click to Mute)" : "Audio FX Muted (Click to Enable)"}
          >
            {soundActive ? (
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[2px] h-3 bg-indigo-400 animate-pulse" />
                <span className="w-[2px] h-2 bg-indigo-400 animate-pulse" style={{ animationDelay: '0.15s' }} />
                <span className="w-[2px] h-3.5 bg-indigo-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                <span className="w-[2px] h-1.5 bg-indigo-400 animate-pulse" style={{ animationDelay: '0.45s' }} />
              </div>
            ) : (
              <VolumeX size={13} className="text-zinc-500" />
            )}
            <span className="text-[10px] hidden sm:inline uppercase font-mono">
              {soundActive ? 'SFX ON' : 'SFX OFF'}
            </span>
          </button>

          {/* Status badge - Available for Work / Collabs */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[10px] tracking-wider uppercase">OPEN FOR COLLABS</span>
          </div>

          <a
            href="#contact"
            onMouseEnter={playHover}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase btn-tech-primary text-zinc-200 hover:text-white"
          >
            <span>Contact</span>
            <ArrowUpRight size={13} className="text-zinc-400" />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-xl glass-panel text-zinc-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-[#06080d]/95 backdrop-blur-2xl border-b border-white/[0.08] p-6 lg:hidden flex flex-col gap-4 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-xs font-mono tracking-widest uppercase transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-white/[0.08] text-white border border-white/15'
                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px]">Available for Projects & Roles</span>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl btn-tech-primary text-white font-mono text-xs uppercase tracking-widest"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
