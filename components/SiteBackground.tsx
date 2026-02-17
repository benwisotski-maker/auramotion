"use client";

import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("./ColorBends"), { ssr: false });

const COLORS = ["#0f0f0f", "#1e1b4b", "#312e81", "#5b21b6", "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"];

export default function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0 min-h-screen bg-[#0a0a0a]">
      <ColorBends
        className="absolute inset-0 min-h-full w-full"
        colors={COLORS}
        transparent={true}
        speed={0.2}
        scale={1}
        frequency={1.4}
        warpStrength={1.2}
        mouseInfluence={1}
        parallax={0.6}
        noise={0.02}
        rotation={30}
        autoRotate={3}
      />
    </div>
  );
}
