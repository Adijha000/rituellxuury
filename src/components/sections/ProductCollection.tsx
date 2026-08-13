"use client";

import Image from "next/image";
import { FadeUp } from "@/components/ui/RevealText";

const products = [
  {
    name: "Hair Cleanser",
    tag: "Nourishing Shampoo",
    size: "200 ml",
    desc: "With Bhringraj, Hibiscus & Amla extract. Strengthens, cleanses and balances — a gentle, sulfate-conscious daily wash.",
  },
  {
    name: "Hair Oil",
    tag: "Nourishing Treatment",
    size: "100 ml",
    desc: "With Bhringraj, Amla, Hibiscus & Methi. Nourishes, strengthens and promotes growth — warmed and massaged in as a ritual, not a routine.",
  },
];

export function ProductCollection() {
  return (
    <section className="relative bg-linen px-6 py-28 sm:px-12 sm:py-36">
      <FadeUp className="mx-auto mb-14 max-w-2xl text-center">
        <span className="text-xs tracking-[0.3em] text-walnut/60">THE COLLECTION</span>
        <h2 className="mt-4 font-serif text-4xl font-light text-forest sm:text-5xl">
          Two products. One philosophy.
        </h2>
        <p className="mt-4 text-sm font-light leading-relaxed text-forest/60 sm:text-base">
          No sprawling shelf of promises — a cleanser and an oil, each earning its place in your routine.
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mx-auto max-w-3xl">
        <div className="relative aspect-[7/6] w-full sm:aspect-[5/4]">
          <Image
            src="/rituel-product-shot.webp"
            alt="Rituel Luxury Hair Cleanser and Hair Oil, with the logo, hibiscus flower, amla fruit and botanical stems"
            fill
            sizes="(max-width: 640px) 100vw, 768px"
            className="object-contain drop-shadow-2xl"
            priority={false}
          />
        </div>
      </FadeUp>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
        {products.map((p, i) => (
          <FadeUp key={p.name} delay={0.15 + i * 0.1} className="text-center">
            <h3 className="font-serif text-2xl font-light text-forest">{p.name}</h3>
            <span className="mt-1 block text-[11px] tracking-[0.2em] text-gold">
              {p.tag.toUpperCase()} · {p.size}
            </span>
            <p className="mt-4 text-sm font-light leading-relaxed text-forest/60">{p.desc}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
