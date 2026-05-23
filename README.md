# Riya Maithili Putti — Portfolio

A premium, modern, fully responsive portfolio website for a Data Scientist / AI Engineer.
Built with **Next.js 14**, **Framer Motion**, **Tailwind CSS**, and **TypeScript**.

---

## ✨ Features

- **Loading screen** with animated progress bar and logo reveal
- **Custom cursor** with glow trail and hover morphing
- **Floating particle canvas** background (violet theme)
- **Hero section** with typewriter role animation, parallax orbs, stat counters
- **About section** with interactive timeline
- **Skills section** with animated progress bars + tech badge cloud
- **Projects section** with expandable cinematic cards
- **Experience section** with metric highlights and certification strip
- **🌟 WOW Factor: Terminal + Journey** — live terminal auto-types your story while an animated roadmap illuminates beside it in real time
- **Resume section** with animated download button
- **Contact section** with interactive form, social links, availability badge
- **Back-to-top** button with scroll progress ring
- **Dark/Light mode** toggle
- **Fully responsive** (mobile-first)
- **SEO optimized** (metadata, Open Graph, Twitter cards)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Navigate to the project
cd riya-portfolio

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
riya-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles, glass, neon utilities
│   │   ├── layout.tsx           # Root layout, SEO metadata
│   │   └── page.tsx             # Main page orchestrator
│   ├── components/
│   │   ├── effects/
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── ParticleBackground.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── TerminalJourneySection.tsx  ← WOW factor
│   │   │   ├── ResumeSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── Navbar.tsx
│   │       └── BackToTop.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   └── riya-putti-resume.pdf    ← ADD YOUR RESUME HERE
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🎯 Customization Checklist

### 1. Add Your Resume
Place your resume PDF at:
```
public/riya-putti-resume.pdf
```
Then update `ResumeSection.tsx` to trigger the download:
```tsx
// In handleDownload():
window.open("/riya-putti-resume.pdf", "_blank");
```

### 2. Add Your Profile Photo
Place a photo at `public/profile.jpg` and add an `<Image>` tag in `HeroSection.tsx` or `AboutSection.tsx`.

### 3. Contact Form
The form currently simulates sending. To make it live, integrate one of:

**Option A — EmailJS (free tier):**
```bash
npm install @emailjs/browser
```
```tsx
import emailjs from "@emailjs/browser";
await emailjs.send("SERVICE_ID", "TEMPLATE_ID", form, "PUBLIC_KEY");
```

**Option B — Next.js API route + Nodemailer:**
Create `src/app/api/contact/route.ts` and POST to it from the form.

### 4. GitHub Links
All project GitHub links point to `https://github.com/RiyaPutti`. Update individual project `github` fields in `ProjectsSection.tsx` when repos are ready.

---

## ☁️ Deploy to Vercel (Recommended)

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Your portfolio is live at `https://your-project.vercel.app`

### Custom Domain
In the Vercel dashboard → Settings → Domains → add `riyaputti.com` or any custom domain.

---

## 🌐 Deploy to Netlify (Alternative)

```bash
npm run build
# Upload the .next folder, or connect via Netlify's Git integration
```
Add a `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Playfair Display · DM Sans · JetBrains Mono |
| Deployment | Vercel |

---

## 📝 License

Personal use — feel free to customize for your own portfolio.

---

*Built with 💜 for Riya Maithili Putti*
