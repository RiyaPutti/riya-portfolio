import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riya Maithili Putti — Data Scientist & AI Engineer",
  description:
    "Portfolio of Riya Maithili Putti — Computer Science Graduate (2025), Aspiring Data Scientist, ML Engineer & AI Enthusiast. Explore projects, skills, and experience.",
  keywords: [
    "Riya Putti",
    "Data Scientist",
    "ML Engineer",
    "AI Engineer",
    "Python Developer",
    "Machine Learning",
    "NLP",
    "TensorFlow",
    "Portfolio",
    "Hyderabad",
  ],
  authors: [{ name: "Riya Maithili Putti" }],
  creator: "Riya Maithili Putti",
  openGraph: {
    title: "Riya Maithili Putti — Data Scientist & AI Engineer",
    description:
      "Computer Science Graduate specializing in ML, NLP, and Generative AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riya Maithili Putti — Data Scientist & AI Engineer",
    description:
      "Computer Science Graduate specializing in ML, NLP, and Generative AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030305",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="noise antialiased">
        {children}
      </body>
    </html>
  );
}
