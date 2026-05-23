"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const journeyNodes = [
  { id: "btech", year: "2021", label: "B.Tech CSE Begins", sublabel: "Sanketika Institute · JNTUK-V", color: "#6d28d9", y: 0 },
  { id: "fsd",   year: "2023", label: "Full Stack Intern",  sublabel: "Fluentgrid · Java · React",      color: "#7c3aed", y: 1 },
  { id: "ml",    year: "2024", label: "ML & Chatbot Intern",sublabel: "Fluentgrid · NLP · Botpress",     color: "#8b5cf6", y: 2 },
  { id: "proj",  year: "2024", label: "AI Projects Built",  sublabel: "DenseNet · CNNs · Analytics",    color: "#a78bfa", y: 3 },
  { id: "grad",  year: "2025", label: "Graduate & Upskill", sublabel: "360DigiTMG · Generative AI",      color: "#c4b5fd", y: 4 },
  { id: "future",year: "→",   label: "Data Scientist",      sublabel: "ML Engineer · AI Engineer",      color: "#ddd6fe", y: 5 },
];

// Terminal command sequence — each step unlocks a journey node
const terminalSteps = [
  {
    cmd: "whoami",
    nodeId: null,
    lines: [
      { t: "name",    v: "Riya Maithili Putti" },
      { t: "sep",     v: "─────────────────────────────" },
      { t: "info",    v: "Computer Science Graduate (2025)" },
      { t: "info",    v: "Aspiring Data Scientist" },
      { t: "info",    v: "ML & AI Enthusiast" },
    ],
  },
  {
    cmd: "education --verbose",
    nodeId: "btech",
    lines: [
      { t: "label",   v: "B.Tech CSE  ·  2021 – 2025" },
      { t: "info",    v: "Sanketika Institute of Technology & Mgmt" },
      { t: "info",    v: "JNTUK-V  ·  CGPA: 7.63 / 10" },
      { t: "success", v: "Intermediate: 96.1%  ·  SSC: 10.00 GPA" },
    ],
  },
  {
    cmd: "experience --timeline",
    nodeId: "fsd",
    lines: [
      { t: "label",   v: "[2023]  Full Stack Developer Intern" },
      { t: "info",    v: "        Fluentgrid Limited · Visakhapatnam" },
      { t: "info",    v: "        Java · Spring Boot · React.js" },
      { t: "success", v: "        3 modules shipped · 10+ bugs fixed" },
    ],
  },
  {
    cmd: "experience --ml",
    nodeId: "ml",
    lines: [
      { t: "label",   v: "[2024]  ML & Chatbot Engineering Intern" },
      { t: "info",    v: "        Fluentgrid Limited · Visakhapatnam" },
      { t: "info",    v: "        Botpress V12 · NLP · REST APIs" },
      { t: "success", v: "        ~70% queries automated · 40% coverage ↑" },
    ],
  },
  {
    cmd: "projects --list",
    nodeId: "proj",
    lines: [
      { t: "label",   v: "01  Diabetic Retinopathy Detection" },
      { t: "info",    v: "    DenseNet121 · CNN · 92% accuracy" },
      { t: "label",   v: "02  Customer Query Resolution Chatbot" },
      { t: "info",    v: "    NLP · 500+ FAQs · 85% multi-turn accuracy" },
      { t: "label",   v: "03  Sales Analytics Dashboard" },
      { t: "info",    v: "    Power BI · SQL · 50K+ rows processed" },
    ],
  },
  {
    cmd: "skills --core",
    nodeId: "grad",
    lines: [
      { t: "skill",   v: "Python  ████████████████████  90%" },
      { t: "skill",   v: "ML/AI   ████████████████░░░░  85%" },
      { t: "skill",   v: "NLP     ████████████████░░░░  85%" },
      { t: "skill",   v: "SQL     ████████████████░░░░  82%" },
      { t: "skill",   v: "Power BI████████████████░░░░  78%" },
    ],
  },
  {
    cmd: "future --goals",
    nodeId: "future",
    lines: [
      { t: "loading", v: "Calculating trajectory..." },
      { t: "sep",     v: "─────────────────────────────" },
      { t: "glow",    v: "  ► Data Scientist" },
      { t: "glow",    v: "  ► ML Engineer" },
      { t: "glow",    v: "  ► AI Engineer" },
      { t: "sep",     v: "─────────────────────────────" },
      { t: "success", v: "  Status: Ready to contribute 🚀" },
    ],
  },
];

// ─── Typing hook ──────────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 28, active = true) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  return displayed;
}

// ─── Terminal line renderer ───────────────────────────────────────────────────

