import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Amal & Reenu - Wedding Invitation",
  description: "Join us in celebrating the wedding of Amal & Reenu on 11 November 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#FFF5F5] text-gray-900 overflow-x-hidden selection:bg-[#8B0000] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
