"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px 0px 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el && window.lenis) {
      window.lenis.scrollTo(el, { offset: -70 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="flex items-center gap-1.5 font-black text-lg tracking-tight text-white select-none shrink-0 group"
        >
          <span className="text-amber-400 font-mono text-xl">&lt;</span>
          <span className="group-hover:text-amber-400 transition-colors">
            Vikas
          </span>
          <span className="text-slate-400 font-semibold text-sm">Prajapat</span>
          <span className="text-amber-400 font-mono text-xl">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className={`relative px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "text-amber-300 bg-amber-500/15 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3.5 shrink-0">
          <a
            href="mailto:vikasprajapat010@gmail.com"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-amber-400 hover:text-slate-950 transition-all duration-250 shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            Hire Me <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2.5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex flex-col gap-2 shadow-2xl">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className="py-2.5 px-3 rounded-lg text-sm font-bold text-slate-200 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <a
            href="mailto:vikasprajapat010@gmail.com"
            className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-sm font-bold bg-white text-slate-950"
          >
            Hire Me <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
