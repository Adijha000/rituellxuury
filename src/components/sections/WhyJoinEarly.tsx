"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeUp, WordReveal } from "@/components/ui/RevealText";
import { useFoundingCount } from "@/lib/useFoundingCount";

const benefits = [
  "Lifetime 15% launch discount",
  "Free handcrafted scalp massage comb",
  "Early access before public launch",
  "First access to limited edition collections",
  "Exclusive founder pricing for future launches",
  "Personalized ritual guide",
  "Access to the Ritual Circle community",
  "Surprise gift in every founding order",
];

function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export function WhyJoinEarly({ onJoinClick }: { onJoinClick: () => void }) {
  const { count, cap } = useFoundingCount();
  const pct = Math.min(100, (count / cap) * 100);

  return (
    <section className="relative bg-forest px-6 py-28 text-ivory sm:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <FadeUp>
          <span className="text-xs tracking-[0.3em] text-gold">FOUNDING MEMBER BENEFITS</span>
        </FadeUp>
        <h2 className="mt-6 font-serif text-4xl font-light sm:text-6xl">
          <WordReveal text="Become a Founding Member." />
        </h2>

        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-10 gap-y-5 text-left sm:grid-cols-2">
          {benefits.map((b, i) => (
            <motion.li
              key={b}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex items-start gap-3 text-sm font-light text-ivory/85 sm:text-base"
            >
              <span className="mt-1 text-gold">✓</span>
              {b}
            </motion.li>
          ))}
        </ul>

        <FadeUp className="mt-20" delay={0.1}>
          <p className="text-xs tracking-[0.3em] text-ivory/50">FOUNDING MEMBERS</p>
          <p className="mt-3 font-serif text-5xl font-light sm:text-7xl">
            <AnimatedCounter value={count} /> <span className="text-ivory/40">/ {cap}</span>
          </p>
          <div className="mx-auto mt-6 h-[2px] w-full max-w-md overflow-hidden bg-ivory/15">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: pct / 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-full bg-gold"
            />
          </div>
          <button
            onClick={onJoinClick}
            className="mt-10 rounded-full border border-gold/60 px-9 py-4 text-xs tracking-[0.25em] uppercase text-ivory transition hover:bg-gold hover:text-forest-deep"
          >
            Reserve My Place
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
