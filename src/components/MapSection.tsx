"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { forwardRef } from "react";

const MAP_EMBED =
  "https://maps.google.com/maps?q=Al+Saj+Convention+Centre,+Kazhakoottam,+Trivandrum&t=&z=16&ie=UTF8&iwloc=&output=embed";

const MAP_LINK = "https://www.google.com/maps/search/Al+Saj+Convention+Centre+Kazhakoottam+Trivandrum/@8.5630,76.8687,17z";

const MapSection = forwardRef<HTMLDivElement>((_, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="w-full max-w-3xl mx-auto px-4"
  >
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/25 bg-white">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#AA7A00] via-[#FFDF73] to-[#AA7A00]" />

      <div className="w-full h-[240px] sm:h-[380px] md:h-[450px]">
        <iframe
          src={MAP_EMBED}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 bg-white border-t border-[#D4AF37]/20">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">Venue</span>
          <span className="font-serif text-sm sm:text-base md:text-lg text-[#8B0000] font-bold mt-1">
            Al Saj Convention Centre, Kazhakoottam
          </span>
        </div>
        <motion.a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:py-2 rounded-full border border-[#D4AF37] text-[#8B0000] font-sans text-xs uppercase tracking-[0.15em] hover:bg-[#FFF5F5] transition-colors shrink-0 font-semibold"
        >
          Open Maps
          <ExternalLink className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
        </motion.a>
      </div>
    </div>
  </motion.div>
));

MapSection.displayName = "MapSection";
export default MapSection;
