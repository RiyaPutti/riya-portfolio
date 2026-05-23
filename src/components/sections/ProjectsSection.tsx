"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Eye, ChevronDown, Layers } from "lucide-react";

const projects = [
  {
    id: "dr-detection",
    title: "Automated Diabetic Retinopathy Detection",
    tagline: "Deep Learning · Medical AI",
    description:
      "Trained a DenseNet121-based CNN on 3,662 retinal fundus images from the APTOS 2019 dataset to classify Diabetic Retinopathy across 5 severity stages. Applied CLAHE enhancement, rotation, flip, and zoom augmentation to address class imbalance — improving minority-class F1-score by 18% over baseline.",
    highlights: [
      "92% validation accuracy on 5-class classification",
      "18% F1-score improvement over baseline via CLAHE + augmentation",
      "Evaluated with confusion matrix, precision-recall, and AUC-ROC",
      "DenseNet121 transfer learning on medical imaging data",
    ],
    stack: ["Python", "TensorFlow", "DenseNet121", "CNN", "OpenCV", "Scikit-learn"],
    github: "https://github.com/RiyaPutti",
    live: null,
    accent: "#7c3aed",
    category: "Deep Learning",
    icon: "🧠",
    featured: true,
  },
  {
    id: "chatbot",
    title: "Customer Query Resolution Chatbot",
    tagline: "NLP · Conversational AI",
    description:
      "Deployed an end-to-end NLP chatbot automating 500+ FAQ resolutions and cutting manual query handling time by 30%. Engineered multi-turn dialogue flows with slot filling and context retention, enabling accurate resolution of 85%+ of complex multi-step queries.",
    highlights: [
      "Automated 500+ FAQ resolutions end-to-end",
      "85%+ accuracy on complex multi-step queries",
      "Slot filling and context retention for multi-turn dialogues",
      "Real-time REST API integration for dynamic responses",
    ],
    stack: ["Botpress V12", "NLP", "Node.js", "REST APIs", "Intent Recognition"],
    github: "https://github.com/RiyaPutti",
    live: null,
    accent: "#8b5cf6",
    category: "NLP",
    icon: "💬",
    featured: true,
  },
  {
    id: "sales-dashboard",
    title: "Sales Analytics Dashboard",
    tagline: "Data Analytics · Business Intelligence",
    description:
      "Designed an end-to-end analytics pipeline on a retail sales dataset — cleaned and transformed 50K+ rows, engineered KPI metrics, and built an interactive Power BI dashboard tracking revenue, churn, and regional trends.",
    highlights: [
      "Processed and cleaned 50K+ rows of retail data",
      "Engineered KPI metrics: revenue, churn, regional breakdown",
      "Interactive Power BI dashboard with drill-down capability",
      "End-to-end pipeline from raw SQL data to visual insights",
    ],
    stack: ["Python", "Pandas", "SQL", "Matplotlib", "Power BI", "EDA"],
    github: "https://github.com/RiyaPutti",
    live: null,
    accent: "#6d28d9",
    category: "Data Analytics",
    icon: "📊",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="relative rounded-2xl overflow-hidden border border-violet-500/15 glass glass-hover group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setExpanded(!expanded)}
      whileHover={{ scale: expanded ? 1 : 1.005 }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}88, transparent)` }}
      />

      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${project.accent}08, transparent)` }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}33` }}
            >
              {project.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </span>
                {project.featured && (
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}44` }}>
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-white/90 text-lg leading-snug">
                {project.title}
              </h3>
              <p className="text-violet-300/40 text-xs mt-0.5 font-mono">{project.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-violet-400/50 hover:text-violet-300 border border-violet-500/20 hover:border-violet-500/50 transition-all"
                style={{ background: "rgba(139,92,246,0.05)" }}
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={15} />
              </motion.a>
            )}
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-violet-500/20"
              style={{ background: "rgba(139,92,246,0.05)" }}
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={15} className="text-violet-400/50" />
            </motion.div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-violet-200/50 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded-lg border"
              style={{
                background: `${project.accent}0f`,
                borderColor: `${project.accent}33`,
                color: `${project.accent}cc`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-violet-500/10">
                <p className="text-sm text-violet-200/60 leading-relaxed mb-4">
                  {project.description}
                </p>
                <h4 className="font-mono text-xs tracking-widest text-violet-500/60 uppercase mb-3">
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-violet-200/55"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <span style={{ color: project.accent }} className="mt-1 flex-shrink-0">▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex gap-3 mt-5">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono border border-violet-500/30 text-violet-300/70 hover:text-violet-200 hover:border-violet-500/60 transition-all"
                    style={{ background: "rgba(139,92,246,0.07)" }}
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Github size={13} />
                    View Source
                  </motion.a>
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono"
                      style={{
                        background: `${project.accent}22`,
                        border: `1px solid ${project.accent}44`,
                        color: project.accent,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.02 }}
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent)", filter: "blur(80px)" }} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-violet-500 uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Work
          </motion.p>
          <motion.h2
            className="font-display font-bold text-white/90 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Projects &{" "}
            <span className="gradient-text">Builds</span>
          </motion.h2>
          <motion.p
            className="text-violet-200/40 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Click any project to expand details. Real code, real impact.
          </motion.p>
        </div>

        {/* Projects */}
        <div className="space-y-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/RiyaPutti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-ghost px-6 py-3 rounded-xl text-sm font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={16} />
            Explore all repositories on GitHub
            <ExternalLink size={14} className="opacity-60" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
