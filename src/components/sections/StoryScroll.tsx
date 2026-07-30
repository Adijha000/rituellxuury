"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const chaosWords = ["Meetings.", "Deadlines.", "Notifications.", "Stress.", "Rush.", "Repeat."];

// Phase boundaries (as fractions of the section's scroll progress).
const CHAOS_END = 0.38;
const FOUND_START = 0.4;
const FOUND_END = 0.68;
const EXISTS_START = 0.7;

function ChaosWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = CHAOS_END;
  const start = (index / total) * span;
  const mid = ((index + 0.6) / total) * span;
  const end = ((index + 1) / total) * span;
  const opacity = useTransform(progress, [start, mid, end], [0.15, 1, 0.15]);
  const scale = useTransform(progress, [start, mid, end], [0.9, 1, 0.9]);

  return (
    <motion.span
      style={{ opacity, scale }}
      className="block font-serif text-[12vw] font-light leading-none text-ink sm:text-[7vw]"
    >
      {word}
    </motion.span>
  );
}

export function StoryScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const chaosOpacity = useTransform(scrollYProgress, [CHAOS_END - 0.04, CHAOS_END], [1, 0]);

  const foundOpacity = useTransform(
    scrollYProgress,
    [FOUND_START, FOUND_START + 0.06, FOUND_END - 0.06, FOUND_END],
    [0, 1, 1, 0]
  );
  const foundY = useTransform(scrollYProgress, [FOUND_START, FOUND_START + 0.06], [30, 0]);

  const existsOpacity = useTransform(scrollYProgress, [EXISTS_START, EXISTS_START + 0.08], [0, 1]);
  const existsY = useTransform(scrollYProgress, [EXISTS_START, EXISTS_START + 0.08], [30, 0]);

  return (
    <section ref={ref} className="relative h-[420vh] bg-ivory">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          style={{ opacity: chaosOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
        >
          {chaosWords.map((word, i) => (
            <ChaosWord key={word} word={word} index={i} total={chaosWords.length} progress={scrollYProgress} />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: foundOpacity, y: foundY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="max-w-2xl font-serif text-[9vw] font-light italic leading-[1.05] text-forest sm:text-[4.5vw]">
            Somewhere in between
            <br />
            we forgot ourselves.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: existsOpacity, y: existsY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="max-w-2xl font-serif text-[9vw] font-light leading-[1.05] text-forest sm:text-[5vw]">
            Rituel exists
            <br />
            to change that.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
