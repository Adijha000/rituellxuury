"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp, WordReveal } from "@/components/ui/RevealText";

const faqs = [
  {
    q: "Why a waitlist?",
    a: "Rituel is made in small batches, slowly, with ingredients that can't be rushed. The waitlist lets us launch with intention, not scale for its own sake — and gives the first 500 real, meaningful benefits.",
  },
  {
    q: "When will products launch?",
    a: "We're finalizing our first collection now. Founding members will be the first to know the exact date — before it's announced anywhere else.",
  },
  {
    q: "When will I receive updates?",
    a: "You'll hear from us as milestones happen — never more than that. No noise, only what matters.",
  },
  {
    q: "How many founding members?",
    a: "Only 500. Once we reach that number, founding member benefits close permanently for future members.",
  },
  {
    q: "Can I leave anytime?",
    a: "Yes. Every email includes a simple way to unsubscribe, no questions asked.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-stone px-6 py-28 sm:px-12">
      <FadeUp className="mb-16 text-center">
        <h2 className="font-serif text-4xl font-light text-forest sm:text-5xl">
          <WordReveal text="Questions." />
        </h2>
      </FadeUp>

      <div className="mx-auto max-w-2xl divide-y divide-walnut/15">
        {faqs.map((f, i) => (
          <div key={f.q} className="py-5">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="font-serif text-xl font-light text-forest sm:text-2xl">{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4 text-2xl font-light text-walnut/60"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 pr-8 text-sm font-light leading-relaxed text-walnut/80">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
