"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export default function AudioPlayer({ isIntroFinished }: { isIntroFinished: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep the global #bg-music reference in sync with this component's ref
  useEffect(() => {
    // Expose the element so VideoIntro can call play() directly on user gesture
    if (audioRef.current) {
      (audioRef.current as HTMLAudioElement & { __exposed?: boolean }).__exposed = true;
    }
  }, []);

  // Sync React state whenever the audio element fires native events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  };

  return (
    <>
      {/* Preloaded audio — no loop, plays once */}
      <audio
        id="bg-music"
        ref={audioRef}
        src="/assets/music/music.mp3"
        preload="auto"
      />

      {/* Floating music toggle — appears after intro */}
      <motion.button
        aria-label={isPlaying ? "Pause music" : "Play music"}
        onClick={toggle}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={isIntroFinished ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 20 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-[#D4AF37]/40 text-[#8B0000] hover:scale-110 transition-transform"
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <Music className="w-5 h-5" />
          </motion.div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </motion.button>
    </>
  );
}
