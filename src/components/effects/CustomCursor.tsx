"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  const trailX = useSpring(cursorX, { stiffness: 120, damping: 25 });
  const trailY = useSpring(cursorY, { stiffness: 120, damping: 25 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setIsMobile(true);
      return;
    }

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[data-hover]")
        )
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Glow trail */}
      <motion.div
        className="custom-cursor"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 50 : 30,
            height: isHovering ? 50 : 30,
            opacity: isHovering ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.2 }}
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.8), transparent)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-violet-400/80"
          animate={{
            width: isClicking ? 6 : isHovering ? 14 : 8,
            height: isClicking ? 6 : isHovering ? 14 : 8,
            backgroundColor: isHovering
              ? "rgba(139,92,246,0.3)"
              : "rgba(139,92,246,0.9)",
          }}
          style={{
            boxShadow: "0 0 8px rgba(139,92,246,0.9)",
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
