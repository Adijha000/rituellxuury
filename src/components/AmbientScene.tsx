"use client";

import { LogoMark } from "@/components/Logo";

/**
 * A looping, cinemagraph-style ambient scene built entirely from CSS/SVG —
 * used in place of real video footage. Roughly a 14s loop: light drifts,
 * linen folds breathe, oil drips and ripples, leaves sway.
 */
export function AmbientScene({
  variant = "morning",
  className = "",
}: {
  variant?: "morning" | "night" | "weekend" | "self-care" | "hero" | "philosophy";
  className?: string;
}) {
  const palettes: Record<string, { from: string; to: string; glow: string }> = {
    morning: { from: "#3a3220", to: "#16332b", glow: "#c8a955" },
    night: { from: "#0e2620", to: "#040d0a", glow: "#3d6b57" },
    weekend: { from: "#5a2f2f", to: "#2a1414", glow: "#a85f6f" },
    "self-care": { from: "#5a4632", to: "#2a2015", glow: "#a98b4a" },
    hero: { from: "#16332b", to: "#0e2620", glow: "#a98b4a" },
    philosophy: { from: "#3a3220", to: "#16332b", glow: "#c8a955" },
  };
  const p = palettes[variant];

  return (
    <div
      className={`ambient-scene overflow-hidden ${className}`}
      style={{ background: `linear-gradient(160deg, ${p.from} 0%, ${p.to} 100%)` }}
    >
      {/* drifting light sweep */}
      <div
        className="ambient-sweep absolute inset-0"
        style={{
          background: `radial-gradient(45% 35% at 30% 20%, ${p.glow}55 0%, transparent 70%)`,
        }}
      />

      {/* linen fold lines, gently breathing */}
      <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none" viewBox="0 0 400 500">
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            className="ambient-linen"
            style={{ animationDelay: `${i * 0.4}s` }}
            d={`M0 ${60 + i * 60} Q200 ${40 + i * 60} 400 ${60 + i * 60}`}
            stroke="#f4ede2"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </svg>

      {/* falling oil drop + ripple */}
      <div className="absolute left-1/2 top-[18%] -translate-x-1/2">
        <div className="ambient-drop-fall relative h-3 w-3">
          <div className="h-full w-full rounded-full" style={{ background: p.glow }} />
        </div>
      </div>
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2">
        <span className="ambient-ripple absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: p.glow }} />
        <span className="ambient-ripple absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border [animation-delay:1.2s]" style={{ borderColor: p.glow }} />
      </div>

      {/* swaying leaf motif (logo mark) */}
      <div className="ambient-sway absolute bottom-[8%] right-[10%] opacity-70">
        <LogoMark className="h-16 w-16" style={{ color: p.glow }} />
      </div>

      {/* soft grain / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
