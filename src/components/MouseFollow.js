'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseFollow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run if device supports fine pointer (mouse/trackpad)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Precision cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5 }}
        transition={{ type: "spring", stiffness: 700, damping: 35, mass: 0.15 }}
      />
      {/* Precision spacecraft HUD reticle ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-sky-400/30 pointer-events-none z-[9998] flex items-center justify-center"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.4 }}
      >
        {/* Reticle ticks */}
        <span className="absolute -top-1 w-[1px] h-1.5 bg-sky-400/40"></span>
        <span className="absolute -bottom-1 w-[1px] h-1.5 bg-sky-400/40"></span>
        <span className="absolute -left-1 w-1.5 h-[1px] bg-sky-400/40"></span>
        <span className="absolute -right-1 w-1.5 h-[1px] bg-sky-400/40"></span>
      </motion.div>
      {/* Soft deep space starlight illumination */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[110px] pointer-events-none z-[1]"
        animate={{ x: mousePosition.x - 250, y: mousePosition.y - 250 }}
        transition={{ type: "spring", stiffness: 70, damping: 25, mass: 0.8 }}
      />
    </div>
  );
}
