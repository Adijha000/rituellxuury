"use client";

import { FadeUp } from "@/components/ui/RevealText";

export function StoryScroll() {
  return (
    <section className="bg-ivory px-6 py-32 sm:py-40">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-20 text-center">
        <FadeUp>
          <p className="font-serif text-3xl font-light leading-snug text-ink/70 sm:text-4xl">
            Meetings. Deadlines. Notifications. Stress. Rush. Repeat.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="max-w-xl font-serif text-4xl font-light italic leading-[1.15] text-forest sm:text-5xl">
            Somewhere in between, we forgot ourselves.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-serif text-4xl font-light leading-[1.15] text-forest sm:text-5xl">
            Rituel exists to change that.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
