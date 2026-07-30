"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, WordReveal } from "@/components/ui/RevealText";
import { AmbientScene } from "@/components/AmbientScene";

const rituals = [
  {
    name: "Morning",
    tag: "Awaken",
    desc: "A slow scalp massage before the world wakes. Five minutes that set the tone for the day.",
    scene: "morning" as const,
    dark: true,
  },
  {
    name: "Night",
    tag: "Restore",
    desc: "Oil warmed between the palms, worked into the roots as the day dissolves.",
    scene: "night" as const,
    dark: true,
  },
  {
    name: "Weekend",
    tag: "Reset",
    desc: "A longer ritual. Deep cleanse, mask, and stillness — a full return to yourself.",
    scene: "weekend" as const,
    dark: true,
  },
  {
    name: "Self-care",
    tag: "Belong",
    desc: "No occasion needed. Just you, your ritual, and a moment that's entirely yours.",
    scene: "self-care" as const,
    dark: true,
  },
];

export function RitualCards() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative bg-ivory px-6 py-28 sm:px-12">
      <FadeUp className="mb-16 text-center">
        <h2 className="font-serif text-4xl font-light text-forest sm:text-6xl">
          <WordReveal text="The Ritual" />
        </h2>
      </FadeUp>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {rituals.map((r, i) => (
          <motion.button
            key={r.name}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg text-left shadow-lg"
          >
            <AmbientScene variant={r.scene} className="absolute inset-0 h-full w-full" />
            <div className="relative z-10 flex h-full flex-col p-6">
              <span className="text-xs tracking-[0.25em] text-ivory/70">{r.tag.toUpperCase()}</span>
              <h3 className="mt-2 font-serif text-3xl font-light text-ivory">{r.name}</h3>
              <span className="mt-auto text-xs tracking-[0.2em] text-ivory/80 underline-offset-4 transition group-hover:underline">
                Open ritual
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/70 backdrop-blur-sm px-6"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl text-left shadow-2xl"
            >
              <AmbientScene variant={rituals[open].scene} className="absolute inset-0 h-full w-full" />
              <div className="relative z-10 p-10">
                <button
                  onClick={() => setOpen(null)}
                  className="absolute right-6 top-6 text-xs tracking-[0.2em] text-ivory/60 hover:text-ivory"
                >
                  CLOSE
                </button>
                <span className="text-xs tracking-[0.25em] text-ivory/60">
                  {rituals[open].tag.toUpperCase()}
                </span>
                <h3 className="mt-3 font-serif text-5xl font-light text-ivory">
                  {rituals[open].name}
                </h3>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-ivory/80">
                  {rituals[open].desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
