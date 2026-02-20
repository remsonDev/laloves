"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

interface FloatingHeart {
  id: number;
  delay: number;
  size: number;
  left: number;
  duration: number;
}

interface BlurredHeart {
  id: number;
  delay: number;
  size: number;
  left: number;
  top: number;
}

function BackgroundHeart({ delay, size, left, duration }: Omit<FloatingHeart, "id">) {
  return (
    <motion.div
      className="absolute text-pink-300/20"
      style={{ left: `${left}%`, width: size, height: size }}
      initial={{ top: "110%", rotate: 0 }}
      animate={{
        top: "-15%",
        rotate: [0, 15, -15, 10, -10, 0],
      }}
      transition={{
        top: { duration, delay, repeat: Infinity, ease: "linear" },
        rotate: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <HeartIcon className="w-full h-full drop-shadow-lg" />
    </motion.div>
  );
}

function BlurredBackgroundHeart({
  size,
  left,
  top,
  delay,
}: Omit<BlurredHeart, "id">) {
  return (
    <motion.div
      className="absolute text-pink-400/15 blur-xl"
      style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
      animate={{ y: [0, -30, 0, 30, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <HeartIcon className="w-full h-full" />
    </motion.div>
  );
}

const MAIN_TEXT = "I LOVE YOU SO MUCH LALOVES";

export default function Home() {
  const [phase, setPhase] = useState<"heart" | "text" | "subtitle">("heart");
  const [mounted, setMounted] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [blurredHearts, setBlurredHearts] = useState<BlurredHeart[]>([]);

  useEffect(() => {
    setFloatingHearts(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 10,
        size: 16 + Math.random() * 28,
        left: Math.random() * 100,
        duration: 12 + Math.random() * 8,
      }))
    );

    setBlurredHearts(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        delay: i * 1.2,
        size: 100 + Math.random() * 120,
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
      }))
    );

    setMounted(true);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 1500);
    const t2 = setTimeout(() => setPhase("subtitle"), 1500 + MAIN_TEXT.length * 100 + 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-pink-300 to-purple-400">
      {mounted &&
        blurredHearts.map((h) => (
          <BlurredBackgroundHeart key={h.id} size={h.size} left={h.left} top={h.top} delay={h.delay} />
        ))}

      {mounted &&
        floatingHearts.map((h) => (
          <BackgroundHeart key={h.id} delay={h.delay} size={h.size} left={h.left} duration={h.duration} />
        ))}

      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        <AnimatePresence>
          {phase === "heart" && (
            <motion.div
              key="center-heart"
              className="text-red-500"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{
                scale: [0.3, 1, 1.1, 1],
                opacity: 1,
              }}
              exit={{ scale: 3, opacity: 0 }}
              transition={{
                scale: { duration: 1, ease: "easeOut" },
                opacity: { duration: 0.6, ease: "easeOut" },
              }}
              style={{
                filter: "drop-shadow(0 0 30px rgba(239,68,68,0.7)) drop-shadow(0 0 60px rgba(239,68,68,0.4))",
              }}
            >
              <HeartIcon className="w-24 h-24 sm:w-32 sm:h-32" />
            </motion.div>
          )}
        </AnimatePresence>

        {(phase === "text" || phase === "subtitle") && (
          <motion.div
            className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {MAIN_TEXT.split("").map((char, i) => (
              <motion.span
                key={i}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white"
                style={{
                  textShadow:
                    "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(236,72,153,0.6), 0 0 80px rgba(236,72,153,0.3)",
                  display: char === " " ? "inline" : "inline-block",
                  minWidth: char === " " ? "0.3em" : undefined,
                }}
                initial={{ opacity: 0, y: 40, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                  y: { type: "spring", stiffness: 300, damping: 15, delay: i * 0.08 },
                  scale: { type: "spring", stiffness: 300, damping: 12, delay: i * 0.08 },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        )}

        {phase === "subtitle" && (
          <motion.p
            className="mt-2 text-lg sm:text-xl md:text-2xl text-white/90 font-medium text-center"
            style={{
              textShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(236,72,153,0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Kahit puro tayo away tampohan mahal na mahal kita palagi ❤️
          </motion.p>
        )}

        {phase === "subtitle" && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="text-red-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                filter: "drop-shadow(0 0 15px rgba(239,68,68,0.6)) drop-shadow(0 0 30px rgba(239,68,68,0.3))",
              }}
            >
              <HeartIcon className="w-10 h-10 sm:w-14 sm:h-14" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
