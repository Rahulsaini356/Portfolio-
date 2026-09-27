import VFXBackground from '@/components/VFXBackground';
import MouseFollow from '@/components/MouseFollow';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-[#06080d] text-slate-100 font-sans selection:bg-indigo-600/40 selection:text-white min-h-screen">
      <MouseFollow />
      <Navbar />
      <VFXBackground />
      
      <div className="relative z-10">
        <Hero />
        <Dashboard />
        <About />
        <Experience />
        <Services />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
