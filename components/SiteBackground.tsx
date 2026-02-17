"use client";

import dynamic from "next/dynamic";

const ColorBends = dynamic(() => import("./ColorBends"), { ssr: false });

const COLORS = ["#0a0a0a", "#1e1b4b", "#312e81", "#4c1d95", "#6d28d9", "#7c3aed", "#8b5cf6", "#a78bfa"];

export default function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
      <ColorBends
        className="absolute inset-0"
        colors={COLORS}
        transparent={true}
        speed={0.15}
        scale={1.2}
        frequency={1.2}
        warpStrength={1}
        mouseInfluence={0.8}
        parallax={0.5}
        noise={0.03}
        rotation={45}
        autoRotate={2}
      />
    </div>
  );
}
