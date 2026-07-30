"use client";

import { FadeUp, WordReveal } from "@/components/ui/RevealText";

const feed = [
  { name: "Aditya", meta: "Joined 2 minutes ago" },
  { name: "Priya", meta: "Joined today" },
  { name: "Riya", meta: "Founding Member #108" },
  { name: "Karan", meta: "Joined 6 minutes ago" },
  { name: "Meera", meta: "Founding Member #119" },
  { name: "Sanya", meta: "Joined today" },
  { name: "Aarav", meta: "Founding Member #124" },
  { name: "Divya", meta: "Joined 11 minutes ago" },
];

export function SocialProof() {
  const doubled = [...feed, ...feed];

  return (
    <section className="relative overflow-hidden bg-linen py-24">
      <FadeUp className="mb-14 px-6 text-center">
        <span className="text-xs tracking-[0.3em] text-walnut/60">RIGHT NOW</span>
        <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-5xl">
          <WordReveal text="People are joining." />
        </h2>
      </FadeUp>

      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-6 pl-6">
          {doubled.map((f, i) => (
            <div
              key={`${f.name}-${i}`}
              className="flex w-64 shrink-0 flex-col rounded-lg border border-walnut/10 bg-ivory/70 px-6 py-5 shadow-sm"
            >
              <span className="font-serif text-xl text-forest">{f.name}</span>
              <span className="mt-1 text-xs tracking-[0.05em] text-walnut/60">{f.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
