"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin, Code2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERIENCES = [
  {
    role: "Frontend Developer & UI/UX Developer",
    company: "Sukrut Associates",
    location: "Jaipur, India",
    period: "Aug 2025 – Jul 2026",
    badge: "Full-Time • 11 Months",
    bullets: [
      { title: "thesukrut.com", desc: "Built with Next.js App Router + SSR; implemented on-page SEO (semantic HTML5, meta, Open Graph, structured data) to improve crawlability and search visibility." },
      { title: "SwellSign (swellsign.com)", desc: "Engineered multi-step e-signature flow with GSAP micro-animations — 60fps transitions across all device breakpoints." },
      { title: "Prototype Studio", desc: "Converted Figma designs into a Next.js production app; integrated Claude AI as the backend intelligence layer — shipped a real AI-augmented product." },
      { title: "Figma UI/UX Prototyping", desc: "Prototyped UI/UX in Figma for 4 client products (Lionstone, Gene ID, CRC Billit, Touchpoint); translated into responsive React + Tailwind CSS components." },
      { title: "Centralised State & PWA", desc: "Managed Redux centralised state; implemented PWA features (service workers, offline caching, web manifest) for improved load performance." },
    ],
    stack: ["Next.js (App Router)", "React.js", "Redux", "JavaScript (ES6+)", "Tailwind CSS", "GSAP", "Figma", "PWA", "SEO"],
  },
  {
    role: "React.js Intern",
    company: "Celebal Technologies Pvt. Ltd.",
    location: "Remote",
    period: "Jun 2025 – Aug 2025",
    badge: "Summer Internship",
    bullets: [
      { title: "Production-style projects", desc: "Built 3 production-style projects (KanBan Board, Spotify Clone, E-Commerce Store) using React.js — component-based architecture, dynamic routing, REST API integration." },
      { title: "Agile Development workflows", desc: "Participated in Agile sprints, code reviews, and branching workflows using Git/GitHub with senior engineers." },
    ],
    stack: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "REST APIs", "Git", "Webpack", "Node.js"],
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".exp-reveal", {
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }),
        start: "top 90%",
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <span className="section-badge bg-orange-500/10 border border-orange-500/30 text-orange-400">
          <Briefcase className="w-3.5 h-3.5" /> Career Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base">
          Engineering real client web applications and SaaS platforms.
        </p>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto text-left">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="exp-reveal opacity-0 translate-y-8 glass p-6 sm:p-8 rounded-3xl shadow-xl hover:border-orange-500/40 transition-all duration-300"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-700/50 pb-5">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-orange-500/15 text-orange-300 border border-orange-500/30">
                    {exp.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {exp.location}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{exp.role}</h3>
                <p className="text-sm font-bold text-orange-400">{exp.company}</p>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/50 text-xs font-bold text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                {exp.period}
              </div>
            </div>

            {/* Bullets */}
            <div className="flex flex-col gap-3 py-5">
              {exp.bullets.map((b, bIdx) => (
                <div key={bIdx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                  <p className="text-sm leading-relaxed text-slate-300">
                    <span className="font-extrabold text-white">{b.title}: </span>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50">
              {exp.stack.map((tech, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800/80 text-slate-300 border border-slate-700/50 flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-orange-400" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
