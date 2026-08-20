"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, GraduationCap, Briefcase, Award } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { val: "11M+", label: "Pro Experience" },
  { val: "60fps", label: "Smooth Animations" },
  { val: "100%", label: "Responsive" },
  { val: "SEO", label: "SSR & Schema" },
];

const CHECKLIST = [
  "Next.js App Router + SSR/SSG",
  "Scroll-Triggered GSAP Animations",
  "Figma to Responsive React",
  "Redux State & PWA Caching",
  "Semantic HTML5 & On-Page SEO",
  "Agile Sprints & Git Workflows",
];

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use ScrollTrigger with once:true so elements become visible and stay visible
      ScrollTrigger.batch(".about-reveal", {
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }),
        start: "top 88%",
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <span className="section-badge bg-orange-500/10 border border-orange-500/30 text-orange-400">
          ✦ Biography
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base">
          Bridging UI/UX precision with high-performance production engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT: Image + Quick Stats */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="about-reveal opacity-0 translate-y-8 relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden glass border border-slate-700/50 shadow-2xl">
            <Image
              src="/profile.jpg"
              alt="Vikas Prajapat"
              fill
              className="object-cover object-center grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white text-lg font-black">Vikas Prajapat</p>
              <p className="text-orange-300 text-xs font-semibold">B.E. Computer Science • Chandigarh University</p>
            </div>
          </div>

          {/* Mini Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="about-reveal opacity-0 translate-y-8 glass p-4 rounded-2xl">
              <Briefcase className="w-5 h-5 text-orange-400 mb-1.5" />
              <p className="text-[10px] text-slate-500 font-bold uppercase">Role</p>
              <p className="text-sm font-extrabold text-white">Frontend & UI/UX</p>
            </div>
            <div className="about-reveal opacity-0 translate-y-8 glass p-4 rounded-2xl">
              <Award className="w-5 h-5 text-violet-400 mb-1.5" />
              <p className="text-[10px] text-slate-500 font-bold uppercase">CGPA</p>
              <p className="text-sm font-extrabold text-white">7.81 / 10</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Bio Text + Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <h3 className="about-reveal opacity-0 translate-y-8 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Crafting smooth, <span className="text-orange-400">60fps</span> web experiences from prototype to production.
          </h3>

          <p className="about-reveal opacity-0 translate-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
            I am a Frontend Developer with 11 months of professional experience building production-grade, SEO-optimised web applications using Next.js, React.js, and GSAP. Skilled at owning the full design-to-development pipeline — from Figma prototyping and UI/UX design to responsive, performant production delivery.
          </p>

          <p className="about-reveal opacity-0 translate-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
            Shipped real client-facing products including a company website (thesukrut.com), an e-signature SaaS platform (SwellSign), and an AI-integrated web application powered by Claude AI. Comfortable working directly with clients in Agile environments and translating complex design requirements into clean, maintainable React code.
          </p>

          {/* Checklist */}
          <div className="about-reveal opacity-0 translate-y-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-2">
            {CHECKLIST.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="about-reveal opacity-0 translate-y-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-700/60">
            {STATS.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-orange-400">{s.val}</span>
                <span className="text-xs font-bold text-slate-300 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="about-reveal opacity-0 translate-y-8 glass p-5 rounded-2xl flex items-start gap-4 mt-2">
            <div className="p-3 bg-violet-500/15 text-violet-400 rounded-xl shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white">
                  B.E. Computer Science — Chandigarh University
                </h4>
                <span className="text-xs font-bold text-orange-400">2021 – 2025</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Punjab, India • CGPA: 7.81 | Class XII: 76.80% | Class X: 88.67%
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
