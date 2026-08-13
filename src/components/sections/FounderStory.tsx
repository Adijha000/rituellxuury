"use client";

import { FadeUp } from "@/components/ui/RevealText";

export function FounderStory() {
  return (
    <section className="relative bg-ivory px-6 py-28 sm:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <FadeUp>
          <span className="text-xs tracking-[0.3em] text-walnut/60">FROM THE FOUNDER</span>
          <p className="mt-6 font-serif text-2xl font-light leading-relaxed text-forest sm:text-3xl">
            My grandmother never rushed her hair oil. She warmed it, she waited, she massaged it in
            like it mattered — because it did. Somewhere along the way, we replaced that with a
            five-minute routine and a shelf of products that promised everything and gave nothing.
            Rituel isn&rsquo;t here to sell you hair care. It&rsquo;s here to give you back the ten
            minutes my grandmother never gave up.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
