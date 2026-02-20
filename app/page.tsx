"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PETAL = "M32 22C26 14 26 6 32 1C38 6 38 14 32 22Z";

function SunflowerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d={PETAL} fill="#D97706" transform="rotate(0,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(30,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(60,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(90,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(120,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(150,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(180,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(210,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(240,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(270,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(300,32,32)" />
      <path d={PETAL} fill="#D97706" transform="rotate(330,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(15,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(45,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(75,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(105,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(135,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(165,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(195,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(225,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(255,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(285,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(315,32,32)" />
      <path d={PETAL} fill="#FACC15" transform="rotate(345,32,32)" />
      <circle cx="32" cy="32" r="10" fill="#92400E" />
      <circle cx="32" cy="32" r="7.5" fill="#78350F" />
      <circle cx="30" cy="30" r="1" fill="#A16207" opacity="0.6" />
      <circle cx="34" cy="30" r="1" fill="#A16207" opacity="0.6" />
      <circle cx="32" cy="33" r="1" fill="#A16207" opacity="0.6" />
      <circle cx="29" cy="33" r="1" fill="#A16207" opacity="0.6" />
      <circle cx="35" cy="33" r="1" fill="#A16207" opacity="0.6" />
      <circle cx="31" cy="36" r="1" fill="#A16207" opacity="0.6" />
      <circle cx="33" cy="28" r="1" fill="#A16207" opacity="0.6" />
    </svg>
  );
}

interface FloatingSunflower {
  id: number;
  delay: number;
  size: number;
  left: number;
  duration: number;
}

interface BlurredSunflower {
  id: number;
  delay: number;
  size: number;
  left: number;
  top: number;
}

function BackgroundSunflower({ delay, size, left, duration }: Omit<FloatingSunflower, "id">) {
  return (
    <motion.div
      className="absolute opacity-20"
      style={{ left: `${left}%`, width: size, height: size }}
      initial={{ top: "110%", rotate: 0 }}
      animate={{
        top: "-15%",
        rotate: [0, 20, -20, 15, -15, 0],
      }}
      transition={{
        top: { duration, delay, repeat: Infinity, ease: "linear" },
        rotate: { duration: 8, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <SunflowerIcon className="w-full h-full drop-shadow-lg" />
    </motion.div>
  );
}

function BlurredBackgroundSunflower({
  size,
  left,
  top,
  delay,
}: Omit<BlurredSunflower, "id">) {
  return (
    <motion.div
      className="absolute opacity-15 blur-xl"
      style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
      animate={{ y: [0, -30, 0, 30, 0] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <SunflowerIcon className="w-full h-full" />
    </motion.div>
  );
}

const LINE_ONE = "I LOVE YOU SO MUCH";
const LINE_TWO = "LALOVES";
const TOTAL_CHARS = LINE_ONE.length + LINE_TWO.length;

export default function Home() {
  const [phase, setPhase] = useState<"heart" | "text" | "subtitle">("heart");
  const [mounted, setMounted] = useState(false);
  const [floatingItems, setFloatingItems] = useState<FloatingSunflower[]>([]);
  const [blurredItems, setBlurredItems] = useState<BlurredSunflower[]>([]);

  useEffect(() => {
    setFloatingItems(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 10,
        size: 24 + Math.random() * 36,
        left: Math.random() * 100,
        duration: 12 + Math.random() * 8,
      }))
    );

    setBlurredItems(
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
    const t2 = setTimeout(() => setPhase("subtitle"), 1500 + TOTAL_CHARS * 100 + 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-300">
      {mounted &&
        blurredItems.map((h) => (
          <BlurredBackgroundSunflower key={h.id} size={h.size} left={h.left} top={h.top} delay={h.delay} />
        ))}

      {mounted &&
        floatingItems.map((h) => (
          <BackgroundSunflower key={h.id} delay={h.delay} size={h.size} left={h.left} duration={h.duration} />
        ))}

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-4 sm:gap-6 px-6 sm:px-8 md:px-12">
        <AnimatePresence>
          {phase === "heart" && (
            <motion.div
              key="center-sunflower"
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
                filter: "drop-shadow(0 0 30px rgba(250,204,21,0.7)) drop-shadow(0 0 60px rgba(245,158,11,0.4))",
              }}
            >
              <SunflowerIcon className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36" />
            </motion.div>
          )}
        </AnimatePresence>

        {(phase === "text" || phase === "subtitle") && (
          <motion.div
            className="flex flex-col items-center gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-x-0.5 sm:gap-x-1 md:gap-x-2">
              {LINE_ONE.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="text-[1.6rem] leading-tight sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold text-white"
                  style={{
                    textShadow:
                      "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(234,88,12,0.3)",
                    display: char === " " ? "inline" : "inline-block",
                    minWidth: char === " " ? "0.25em" : undefined,
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.5 }}
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
            </div>
            <div className="flex justify-center gap-x-0.5 sm:gap-x-1 md:gap-x-2">
              {LINE_TWO.split("").map((char, i) => {
                const globalIndex = LINE_ONE.length + i;
                return (
                  <motion.span
                    key={globalIndex}
                    className="text-[1.8rem] leading-tight sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-extrabold"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B, #DC2626, #F59E0B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 12px rgba(245,158,11,0.5))",
                    }}
                    initial={{ opacity: 0, y: 30, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: globalIndex * 0.08,
                      duration: 0.5,
                      ease: "easeOut",
                      y: { type: "spring", stiffness: 300, damping: 15, delay: globalIndex * 0.08 },
                      scale: { type: "spring", stiffness: 300, damping: 12, delay: globalIndex * 0.08 },
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        )}

        {phase === "subtitle" && (
          <motion.p
            className="mt-1 sm:mt-2 text-sm sm:text-lg md:text-xl lg:text-2xl text-amber-900/90 font-medium text-center max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
            style={{
              textShadow: "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(245,158,11,0.3)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Kahit puro tayo away at tampohan, mahal na mahal kita palagi 🌻
          </motion.p>
        )}

        {phase === "subtitle" && (
          <motion.div
            className="mt-2 sm:mt-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                filter: "drop-shadow(0 0 15px rgba(250,204,21,0.6)) drop-shadow(0 0 30px rgba(245,158,11,0.3))",
              }}
            >
              <SunflowerIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
