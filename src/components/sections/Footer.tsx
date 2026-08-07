import { BrandPlate } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-forest-deep px-6 py-16 text-ivory/70 sm:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <BrandPlate variant="mark" />
        <p className="max-w-sm text-xs tracking-[0.2em] text-ivory/50">
          RITUALS FROM NATURE, RESULTS YOU FEEL.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-[0.15em]">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold transition">
            INSTAGRAM
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-gold transition">
            PINTEREST
          </a>
          <a href="mailto:rituelluxury@gmail.com" className="hover:text-gold transition">
            rituelluxury@gmail.com
          </a>
          <a href="/privacy" className="hover:text-gold transition">
            PRIVACY
          </a>
          <a href="/terms" className="hover:text-gold transition">
            TERMS
          </a>
        </div>
        <p className="text-[11px] text-ivory/30">© {new Date().getFullYear()} Rituel. All rights reserved.</p>
      </div>
    </footer>
  );
}
