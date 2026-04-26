"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TOTAL_PARTICLES = 15; // Even lighter for mobile
const EMOJIS = ["💕", "❤️", "💖", "💓", "💗"];

interface ParticleProps {
  id: number;
  emoji: string;
  startX: string;
  endX: string;
  duration: number;
  delay: number;
  scale: number;
  rotation: number;
}

export default function RosePetals() {
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    const generated: ParticleProps[] = [];

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

      const startXVal = Math.random() * 100;
      const startX = `${startXVal}vw`;
      const endX = `${startXVal + (Math.random() - 0.5) * 40}vw`;

      generated.push({
        id: i,
        emoji,
        startX,
        endX,
        duration: 5 + Math.random() * 4,
        delay: Math.random() * 2,
        scale: 0.7 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 360,
      });
    }
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.startX,
            y: "-10vh",
            rotate: 0,
            scale: p.scale,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: p.endX,
            rotate: p.rotation,
            scale: p.scale,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-0 left-0 text-2xl sm:text-3xl"
          style={{ willChange: "transform" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
