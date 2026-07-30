"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function WordReveal({
  text,
  className = "",
  once = true,
  amount = 0.6,
  immediate = false,
}: {
  text: string;
  className?: string;
  once?: boolean;
  amount?: number;
  immediate?: boolean;
}) {
  const words = text.split(" ");
  const animProps = immediate
    ? { initial: { y: "110%" }, animate: { y: "0%" } }
    : { initial: { y: "110%" }, whileInView: { y: "0%" }, viewport: { once, amount } };
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
          <motion.span
            className="inline-block"
            {...animProps}
            transition={{ duration: 0.9, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function LineReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 24,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
