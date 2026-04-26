"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVEAL_THRESHOLD = 15; // Fast reveal
const BRUSH_RADIUS = 35; // Larger, softer brush

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const moveCount = useRef(0);
  const isSetup = useRef(false);

  const [revealed, setRevealed] = useState(false);
  const [percent, setPercent] = useState(0);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isSetup.current) return;
    isSetup.current = true;

    const DPR = window.devicePixelRatio || 1;
    const CW = container.clientWidth;
    const CH = container.clientHeight;

    canvas.width = CW * DPR;
    canvas.height = CH * DPR;
    canvas.style.width = `${CW}px`;
    canvas.style.height = `${CH}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    ctx.scale(DPR, DPR);

    // Realistic Foil Gradient
    const g = ctx.createLinearGradient(0, 0, CW, CH);
    g.addColorStop(0, "#8B6508"); // Darker gold edge
    g.addColorStop(0.2, "#FFD700"); // Bright gold highlight
    g.addColorStop(0.5, "#DAA520"); // Mid gold
    g.addColorStop(0.8, "#FFF8DC"); // Glint
    g.addColorStop(1, "#B8860B"); // Dark gold edge
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, CW, CH);

    // Subtle noise/scratch texture on the foil itself
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)";
      ctx.beginPath();
      // Draw tiny horizontal-ish lines for brushed metal effect
      const x = Math.random() * CW;
      const y = Math.random() * CH;
      const len = Math.random() * 8 + 2;
      ctx.ellipse(x, y, len, 0.5, Math.random() * 0.2 - 0.1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Add text shadow for "embossed" look
    ctx.shadowColor = "rgba(255,255,255,0.7)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;

    const isSmall = CW < 300;
    ctx.font = `bold ${isSmall ? 13 : 15}px sans-serif`;
    ctx.fillStyle = "#5c0000";
    ctx.fillText(isSmall ? "💍 Scratch to reveal date" : "💍 Scratch to reveal our special date", CW / 2, CH / 2 - 16);
    ctx.font = `${isSmall ? 10 : 12}px sans-serif`;
    ctx.fillStyle = "rgba(92,0,0,0.8)";
    ctx.fillText("Use your finger or coin", CW / 2, CH / 2 + 16);
    ctx.restore();
  }, []);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let clear = 0;
    // Sample every 16th pixel for performance
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) clear++;
    }
    const pct = Math.round((clear / (data.length / 16)) * 100);
    setPercent(pct);

    if (pct >= REVEAL_THRESHOLD || moveCount.current > 20) {
      setRevealed(true);
      canvas.style.transition = "opacity 0.8s ease, filter 0.8s ease";
      canvas.style.opacity = "0";
      canvas.style.filter = "blur(10px)";
      setTimeout(() => {
        if (canvas) canvas.style.pointerEvents = "none";
      }, 800);
    }
  }, []);

  const scratch = useCallback((cx: number, cy: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    
    ctx.globalCompositeOperation = "destination-out";
    
    // Realistic soft edge scratch brush
    const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, BRUSH_RADIUS);
    radGrad.addColorStop(0, "rgba(0,0,0,1)");
    radGrad.addColorStop(0.6, "rgba(0,0,0,0.8)");
    radGrad.addColorStop(1, "rgba(0,0,0,0)");
    
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    moveCount.current++;
    if (moveCount.current % 3 === 0) { // Check less frequently for perf
      checkProgress();
    }
  }, [checkProgress]);

  const getPos = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if ("touches" in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as MouseEvent).clientX - rect.left,
      y: (e as MouseEvent).clientY - rect.top,
    };
  };

  useEffect(() => {
    setupCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onStart = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true;
      const p = getPos(e);
      scratch(p.x, p.y);
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      const p = getPos(e);
      scratch(p.x, p.y);
    };
    const onEnd = () => { isDrawing.current = false; };

    canvas.addEventListener("mousedown", onStart);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onEnd);
    canvas.addEventListener("mouseleave", onEnd);
    canvas.addEventListener("touchstart", onStart, { passive: false });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchend", onEnd);

    return () => {
      canvas.removeEventListener("mousedown", onStart);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onEnd);
      canvas.removeEventListener("mouseleave", onEnd);
      canvas.removeEventListener("touchstart", onStart);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onEnd);
    };
  }, [setupCanvas, scratch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full flex flex-col items-center gap-4 px-4"
    >
      <div className="flex items-center gap-3 w-full max-w-sm">
        <div className="h-px flex-1 bg-[#D4AF37]/50" />
        <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-sans whitespace-nowrap">
          Scratch the card
        </span>
        <div className="h-px flex-1 bg-[#D4AF37]/50" />
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 bg-white"
        style={{
          height: "160px",
          // custom cursor looks like a coin/picker
          cursor: revealed ? "default" : "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\" fill=\"%23D4AF37\" stroke=\"%238B6508\" stroke-width=\"2\"/></svg>') 12 12, crosshair",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-white">
          <AnimatePresence>
            {revealed && (
              <motion.div
                key="date"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="flex flex-col items-center gap-1.5 px-4 text-center"
              >
                <span className="text-3xl drop-shadow-md">💍</span>
                <p className="font-sans text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.25em] font-semibold mt-1">
                  Our Wedding Date
                </p>
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#8B0000] font-bold leading-tight">
                  11 November 2026
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ opacity: 1, touchAction: "none" }}
        />
      </div>

      <div className="h-5 flex items-center">
        {revealed && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-[#8B0000] font-sans font-medium"
          >
            ✨ Mark your calendar!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
