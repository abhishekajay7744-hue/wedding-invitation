"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

interface LocationCardProps {
  onViewMap: () => void;
}

export default function LocationCard({ onViewMap }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/25 bg-white/85 backdrop-blur-sm">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#AA7A00] via-[#FFDF73] to-[#AA7A00]" />

        <div className="px-6 sm:px-10 py-10 sm:py-12 flex flex-col items-center text-center gap-6 sm:gap-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFF5F5] border border-[#D4AF37]/40 flex items-center justify-center shadow-md">
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B0000]" />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400 font-medium">
              Venue
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#8B0000] font-bold leading-tight">
              Al Saj Convention Centre
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 uppercase tracking-[0.1em] mt-1">
              Kazhakoottam, Trivandrum, Kerala
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-5 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-[#FFF5F5] border border-[#D4AF37]/30">
            <span className="text-sm sm:text-base hidden sm:inline">📅</span>
            <span className="font-sans text-[10px] sm:text-xs text-gray-600 tracking-[0.1em] sm:tracking-[0.15em] uppercase text-center">
              11 November 2026 <span className="hidden sm:inline">&nbsp;·&nbsp;</span><br className="sm:hidden"/> 10:00 AM IST
            </span>
          </div>

          <motion.button
            onClick={onViewMap}
            whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(139,0,0,0.3)" }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#8B0000] via-[#a30000] to-[#8B0000] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-lg transition-all whitespace-nowrap"
          >
            <Navigation className="w-4 h-4 shrink-0" />
            View on Map
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
