"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Minus, Plus, CheckCircle } from "lucide-react";

interface GuestFormProps {
  onSubmit: (count: number) => void;
}

export default function GuestForm({ onSubmit }: GuestFormProps) {
  const [count, setCount] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const inc = () => setCount((c) => Math.min(10, c + 1));
  const dec = () => setCount((c) => Math.max(1, c - 1));

  const handleConfirm = () => {
    setConfirmed(true);
    onSubmit(count);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto px-4"
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/25 bg-white/85 backdrop-blur-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#AA7A00] via-[#FFDF73] to-[#AA7A00]" />

        <div className="px-6 py-10 sm:px-8 sm:py-12 flex flex-col items-center text-center gap-6 sm:gap-8">
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center gap-6 sm:gap-8 w-full"
              >
                <div className="flex flex-col gap-2 items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] border border-[#D4AF37]/40 flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-[#8B0000]" />
                  </div>
                  <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400 font-medium">
                    Attending guests
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#8B0000] font-bold leading-tight">
                    How many will be joining?
                  </h3>
                </div>

                <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-[200px]">
                  <motion.button
                    onClick={dec}
                    disabled={count <= 1}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#8B0000] disabled:opacity-30 hover:bg-[#FFF5F5] transition-colors shrink-0"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>

                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={count}
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 15, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-serif text-4xl sm:text-5xl text-[#8B0000] font-bold w-12 sm:w-16 text-center tabular-nums select-none shrink-0"
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>

                  <motion.button
                    onClick={inc}
                    disabled={count >= 10}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#8B0000] disabled:opacity-30 hover:bg-[#FFF5F5] transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                <p className="font-sans text-[10px] sm:text-xs text-gray-400 uppercase tracking-[0.1em]">
                  Maximum 10 guests
                </p>

                <motion.button
                  onClick={handleConfirm}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(212,175,55,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto px-8 sm:px-12 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFDF73] to-[#D4AF37] text-[#8B0000] font-sans text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold shadow-lg transition-all whitespace-nowrap"
                >
                  Confirm Attendance
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#D4AF37]" strokeWidth={1.5} />
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#8B0000] font-bold leading-tight">
                  Confirmed!
                </p>
                <p className="font-sans text-gray-600 text-[10px] sm:text-xs tracking-[0.1em] uppercase mt-2">
                  We've reserved{" "}
                  <span className="font-bold text-[#8B0000] text-sm sm:text-base mx-1">{count}</span>{" "}
                  {count === 1 ? "seat" : "seats"} for you.<br className="sm:hidden"/> See you on the 11th! 🎊
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
