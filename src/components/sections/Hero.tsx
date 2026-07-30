"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LogoMark } from "@/components/Logo";
import { WordReveal } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AmbientScene } from "@/components/AmbientScene";

export function Hero({ onJoinClick }: { onJoinClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-forest-deep text-ivory">
      <motion.div style={{ scale }} className="absolute inset-0">
        <AmbientScene variant="hero" className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0 opacity-[0.5] mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(244,237,226,0.15) 45%, transparent 65%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(14,38,32,0.55)_100%)]" />
      </motion.div>

      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-col items-center gap-4"
        >
          <LogoMark className="h-12 w-12 text-gold" />
          <span className="text-xs tracking-[0.5em] text-ivory/70">RITUEL</span>
        </motion.div>

        <h1 className="max-w-4xl font-serif text-[13vw] leading-[0.98] font-light tracking-tight sm:text-[7vw] md:text-[6.2vw]">
          <WordReveal text="Rituals are becoming rare." immediate />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-balance text-base font-light leading-relaxed text-ivory/75 sm:text-lg"
        >
          The world taught us to move faster.
          <br />
          We&rsquo;re here to help you slow down.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <MagneticButton
            onClick={onJoinClick}
            className="group relative overflow-hidden rounded-full border border-gold/60 bg-transparent px-9 py-4 text-xs tracking-[0.25em] text-ivory transition-colors duration-500 hover:border-gold"
          >
            <span className="relative z-10 uppercase">Join the Founding Waitlist</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-gold/90 transition-transform duration-500 group-hover:translate-y-0" />
          </MagneticButton>
          <span className="text-[11px] tracking-[0.2em] text-ivory/50">
            Only 500 founding members will receive launch privileges.
          </span>
        </motion.div>

        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="relative h-16 w-[2px] overflow-hidden bg-ivory/15">
            <span className="oil-drop absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
