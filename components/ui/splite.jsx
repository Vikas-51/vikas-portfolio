"use client";

import React, { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center text-slate-400">
          Loading 3D...
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
