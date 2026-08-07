"use client";

import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { waitlistSchema, hairGoals, type WaitlistInput } from "@/lib/waitlistSchema";
import { FadeUp } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProductPouch } from "@/components/ProductPouch";
import { AmbientScene } from "@/components/AmbientScene";

export const WaitlistForm = forwardRef<HTMLElement, { source?: string }>(function WaitlistForm(
  { source = "form" },
  ref
) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <section ref={ref} id="waitlist" className="relative grid grid-cols-1 bg-forest-deep md:grid-cols-2">
      <div className="relative hidden min-h-[420px] overflow-hidden md:block">
        <AmbientScene variant="hero" className="absolute inset-0 h-full w-full" />
        <div className="relative flex h-full flex-col items-center justify-center gap-10 p-12">
          <ProductPouch variant="shikakai" className="h-56 w-40 drop-shadow-2xl" />
          <p className="max-w-xs text-center font-serif text-2xl font-light italic leading-snug text-ivory/85">
            &ldquo;Before it is introduced to the world, it is introduced to you.&rdquo;
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-24 sm:px-12">
        <div className="w-full max-w-md">
          <FadeUp>
            <span className="text-xs tracking-[0.3em] text-gold">RESERVE YOUR PLACE</span>
            <h2 className="mt-4 font-serif text-4xl font-light text-ivory sm:text-5xl">
              Become One of the First 500.
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-ivory/60">
              Before Rituel is introduced to the world, reserve your place.
            </p>
          </FadeUp>

          <div className="relative mt-10 min-h-[420px]">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div>
                    <input
                      {...register("firstName")}
                      placeholder="First Name"
                      className="w-full border-b border-ivory/25 bg-transparent py-3 text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-gold">{errors.firstName.message}</p>}
                  </div>

                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      className="w-full border-b border-ivory/25 bg-transparent py-3 text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                    />
                    {errors.email && <p className="mt-1 text-xs text-gold">{errors.email.message}</p>}
                  </div>

                  <div>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Phone"
                      className="w-full border-b border-ivory/25 bg-transparent py-3 text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-gold">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <select
                      {...register("hairGoal")}
                      defaultValue=""
                      className="w-full border-b border-ivory/25 bg-transparent py-3 text-ivory focus:border-gold focus:outline-none [&>option]:text-ink"
                    >
                      <option value="" disabled>
                        Hair Concern
                      </option>
                      {hairGoals.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    {errors.hairGoal && <p className="mt-1 text-xs text-gold">{errors.hairGoal.message}</p>}
                  </div>

                  <label className="flex items-start gap-3 pt-2 text-sm font-light text-ivory/70">
                    <input type="checkbox" {...register("consent")} className="mt-1 accent-gold" />
                    I want early access and founding member benefits.
                  </label>
                  {errors.consent && <p className="text-xs text-gold">{errors.consent.message}</p>}

                  {serverError && <p className="text-xs text-gold">{serverError}</p>}

                  <MagneticButton
                    type="submit"
                    className="mt-2 w-full rounded-full bg-gold py-4 text-xs tracking-[0.25em] uppercase text-forest-deep transition disabled:opacity-60"
                  >
                    {isSubmitting ? "Reserving…" : "Reserve My Place"}
                  </MagneticButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center pt-8 text-center"
                >
                  <motion.div
                    initial={{ y: 30, opacity: 0, scale: 0.85 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProductPouch variant="shikakai" className="h-32 w-24 drop-shadow-2xl" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-8 font-serif text-3xl font-light text-ivory"
                  >
                    You&rsquo;re officially one of the first.
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-3 text-sm font-light text-ivory/60"
                  >
                    Welcome to Rituel.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});
