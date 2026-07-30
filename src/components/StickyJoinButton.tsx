"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function StickyJoinButton({ onJoinClick }: { onJoinClick: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          onClick={onJoinClick}
          className="fixed inset-x-4 bottom-4 z-30 rounded-full bg-gold py-3 text-xs tracking-[0.2em] uppercase text-forest-deep shadow-xl sm:hidden"
        >
          Reserve My Place
        </motion.button>
      )}
    </AnimatePresence>
  );
}
