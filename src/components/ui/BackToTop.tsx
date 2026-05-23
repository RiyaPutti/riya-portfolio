"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handle = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setScrollPct(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const circumference = 2 * Math.PI * 18;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          {/* SVG progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" fill="none">
            {/* Track */}
            <circle cx="22" cy="22" r="18" stroke="rgba(139,92,246,0.15)" strokeWidth="2" />
            {/* Progress */}
            <circle
              cx="22" cy="22" r="18"
              stroke="url(#ringGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - scrollPct)}
              style={{ transition: "stroke-dashoffset 0.15s ease" }}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4c1d95" />
                <stop offset="100%" stopColor="#c4b5fd" />
              </linearGradient>
            </defs>
          </svg>

          {/* Button face */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(10,8,22,0.9)",
              border: "1px solid rgba(139,92,246,0.3)",
              boxShadow: "0 0 20px rgba(139,92,246,0.25)",
            }}
          >
            <ArrowUp size={15} className="text-violet-400" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
