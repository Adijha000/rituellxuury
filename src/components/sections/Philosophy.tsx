"use client";

import { motion } from "framer-motion";
import { LineReveal } from "@/components/ui/RevealText";
import { AmbientScene } from "@/components/AmbientScene";

export function Philosophy() {
  return (
    <section className="relative grid min-h-[100svh] grid-cols-1 bg-stone md:grid-cols-2">
      <div className="flex items-center justify-center px-8 py-24 md:px-16">
        <h2 className="font-serif text-[11vw] font-light leading-[0.95] text-forest sm:text-[4.5vw]">
          <LineReveal className="block">Luxury</LineReveal>
          <LineReveal className="block italic text-gold" delay={0.1}>
            isn&rsquo;t
          </LineReveal>
          <LineReveal className="block" delay={0.2}>
            expensive.
          </LineReveal>
          <br />
          <LineReveal className="block" delay={0.35}>
            Luxury
          </LineReveal>
          <LineReveal className="block italic text-gold" delay={0.45}>
            is
          </LineReveal>
          <LineReveal className="block" delay={0.55}>
            having time.
          </LineReveal>
        </h2>
      </div>

      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[50vh] overflow-hidden md:min-h-full"
      >
        <AmbientScene variant="philosophy" className="absolute inset-0 h-full w-full" />
        <div className="relative flex h-full min-h-[50vh] items-end p-8 md:min-h-full md:p-12">
          <p className="text-xs tracking-[0.3em] text-ivory/60">
            A RITUAL, NOT A ROUTINE
          </p>
        </div>
      </motion.div>
    </section>
  );
}
