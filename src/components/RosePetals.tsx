"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TOTAL_PARTICLES = 20;
const EMOJIS = ["💕", "❤️", "💖", "💓", "💗"];

interface ParticleProps {
  id: number;
  emoji: string;
  startX: string;
  endX: string;
  duration: number;
  delay: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}

export default function RosePetals() {
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    const generated: ParticleProps[] = [];

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

      const startXVal = Math.random() * 100;
      const startX = `${startXVal}vw`;
      
      // They burst from the bottom centre-ish and spread outwards
      const endX = `${startXVal + (Math.random() - 0.5) * 60}vw`;

      generated.push({
        id: i,
        emoji,
        startX,
        endX,
        duration: 5 + Math.random() * 5, // Fall slower (5 to 10 seconds)
        delay: Math.random() * 2, // Spread out the spawn times
        scale: 0.6 + Math.random() * 0.5, // Smaller size
        rotX: Math.random() * 360,
        rotY: Math.random() * 360,
        rotZ: Math.random() * 360,
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
            y: "-10vh", // Start slightly above screen
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: p.scale,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: p.endX,
            rotateX: p.rotX,
            rotateY: p.rotY,
            rotateZ: p.rotZ,
            scale: p.scale,
            opacity: [0, 1, 1, 0], // Fade in and fade out
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear", // Smooth falling
            repeat: Infinity, // Keep raining!
          }}
          className="absolute top-0 left-0 text-xl sm:text-2xl"
          style={{
            willChange: "transform",
            filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.15))",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
