'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Copy, Check, Send, MapPin, Clock, Loader2, Sparkles, ArrowUpRight, ExternalLink } from 'lucide-react';
import { playHover, playClick, playBeep } from '@/utils/audio';

const GithubIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const directEmail = 'rahulsainirs029@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/rahul-saini-041306404/';
  const githubUrl = 'https://github.com/Rahulsaini356';

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClick();
    setFormStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormStatus('success');
        if (data.mailto) {
          setMailtoUrl(data.mailto);
        }
        playBeep();
      } else {
        // Fallback mailto
        const fallbackUrl = `mailto:${directEmail}?subject=${encodeURIComponent(formData.subject || `Message from ${formData.name}`)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        setMailtoUrl(fallbackUrl);
        setFormStatus('success');
        playBeep();
      }
    } catch (err) {
      console.error('Submission error:', err);
      const fallbackUrl = `mailto:${directEmail}?subject=${encodeURIComponent(formData.subject || `Message from ${formData.name}`)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      setMailtoUrl(fallbackUrl);
      setFormStatus('success');
      playBeep();
    }
  };

  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/[0.06]" id="contact">
      <div ref={ref} className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-indigo-400 font-mono mb-4">
            <span className="w-5 h-[1px] bg-indigo-500/50"></span>
            <span>06 // GET IN TOUCH</span>
            <span className="w-5 h-[1px] bg-indigo-500/50"></span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tight">
            LET&apos;S <span className="metallic-indigo">CONNECT</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Interested in collaborating on student hackathons, open-source projects, modern web interfaces, or discussing technology? Send me a message below.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {/* Email Card with Copy Action */}
          <div className="glass-panel p-5 rounded-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3 text-indigo-400">
                <Mail size={18} />
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={playHover}
                  className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors text-[11px] flex items-center gap-1.5 font-mono text-zinc-400"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Direct Email</div>
              <a href={`mailto:${directEmail}`} onMouseEnter={playHover} className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors break-all">
                {directEmail}
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="glass-panel p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-zinc-400">
                <MapPin size={18} className="text-sky-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]"></span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Location</div>
              <div className="text-sm font-semibold text-white">
                Rajasthan, India
              </div>
            </div>
          </div>

          {/* Availability Card */}
          <div className="glass-panel p-5 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 text-emerald-400">
                <Clock size={18} />
                <span className="font-mono text-[10px] text-zinc-500">UTC +05:30</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Status</div>
              <div className="text-sm font-semibold text-white">
                Open for Collabs &amp; Projects
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Form Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden"
        >
          {formStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Check size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">
                MESSAGE SENT
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-6 font-light leading-relaxed">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your message has been recorded. I will reply back to <span className="text-sky-300 font-mono">{formData.email}</span> shortly.
              </p>

              {mailtoUrl && (
                <a
                  href={mailtoUrl}
                  className="mb-6 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 text-xs font-mono text-sky-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink size={13} />
                  <span>Open in Mail Client / Gmail</span>
                </a>
              )}

              <button
                onClick={() => {
                  setFormStatus('idle');
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-5 py-2 rounded-full btn-tech-primary text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Your Name <span className="text-indigo-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Alex Sharma" 
                    className="w-full bg-[#070a10] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-400/60 focus:shadow-[0_0_16px_rgba(99,102,241,0.2)] transition-all font-light"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address <span className="text-indigo-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com" 
                    className="w-full bg-[#070a10] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-400/60 focus:shadow-[0_0_16px_rgba(99,102,241,0.2)] transition-all font-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="E.g. Hackathon Collab / Project Inquiry" 
                  className="w-full bg-[#070a10] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-400/60 focus:shadow-[0_0_16px_rgba(99,102,241,0.2)] transition-all font-light"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  Your Message <span className="text-indigo-400">*</span>
                </label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, ideas, or how we can collaborate..." 
                  className="w-full bg-[#070a10] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-400/60 focus:shadow-[0_0_16px_rgba(99,102,241,0.2)] transition-all font-light resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-zinc-500">
                  Direct to {directEmail} • Quick Response
                </span>
                
                <button 
                  type="submit"
                  disabled={formStatus === 'sending'}
                  onMouseEnter={playHover}
                  className="w-full sm:w-auto px-8 py-3 btn-tech-primary text-white font-mono text-xs uppercase tracking-widest rounded-xl hover:border-indigo-400/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <Loader2 size={14} className="animate-spin text-indigo-400" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} className="text-indigo-400" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Social Connection Footer Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-14 flex flex-wrap justify-center items-center gap-3"
        >
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-white/20 text-zinc-400 hover:text-white transition-all text-xs font-mono"
          >
            <GithubIcon />
            <span>GitHub</span>
            <ArrowUpRight size={12} className="text-zinc-600" />
          </a>

          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-white/20 text-zinc-400 hover:text-white transition-all text-xs font-mono"
          >
            <LinkedinIcon />
            <span>LinkedIn</span>
            <ArrowUpRight size={12} className="text-zinc-600" />
          </a>

          <a 
            href={`mailto:${directEmail}`} 
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-white/20 text-zinc-400 hover:text-white transition-all text-xs font-mono"
          >
            <Mail size={15} className="text-indigo-400" />
            <span>{directEmail}</span>
            <ArrowUpRight size={12} className="text-zinc-600" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
