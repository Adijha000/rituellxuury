"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function WaitlistPopup({ onJoinClick }: { onJoinClick: () => void }) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("rituel_popup_seen");
    if (seen) {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total > 0.6) {
        setShow(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onExitIntent = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShow(true);
        document.removeEventListener("mouseleave", onExitIntent);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onExitIntent);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onExitIntent);
    };
  }, []);

  const close = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("rituel_popup_seen", "1");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 w-[calc(100%-3rem)] max-w-sm rounded-2xl border border-gold/20 bg-forest-deep/95 p-6 text-ivory shadow-2xl backdrop-blur-md sm:right-8 sm:bottom-8"
        >
          <button onClick={close} className="absolute right-4 top-4 text-ivory/50 hover:text-ivory">
            ✕
          </button>
          <p className="text-xs tracking-[0.25em] text-gold">FOUNDING WAITLIST</p>
          <h3 className="mt-3 font-serif text-2xl font-light">Become a Founding Member</h3>
          <ul className="mt-4 space-y-1 text-sm font-light text-ivory/70">
            <li>Launch pricing</li>
            <li>Founder gifts</li>
            <li>Priority shipping</li>
            <li>Exclusive launches</li>
          </ul>
          <button
            onClick={() => {
              onJoinClick();
              close();
            }}
            className="mt-5 w-full rounded-full bg-gold py-3 text-xs tracking-[0.2em] uppercase text-forest-deep transition hover:opacity-90"
          >
            Reserve My Spot
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
