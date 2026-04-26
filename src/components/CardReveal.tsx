"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import RosePetals from "./RosePetals";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface CardRevealProps {
  onProceed: () => void;
}

function fireRealisticPopper() {
  const colors = ["#8B0000", "#D4AF37", "#FF6B8A", "#FFD700", "#FF0040", "#FFFFFF"];
  // Reduced particle counts drastically for smooth performance on lower-end mobile devices
  confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, colors, ticks: 150, gravity: 0.8, scalar: 1 });
  setTimeout(() => confetti({ particleCount: 25, angle: 60, spread: 45, origin: { x: 0, y: 0.7 }, colors, ticks: 150, gravity: 0.7 }), 200);
  setTimeout(() => confetti({ particleCount: 25, angle: 120, spread: 45, origin: { x: 1, y: 0.7 }, colors, ticks: 150, gravity: 0.7 }), 400);
}


export default function CardReveal({ onProceed }: CardRevealProps) {
  const [showPetals, setShowPetals] = useState(false);

  useEffect(() => {
    // Delay ALL heavy effects until AFTER the image animation completes (300ms spring)
    // This guarantees the image renders first with 100% CPU
    const confettiTimer = setTimeout(() => fireRealisticPopper(), 350);
    const petalsTimer = setTimeout(() => setShowPetals(true), 400);
    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(petalsTimer);
    };
  }, []);

  return (
    <motion.div
      className="h-[100dvh] w-full flex flex-col items-center justify-between relative overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f0] via-[#FFF5F5] to-[#ffe8e8]" />
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] bg-[#ff9999]/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] bg-[#D4AF37]/15 rounded-full blur-[80px]" />

      {showPetals && <RosePetals />}

      {/* ─── Wedding card ───────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-5 pt-8 pb-4">
        <div className="relative w-full max-w-xs sm:max-w-sm bg-white shadow-[0_16px_48px_rgba(139,0,0,0.14)] rounded-sm">
          {/* Outer gold border */}
          <div className="border-[1.5px] border-[#D4AF37]/60 m-1.5">
            {/* Inner thin border */}
            <div className="border border-[#D4AF37]/25 m-1">
              {/* Corner ornaments */}
              {["-translate-x-1 -translate-y-1", "translate-x-1 -translate-y-1", "-translate-x-1 translate-y-1", "translate-x-1 translate-y-1"].map((pos, i) => (
                <div key={i} className={`absolute ${i < 2 ? "top-0" : "bottom-0"} ${i % 2 === 0 ? "left-0" : "right-0"} w-4 h-4 ${i < 2 ? (i === 0 ? "border-t-2 border-l-2" : "border-t-2 border-r-2") : (i === 2 ? "border-b-2 border-l-2" : "border-b-2 border-r-2")} border-[#D4AF37] ${pos}`} />
              ))}

              {/* Card body */}
              <div className="flex flex-col items-center px-4 pt-5 pb-6 bg-[#FFFBFB]">
                <div className="h-px w-12 bg-[#D4AF37]/50 mb-4" />

                {/* Portrait image — explosive pop-in animation */}
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18, duration: 0.25 }}
                  className="relative w-full aspect-[3/4] max-h-[38vh]"
                >
                  <Image
                    src="/assets/images/groom&bride.png"
                    alt="Groom and Bride"
                    fill
                    sizes="(max-width: 480px) 85vw, 320px"
                    priority
                    className="object-contain"
                  />
                </motion.div>

                {/* Names */}
                <h1
                  className="mt-4 text-center text-[#8B0000] whitespace-nowrap"
                  style={{ fontSize: "clamp(1.4rem, 6vw, 2.6rem)", lineHeight: 1.2 }}
                >
                  <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4em", display: "inline-block", lineHeight: 1 }}>A</span><span style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive", display: "inline-block" }}>mal</span>
                  <span style={{ fontFamily: "sans-serif", fontSize: "0.5em", margin: "0 0.25em", display: "inline-block" }}>💕</span>
                  <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4em", display: "inline-block", lineHeight: 1 }}>R</span><span style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive", display: "inline-block" }}>eenu</span>
                </h1>

                <div className="h-px w-12 bg-[#D4AF37]/50 mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CTA button ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-20 flex flex-col items-center gap-3 pb-8"
      >
        <motion.button
          onClick={onProceed}
          whileHover={{ scale: 1.06, boxShadow: "0 0 28px rgba(139,0,0,0.35)" }}
          whileTap={{ scale: 0.95 }}
          className="px-9 py-3.5 rounded-full bg-gradient-to-r from-[#8B0000] via-[#a30000] to-[#8B0000] text-white font-sans text-xs uppercase tracking-[0.22em] shadow-xl"
        >
          View Our Invitation
        </motion.button>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-[#8B0000]/50" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
