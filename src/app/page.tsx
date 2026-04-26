"use client";
import React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import VideoIntro from "@/components/VideoIntro";
import CardReveal from "@/components/CardReveal";
import ScratchCard from "@/components/ScratchCard";
import Countdown from "@/components/Countdown";
import LocationCard from "@/components/LocationCard";
import MapSection from "@/components/MapSection";
import RSVP from "@/components/RSVP";
import GuestForm from "@/components/GuestForm";
import ThankYou from "@/components/ThankYou";
import AudioPlayer from "@/components/AudioPlayer";
import { ChevronDown, ChevronUp } from "lucide-react";

type AppStage = "video" | "reveal" | "content";
const SECTIONS = ["hero", "countdown", "venue", "rsvp", "thankyou"] as const;

/* ── Shared UI pieces ────────────────────────────────────────── */
function SectionHeader({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center mb-6 px-4">
      {eyebrow && (
        <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#8B0000] font-bold leading-tight">
        {title}
      </h2>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-px w-10 bg-[#D4AF37]/50" />
        <span className="text-[#D4AF37] text-xs tracking-widest">✦ ✦ ✦</span>
        <div className="h-px w-10 bg-[#D4AF37]/50" />
      </div>
    </div>
  );
}

/* ── Slide variants ──────────────────────────────────────────── */
const slideVariants: Variants = {
  enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: (dir: number) => ({
    y: dir < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: { duration: 0.7, ease: "easeIn" },
  }),
};

/* ── Script-font name component ──────────────────────────────── */
// A & R use Cormorant Garamond (clearly uppercase serif drop-cap)
// "mal" & "eenu" use Great Vibes (flowing script)
const SERIF_CAP: React.CSSProperties = {
  fontFamily: "var(--font-serif), 'Cormorant Garamond', Georgia, serif",
  fontStyle: "italic",
  fontWeight: 700,
  display: "inline-block",
  lineHeight: 1,
};
const SCRIPT_REST: React.CSSProperties = {
  fontFamily: "var(--font-script), 'Great Vibes', cursive",
  display: "inline-block",
  lineHeight: 1,
};

function ScriptName({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "baseline", flexWrap: "nowrap", justifyContent: "center", gap: "0", whiteSpace: "nowrap", ...style }}>
      <span style={{ ...SERIF_CAP, fontSize: "1.4em" }}>A</span>
      <span style={SCRIPT_REST}>mal</span>
      <span style={{ fontFamily: "sans-serif", fontSize: "0.45em", margin: "0 0.4em", lineHeight: 1, alignSelf: "center" }}>💕</span>
      <span style={{ ...SERIF_CAP, fontSize: "1.4em" }}>R</span>
      <span style={SCRIPT_REST}>eenu</span>
    </span>
  );
}

function VenueSection({ direction }: { direction: number }) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.section
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 w-full h-full overflow-y-auto"
      data-scrollable
    >
      <div className="min-h-full flex flex-col items-center justify-start px-4 py-16">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-5">
          <SectionHeader eyebrow="Where it happens" title="The Venue" />
          <LocationCard onViewMap={scrollToMap} />
          <div ref={mapRef} className="w-full scroll-mt-10">
            <MapSection />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [stage, setStage] = useState<AppStage>("video");
  const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no" | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const isAnimating = useRef(false);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating.current || index < 0 || index >= SECTIONS.length) return;
      setDirection(index > activeSlide ? 1 : -1);
      setActiveSlide(index);
      isAnimating.current = true;
      setTimeout(() => { isAnimating.current = false; }, 900);
    },
    [activeSlide]
  );

  const handleNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const handlePrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  /* ── Wheel + swipe navigation (smart: respects internal scroll) ── */
  useEffect(() => {
    if (stage !== "content") return;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest("[data-scrollable]") as HTMLElement | null;
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atTop = scrollTop <= 1;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) return;
      }

      const now = Date.now();
      if (now - lastWheelTime.current < 900) return;
      lastWheelTime.current = now;
      if (e.deltaY > 30) handleNext();
      else if (e.deltaY < -30) handlePrev();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest("[data-scrollable]") as HTMLElement | null;
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atTop = scrollTop <= 2;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
        const diff = touchStartY.current - e.changedTouches[0].clientY;
        if ((diff > 0 && !atBottom) || (diff < 0 && !atTop)) return;
      }

      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 60) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [stage, handleNext, handlePrev]);

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <main className="h-[100dvh] bg-[#FFF5F5] overflow-hidden relative">
      {/* ── Intro / Reveal ── */}
      <AnimatePresence mode="wait">
        {stage === "video" && <VideoIntro key="video" onComplete={() => setStage("reveal")} />}
        {stage === "reveal" && <CardReveal key="reveal" onProceed={() => setStage("content")} />}
      </AnimatePresence>

      <AudioPlayer isIntroFinished={stage !== "video"} />

      {/* ── Content slides ── */}
      {stage === "content" && (
        <div className="relative w-full h-[100dvh]">

          {/* Dot navigation */}
          <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
            {SECTIONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeSlide
                    ? "w-2.5 h-2.5 bg-[#8B0000]"
                    : "w-2 h-2 bg-[#D4AF37]/40 hover:bg-[#D4AF37]"
                }`}
                aria-label={`Section ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow hints */}
          {activeSlide > 0 && (
            <button
              onClick={handlePrev}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-[#8B0000]/40 hover:text-[#8B0000] transition-colors"
            >
              <ChevronUp className="w-7 h-7 animate-bounce" />
            </button>
          )}
          {activeSlide < SECTIONS.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-[#8B0000]/40 hover:text-[#8B0000] transition-colors"
            >
              <ChevronDown className="w-7 h-7 animate-bounce" />
            </button>
          )}

          <AnimatePresence initial={false} custom={direction}>

            {/* ══ 1. HERO ══════════════════════════════════════════ */}
            {activeSlide === 0 && (
              <motion.section
                key="hero"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full overflow-y-auto"
                data-scrollable
              >
                <div className="min-h-full flex flex-col items-center justify-center px-4 py-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f0] via-[#FFF5F5] to-[#fff8ee]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full bg-[#ffcccc]/20 blur-[100px] pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-md mx-auto text-center">
                    <div className="flex items-center gap-3 w-full justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
                      <span className="text-[#D4AF37] text-lg">✦</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
                    </div>

                    <ScriptName
                      className="text-[#8B0000]"
                      style={{ fontSize: "clamp(1.8rem, 8vw, 4.5rem)" }}
                    />

                    <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.35em] text-gray-400 font-medium">
                      Are getting married
                    </p>

                    <div className="flex items-center gap-3 w-full justify-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                      <span className="text-[#D4AF37]/70 text-xs tracking-widest">✦ ✦ ✦</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
                    </div>

                    <div className="w-full flex justify-center">
                      <ScratchCard />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ══ 2. COUNTDOWN ══════════════════════════════════════ */}
            {activeSlide === 1 && (
              <motion.section
                key="countdown"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full overflow-y-auto"
                data-scrollable
              >
                <div className="min-h-full flex flex-col items-center justify-center px-4 py-16 bg-white/60">
                  <div className="w-full max-w-xl mx-auto flex flex-col items-center">
                    <SectionHeader eyebrow="Days until we say I do" title="The Countdown" />
                    <Countdown />
                  </div>
                </div>
              </motion.section>
            )}

            {/* ══ 3. VENUE ══════════════════════════════════════════ */}
            {activeSlide === 2 && (
              <VenueSection key="venue" direction={direction} />
            )}

            {/* ══ 4. RSVP ══════════════════════════════════════════ */}
            {activeSlide === 3 && (
              <motion.section
                key="rsvp"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full overflow-y-auto bg-white/60"
                data-scrollable
              >
                <div className="min-h-full flex flex-col items-center justify-start px-4 py-16">
                  <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-5">
                    <SectionHeader eyebrow="Will you join us?" title="RSVP" />
                    <RSVP onRSVP={setRsvpStatus} />
                    <AnimatePresence>
                      {rsvpStatus === "yes" && (
                        <motion.div
                          key="guest-form"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full"
                        >
                          <GuestForm onSubmit={(count) => {
                            console.log(`Confirmed ${count} guests`);
                          }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ══ 5. THANK YOU ══════════════════════════════════════ */}
            {activeSlide === 4 && (
              <motion.section
                key="thankyou"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full overflow-y-auto"
                data-scrollable
              >
                <ThankYou />
              </motion.section>
            )}

          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
