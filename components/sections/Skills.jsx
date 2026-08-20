"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Layout, Server, Languages, Wrench } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILL_CATEGORIES = [
  {
    title: "Frontend Development",
    icon: <Code className="w-5 h-5 text-orange-400" />,
    skills: ["React.js", "Next.js (App Router)", "SSR / SSG / ISR", "Redux Toolkit", "JavaScript (ES6+)", "GSAP Animations", "Tailwind CSS", "Bootstrap", "PWA", "On-Page SEO", "HTML5 & CSS3"],
  },
  {
    title: "UI/UX & Prototyping",
    icon: <Layout className="w-5 h-5 text-violet-400" />,
    skills: ["Figma Prototyping", "Adobe XD", "Canva", "Design-to-Code", "Responsive UI Design", "Design Systems"],
  },
  {
    title: "Backend & APIs",
    icon: <Server className="w-5 h-5 text-sky-400" />,
    skills: ["Node.js", "FastAPI (Basic)", "RESTful APIs", "JSON Integrations", "Claude AI API"],
  },
  {
    title: "Languages",
    icon: <Languages className="w-5 h-5 text-amber-400" />,
    skills: ["JavaScript (ES6+)", "C++", "Python", "DSA Fundamentals"],
  },
  {
    title: "Tools & Workflows",
    icon: <Wrench className="w-5 h-5 text-rose-400" />,
    skills: ["Git & GitHub", "Vite", "Webpack", "VS Code", "Agile / Jira", "Code Reviews"],
  },
];

export default function Skills() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".skill-reveal", {
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" }),
        start: "top 90%",
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <span className="section-badge bg-orange-500/10 border border-orange-500/30 text-orange-400">
          ✦ Technical Arsenal
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Skills & <span className="gradient-text">Technologies</span>
        </h2>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base">
          Languages, frameworks, design tools, and workflows I use daily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 text-left">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className={`skill-reveal opacity-0 translate-y-8 glass p-6 rounded-2xl shadow-lg hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 ${
              idx === 4 ? "md:col-span-2" : "md:col-span-1"
            } ${idx < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-700/50">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">{cat.icon}</div>
              <h3 className="text-base font-extrabold text-white">{cat.title}</h3>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/70 text-slate-200 border border-slate-700/50 hover:bg-orange-500/15 hover:text-orange-300 hover:border-orange-500/30 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
