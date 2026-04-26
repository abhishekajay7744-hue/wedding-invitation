"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SCRIPT: React.CSSProperties = {
  fontFamily: "var(--font-script), 'Great Vibes', cursive",
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, amount: 0.2 },
  transition: { duration: 0.55, ease: "easeOut" as const, delay },
});

export default function ThankYou() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden px-4 py-10">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F5] via-[#fff0f0] to-[#ffe8e8]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] rounded-full bg-[#ff9999]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[450px] max-h-[450px] rounded-full bg-[#D4AF37]/10 blur-[80px] pointer-events-none" />

      {/* ── Invitation Card ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-white shadow-2xl rounded-sm"
      >
        {/* Double gold border */}
        <div className="border-[1.5px] border-[#D4AF37]/60 m-2">
          <div className="border border-[#D4AF37]/30">

            {/* Card body */}
            <div className="flex flex-col items-center px-5 sm:px-8 pt-8 pb-8 gap-5">

              {/* "With all our love" */}
              <motion.p {...fadeUp(0.1)} className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-gray-500 font-medium">
                With all our love
              </motion.p>

              <div className="h-px w-14 bg-[#D4AF37]/50" />

              {/* ── Portraits ───────────────────────────────── */}
              <motion.div
                {...fadeUp(0.2)}
                className="flex items-end justify-center gap-3 sm:gap-5 w-full"
              >
                {/* Groom */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full" style={{ paddingBottom: "133%" }}>
                    <Image
                      src="/assets/images/groom.png"
                      alt="Groom"
                      fill
                      sizes="(max-width: 640px) 40vw, 180px"
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.15em] text-gray-500 uppercase font-medium">
                    Groom
                  </span>
                </div>

                {/* Centre heart */}
                <div className="flex flex-col items-center pb-8 shrink-0">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl sm:text-4xl select-none"
                  >
                    💕
                  </motion.span>
                </div>

                {/* Bride */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full" style={{ paddingBottom: "133%" }}>
                    <Image
                      src="/assets/images/bride.png.png"
                      alt="Bride"
                      fill
                      sizes="(max-width: 640px) 40vw, 180px"
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.15em] text-gray-500 uppercase font-medium">
                    Bride
                  </span>
                </div>
              </motion.div>

              <div className="h-px w-14 bg-[#D4AF37]/50" />

              {/* ── Script name ─────────────────────────────── */}
              <motion.h2
                {...fadeUp(0.3)}
                className="text-center text-[#8B0000] whitespace-nowrap"
                style={{ fontSize: "clamp(1.5rem, 6.5vw, 3rem)", lineHeight: 1.2 }}
              >
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4em", display: "inline-block", lineHeight: 1 }}>A</span>
                <span style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive", display: "inline-block" }}>mal</span>
                <span style={{ fontFamily: "sans-serif", fontSize: "0.5em", margin: "0 0.25em", display: "inline-block" }}>💕</span>
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4em", display: "inline-block", lineHeight: 1 }}>R</span>
                <span style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive", display: "inline-block" }}>eenu</span>
              </motion.h2>

              <div className="flex items-center gap-3 w-full">
                <div className="h-px flex-1 bg-[#D4AF37]/40" />
                <span className="text-[#D4AF37] text-xs tracking-widest">✦ ✦ ✦</span>
                <div className="h-px flex-1 bg-[#D4AF37]/40" />
              </div>

              {/* Quote */}
              <motion.p
                {...fadeUp(0.4)}
                className="font-serif text-sm sm:text-base text-gray-600 leading-relaxed italic text-center"
              >
                "With love in our hearts and joy in every moment,<br className="hidden sm:block" /> we thank you for being part of our journey."
              </motion.p>

              {/* Date pill */}
              <motion.div
                {...fadeUp(0.5)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full border border-[#D4AF37]/30 bg-[#FFF5F5]/80 shadow-sm text-center"
              >
                <span className="font-sans text-[9px] sm:text-xs text-gray-700 tracking-[0.15em] sm:tracking-[0.18em] font-medium">
                  <span className="whitespace-nowrap">📅 11 Nov 2026</span>
                  <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
                  <br className="sm:hidden" />
                  <span className="whitespace-nowrap text-[#8B0000] sm:text-gray-700">Trivandrum</span>
                </span>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>

      <motion.p
        {...fadeUp(0.6)}
        className="relative z-10 font-sans text-[9px] text-gray-400 tracking-[0.3em] uppercase mt-8"
      >
        ✦ &nbsp; Made with love &nbsp; ✦
      </motion.p>
    </div>
  );
}
