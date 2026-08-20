import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import MouseTracer from "../components/MouseTracer";
import QuantumBackground from "../components/QuantumBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <QuantumBackground />

      {/* Mouse glow tracer */}
      <MouseTracer />

      <Navbar />

      <main className="flex flex-col w-full relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/15 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500 font-medium select-none">
          <p>© {new Date().getFullYear()} <span className="font-bold text-white">Vikas Prajapat</span>. All rights reserved.</p>

        </div>
      </footer>
    </div>
  );
}
