"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandPlate } from "@/components/Logo";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-deep"
        >
          <div className="relative h-20 w-[2px] overflow-hidden bg-ivory/15">
            <span className="oil-drop absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <BrandPlate variant="mark" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 text-xs tracking-[0.3em] text-ivory/50"
          >
            PREPARING YOUR RITUAL…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
