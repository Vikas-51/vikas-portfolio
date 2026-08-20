"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Layers, Brain, CheckSquare, Palette, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    title: "SwellSign",
    category: "SaaS Platform",
    desc: "Production-grade, multi-step e-signature platform. Built a fully responsive signing flow with 60fps GSAP micro-animations, state-driven wizard flow, and comprehensive SEO infrastructure.",
    live: "https://swellsign.com",
    icon: <CheckSquare className="w-5 h-5" />,
    tech: ["Next.js", "GSAP", "Tailwind CSS", "SEO", "Responsive UI"],
    highlight: "60fps transitions across all breakpoints",
    accent: "orange",
  },
  {
    title: "Sukrut Website",
    category: "Business Website",
    desc: "Official corporate site for Sukrut Associates using Next.js App Router + SSR. Integrated structured Open Graph schemas, semantic HTML5, and optimised Core Web Vitals for advanced SEO.",
    live: "https://thesukrut.com",
    icon: <Layers className="w-5 h-5" />,
    tech: ["Next.js SSR", "GSAP", "Tailwind CSS", "Open Graph", "Structured Data"],
    highlight: "Scroll-triggered layouts & SSR performance",
    accent: "violet",
  },
  {
    title: "Prototype Studio",
    category: "AI Tool",
    desc: "Creative playground converting Figma layouts to Next.js code. Integrated Claude AI as backend intelligence to build an AI-augmented development environment for rapid prototyping.",
    live: "#",
    icon: <Brain className="w-5 h-5" />,
    tech: ["Next.js", "Claude AI API", "GSAP", "Figma Design", "Tailwind CSS"],
    highlight: "Real AI-augmented developer environment",
    accent: "amber",
  },
];

const FIGMA_DESIGNS = [
  { name: "Lionstone", type: "Fintech Platform", emoji: "🏦", url: "https://www.figma.com/design/zSiGwmrF2YTFp8wvzbp0yT/Lionstone?node-id=0-1&t=1zVQ50SQzqZkvc4l-1" },
  { name: "Gene ID", type: "Medical Diagnostics", emoji: "🧬", url: "https://www.figma.com/design/cq1Z2DhPTAQR52ztUWhjPU/GeneID?node-id=0-1&t=KMcF4JRr71Ng0QPp-1" },
  { name: "CRC Billit", type: "Invoicing SaaS", emoji: "📄", url: "https://www.figma.com/design/qvVOpBp5EmjjzYwLMWhOzg/CRC-Billit?node-id=0-1&t=wkKcuGbISfatisrO-1" },
  { name: "Touchpoint", type: "CRM Application", emoji: "📱", url: "https://www.figma.com/design/UZZlRUStcpQjCA2i3MdknB/TouchPoint?node-id=0-1&t=uAZZB6zhOeNRojAd-1" },
];

const ACCENT_MAP = {
  orange: {
    iconBg: "bg-orange-500/15 text-orange-400",
    bar: "from-orange-500 to-amber-400",
    highlight: "text-orange-400",
    border: "hover:border-orange-500/40",
    link: "text-orange-400 hover:text-orange-300",
  },
  violet: {
    iconBg: "bg-violet-500/15 text-violet-400",
    bar: "from-violet-500 to-indigo-400",
    highlight: "text-violet-400",
    border: "hover:border-violet-500/40",
    link: "text-violet-400 hover:text-violet-300",
  },
  amber: {
    iconBg: "bg-amber-500/15 text-amber-400",
    bar: "from-amber-500 to-orange-400",
    highlight: "text-amber-400",
    border: "hover:border-amber-500/40",
    link: "text-amber-400 hover:text-amber-300",
  },
};

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".proj-reveal", {
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" }),
        start: "top 90%",
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Pure CSS tilt — no GSAP plugin needed
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(800px) rotateX(${-(y / rect.height) * 6}deg) rotateY(${(x / rect.width) * 6}deg) scale(1.01)`;
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <section id="projects" ref={containerRef} className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <span className="section-badge bg-orange-500/10 border border-orange-500/30 text-orange-400">
          ✦ Works
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-md text-sm sm:text-base">
          Client applications, interactive UIs, and AI-powered developer tools.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {PROJECTS.map((proj, idx) => {
          const a = ACCENT_MAP[proj.accent];
          return (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d", transition: "transform 0.3s ease-out" }}
              className={`proj-reveal opacity-0 translate-y-8 glass rounded-2xl shadow-lg flex flex-col h-full overflow-hidden ${a.border} transition-[border-color] duration-300 cursor-default`}
            >
              {/* Top color bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${a.bar}`} />

              <div className="flex flex-col gap-4 p-6 flex-1">
                {/* Header row */}
                <div className="flex justify-between items-start">
                  <div className={`p-2.5 rounded-xl ${a.iconBg}`}>{proj.icon}</div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border border-slate-700/50 px-2 py-0.5 rounded-full bg-slate-800/60">
                    {proj.category}
                  </span>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-black text-white">{proj.title}</h3>
                  <p className={`text-xs font-bold ${a.highlight}`}>⚡ {proj.highlight}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed flex-1">{proj.desc}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800/70 text-slate-300 border border-slate-700/40">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {proj.live !== "#" ? (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${a.link} transition-colors w-fit mt-1`}
                  >
                    Visit Live Site <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-slate-500 italic mt-1">Internal Tool</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══════ FIGMA DESIGNS SECTION ═══════ */}
      <div className="border-t border-slate-700/40 pt-16 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center text-center gap-3">
          <span className="section-badge bg-violet-500/10 border border-violet-500/30 text-violet-400">
            <Palette className="w-3.5 h-3.5" /> Figma Prototypes
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            UI/UX <span className="gradient-text">Client Designs</span>
          </h3>
          <p className="text-sm text-slate-400 max-w-md">
            Complete Figma-to-code design pipelines for 4 real client products — prototyped in Figma and translated to responsive React + Tailwind components.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl w-full">
          {FIGMA_DESIGNS.map((design, idx) => (
            <a
              key={idx}
              href={design.url}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-reveal opacity-0 translate-y-8 glass p-5 rounded-2xl flex flex-col items-center text-center gap-2 hover:border-violet-500/40 hover:-translate-y-1 hover:bg-violet-500/5 transition-all duration-300 shadow-md group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl relative z-10">{design.emoji}</span>
              <h4 className="text-sm font-black text-white relative z-10">{design.name}</h4>
              <p className="text-[11px] text-slate-400 font-semibold relative z-10">{design.type}</p>
              
              <div className="mt-2 text-[10px] font-bold text-violet-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                View Figma <ArrowUpRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
