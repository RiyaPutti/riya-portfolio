"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink, Award } from "lucide-react";

const experiences = [
  {
    role: "ML & Chatbot Engineering Intern",
    company: "Fluentgrid Limited",
    period: "Jun 2024 – Aug 2024",
    location: "Visakhapatnam, India",
    type: "ML Engineering",
    color: "#8b5cf6",
    description:
      "Led end-to-end design and deployment of a production-grade NLP chatbot using Botpress V12, directly reducing manual support workload and improving resolution times.",
    achievements: [
      { metric: "~70%", label: "support queries automated" },
      { metric: "30%", label: "manual workload reduced" },
      { metric: "40%", label: "intent coverage expanded" },
      { metric: "~25%", label: "resolution time improvement" },
    ],
    bullets: [
      "Designed and deployed a production-grade NLP chatbot using Botpress V12, automating ~70% of repetitive support queries.",
      "Engineered intent recognition and entity extraction pipelines, expanding chatbot intent coverage by 40% across 500+ FAQ scenarios.",
      "Integrated chatbot with backend REST APIs for real-time, data-driven responses, reducing average resolution time for complex queries by ~25%.",
    ],
    tech: ["Botpress V12", "NLP", "Intent Recognition", "Entity Extraction", "REST APIs", "Node.js"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Fluentgrid Limited",
    period: "Jun 2023 – Jul 2023",
    location: "Visakhapatnam, India",
    type: "Full Stack Development",
    color: "#a78bfa",
    description:
      "Contributed to enterprise-grade web application development, building client-facing modules and resolving production-level defects across the system.",
    achievements: [
      { metric: "3", label: "web modules shipped" },
      { metric: "10+", label: "production bugs fixed" },
      { metric: "↑", label: "backend performance" },
    ],
    bullets: [
      "Built 3 client-facing web modules using Java, Spring Boot, and React.js, streamlining enterprise data-entry workflows.",
      "Resolved 10+ production-level defects through systematic debugging and code profiling, improving backend response performance on critical modules.",
    ],
    tech: ["Java", "Spring Boot", "React.js", "REST APIs", "MySQL", "Git"],
  },
  {
    role: "Data Science & AI Professional Course",
    company: "360DigiTMG",
    period: "2024 – Present",
    location: "Online / Hyderabad",
    type: "Training & Certification",
    color: "#c4b5fd",
    description:
      "Pursuing an intensive professional training program in Data Science, Machine Learning, and AI — covering the full CRISP-ML(Q) methodology, model deployment, and real-world case studies.",
    achievements: [
      { metric: "In Progress", label: "certification" },
    ],
    bullets: [
      "Studying end-to-end Data Science pipeline: EDA, feature engineering, model selection, evaluation, and deployment.",
      "Hands-on with CRISP-ML(Q) methodology, Python, Scikit-learn, TensorFlow, and Power BI.",
      "Working on industry-case projects involving regression, classification, clustering, and NLP.",
    ],
    tech: ["Python", "Scikit-learn", "TensorFlow", "Power BI", "CRISP-ML(Q)", "SQL"],
  },
];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Timeline spine */}
      <div className="hidden md:flex flex-col items-center gap-0 flex-shrink-0">
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${exp.color}18`,
            border: `1px solid ${exp.color}44`,
            boxShadow: `0 0 20px ${exp.color}22`,
          }}
          animate={inView ? { boxShadow: [`0 0 20px ${exp.color}22`, `0 0 40px ${exp.color}44`, `0 0 20px ${exp.color}22`] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Briefcase size={18} style={{ color: exp.color }} />
        </motion.div>
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 mt-3"
            style={{ background: `linear-gradient(to bottom, ${exp.color}44, rgba(139,92,246,0.1))`, minHeight: 40 }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <div className="glass rounded-2xl p-6 border border-violet-500/15 relative overflow-hidden group">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, ${exp.color}66, transparent)` }} />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: exp.color }}>
                  {exp.type}
                </span>
              </div>
              <h3 className="font-display font-bold text-white/90 text-xl">{exp.role}</h3>
              <p className="text-violet-300/60 font-medium mt-0.5">{exp.company}</p>
            </div>
            <div className="flex flex-col gap-1.5 sm:items-end text-xs font-mono text-violet-400/50">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} /> {exp.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} /> {exp.location}
              </span>
            </div>
          </div>

          {/* Metric highlights */}
          {exp.achievements.length > 1 && (
            <div className={`grid grid-cols-${Math.min(exp.achievements.length, 4)} gap-3 mb-5`}>
              {exp.achievements.map((a) => (
                <div
                  key={a.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: `${exp.color}0d`, border: `1px solid ${exp.color}22` }}
                >
                  <div className="font-display font-bold text-lg" style={{ color: exp.color }}>
                    {a.metric}
                  </div>
                  <div className="font-mono text-xs text-violet-400/50 leading-snug mt-0.5">
                    {a.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bullets */}
          <ul className="space-y-2.5 mb-5">
            {exp.bullets.map((b, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5 text-sm text-violet-200/55 leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.08 }}
              >
                <span style={{ color: exp.color }} className="mt-1.5 flex-shrink-0 text-xs">▸</span>
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2.5 py-1 rounded-lg border"
                style={{ background: `${exp.color}0d`, borderColor: `${exp.color}2a`, color: `${exp.color}bb` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute left-1/2 bottom-0 w-96 h-96 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(109,40,217,0.06), transparent)", filter: "blur(80px)" }} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.p
            className="font-mono text-xs tracking-[0.4em] text-violet-500 uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Professional Experience
          </motion.p>
          <motion.h2
            className="font-display font-bold text-white/90 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Internships &{" "}
            <span className="gradient-text">Training</span>
          </motion.h2>
          <motion.p
            className="text-violet-200/40 text-sm max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Real-world exposure in ML engineering, NLP, full-stack development,
            and continuous professional upskilling.
          </motion.p>
        </div>

        {/* Cards */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.role + exp.company} exp={exp} index={i} />
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass rounded-2xl p-6 border border-violet-500/15">
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} className="text-violet-400" />
              <h3 className="font-mono text-xs tracking-widest uppercase text-violet-500">
                Certifications & Programs
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { name: "Generative AI & ChatGPT", org: "Google" },
                { name: "Google Analytics (Beginner & Advanced)", org: "Google" },
                { name: "AI Student Development Program", org: "SRM University" },
                { name: "Full Stack Development, Java, Git", org: "ExcelR" },
                { name: "Salesforce Apex & Process Automation Specialist", org: "Trailhead" },
                { name: "Goldman Sachs & Accenture Virtual Experience", org: "Forage" },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-violet-500/10 hover:border-violet-500/25 transition-colors"
                  style={{ background: "rgba(139,92,246,0.04)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-violet-200/70">{cert.name}</p>
                    <p className="font-mono text-xs text-violet-500/50">{cert.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
