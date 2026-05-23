"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Cpu, Rocket, Heart } from "lucide-react";

const milestones = [
  {
    icon: GraduationCap,
    year: "2021",
    title: "The Beginning",
    body:
      "Joined B.Tech Computer Science & Engineering at Sanketika Institute of Technology and Management (JNTUK-V), Visakhapatnam. Fell in love with algorithms, logic and problem-solving from day one.",
    color: "#7c3aed",
  },
  {
    icon: Cpu,
    year: "2023",
    title: "First Taste of Industry",
    body:
      "Landed my first internship as a Full Stack Developer at Fluentgrid Limited. Built 3 enterprise web modules using Java, Spring Boot, and React.js — and shipped real code to production.",
    color: "#8b5cf6",
  },
  {
    icon: Rocket,
    year: "2024",
    title: "Deep Dive into AI",
    body:
      "Returned to Fluentgrid as an ML & Chatbot Engineering Intern. Designed and deployed a production-grade NLP chatbot that automated ~70% of support queries. Explored TensorFlow, DenseNet, Generative AI and LLMs.",
    color: "#a78bfa",
  },
  {
    icon: Heart,
    year: "2025 →",
    title: "The Next Chapter",
    body:
      "Graduating with a 7.63 CGPA. Actively upskilling in Data Science, Generative AI, and Cloud ML. Seeking entry-level roles where I can turn data into intelligent decisions and build things that matter.",
    color: "#c4b5fd",
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 ${isRight ? "md:flex-row-reverse" : "md:flex-row"} flex-col md:flex-row`}
    >
      {/* Content card */}
      <motion.div
        className={`flex-1 ${isRight ? "md:text-right" : "md:text-left"} text-left`}
        initial={{ opacity: 0, x: isRight ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass glass-hover rounded-2xl p-6 border border-violet-500/15 relative overflow-hidden group">
          {/* Shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(139,92,246,0.05) 50%, transparent 100%)",
            }} />

          <div className={`flex items-center gap-3 mb-3 ${isRight ? "md:justify-end" : ""}`}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}
            >
              <item.icon size={16} style={{ color: item.color }} />
            </div>
            <span
              className="font-mono text-xs tracking-widest font-medium"
              style={{ color: item.color }}
            >
              {item.year}
            </span>
          </div>

          <h3 className="font-display text-lg font-bold text-white/90 mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-violet-200/50 leading-relaxed">{item.body}</p>
        </div>
      </motion.div>

      {/* Center node */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center node-pulse"
          style={{
            background: `radial-gradient(circle, ${item.color}33, transparent)`,
            border: `2px solid ${item.color}88`,
            boxShadow: `0 0 20px ${item.color}44`,
          }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
          />
        </div>
      </motion.div>

      {/* Empty side for desktop layout */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function AboutSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.06), transparent)", filter: "blur(80px)" }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-violet-500 uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            My Story
          </motion.p>
          <motion.h2
            className="font-display font-bold text-white/90 mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Journey So{" "}
            <span className="gradient-text">Far</span>
          </motion.h2>
          <motion.p
            className="text-violet-200/40 max-w-xl mx-auto text-sm leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From writing my first Java program to deploying production ML systems — every step
            has been driven by curiosity and a passion for building things with data.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.25), rgba(139,92,246,0.4), rgba(139,92,246,0.25), transparent)" }} />

          <div className="flex flex-col gap-12">
            {milestones.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom credential strip */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            { label: "CGPA", value: "7.63 / 10" },
            { label: "Intermediate", value: "96.1%" },
            { label: "SSC", value: "10 / 10 GPA" },
            { label: "Location", value: "Hyderabad, IN" },
          ].map((item) => (
            <div
              key={item.label}
              className="glass rounded-xl p-4 text-center border border-violet-500/15"
            >
              <div className="font-display font-bold text-base gradient-text mb-1">
                {item.value}
              </div>
              <div className="font-mono text-xs text-violet-400/50">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
