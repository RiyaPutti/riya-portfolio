"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 60);

    const p1 = setTimeout(() => setPhase(1), 600);
    const p2 = setTimeout(() => setPhase(2), 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(p1);
      clearTimeout(p2);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-void"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-violet-500/20"
            style={{ width: i * 120, height: i * 120 }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Logo mark */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border border-violet-500/30 shadow-glow-md">
          <span className="font-display text-4xl font-bold gradient-text">
            R
          </span>
        </div>
        <motion.div
          className="absolute -inset-1 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.3), transparent, rgba(139,92,246,0.3))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Name */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-2xl text-white/90 mb-1">
              Riya Maithili Putti
            </h1>
            <p
              className="font-mono text-xs tracking-[0.4em] uppercase"
              style={{ color: "var(--violet-glow)" }}
            >
              Loading Portfolio
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-px bg-violet-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background:
                    "linear-gradient(90deg, #4c1d95, #8b5cf6, #d8b4fe)",
                  boxShadow: "0 0 10px rgba(139,92,246,0.8)",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-mono text-xs text-violet-600">
                {phase >= 2 ? "Initializing systems..." : "Loading assets..."}
              </span>
              <span className="font-mono text-xs text-violet-400">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanning dots */}
      <motion.div
        className="absolute bottom-12 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-violet-500"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
