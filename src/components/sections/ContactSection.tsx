"use client";

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, Phone, CheckCircle, Loader } from "lucide-react";

const socials = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/RiyaPutti",          handle: "@RiyaPutti" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/riya-putti30",  handle: "riya-putti30" },
  { icon: Mail,     label: "Email",    href: "mailto:riyaputti30@gmail.com",           handle: "riyaputti30@gmail.com" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e: React.MouseEvent) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.message) return;
  setStatus("sending");

  try {
    await emailjs.send(
      "service_zq3h53i",        // ✅ your Service ID — already filled in
      "template_bynrqzw",       // 🔴 paste your Template ID here
      {
        name:    form.name,
        email:   form.email,
        role:         form.role || "Not specified",
        message:      form.message,
        to_name:      "Riya",
        time: new Date().toLocaleString(),
      },
      "0ZqD_-xYTB1Ggs436"         // 🔴 paste your Public Key here
    );
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", role: "", message: "" });
    }, 4000);
  } catch (err) {
    console.error("EmailJS error:", err);
    setStatus("error");
    setTimeout(() => setStatus("idle"), 3000);
  }
};

  const inputClass =
    "w-full bg-transparent border border-violet-500/20 rounded-xl px-4 py-3 text-sm text-violet-100/80 placeholder-violet-600/50 focus:outline-none focus:border-violet-500/60 focus:shadow-glow-sm transition-all duration-300 font-body";

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(76,29,149,0.12) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-violet-500 uppercase mb-4">
            Get In Touch
          </p>
          <h2
            className="font-display font-bold text-white/90 mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-violet-200/40 text-sm max-w-md mx-auto">
            Open to full-time opportunities in Data Science, ML Engineering, and AI.
            Reach out — I respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Info */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Contact details */}
            <div className="glass rounded-2xl p-6 border border-violet-500/15">
              <h3 className="font-display font-bold text-white/80 mb-5 text-lg">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail,    label: "Email",    value: "riyaputti30@gmail.com", href: "mailto:riyaputti30@gmail.com" },
                  { icon: Phone,   label: "Phone",    value: "+91 8555941429",         href: "tel:+918555941429" },
                  { icon: MapPin,  label: "Location", value: "Hyderabad, India",       href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}>
                      <Icon size={15} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-violet-500/50">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-violet-200/70 hover:text-violet-200 transition-colors link-hover">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-violet-200/70">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-6 border border-violet-500/15">
              <h3 className="font-mono text-xs tracking-widest text-violet-500/60 uppercase mb-4">
                Find Me Online
              </h3>
              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, href, handle }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-violet-500/10 hover:border-violet-500/35 transition-all duration-300 group"
                    style={{ background: "rgba(139,92,246,0.04)" }}
                    whileHover={{ x: 4 }}
                  >
                    <Icon size={16} className="text-violet-400/60 group-hover:text-violet-300 transition-colors" />
                    <div>
                      <p className="font-mono text-xs text-violet-500/50">{label}</p>
                      <p className="text-sm text-violet-200/60 group-hover:text-violet-200 transition-colors">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass rounded-2xl p-5 border border-green-500/20 flex items-center gap-4"
              style={{ background: "rgba(20,83,45,0.1)" }}>
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-sm text-green-300/80 font-medium">Available for Work</p>
                <p className="font-mono text-xs text-green-400/50 mt-0.5">
                  Entry-level · Full-time · Hyderabad / Remote
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-7 border border-violet-500/15 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }} />

              <h3 className="font-display font-bold text-white/90 text-xl mb-6">Send a Message</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-violet-500/60 mb-2 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={inputClass}
                      style={{ background: "rgba(10,8,22,0.6)" }}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-violet-500/60 mb-2 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={inputClass}
                      style={{ background: "rgba(10,8,22,0.6)" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block font-mono text-xs text-violet-500/60 mb-2 uppercase tracking-wide"
                  >
                    Regarding
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={inputClass}
                    style={{
                          background: "rgba(10,8,22,0.9)",
                          color: form.role ? undefined : "rgba(139,92,246,0.5)",
                        }}
                  >
                    <option value="" disabled>Select opportunity type…</option>
                    <option value="data-science">Data Science Role</option>
                    <option value="ml-engineering">ML Engineering Role</option>
                    <option value="python-dev">Python Developer Role</option>
                    <option value="ai-engineering">AI Engineering Role</option>
                    <option value="internship">Internship / Contract</option>
                    <option value="collaboration">Collaboration / Research</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-violet-500/60 mb-2 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Hi Riya, I came across your portfolio and would love to discuss..."
                    className={inputClass}
                    style={{
                          background: "rgba(10,8,22,0.6)",
                          resize: "none",
                        }}
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={status === "sending" || status === "sent"}
                  className="w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-3 relative overflow-hidden"
                  style={{
                    background:
                      status === "sent"
                        ? "linear-gradient(135deg, #14532d, #15803d)"
                        : "linear-gradient(135deg, #5b21b6, #7c3aed)",
                    border: `1px solid ${status === "sent" ? "rgba(34,197,94,0.4)" : "rgba(139,92,246,0.4)"}`,
                    boxShadow:
                      status === "sent"
                        ? "0 0 30px rgba(34,197,94,0.25)"
                        : "0 0 30px rgba(109,40,217,0.3)",
                    opacity: status === "sending" ? 0.8 : 1,
                  }}
                  whileHover={{ scale: status === "idle" ? 1.02 : 1, y: status === "idle" ? -1 : 0 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.span
                        key="idle"
                        className="flex items-center gap-2 text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Send size={15} /> Send Message
                      </motion.span>
                    )}
                    {status === "sending" && (
                      <motion.span
                        key="sending"
                        className="flex items-center gap-2 text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <Loader size={15} />
                        </motion.div>
                        Sending…
                      </motion.span>
                    )}
                    {status === "sent" && (
                      <motion.span
                        key="sent"
                        className="flex items-center gap-2 text-green-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <CheckCircle size={15} /> Message Sent!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-center font-mono text-xs text-violet-500/40">
                  Messages are typically answered within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-violet-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="font-mono text-xs text-violet-500/40">
            © 2025 Riya Maithili Putti · Built with Next.js + Framer Motion
          </p>
          <p className="font-mono text-xs text-violet-500/30">
          Hyderabad, India
          </p>
        </motion.div>
      </div>
    </section>
  );
}
