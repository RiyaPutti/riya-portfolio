"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, FileText, Eye, ExternalLink, CheckCircle } from "lucide-react";

const resumeHighlights = [
  { label: "Education", value: "B.Tech CSE · JNTUK-V · 7.63 CGPA" },
  { label: "Internships", value: "2x at Fluentgrid Limited" },
  { label: "Projects", value: "3 AI / Data Science builds" },
  { label: "Certifications", value: "6+ from Google, Trailhead, Forage" },
  { label: "Tech Stack", value: "Python · TensorFlow · SQL · Power BI" },
  { label: "Specialization", value: "ML · NLP · Generative AI" },
];

export default function ResumeSection() {
  const [downloaded, setDownloaded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleDownload = () => {
    setDownloaded(true);
    // In production, this would trigger an actual resume PDF download
    window.open("/riya-putti-resume.pdf", "_blank");
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="resume" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(109,40,217,0.07) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-violet-500 uppercase mb-4">
            Resume
          </p>
          <h2
            className="font-display font-bold text-white/90 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Download My{" "}
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-violet-200/40 text-sm max-w-md mx-auto">
            A full overview of my education, experience, projects, and skills —
            ready for your review.
          </p>
        </motion.div>

        {/* Resume preview card */}
        <motion.div
          className="glass rounded-2xl border border-violet-500/20 overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Mock resume header */}
          <div
            className="px-8 py-6 relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(76,29,149,0.2), rgba(109,40,217,0.1))",
              borderBottom: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-2xl text-white/95 mb-1">
                  Riya Maithili Putti
                </h3>
                <p className="text-violet-300/60 text-sm font-mono">
                  Data Scientist · ML Engineer · AI Engineer
                </p>
                <p className="text-violet-400/40 text-xs font-mono mt-1">
                  riyaputti30@gmail.com · +91-8555941429 · Hyderabad, India
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <FileText size={22} className="text-violet-400" />
              </div>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-violet-500/10">
            {resumeHighlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="px-5 py-4"
                style={{ background: "rgba(10,8,22,0.85)" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <p className="font-mono text-xs text-violet-500/60 mb-1 uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-sm text-violet-200/70 font-medium leading-snug">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download button */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            onClick={handleDownload}
            onHoverStart={() => setHovering(true)}
            onHoverEnd={() => setHovering(false)}
            className="relative group overflow-hidden rounded-2xl px-10 py-4 font-medium text-sm flex items-center gap-3 min-w-[220px] justify-center"
            style={{
              background: downloaded
                ? "linear-gradient(135deg, #14532d, #15803d)"
                : "linear-gradient(135deg, #5b21b6, #7c3aed, #6d28d9)",
              border: `1px solid ${downloaded ? "rgba(34,197,94,0.4)" : "rgba(139,92,246,0.5)"}`,
              boxShadow: downloaded
                ? "0 0 30px rgba(34,197,94,0.3)"
                : "0 0 40px rgba(109,40,217,0.4)",
              transition: "all 0.4s ease",
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shimmer sweep */}
            {!downloaded && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={hovering ? { backgroundPosition: ["200% center", "-200% center"] } : {}}
                transition={{ duration: 0.7 }}
              />
            )}

            <motion.div
              animate={
                downloaded
                  ? { rotate: 0 }
                  : hovering
                  ? { y: [0, 3, 0] }
                  : { y: 0 }
              }
              transition={hovering ? { repeat: Infinity, duration: 0.8 } : {}}
            >
              {downloaded ? (
                <CheckCircle size={18} className="text-green-300" />
              ) : (
                <Download size={18} className="text-white" />
              )}
            </motion.div>

            <span className="relative z-10 text-white">
              {downloaded ? "Downloaded!" : "Download Resume PDF"}
            </span>
          </motion.button>

          <motion.a
            href="https://linkedin.com/in/riya-putti30"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-7 py-4 rounded-2xl text-sm font-medium flex items-center gap-2"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Eye size={16} />
            View LinkedIn Profile
            <ExternalLink size={13} className="opacity-50" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