function TermLine({ t, v, delay = 0 }: { t: string; v: string; delay?: number }) {
  const colorMap: Record<string, string> = {
    name:    "#ddd6fe",
    label:   "#c4b5fd",
    info:    "#a78bfa",
    sep:     "#4c1d95",
    success: "#86efac",
    skill:   "#a78bfa",
    glow:    "#ddd6fe",
    loading: "#fbbf24",
  };
  const color = colorMap[t] ?? "#a78bfa";
  return (
    <motion.div
      className="font-mono text-xs leading-relaxed whitespace-pre"
      style={{ color }}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.25 }}
    >
      {t === "glow"
        ? <span style={{ textShadow: "0 0 12px rgba(216,180,254,0.7)" }}>{v}</span>
        : v}
    </motion.div>
  );
}

// ─── Journey Node ─────────────────────────────────────────────────────────────

function JourneyNode({
  node,
  active,
  done,
  isLast,
}: {
  node: (typeof journeyNodes)[0];
  active: boolean;
  done: boolean;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const lit = active || done;

  return (
    <div className="relative flex items-start gap-3">
      {/* Spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Node circle */}
        <motion.div
          className="relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
          style={{
            background: lit ? `${node.color}22` : "rgba(30,20,50,0.5)",
            border: `2px solid ${lit ? node.color : "rgba(139,92,246,0.2)"}`,
            boxShadow: lit ? `0 0 ${active ? 30 : 14}px ${node.color}66` : "none",
            transition: "all 0.5s ease",
          }}
          animate={active ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <span className="font-mono text-xs font-bold" style={{ color: lit ? node.color : "#4c1d95" }}>
            {node.year === "→" ? "→" : node.year.slice(2)}
          </span>
          {active && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid ${node.color}` }}
              animate={{ scale: [1, 2], opacity: [0.6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-px mt-1"
            style={{
              height: 52,
              background: done
                ? `linear-gradient(to bottom, ${node.color}88, rgba(139,92,246,0.2))`
                : "rgba(139,92,246,0.1)",
              transition: "background 0.6s ease",
            }}
          >
            {/* Animated traveling dot */}
            {active && (
              <motion.div
                className="w-1.5 h-1.5 rounded-full -translate-x-[2px]"
                style={{ background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                animate={{ y: [0, 52] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.div>
        )}
      </div>

      {/* Label */}
      <motion.div
        className="pt-1.5 pb-8"
        animate={{ opacity: lit ? 1 : 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {(hovered && lit) && (
            <motion.div
              className="absolute left-14 top-0 glass rounded-xl p-3 z-20 border border-violet-500/30 min-w-[160px]"
              initial={{ opacity: 0, scale: 0.9, x: -5 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <p className="font-mono text-xs font-bold" style={{ color: node.color }}>{node.label}</p>
              <p className="font-mono text-xs text-violet-400/60 mt-0.5">{node.sublabel}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="font-mono text-xs font-semibold leading-tight" style={{ color: lit ? node.color : "#4c1d95" }}>
          {node.label}
        </p>
        <p className="font-mono text-xs text-violet-500/40 mt-0.5 leading-snug">{node.sublabel}</p>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TerminalJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [step, setStep] = useState(-1);           // which terminal step is running
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [typingCmd, setTypingCmd] = useState("");
  const [showLines, setShowLines] = useState(false);
  const [autoRunning, setAutoRunning] = useState(false);
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Auto-run sequence when section enters viewport
  useEffect(() => {
    if (!inView || autoRunning) return;
    setAutoRunning(true);
  }, [inView, autoRunning]);

  // Run each step with realistic timing
  const runStep = useCallback((stepIdx: number) => {
    if (stepIdx >= terminalSteps.length) return;
    const s = terminalSteps[stepIdx];

    setStep(stepIdx);
    setShowLines(false);
    setTypingCmd("");
    setActiveNode(s.nodeId);

    // Type the command character by character
    let i = 0;
    const typeId = setInterval(() => {
      i++;
      setTypingCmd(s.cmd.slice(0, i));
      if (i >= s.cmd.length) {
        clearInterval(typeId);
        setTimeout(() => {
          setShowLines(true);
          // After output shown, mark step done and unlock node
          const outputTime = s.lines.length * 120 + 400;
          setTimeout(() => {
            setDoneSteps((d) => [...d, stepIdx]);
            if (s.nodeId) setUnlockedNodes((n) => [...n, s.nodeId!]);
            setActiveNode(null);
            // Run next step after pause
            setTimeout(() => runStep(stepIdx + 1), 900);
          }, outputTime);
        }, 180);
      }
    }, 38);
  }, []);

  useEffect(() => {
    if (!autoRunning) return;
    const t = setTimeout(() => runStep(0), 600);
    return () => clearTimeout(t);
  }, [autoRunning, runStep]);

  // Particles floating up inside terminal
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + Math.random() * 84}%`,
    delay: Math.random() * 4,
    dur: 4 + Math.random() * 4,
  }));

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background ambience */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(76,29,149,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-violet-500 uppercase mb-4">
            Interactive Experience
          </p>
          <h2
            className="font-display font-bold text-white/90 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            The{" "}
            <span className="gradient-text">Journey</span>{" "}
            Decoded
          </h2>
          <p className="text-violet-200/40 text-sm max-w-md mx-auto">
            Watch the story unfold — a live terminal narrating every milestone
            while your path illuminates in real time.
          </p>
        </motion.div>

        {/* Main interactive panel */}
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* ── Terminal panel ─────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div
              className="relative rounded-2xl overflow-hidden scan-line"
              style={{
                background: "rgba(6,4,16,0.92)",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow:
                  "0 0 60px rgba(109,40,217,0.2), inset 0 0 40px rgba(76,29,149,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Window bar */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(139,92,246,0.15)", background: "rgba(10,5,25,0.8)" }}
              >
                <div className="flex gap-2">
                  {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.8 }} />
                  ))}
                </div>
                <span className="font-mono text-xs text-violet-500/60">riya@portfolio:~</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400/70">live</span>
                </div>
              </div>

              {/* Floating particles inside terminal */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ top: 44 }}>
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute w-0.5 h-0.5 rounded-full"
                    style={{ left: p.left, bottom: 0, background: "rgba(139,92,246,0.6)" }}
                    animate={{ y: [0, -300], opacity: [0, 0.8, 0] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-xs space-y-4 min-h-[440px] relative" style={{ maxHeight: 480, overflowY: "auto" }}>
                {/* Completed steps */}
                {doneSteps.map((si) => {
                  const s = terminalSteps[si];
                  return (
                    <div key={si} className="opacity-60">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span style={{ color: "#6d28d9" }}>❯</span>
                        <span style={{ color: "#7c3aed" }}>{s.cmd}</span>
                      </div>
                      {s.lines.map((l, li) => (
                        <div key={li} className="pl-4">
                          <TermLine t={l.t} v={l.v} />
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* Active step */}
                {step >= 0 && step < terminalSteps.length && !doneSteps.includes(step) && (
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <motion.span
                        style={{ color: "#8b5cf6" }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      >❯</motion.span>
                      <span style={{ color: "#c4b5fd" }}>{typingCmd}</span>
                      {typingCmd.length < terminalSteps[step].cmd.length && (
                        <span className="terminal-cursor" />
                      )}
                    </div>
                    {showLines && (
                      <div className="pl-4 space-y-1">
                        {terminalSteps[step].lines.map((l, li) => (
                          <TermLine key={li} t={l.t} v={l.v} delay={li * 0.09} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Idle prompt */}
                {doneSteps.length === terminalSteps.length && (
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span style={{ color: "#8b5cf6" }}>❯</span>
                    <span style={{ color: "#c4b5fd" }}>_</span>
                    <span className="terminal-cursor" />
                  </motion.div>
                )}
              </div>

              {/* Bottom gradient fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(6,4,16,0.9), transparent)" }}
              />
            </div>
          </div>

          {/* ── Journey visualization ───────────────────────────── */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div
              className="relative rounded-2xl p-5 h-full"
              style={{
                background: "rgba(8,5,20,0.88)",
                border: "1px solid rgba(139,92,246,0.25)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 40px rgba(76,29,149,0.15), inset 0 0 30px rgba(76,29,149,0.05)",
              }}
            >
              {/* Panel header */}
              <div className="flex items-center gap-2 mb-6 pb-4"
                style={{ borderBottom: "1px solid rgba(139,92,246,0.1)" }}>
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                <span className="font-mono text-xs tracking-widest uppercase text-violet-500/70">
                  Growth Path
                </span>
              </div>

              {/* Nodes */}
              <div className="relative">
                {journeyNodes.map((node, i) => (
                  <JourneyNode
                    key={node.id}
                    node={node}
                    active={activeNode === node.id}
                    done={unlockedNodes.includes(node.id)}
                    isLast={i === journeyNodes.length - 1}
                  />
                ))}
              </div>

              {/* Progress meter */}
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-violet-500/60">Journey Progress</span>
                  <span className="font-mono text-xs" style={{ color: "#a78bfa" }}>
                    {Math.round((unlockedNodes.length / journeyNodes.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(139,92,246,0.1)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #4c1d95, #8b5cf6, #c4b5fd)",
                      boxShadow: "0 0 10px rgba(139,92,246,0.6)",
                    }}
                    animate={{ width: `${(unlockedNodes.length / journeyNodes.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Particle emitter from bottom when complete */}
              <AnimatePresence>
                {unlockedNodes.length === journeyNodes.length && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          bottom: 0,
                          left: `${5 + Math.random() * 90}%`,
                          background: journeyNodes[Math.floor(Math.random() * journeyNodes.length)].color,
                        }}
                        animate={{ y: [-10, -300], opacity: [1, 0], scale: [1, 0] }}
                        transition={{
                          duration: 2.5 + Math.random() * 2,
                          delay: Math.random() * 2,
                          repeat: Infinity,
                          repeatDelay: Math.random() * 3,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Bottom caption */}
        <motion.p
          className="text-center font-mono text-xs text-violet-500/40 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          Scroll up to replay · Hover journey nodes to inspect milestones
        </motion.p>
      </div>
    </section>
  );
}
