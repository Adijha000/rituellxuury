import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const grotesk = Inter({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rituel — Rituals are becoming rare.",
  description:
    "Modern Ayurvedic hair rituals for a healthy scalp and naturally beautiful hair. Join the Founding Waitlist — only 500 places.",
  openGraph: {
    title: "Rituel — Rituals are becoming rare.",
    description:
      "Modern Ayurvedic hair rituals. Join the Founding Waitlist — only 500 places.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${editorial.variable} ${grotesk.variable} h-full`}>
      <body className="min-h-full bg-ivory text-ink antialiased grain">
        {children}
      </body>
    </html>
  );
}
