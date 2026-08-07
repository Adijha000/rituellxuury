
const VARIANTS = {
  shikakai: { top: "#4a4530", bottom: "#8a7a4a", label: "SHIKAKAI POWDER", tag: "Deep Cleanse", accent: "#16332b" },
  amla: { top: "#5c6b3a", bottom: "#a3b06a", label: "AMLA POWDER", tag: "Nourish", accent: "#3d4a24" },
  bhringraj: { top: "#4a3a2a", bottom: "#7a5c3a", label: "BHRINGRAJ POWDER", tag: "Strengthen", accent: "#2e2013" },
  hibiscus: { top: "#6b3040", bottom: "#a85f6f", label: "HIBISCUS POWDER", tag: "Repair", accent: "#4a1f2b" },
  rose: { top: "#6a4a6b", bottom: "#b190ad", label: "ROSE POWDER", tag: "Glow", accent: "#402c42" },
  rosemary: { top: "#1f3d2e", bottom: "#4c6b52", label: "ROSEMARY OIL", tag: "Clarity", accent: "#0e2620" },
  oils: { top: "#5a4632", bottom: "#a98b4a", label: "COLD PRESSED OIL", tag: "Pure", accent: "#3a2e1c" },
} as const;

export function ProductPouch({
  variant = "shikakai",
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const v = VARIANTS[variant];
  const gradId = `pouchGrad-${variant}`;
  const shineId = `pouchShine-${variant}`;

  return (
    <svg viewBox="0 0 300 420" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe7da" />
          <stop offset="42%" stopColor="#e2d5bd" />
          <stop offset="68%" stopColor={v.bottom} />
          <stop offset="100%" stopColor={v.top} />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
        </linearGradient>
        <filter id="pouchShadow" x="-30%" y="-10%" width="160%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0e2620" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#pouchShadow)">
        {/* pouch body with top fold + rounded base, resealable zip pouch silhouette */}
        <path
          d="M60 60
             Q60 24 96 22
             L204 22
             Q240 24 240 60
             L246 300
             Q246 372 190 388
             Q150 398 110 388
             Q54 372 54 300
             Z"
          fill={`url(#${gradId})`}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1.5"
        />
        <path
          d="M60 60
             Q60 24 96 22
             L204 22
             Q240 24 240 60
             L246 300
             Q246 372 190 388
             Q150 398 110 388
             Q54 372 54 300
             Z"
          fill={`url(#${shineId})`}
        />

        {/* top fold seam */}
        <rect x="56" y="58" width="188" height="10" rx="4" fill="rgba(0,0,0,0.06)" />
        {/* zip line */}
        <path d="M62 78 H238" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeDasharray="2 3" />

        {/* corner notch (tear notch) */}
        <path d="M60 92 Q52 96 60 104" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />

        {/* brand accent band */}
        <rect x="130" y="30" width="40" height="16" rx="3" fill={v.accent} opacity="0.9" />

        {/* brand mark (real logo artwork) */}
        <image href="/rituel-logo-mark.png" x="126" y="90" width="48" height="48" opacity="0.9" />


        {/* wordmark */}
        <text
          x="150"
          y="230"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          letterSpacing="6"
          fill={v.accent}
        >
          RITUEL
        </text>
        <text
          x="150"
          y="252"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="9"
          letterSpacing="3"
          fill={v.accent}
          opacity="0.75"
        >
          {v.label}
        </text>

        {/* tag pill */}
        <rect x="112" y="266" width="76" height="20" rx="10" fill="#ffffff" opacity="0.35" />
        <text
          x="150"
          y="280"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="8"
          letterSpacing="2"
          fill={v.accent}
        >
          {v.tag.toUpperCase()}
        </text>

        {/* weight label */}
        <text x="150" y="370" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="1" fill="#f4ede2" opacity="0.85">
          100 g
        </text>
      </g>
    </svg>
  );
}
