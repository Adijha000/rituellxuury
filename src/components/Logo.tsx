import Image from "next/image";

/** The real Rituel Luxury leaf mark, cropped from the brand's provided logo artwork. Colors/proportions untouched. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image src="/rituel-logo-mark.png" alt="Rituel Luxury" fill sizes="80px" className="object-contain" priority />
    </span>
  );
}

/** The full Rituel Luxury lockup (leaf + wordmark + tagline), exactly as provided. */
export function BrandLockup({ className = "h-auto w-48" }: { className?: string }) {
  return (
    <span className={`relative inline-block aspect-square ${className}`}>
      <Image src="/rituel-logo-full-transparent.png" alt="Rituel Luxury — Thoughtfully Crafted. Naturally Beautiful." fill sizes="400px" className="object-contain" priority />
    </span>
  );
}

/** Ivory plate that houses the real logo artwork over dark sections, preserving its true colors. */
export function BrandPlate({ className = "", variant = "mark" }: { className?: string; variant?: "mark" | "lockup" }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-2xl bg-ivory shadow-[0_8px_30px_rgba(0,0,0,0.25)] ${variant === "mark" ? "p-3" : "px-8 py-6"} ${className}`}>
      {variant === "mark" ? <BrandMark className="h-9 w-9" /> : <BrandLockup className="w-40" />}
    </span>
  );
}

