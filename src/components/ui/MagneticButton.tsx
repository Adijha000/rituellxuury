"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

export function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.45 });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className={className}
    >
      <motion.span
        animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
