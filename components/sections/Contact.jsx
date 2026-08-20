"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Github, Linkedin, Send, MapPin, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".contact-reveal", {
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" }),
        start: "top 90%",
        once: true,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => { setForm({ name: "", email: "", message: "" }); setSent(false); }, 4000);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-28 px-6 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <span className="section-badge bg-orange-500/10 border border-orange-500/30 text-orange-400">
          ✦ Get in Touch
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Contact <span className="gradient-text">Me</span>
        </h2>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base">
          Have an opportunity or project? Let&apos;s build something exceptional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* LEFT: Info Cards */}
        <div className="contact-reveal opacity-0 translate-y-8 lg:col-span-5 glass p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col gap-6">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Let&apos;s build something impactful.
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Open to full-time frontend roles, UI/UX engineering, and exciting collaborative projects.
          </p>

          <div className="flex flex-col gap-3">
            {/* Email */}
            <a href="mailto:vikasprajapat010@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all group">
              <div className="p-3 bg-orange-500/15 text-orange-400 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-500">Email</span>
                <span className="text-sm font-bold text-white break-all">vikasprajapat010@gmail.com</span>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+917878642960" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all group">
              <div className="p-3 bg-violet-500/15 text-violet-400 rounded-xl group-hover:bg-violet-500 group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-500">Phone / WhatsApp</span>
                <span className="text-sm font-bold text-white">+91-7878642960</span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <div className="p-3 bg-sky-500/15 text-sky-400 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-slate-500">Location</span>
                <span className="text-sm font-bold text-white">Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Socials:</span>
            <div className="flex gap-3">
              <a href="https://github.com/Vikas-51" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs font-bold text-slate-300 hover:border-orange-500/40 hover:text-orange-400 transition-all">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://linkedin.com/in/vikas-prajapat" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs font-bold text-slate-300 hover:border-violet-500/40 hover:text-violet-400 transition-all">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <div className="contact-reveal opacity-0 translate-y-8 lg:col-span-7 glass p-6 sm:p-8 rounded-3xl shadow-xl lg:h-[580px]">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-white">Message Sent!</h4>
              <p className="text-sm text-slate-400">Thank you — I will reply shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h4 className="text-xl font-black text-white">Send a Message</h4>
                <p className="text-xs text-slate-400 mt-1">Fill in your details and I will reply as soon as possible.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-name" className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Name</label>
                <input id="c-name" type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-email" className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                <input id="c-email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-msg" className="text-xs font-bold uppercase tracking-wider text-slate-400">Message</label>
                <textarea id="c-msg" required rows={4} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Hi Vikas, I'd like to discuss an opportunity..."
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all text-sm resize-none" />
              </div>

              <button type="submit"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 cursor-pointer lg:mt-20">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
