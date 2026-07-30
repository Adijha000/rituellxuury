"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ProductPouch } from "@/components/ProductPouch";

const ingredients = [
  {
    name: "Amla",
    benefit: "Deep nourishment, strand by strand.",
    tone: "#6b6a45",
    variant: "amla" as const,
  },
  {
    name: "Bhringraj",
    benefit: "The herb of the falling — strength, restored.",
    tone: "#5a4632",
    variant: "bhringraj" as const,
  },
  {
    name: "Hibiscus",
    benefit: "Softness that lasts beyond the wash.",
    tone: "#8a4a4a",
    variant: "hibiscus" as const,
  },
  {
    name: "Rosemary",
    benefit: "Circulation, clarity, quiet renewal.",
    tone: "#16332b",
    variant: "rosemary" as const,
  },
  {
    name: "Cold Pressed Oils",
    benefit: "Nothing extracted with heat. Nothing lost.",
    tone: "#a98b4a",
    variant: "oils" as const,
  },
];

function IngredientPanel({
  item,
  index,
  progress,
  total,
}: {
  item: (typeof ingredients)[number];
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, mid, end], [0.25, 1, 0.25]);
  const rotate = useTransform(progress, [start, end], [-8, 8]);
  const scale = useTransform(progress, [start, mid, end], [0.85, 1, 0.85]);

  return (
    <div
      className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center px-10 text-center"
      style={{ background: `linear-gradient(160deg, ${item.tone}dd, #0e2620)` }}
    >
      <motion.div style={{ rotate, scale, opacity }} className="mb-6 h-48 w-36 sm:h-64 sm:w-48">
        <ProductPouch variant={item.variant} className="h-full w-full drop-shadow-2xl" />
      </motion.div>
      <motion.h3 style={{ opacity }} className="font-serif text-[10vw] font-light text-ivory sm:text-6xl">
        {item.name}
      </motion.h3>
      <motion.p style={{ opacity }} className="mt-4 max-w-sm text-sm font-light text-ivory/70 sm:text-base">
        {item.benefit}
      </motion.p>
    </div>
  );
}

export function Ingredients() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(ingredients.length - 1) * 100}%`]);

  return (
    <section ref={ref} className="relative bg-forest-deep" style={{ height: `${ingredients.length * 100}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute left-8 top-8 z-10 text-xs tracking-[0.3em] text-ivory/50">
          THE INGREDIENTS
        </div>
        <motion.div style={{ x }} className="flex h-full">
          {ingredients.map((item, i) => (
            <IngredientPanel key={item.name} item={item} index={i} progress={scrollYProgress} total={ingredients.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
