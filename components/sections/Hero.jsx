"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el && window.lenis) window.lenis.scrollTo(el, { offset: -70 });
    else if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 max-w-6xl mx-auto z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* LEFT — Text */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left order-2 lg:order-1">

          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            Available for Frontend &amp; UI/UX Roles
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500 font-bold">
              Hello, I am
            </span>
            <h1 className="hero-name text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
              <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">Vikas</span>{" "}
              <span className="gradient-text">Prajapat</span>
            </h1>
          </div>

          {/* Subtitle */}
          <h2 className="hero-sub text-lg sm:text-xl md:text-2xl font-bold text-slate-200">
            Frontend Developer &amp; UI/UX Designer
            <span className="block text-sm sm:text-base font-semibold text-orange-400 mt-1">
              ⚡ 11 Months Pro Experience • Next.js • React.js • Animation • Api Integration
            </span>
          </h2>

          {/* Summary */}
          <p className="hero-desc text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Full design-to-development pipeline — Figma prototyping to performant, 60fps, SEO-optimised production web apps. Shipped SwellSign (SaaS), Sukrut corporate site, and an AI-integrated system for real clients.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#projects"
              onClick={(e) => scrollTo(e, "#projects")}
              className="hero-btn group flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold border border-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 cursor-pointer"
            >
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="hero-btn flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold glass text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Let&apos;s Connect <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 pt-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Find me →</span>
            {[
              { href: "https://github.com/Vikas-51", icon: <Github className="w-4.5 h-4.5" />, label: "GitHub" },
              { href: "https://linkedin.com/in/vikas-prajapat", icon: <Linkedin className="w-4.5 h-4.5" />, label: "LinkedIn" },
              { href: "mailto:vikasprajapat010@gmail.com", icon: <Mail className="w-4.5 h-4.5" />, label: "Email" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="hero-social p-3 rounded-xl glass text-slate-300 hover:text-orange-400 hover:border-orange-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Profile Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="hero-img-card relative w-72 sm:w-80">
            {/* Glow behind card */}
            <div className="absolute -inset-3 bg-gradient-to-r from-orange-500/30 to-violet-500/30 rounded-3xl blur-2xl -z-10" />

            {/* Badge: Experience */}
            <div className="absolute -top-4 -left-5 glass px-3.5 py-2 rounded-2xl shadow-xl z-20 flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Experience</p>
                <p className="text-xs font-black text-white">11 Months Pro</p>
              </div>
            </div>

            {/* Badge: Pipeline */}
            <div className="absolute -bottom-4 -right-5 glass px-3.5 py-2 rounded-2xl shadow-xl z-20 flex items-center gap-2">
              <span className="text-lg">🎨</span>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400">Pipeline</p>
                <p className="text-xs font-black text-white">Figma → React</p>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden glass border border-slate-700/50 shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="Vikas Prajapat"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 288px, 320px"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-5">
                <p className="text-white font-extrabold text-lg">Vikas Prajapat</p>
                <p className="text-orange-300 text-xs font-semibold mt-0.5">Jaipur, Rajasthan, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
