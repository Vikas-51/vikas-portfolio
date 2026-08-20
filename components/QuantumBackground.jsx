"use client";

import dynamic from "next/dynamic";

const QuantumNebula = dynamic(() => import("./ui/quantum-nebula"), {
  ssr: false,
});

export default function QuantumBackground() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full">
      <QuantumNebula variant="background" />
    </div>
  );
}
