"use client";

import { useRef, useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { StickyJoinButton } from "@/components/StickyJoinButton";
import { Hero } from "@/components/sections/Hero";
import { StoryScroll } from "@/components/sections/StoryScroll";
import { Philosophy } from "@/components/sections/Philosophy";
import { Ingredients } from "@/components/sections/Ingredients";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { RitualCards } from "@/components/sections/RitualCards";
import { WhyJoinEarly } from "@/components/sections/WhyJoinEarly";
import { SocialProof } from "@/components/sections/SocialProof";
import { FounderStory } from "@/components/sections/FounderStory";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <Navbar onJoinClick={scrollToForm} />
          <main>
            <Hero onJoinClick={scrollToForm} />
            <StoryScroll />
            <Philosophy />
            <Ingredients />
            <ProductReveal />
            <RitualCards />
            <WhyJoinEarly onJoinClick={scrollToForm} />
            <SocialProof />
            <FounderStory />
            <WaitlistForm ref={formRef} source="main-form" />
            <FAQ />
            <Footer />
          </main>
          <StickyJoinButton onJoinClick={scrollToForm} />
        </>
      )}
    </>
  );
}
