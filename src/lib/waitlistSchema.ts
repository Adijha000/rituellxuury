import { z } from "zod";

export const hairGoals = [
  "Longer Hair",
  "Hair Fall",
  "Healthy Hair",
  "Scalp Care",
  "Self Care",
] as const;

export const waitlistSchema = z.object({
  firstName: z.string().trim().min(1, "Your first name, please.").max(80),
  email: z.string().trim().email("That email doesn't look right."),
  phone: z
    .string()
    .trim()
    .min(7, "Add a valid phone number.")
    .max(20)
    .regex(/^[0-9+\s()-]+$/, "Numbers only, please."),
  hairGoal: z.enum(hairGoals, { message: "Choose your hair goal." }),
  consent: z.literal(true, {
    message: "We need your consent to reserve your place.",
  }),
  source: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
