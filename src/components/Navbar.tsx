"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/Logo";

export function Navbar({ onJoinClick }: { onJoinClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: scrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-ivory/10 bg-forest-deep/85 px-6 py-4 backdrop-blur-md sm:px-10"
    >
      <div className="flex items-center gap-2">
        <LogoMark className="h-6 w-6 text-gold" />
        <span className="text-xs tracking-[0.35em] text-ivory">RITUEL</span>
      </div>
      <button
        onClick={onJoinClick}
        className="rounded-full border border-gold/50 px-5 py-2 text-[11px] tracking-[0.2em] uppercase text-ivory transition hover:bg-gold hover:text-forest-deep"
      >
        Join Waitlist
      </button>
    </motion.nav>
  );
}
