"use client";

import { ProductPouch, type ProductVariant } from "@/components/ProductPouch";
import { FadeUp } from "@/components/ui/RevealText";

const products: { variant: ProductVariant; name: string; tag: string; desc: string }[] = [
  {
    variant: "serum",
    name: "Hair Serum",
    tag: "Shine & Repair",
    desc: "A lightweight botanical serum that seals in shine and smooths every strand, without weighing hair down.",
  },
  {
    variant: "powder",
    name: "Hair Powder",
    tag: "Cleanse & Strengthen",
    desc: "A traditional Ayurvedic cleansing powder, slow-milled from whole botanicals — no heat, nothing lost.",
  },
  {
    variant: "cleanser",
    name: "Hair Cleanser",
    tag: "Gentle Everyday Wash",
    desc: "A sulfate-free daily wash that cleanses the scalp gently, keeping it balanced between rituals.",
  },
];

export function ProductCollection() {
  return (
    <section className="relative bg-linen px-6 py-28 sm:px-12 sm:py-36">
      <FadeUp className="mx-auto mb-16 max-w-2xl text-center">
        <span className="text-xs tracking-[0.3em] text-walnut/60">THE COLLECTION</span>
        <h2 className="mt-4 font-serif text-4xl font-light text-forest sm:text-5xl">
          Three rituals. One philosophy.
        </h2>
        <p className="mt-4 text-sm font-light leading-relaxed text-forest/60 sm:text-base">
          No sprawling shelf of promises — just three formulas, each earning its place in your routine.
        </p>
      </FadeUp>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-16 sm:grid-cols-3 sm:gap-8">
        {products.map((p, i) => (
          <FadeUp key={p.variant} delay={i * 0.1} className="flex flex-col items-center text-center">
            <ProductPouch variant={p.variant} className="h-64 w-44 drop-shadow-xl" />
            <h3 className="mt-8 font-serif text-2xl font-light text-forest">{p.name}</h3>
            <span className="mt-1 text-[11px] tracking-[0.2em] text-gold">{p.tag.toUpperCase()}</span>
            <p className="mt-4 max-w-[240px] text-sm font-light leading-relaxed text-forest/60">
              {p.desc}
            </p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
