import Image from "next/image";

/** The real Rituel Luxury monogram (R + amla branch + hibiscus bloom), background removed. */
export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image src="/rituel-monogram.webp" alt="Rituel Luxury" fill sizes="120px" className="object-contain" priority />
    </span>
  );
}

/** The full Rituel Luxury lockup (monogram + wordmark + tagline), background removed. */
export function BrandLockup({ className = "h-auto w-48" }: { className?: string }) {
  return (
    <span className={`relative inline-block aspect-[9/4] ${className}`}>
      <Image src="/rituel-logo-lockup.webp" alt="Rituel Luxury — Thoughtfully Crafted. Naturally Beautiful." fill sizes="400px" className="object-contain" priority />
    </span>
  );
}

/** Drop-in wrapper kept for existing call sites — the logo is transparent now, so no backing plate is needed. */
export function BrandPlate({ className = "", variant = "mark" }: { className?: string; variant?: "mark" | "lockup" }) {
  return variant === "mark" ? (
    <BrandMark className={className || "h-10 w-10"} />
  ) : (
    <BrandLockup className={className || "w-44"} />
  );
}
