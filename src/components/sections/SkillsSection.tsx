"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Languages & Core",
    color: "#8b5cf6",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 82 },
      { name: "Java", level: 70 },
    ],
  },
  {
    category: "ML & AI",
    color: "#a78bfa",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "TensorFlow / DL", level: 80 },
      { name: "NLP & Chatbots", level: 85 },
      { name: "Generative AI", level: 75 },
    ],
  },
  {
    category: "Data & Analytics",
    color: "#c4b5fd",
    skills: [
      { name: "Pandas / NumPy", level: 88 },
      { name: "EDA & Feature Eng.", level: 84 },
      { name: "Power BI", level: 78 },
      { name: "Matplotlib / Seaborn", level: 82 },
    ],
  },
  {
    category: "Tools & Platforms",
    color: "#7c3aed",
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "Vertex AI / AWS", level: 65 },
      { name: "REST APIs", level: 80 },
      { name: "MySQL / MongoDB", level: 75 },
    ],
  },
];

const techBadges = [
  "Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy",
  "SQL", "Power BI", "NLP", "Generative AI", "Botpress",
  "React.js", "Spring Boot", "Git", "Jupyter", "Vertex AI",
  "DenseNet121", "OpenCV", "REST APIs", "MongoDB", "Node.js",
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-violet-200/70 group-hover:text-violet-200 transition-colors font-body">
          {name}
        </span>
        <motion.span
          className="font-mono text-xs"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(139,92,246,0.1)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function GroupCard({ group, index }: { group: (typeof skillGroups)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="glass rounded-2xl p-6 border border-violet-500/15 relative overflow-hidden cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.01 }}
    >
      {/* Corner glow */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${group.color}22, transparent)` }}
        animate={{ scale: hovered ? 1.5 : 1, opacity: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
      />

      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
        <h3 className="font-mono text-xs tracking-widest uppercase" style={{ color: group.color }}>
          {group.category}
        </h3>
      </div>

      <div className="space-y-4">
        {group.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={group.color}
            delay={index * 0.1 + i * 0.12}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute left-0 top-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(76,29,149,0.08), transparent)", filter: "blur(60px)" }} />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-violet-500 uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Technical Arsenal
          </motion.p>
          <motion.h2
            className="font-display font-bold text-white/90 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Skills &{" "}
            <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.p
            className="text-violet-200/40 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            A curated stack built through real internships, research projects,
            and continuous self-learning.
          </motion.p>
        </div>

        {/* Skill bar groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {skillGroups.map((group, i) => (
            <GroupCard key={group.category} group={group} index={i} />
          ))}
        </div>

        {/* Tech badge cloud */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-widest text-violet-500/60 uppercase mb-6">
            Technologies I&apos;ve Worked With
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                className="font-mono text-xs px-3 py-1.5 rounded-full border border-violet-500/20 text-violet-300/60 hover:text-violet-200 hover:border-violet-500/50 hover:shadow-glow-sm transition-all duration-300 cursor-default"
                style={{ background: "rgba(139,92,246,0.05)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.035, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
