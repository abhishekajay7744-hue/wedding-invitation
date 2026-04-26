"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-11-11T10:00:00+05:30");

function calcTimeLeft() {
  const diff = +TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000)  % 24),
    minutes: Math.floor((diff / 60000)    % 60),
    seconds: Math.floor((diff / 1000)     % 60),
  };
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const display = value.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-3 flex-1">
      <div className="relative w-full max-w-[72px] sm:max-w-[90px] aspect-square rounded-xl overflow-hidden shadow-md bg-white border border-[#D4AF37]/30 flex items-center justify-center mx-auto">
        {/* Gold top accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#D4AF37]" />
        {/* Centre line */}
        <div className="absolute top-1/2 left-2 right-2 h-px bg-[#D4AF37]/20 -translate-y-px" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y:   0, opacity: 1 }}
            exit={   { y:  16, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#8B0000] font-bold tabular-nums select-none z-10"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-sans text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.18em] text-gray-500 font-medium text-center">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="text-[#D4AF37] text-2xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 select-none pb-4 sm:pb-6"
    >
      :
    </motion.span>
  );
}

export default function Countdown() {
  const [time, setTime]       = useState(calcTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full max-w-2xl mx-auto px-2">
      <FlipUnit value={time.days}    label="Days"    />
      <Colon />
      <FlipUnit value={time.hours}   label="Hours"   />
      <Colon />
      <FlipUnit value={time.minutes} label="Minutes" />
      <Colon />
      <FlipUnit value={time.seconds} label="Seconds" />
    </div>
  );
}
