"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MouseTracer() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveTracer = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 1, ease: "power2.out" });
      }
    };
    window.addEventListener("mousemove", moveTracer);
    return () => window.removeEventListener("mousemove", moveTracer);
  }, []);

  return <div ref={cursorRef} className="cursor-tracer hidden md:block" />;
}
