"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import Image from "next/image";

const roles = [
  "Aspiring Data Scientist",
  "Python Developer",
  "ML Engineer",
  "AI Enthusiast",
  "NLP Specialist",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Mouse parallax
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(109,40,217,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 50%),
            radial-gradient(ellipse 40% 50% at 20% 80%, rgba(76,29,149,0.12) 0%, transparent 50%)
          `,
          transition: "background 0.3s ease",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Orbiting orbs */}
      {[
        { size: 300, blur: 80, opacity: 0.08, duration: 25, x: "15%", y: "20%" },
        { size: 200, blur: 60, opacity: 0.06, duration: 35, x: "80%", y: "70%" },
        { size: 150, blur: 50, opacity: 0.05, duration: 20, x: "70%", y: "15%" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(139,92,246,${orb.opacity}), transparent)`,
            filter: `blur(${orb.blur}px)`,
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating geometric shapes */}
      {[
        { w: 60, h: 60, x: "10%", y: "30%", rot: 45, delay: 0 },
        { w: 40, h: 40, x: "88%", y: "25%", rot: 20, delay: 1 },
        { w: 30, h: 30, x: "75%", y: "75%", rot: 60, delay: 2 },
        { w: 50, h: 50, x: "5%", y: "70%", rot: 30, delay: 0.5 },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none border border-violet-500/20 rounded-lg"
          style={{ width: shape.w, height: shape.h, left: shape.x, top: shape.y, rotate: shape.rot }}
          animate={{ y: [0, -15, 0], rotate: [shape.rot, shape.rot + 15, shape.rot], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: shape.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Main layout: two-column on desktop, stacked on mobile ── */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-10"
        style={{ y, opacity }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* ── LEFT: Text content ── */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 glass border border-violet-500/30 rounded-full px-4 py-2 mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={14} className="text-violet-400" />
              </motion.div>
              <span className="font-mono text-xs text-violet-300 tracking-widest uppercase">
                Open to Work · Class of 2025
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            {/* Name */}
            <div className="mb-4 overflow-hidden">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1
                  className="font-display font-black leading-none tracking-tight"
                  style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
                >
                  <span className="text-white/90">Riya </span>
                  <span
                    style={{
                      background: "linear-gradient(135deg, #d8b4fe 0%, #8b5cf6 40%, #6d28d9 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 40px rgba(139,92,246,0.4))",
                    }}
                  >
                    Putti
                  </span>
                </h1>
              </motion.div>
            </div>

            {/* Rotating role */}
            <motion.div
              className="mb-6 h-10 flex items-center lg:justify-start justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/60" />
                <div
                  className="font-mono text-base md:text-lg font-medium min-w-[220px]"
                  style={{ color: "var(--violet-glow)" }}
                >
                  <span className="neon-text-sm">{displayText}</span>
                  <span className="terminal-cursor" />
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-sm md:text-base text-violet-200/50 max-w-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              CS Graduate (2025) from Hyderabad · Building intelligent systems
              with ML, NLP & Generative AI · Turning data into decisions.
            </motion.p>

            {/* Status badges */}
            <motion.div
              className="flex flex-wrap items-center lg:justify-start justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/20"
                style={{
                  boxShadow: "0 0 18px rgba(34,197,94,0.12)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-300/80 tracking-wide">
                  Available for work
                </span>
              </div>

              <div
                className="px-4 py-2 rounded-full glass border border-violet-500/20"
                style={{
                  boxShadow: "0 0 18px rgba(139,92,246,0.12)",
                }}
              >
                <span className="font-mono text-xs text-violet-300/70 tracking-wide">
                  CS Grad &apos;25 🎓
                </span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap items-center lg:justify-start justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary px-7 py-3.5 rounded-xl font-medium text-sm z-10 flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >→</motion.span>
              </motion.button>

              <motion.button
                onClick={() => document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost px-7 py-3.5 rounded-xl font-medium text-sm flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center lg:justify-start justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {[
                { icon: Github,   href: "https://github.com/RiyaPutti",           label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/riya-putti30",   label: "LinkedIn" },
                { icon: Mail,     href: "mailto:riyaputti30@gmail.com",            label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass border border-violet-500/20 flex items-center justify-center text-violet-400/60 hover:text-violet-300 hover:border-violet-500/50 hover:shadow-glow-sm transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile photo ── */}
          <motion.div
            className="order-1 lg:order-2 flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">

              {/* Slow-spinning outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 60%, rgba(139,92,246,0.6) 80%, rgba(216,180,254,0.8) 90%, transparent 100%)",
                  padding: 2,
                  borderRadius: "9999px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing glow behind image */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(109,40,217,0.35) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  transform: "scale(1.15)",
                }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [1.1, 1.2, 1.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating dashed ring */}
              <motion.div
                className="absolute rounded-full border border-dashed border-violet-500/25 pointer-events-none"
                style={{ inset: -16 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Dot orbiting the photo */}
              <motion.div
                className="absolute w-3 h-3 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #c4b5fd, #8b5cf6)",
                  boxShadow: "0 0 10px rgba(196,181,253,0.9)",
                  top: "50%",
                  left: "50%",
                  marginTop: -6,
                  marginLeft: -6,
                }}
                animate={{
                  x: [0, 110, 0, -110, 0],
                  y: [-110, 0, 110, 0, -110],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              {/* Small secondary dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                  background: "#7c3aed",
                  boxShadow: "0 0 8px rgba(124,58,237,0.8)",
                  top: "50%",
                  left: "50%",
                  marginTop: -4,
                  marginLeft: -4,
                }}
                animate={{
                  x: [0, -90, 0, 90, 0],
                  y: [90, 0, -90, 0, 90],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating glass panel behind image */}
              <motion.div
                className="absolute pointer-events-none rounded-3xl border border-violet-500/10 backdrop-blur-xl"
                style={{
                  width: 260,
                  height: 160,
                  right: -40,
                  top: 40,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(139,92,246,0.06))",
                  boxShadow:
                    "0 0 40px rgba(109,40,217,0.12), inset 0 0 20px rgba(255,255,255,0.02)",
                  transform: "rotate(-8deg)",
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [-8, -5, -8],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Tiny decorative dots */}
                <div className="absolute top-5 left-5 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400/60" />
                  <div className="w-2 h-2 rounded-full bg-fuchsia-400/40" />
                  <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
                </div>

                {/* Fake futuristic lines */}
                <div className="absolute left-5 right-5 top-16 space-y-3">
                  <div className="h-[2px] rounded-full bg-violet-400/10 w-full" />
                  <div className="h-[2px] rounded-full bg-violet-400/10 w-4/5" />
                  <div className="h-[2px] rounded-full bg-violet-400/10 w-3/5" />
                </div>

                {/* Mini glowing orb */}
                <motion.div
                  className="absolute bottom-5 right-5 w-8 h-8 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(196,181,253,0.9), rgba(109,40,217,0.2))",
                    boxShadow: "0 0 20px rgba(139,92,246,0.5)",
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* The actual photo */}
              <motion.div
                className="relative rounded-full overflow-hidden"
                style={{
                  width: 260,
                  height: 260,
                  border: "2px solid rgba(139,92,246,0.4)",
                  boxShadow: "0 0 50px rgba(109,40,217,0.3), 0 0 100px rgba(76,29,149,0.2), inset 0 0 30px rgba(109,40,217,0.1)",
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/profile.png"
                  alt="Riya Maithili Putti"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="260px"
                />

                {/* Subtle inner vignette to blend photo edges */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at center, transparent 55%, rgba(3,3,5,0.45) 100%)",
                  }}
                />
              </motion.div>

              

            </div>
          </motion.div>
        </div>

        {/* ── Stats row — full width below both columns ── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-16 pt-8 border-t border-violet-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {[
            { value: "92%",  label: "Model Accuracy" },
            { value: "3+",   label: "Projects Built" },
            { value: "2x",   label: "ML Internships" },
            { value: "2025", label: "CS Graduate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-xl md:text-2xl gradient-text">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-violet-400/50 mt-0.5 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-violet-400/40 hover:text-violet-400/70 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
