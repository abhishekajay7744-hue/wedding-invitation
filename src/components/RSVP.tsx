"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, HeartOff } from "lucide-react";

interface RSVPProps {
  onRSVP: (status: "yes" | "no") => void;
}

function fireConfetti() {
  const colors = ["#8B0000", "#D4AF37", "#FF6B8A", "#FFD700", "#FF0040"];
  confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors, ticks: 250, gravity: 0.6, scalar: 1.2 });
  setTimeout(() =>
    confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors, ticks: 200 }), 200);
  setTimeout(() =>
    confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors, ticks: 200 }), 400);
}

export default function RSVP({ onRSVP }: RSVPProps) {
  const [response, setResponse] = useState<"yes" | "no" | null>(null);

  const handle = (status: "yes" | "no") => {
    if (response) return;
    setResponse(status);
    onRSVP(status);
    if (status === "yes") fireConfetti();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto px-4"
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/25 bg-white/85 backdrop-blur-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#AA7A00] via-[#FFDF73] to-[#AA7A00]" />

        <div className="px-6 py-10 sm:px-8 sm:py-12 flex flex-col items-center text-center gap-6 sm:gap-8">
          <AnimatePresence mode="wait">
            {!response && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-6 sm:gap-8 w-full"
              >
                <div className="flex flex-col gap-2">
                  <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400 font-medium">
                    Kindly reply
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#8B0000] font-bold leading-tight">
                    Will you join us<br />on our special day?
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(139,0,0,0.3)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handle("yes")}
                    className="flex items-center justify-center gap-2 w-full sm:flex-1 px-4 py-4 rounded-full bg-gradient-to-r from-[#8B0000] via-[#a30000] to-[#8B0000] text-white font-sans text-[10px] sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] shadow-lg transition-all whitespace-nowrap"
                  >
                    <Heart className="w-4 h-4 shrink-0" />
                    Yes, I'll be there
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handle("no")}
                    className="flex items-center justify-center gap-2 w-full sm:flex-1 px-4 py-4 rounded-full border-2 border-[#D4AF37]/40 text-[#8B0000] font-sans text-[10px] sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] hover:bg-[#FFF5F5] transition-all whitespace-nowrap"
                  >
                    <HeartOff className="w-4 h-4 shrink-0" />
                    Regretfully no
                  </motion.button>
                </div>
              </motion.div>
            )}

            {response === "yes" && (
              <motion.div
                key="yes"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl sm:text-5xl"
                >
                  🎉
                </motion.span>
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#8B0000] font-bold leading-tight">
                  We're so excited<br />to celebrate with you!
                </p>
                <p className="font-sans text-[10px] sm:text-xs text-gray-500 tracking-[0.15em] mt-2">
                  Please let us know how many will attend below.
                </p>
              </motion.div>
            )}

            {response === "no" && (
              <motion.div
                key="no"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <span className="text-4xl sm:text-5xl">🥀</span>
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#8B0000] font-bold leading-tight">
                  You will be missed ❤️
                </p>
                <p className="font-sans text-[10px] sm:text-xs text-gray-500 tracking-[0.15em] mt-2">
                  We hope to see you at our next celebration.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
