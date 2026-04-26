"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface VideoIntroProps {
  onComplete: () => void;
}

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [stage, setStage] = useState<"initial" | "playing" | "ended">("initial");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    setStage("playing");
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoEnded = () => {
    setStage("ended");
  };

  const handleEnter = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      audio.play().catch(console.error);
    }
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <video
        ref={videoRef}
        src="/assets/animation/curtain.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-between w-full h-[100dvh] px-4 py-16"
      >
        <AnimatePresence mode="wait">
          {stage === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
              className="flex flex-col items-center justify-center h-full w-full"
            >
              <h1 
                className="text-center text-[#FFF5F5] drop-shadow-2xl leading-none px-2 whitespace-nowrap"
                style={{ fontSize: "clamp(2.2rem, 10vw, 6.5rem)" }}
              >
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4em", display: "inline-block", lineHeight: 1 }}>A</span><span style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive", display: "inline-block", lineHeight: 1 }}>mal</span>
                <span style={{ fontFamily: "sans-serif", fontSize: "0.4em", margin: "0 0.4em", display: "inline-block", lineHeight: 1 }}>💕</span>
                <span style={{ fontFamily: "var(--font-serif), serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.4em", display: "inline-block", lineHeight: 1 }}>R</span><span style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive", display: "inline-block", lineHeight: 1 }}>eenu</span>
              </h1>
              
              <motion.button
                onClick={handlePlayVideo}
                className="px-10 sm:px-12 py-4 sm:py-5 rounded-full border border-[#D4AF37]/60 bg-white/10 backdrop-blur-md text-[#D4AF37] font-sans uppercase tracking-[0.25em] text-xs sm:text-sm hover:bg-white/20 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-8 whitespace-nowrap"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Tap to Begin
              </motion.button>
            </motion.div>
          )}

          {stage === "ended" && (
            <motion.div
              key="ended"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-between h-full w-full"
            >
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Removed The Celebration Begins label as requested */}
              </div>

              {/* Bottom placed button */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pb-8 w-full flex justify-center"
              >
                <motion.button
                  onClick={handleEnter}
                  className="group relative px-12 sm:px-16 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#8B0000] via-[#aa0000] to-[#8B0000] text-white font-sans uppercase tracking-[0.3em] text-xs sm:text-sm shadow-[0_0_30px_rgba(139,0,0,0.6)] overflow-hidden whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Enter Invitation
                    <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  {/* Gloss effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
