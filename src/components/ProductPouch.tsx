const PRODUCTS = {
  serum: {
    label: "HAIR SERUM",
    tag: "Shine & Repair",
    glassFrom: "#4a3520",
    glassTo: "#2a1c10",
    capColor: "#c8a955",
    accent: "#3a2a18",
  },
  powder: {
    label: "HAIR POWDER",
    tag: "Cleanse & Strengthen",
    glassFrom: "#9a8355",
    glassTo: "#6b5a38",
    capColor: "#3a2e1c",
    accent: "#4a3d24",
  },
  cleanser: {
    label: "HAIR CLEANSER",
    tag: "Gentle Everyday Wash",
    glassFrom: "#8a9a80",
    glassTo: "#4f5c46",
    capColor: "#a98b4a",
    accent: "#3a4534",
  },
} as const;

export type ProductVariant = keyof typeof PRODUCTS;

export function ProductPouch({
  variant = "serum",
  className = "",
}: {
  variant?: ProductVariant;
  className?: string;
}) {
  const p = PRODUCTS[variant];
  const gid = `glass-${variant}`;
  const sid = `sheen-${variant}`;

  return (
    <svg viewBox="0 0 300 420" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.glassFrom} />
          <stop offset="100%" stopColor={p.glassTo} />
        </linearGradient>
        <linearGradient id={sid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="85%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
        <filter id="bottleShadow" x="-40%" y="-10%" width="180%" height="130%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#0e2620" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#bottleShadow)">
        {variant === "serum" && (
          <>
            {/* dropper bottle: cylindrical body, tapered shoulder, dropper cap */}
            <rect x="105" y="120" width="90" height="220" rx="14" fill={`url(#${gid})`} />
            <rect x="105" y="120" width="90" height="220" rx="14" fill={`url(#${sid})`} />
            <path d="M120 120 Q120 92 150 92 Q180 92 180 120 Z" fill={`url(#${gid})`} />
            <rect x="138" y="46" width="24" height="52" rx="6" fill={p.capColor} />
            <rect x="146" y="10" width="8" height="42" rx="4" fill="#cfc6b4" />
          </>
        )}

        {variant === "powder" && (
          <>
            {/* apothecary jar: wide body, flat lid */}
            <rect x="80" y="150" width="140" height="180" rx="18" fill={`url(#${gid})`} />
            <rect x="80" y="150" width="140" height="180" rx="18" fill={`url(#${sid})`} />
            <rect x="92" y="112" width="116" height="46" rx="10" fill={`url(#${gid})`} />
            <rect x="86" y="100" width="128" height="24" rx="10" fill={p.capColor} />
          </>
        )}

        {variant === "cleanser" && (
          <>
            {/* pump bottle: tall body, shoulder, pump head */}
            <rect x="95" y="140" width="110" height="200" rx="16" fill={`url(#${gid})`} />
            <rect x="95" y="140" width="110" height="200" rx="16" fill={`url(#${sid})`} />
            <path d="M108 140 Q108 108 150 108 Q192 108 192 140 Z" fill={`url(#${gid})`} />
            <rect x="130" y="70" width="40" height="42" rx="8" fill={p.capColor} />
            <rect x="146" y="40" width="10" height="34" rx="4" fill={p.capColor} />
            <rect x="150" y="24" width="34" height="14" rx="6" fill={p.capColor} transform="rotate(-18 150 30)" />
          </>
        )}

        {/* ivory label */}
        <rect x="112" y="188" width="76" height="96" rx="6" fill="#f4ede2" opacity="0.96" />
        <image href="/rituel-logo-mark.png" x="132" y="196" width="36" height="36" />
        <text x="150" y="250" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" letterSpacing="1.4" fill={p.accent}>
          RITUEL
        </text>
        <text x="150" y="264" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6.5" letterSpacing="1" fill={p.accent} opacity="0.8">
          {p.label}
        </text>
        <text x="150" y="276" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6" letterSpacing="0.5" fill={p.accent} opacity="0.6">
          100 ml
        </text>
      </g>
    </svg>
  );
}
