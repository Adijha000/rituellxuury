"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ProductPouch } from "@/components/ProductPouch";

const captions = [
  "Thoughtfully Crafted.",
  "Slow infused.",
  "Small batches.",
  "Pure botanicals.",
  "Naturally Beautiful.",
];

function Caption({ text, index, progress, total }: { text: string; index: number; progress: MotionValue<number>; total: number }) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const y = useTransform(progress, [start, mid, end], [20, 0, -20]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute font-serif text-4xl font-light text-forest sm:text-6xl"
    >
      {text}
    </motion.p>
  );
}

export function ProductReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 380]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.9]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-linen">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
        <span className="absolute top-10 text-xs tracking-[0.3em] text-walnut/60">THE PRODUCT</span>

        <motion.div style={{ rotate, scale }} className="relative h-72 w-52 sm:h-96 sm:w-72 drop-shadow-2xl">
          <ProductPouch variant="shikakai" className="h-full w-full" />
        </motion.div>

        <div className="relative mt-16 h-16 w-full max-w-md text-center">
          {captions.map((c, i) => (
            <Caption key={c} text={c} index={i} progress={scrollYProgress} total={captions.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
