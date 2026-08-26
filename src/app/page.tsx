"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Mail, Code, Zap, Globe, Shield,
  ArrowRight, ChevronDown, Menu, X, Download,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const projects = [
  { title: "Keylogger", description: "A keylogger built as a system monitoring experiment.", tech: ["Assembly Language"], link: "#" },
  { title: "History of Pakistan Web App", description: "A web application to showcase the history of Pakistan.", tech: ["React.js", "Tailwind CSS", "MySQL"], link: "#" },
  { title: "File Compression Tool", description: "A tool to compress and decompress files using Huffman coding.", tech: ["C++", "Algorithms"], link: "#" },
  { title: "Chess Game", description: "A console-based Chess game implementing classic rules and logic.", tech: ["C++", "Algorithms"], link: "#" },
  { title: "Snake and Ladder Game", description: "A fun console-based Snake and Ladder game built with C++.", tech: ["C++", "OOP"], link: "#" },
  { title: "Tic-Tac-Toe", description: "A two-player Tic-Tac-Toe game with win-checking logic.", tech: ["C++", "Game Dev"], link: "#" },
  { title: "Theft Detection System", description: "A model to detect theft by identifying guns being pointed using video data.", tech: ["Python", "Roboflow", "OpenCV"], link: "#" },
  { title: "Spring Motion Simulator", description: "Interactive Python simulation of spring motion and harmonic oscillation.", tech: ["Python", "Matplotlib", "Animation"], link: "#" },
  { title: "Portfolio Website", description: "Personal portfolio website showcasing skills, projects, and experience.", tech: ["Next.js", "Tailwind CSS"], link: "#" },
  { title: "E-Wallet", description: "An object-oriented C++ project simulating digital wallet operations.", tech: ["C++", "OOP"], link: "#" },
  { title: "Syncera — Skill Exchange Platform", description: "A software engineering project for a skill exchange platform.", tech: ["Software Engineering"], link: "#" },
  { title: "BCD Calculator", description: "Digital Logic Design project to implement a BCD calculator.", tech: ["DLD", "C++"], link: "#" },
  { title: "ATS-CV-Reviewer", description: "AI-powered Applicant Tracking System and CV Reviewer using Gemini AI.", tech: ["Python", "Gemini AI", "n8n"], link: "#" },
  { title: "Tailor Manager", description: "A digital dashboard web application for managing tailor shop operations.", tech: ["JavaScript"], link: "#" },
  { title: "Network Device Monitor", description: "Industrial Network Device Monitoring System with real-time tracking.", tech: ["Flask", "SQLite", "JavaScript"], link: "#" },
  { title: "Fullstack ToDo App", description: "Feature-rich To-Do app with SSR and WebSockets integration.", tech: ["Next.js", "SQLite3", "TypeScript"], link: "#" },
  { title: "File Integrity Checker", description: "Cybersecurity tool to detect unauthorized file modifications via hashing.", tech: ["Python", "SHA-256"], link: "#" },
  { title: "Omnilink Ecommerce Core", description: "Robust e-commerce backend system architecture and API.", tech: ["JavaScript"], link: "#" },
];

const workExperience = [
  { title: "Official Member", org: "IEEE — 2025–Present", description: "Actively participating in IEEE community activities and contributing to technical events." },
  { title: "Teaching Assistant (OOP)", org: "Namal University, Mianwali — 2024–2025", description: "Guided students in Object-Oriented Programming concepts and assignments." },
  { title: "Graphic Designer", org: "Rinova International — 2023–Present", description: "Worked on design projects and visual content for Rinova International." },
  { title: "Video Creator", org: "Independent Project — 2023", description: "Produced a video for UNESCO's Water Competition focused on glaciers." },
];

const statTabs = [
  {
    title: "EXPERIENCE",
    stats: [
      { icon: Code, number: "3+", label: "YEARS CODING" },
      { icon: Globe, number: "18+", label: "PROJECTS BUILT" },
      { icon: Shield, number: "4+", label: "SECURITY TOOLS" },
      { icon: Zap, number: "4+", label: "ROLES HELD" },
    ],
  },
  {
    title: "EDUCATION",
    stats: [
      { icon: Code, number: "BS", label: "COMPUTER SCIENCE" },
      { icon: Globe, number: "Namal", label: "UNIVERSITY" },
      { icon: Zap, number: "2027", label: "GRADUATION YEAR" },
      { icon: Shield, number: "Mianwali", label: "CAMPUS" },
    ],
  },
  {
    title: "EXPERTISE",
    stats: [
      { icon: Globe, number: "5+", label: "LANGUAGES KNOWN" },
      { icon: Code, number: "7+", label: "FRAMEWORKS USED" },
      { icon: Shield, number: "4+", label: "CYBER TOOLS" },
      { icon: Zap, number: "2+", label: "AI PROJECTS" },
    ],
  },
];

const motivationalQuotes = [
  "Web & Cybersecurity Specialist",
  "I debug by yelling at my screen 😄",
  "Professional Tea Lover ☕",
  "I turn caffeine into code",
  "My code works... on my machine",
  "Stack Overflow is my spirit animal",
  "I use dark mode even in sunlight 🌙",
  "Breaking things so I can fix them 🔧",
];

// ─── SKILL TAB SWITCHER ───────────────────────────────────────────────────────

function SkillTabSwitcher() {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = ["Languages", "Frameworks", "Cybersecurity", "Soft Skills"];
  const tabRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
  ];
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const node = tabRefs[activeTab].current;
    if (node) setIndicatorStyle({ left: node.offsetLeft, width: node.offsetWidth });
    // tabRefs is a stable array of refs — safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const tabContent = [
    {
      items: ["Python", "C++", "MASM x86 Assembly", "SQL/MySQL", "Bash Scripting", "HTML", "CSS", "JavaScript", "TypeScript", "Kotlin"],
      color: "from-purple-500 to-blue-500",
      border: "border-purple-600 hover:border-purple-400",
    },
    {
      items: ["Flask", "Django", "React.js", "Next.js", "Tailwind CSS", "Node.js", "SQLite"],
      color: "from-blue-500 to-cyan-500",
      border: "border-blue-600 hover:border-blue-400",
    },
    {
      items: ["Nmap", "Metasploit", "SQLMap", "Ngrok", "Linux / Kali Linux"],
      color: "from-red-500 to-orange-500",
      border: "border-red-600 hover:border-red-400",
    },
    {
      items: ["Problem-solving", "Teaching", "Project Management & Teamwork", "Time Management"],
      color: "from-green-500 to-teal-500",
      border: "border-green-600 hover:border-green-400",
    },
  ];

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Tab bar */}
      <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg px-2 py-2 gap-1 relative w-full max-w-[580px] mb-10">
        <div
          className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-gradient-to-r from-purple-500/80 to-blue-500/80 shadow-lg transition-all duration-500 ease-out z-0"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width, pointerEvents: "none" }}
        />
        {tabNames.map((tab, idx) => (
          <button
            key={tab}
            ref={tabRefs[idx]}
            onClick={() => setActiveTab(idx)}
            className={`relative z-10 flex-1 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 focus:outline-none ${
              activeTab === idx ? "text-white scale-105" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {tabContent[activeTab].items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`bg-black/80 border rounded-2xl px-4 py-3.5 text-center text-white font-semibold text-sm shadow-md cursor-default hover:scale-[1.04] hover:-translate-y-1 transition-all duration-300 min-h-[48px] flex items-center justify-center ${tabContent[activeTab].border}`}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── 3D TILT PROJECT CARD ─────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10;
    const y = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
    setTilt({ x, y });
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative flex flex-col bg-gradient-to-br from-white/5 to-black/60 border border-gray-800 rounded-2xl shadow-xl px-6 pt-6 pb-5 cursor-pointer hover:border-purple-500 hover:shadow-[0_8px_40px_0_rgba(162,89,247,0.18)]"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
      viewport={{ once: true }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? "transform 0.5s ease" : "transform 0.12s ease",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="flex-1 flex flex-col">
        <h3 className="text-base font-extrabold tracking-tight mb-2 text-white leading-snug">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full px-2.5 py-0.5 font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-3" />
      <div className="flex items-center gap-1.5 text-purple-400 text-sm font-bold group-hover:gap-2.5 transition-all duration-200">
        <span>View Project</span>
        <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [statTab, setStatTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  // Rotating quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => {
        let next;
        do { next = Math.floor(Math.random() * motivationalQuotes.length); } while (next === prev);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Navbar auto-hide
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = window.scrollY;
    };
    const handleMouseMove = (e: MouseEvent) => { if (e.clientY < 80) setShowHeader(true); };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-title", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: "power3.out" });
      gsap.fromTo(".hero-subtitle", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 0.3, ease: "power3.out" });
      gsap.to(".floating-element", { y: -18, duration: 2.5, repeat: -1, yoyo: true, ease: "power2.inOut", stagger: 0.5 });
      gsap.fromTo(".about-text", { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: ".about-section", start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">

      {/* ── GLASSMORPHISM NAVBAR ─────────────────────────────── */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-5xl rounded-2xl bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-between px-7 md:px-10 py-4 md:py-5 transition-all duration-500 ${
          showHeader ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0 pointer-events-none"
        }`}
        onMouseEnter={() => setShowHeader(true)}
      >
        <a href="#" className="font-black italic text-lg md:text-2xl tracking-tight text-white whitespace-nowrap">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Gulfam</span> Afzal
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-2 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 font-semibold hover:text-white transition-all px-4 py-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/15 hover:border-white/55 text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white p-2 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[88vw] max-w-sm bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/10 transition-all text-sm"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 lg:px-16"
      >
        {/* Background blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-400 opacity-15 rounded-full blur-3xl animate-blob1" />
          <div className="absolute top-2/3 right-1/4 w-52 h-52 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 opacity-10 rounded-full blur-3xl animate-blob2" />
        </div>

        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.12),transparent_50%)]" />
        </motion.div>

        {/* Floating dots */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-float-dot"
            style={{
              width: `${6 + i * 2}px`,
              height: `${6 + i * 2}px`,
              top: `${15 + i * 15}%`,
              left: `${10 + i * 18}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}

        {/* Floating colored balls */}
        <div className="floating-element absolute top-24 left-24 w-3 h-3 bg-purple-500 rounded-full hidden md:block" />
        <div className="floating-element absolute top-40 right-36 w-5 h-5 bg-blue-500 rounded-full hidden md:block" />
        <div className="floating-element absolute bottom-36 left-1/4 w-2 h-2 bg-pink-500 rounded-full hidden md:block" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto pt-20 pb-10">
          {/* Mobile profile pic */}
          <motion.div
            className="flex md:hidden justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl ring-2 ring-purple-500/40">
              <Image src="/assets/gulfam.jpg" alt="Gulfam Afzal" width={112} height={112} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.h1
            className="hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter mb-4 leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <span className="shiny-text">Gulfam Afzal</span>
          </motion.h1>

          <p className="hero-subtitle text-sm sm:text-lg md:text-xl font-bold tracking-wide text-gray-300 mb-5">
            Computer Science Student · Namal University, Mianwali
          </p>

          {/* Rotating quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-10"
            >
              <span className="flex-1 max-w-[80px] sm:max-w-[120px] h-px bg-gradient-to-r from-transparent to-purple-400/60" />
              <span className="text-sm sm:text-base md:text-lg font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-blue-300 text-center">
                {motivationalQuotes[quoteIndex]}
              </span>
              <span className="flex-1 max-w-[80px] sm:max-w-[120px] h-px bg-gradient-to-l from-transparent to-blue-400/60" />
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center mb-14">
            <motion.a
              href="#projects"
              className="px-9 sm:px-12 py-4 sm:py-5 border-2 border-white text-white font-bold text-sm sm:text-base tracking-widest hover:bg-white hover:text-black transition-colors rounded-3xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW WORK
            </motion.a>
            <motion.a
              href="/contact"
              className="px-9 sm:px-12 py-4 sm:py-5 border-2 border-purple-400 text-purple-400 font-bold text-sm sm:text-base tracking-widest hover:bg-purple-400 hover:text-black transition-colors rounded-3xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONTACT
            </motion.a>
          </div>

          {/* Mobile quick stats */}
          <div className="flex md:hidden justify-center items-center gap-5 sm:gap-8 text-center flex-wrap">
            <div>
              <p className="text-2xl font-black text-white">18+</p>
              <p className="text-xs text-white/50 tracking-wide mt-0.5">PROJECTS</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-2xl font-black text-white">3+</p>
              <p className="text-xs text-white/50 tracking-wide mt-0.5">YEARS CODING</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <p className="text-2xl font-black text-white">4+</p>
              <p className="text-xs text-white/50 tracking-wide mt-0.5">CYBER TOOLS</p>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── ABOUT SECTION ────────────────────────────────────── */}
      <section id="about" className="about-section min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* White dots */}
        {([
          { t: "10%", l: "5%", s: 2, o: 0.6 }, { t: "30%", r: "8%", s: 3, o: 0.4 },
          { t: "60%", l: "20%", s: 1, o: 0.8 }, { t: "80%", r: "15%", s: 2, o: 0.5 },
        ] as { t: string; l?: string; r?: string; s: number; o: number }[]).map((d, i) => (
          <div key={i} className="white-dot absolute bg-white rounded-full"
            style={{ top: d.t, left: d.l, right: d.r, width: `${d.s * 4}px`, height: `${d.s * 4}px`, opacity: d.o }} />
        ))}

        <div className="max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-14 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ABOUT ME
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="about-text flex flex-col gap-7 pl-2 md:pl-6">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-300 text-justify">
                I&apos;m a Computer Science student at <span className="text-purple-400 font-bold">Namal University, Mianwali</span> with a passion for building secure, efficient, and scalable software.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-400 text-justify">
                I have expertise in C, C++, Python, and Assembly Language (x86, MIPS). Skilled in Object-Oriented Programming, Database Management, and System Development. Passionate about Cybersecurity and building real-world solutions.
              </p>

              <div className="flex items-center gap-5">
                <motion.a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 text-white hover:text-purple-400 transition-colors" whileHover={{ scale: 1.2 }}>
                  <FaGithub size={28} />
                </motion.a>
                <motion.a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 text-white hover:text-blue-400 transition-colors" whileHover={{ scale: 1.2 }}>
                  <FaLinkedinIn size={28} />
                </motion.a>
                <motion.a href="mailto:gulfamafzal84@gmail.com"
                  className="p-2.5 text-white hover:text-green-400 transition-colors" whileHover={{ scale: 1.2 }}>
                  <Mail size={28} />
                </motion.a>
              </div>

              <div>
                <a
                  href="/cv.pdf"
                  download="Gulfam_CV.pdf"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-md hover:from-purple-600 hover:to-blue-600 transition-colors text-base"
                >
                  <Download size={18} />
                  Download CV
                </a>
              </div>
            </div>

            <motion.div
              className="relative hidden md:flex justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-[340px] bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] p-[4px] shadow-[0_24px_80px_0_rgba(162,89,247,0.25)]">
                <div className="bg-black rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/assets/gulfam.jpg"
                    alt="Gulfam Afzal"
                    width={340}
                    height={440}
                    className="w-full object-cover rounded-[2.5rem]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS / EXPERIENCE TABS ───────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 zebra-bg pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {statTabs[statTab].title}
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatePresence mode="wait">
              {statTabs[statTab].stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center py-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="mb-5 flex justify-center">
                    <stat.icon size={44} className="text-white" />
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black text-white mb-3">{stat.number}</h3>
                  <p className="text-white/70 font-bold tracking-widest text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-16">
            <button
              onClick={() => setStatTab((statTab + 1) % statTabs.length)}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors"
              aria-label="Next tab"
            >
              <ArrowRight className="text-black w-7 h-7" />
            </button>
          </div>
        </div>
      </section>

      {/* ── SKILLS SECTION ───────────────────────────────────── */}
      <section id="skills" className="min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-black">
        {([
          { t: "8%", l: "6%", s: 2, o: 0.6 }, { t: "35%", r: "7%", s: 3, o: 0.4 },
          { t: "65%", l: "25%", s: 1, o: 0.8 }, { t: "85%", r: "20%", s: 2, o: 0.5 },
        ] as { t: string; l?: string; r?: string; s: number; o: number }[]).map((d, i) => (
          <div key={i} className="white-dot absolute bg-white rounded-full"
            style={{ top: d.t, left: d.l, right: d.r, width: `${d.s * 4}px`, height: `${d.s * 4}px`, opacity: d.o }} />
        ))}
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SKILLS
          </motion.h2>
          <p className="text-gray-400 text-center mb-14 text-base sm:text-lg">A breakdown of my technical expertise and capabilities.</p>
          <SkillTabSwitcher />
        </div>
      </section>

      {/* ── PROJECTS SECTION ─────────────────────────────────── */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden" style={{ background: "#080808" }}>
        {([
          { t: "5%", l: "3%", s: 2, o: 0.5 }, { t: "25%", r: "5%", s: 3, o: 0.35 },
          { t: "55%", l: "15%", s: 1, o: 0.7 }, { t: "80%", r: "12%", s: 2, o: 0.45 },
        ] as { t: string; l?: string; r?: string; s: number; o: number }[]).map((d, i) => (
          <div key={i} className="white-dot absolute bg-white rounded-full"
            style={{ top: d.t, left: d.l, right: d.r, width: `${d.s * 4}px`, height: `${d.s * 4}px`, opacity: d.o }} />
        ))}
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            PROJECTS
          </motion.h2>
          <p className="text-gray-400 text-center mb-14 text-base sm:text-lg max-w-2xl mx-auto">
            A collection of my academic and personal projects showcasing problem-solving, creativity, and modern technologies.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL JOURNEY ─────────────────────────────── */}
      <section id="work" className="min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-black">
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            JOURNEY
          </motion.h2>
          <p className="text-gray-400 text-center mb-14 text-base sm:text-lg">
            Roles, responsibilities, and experiences that have shaped my career path.
          </p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-7">
            {workExperience.map((work, index) => (
              <motion.div
                key={work.title}
                className="bg-gradient-to-br from-white/5 to-black/60 border border-gray-800 hover:border-purple-500 rounded-2xl p-8 flex flex-col gap-5 cursor-default hover:shadow-[0_8px_40px_0_rgba(162,89,247,0.18)] hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                  <Zap size={20} className="text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-extrabold text-white leading-snug">{work.title}</h3>
                  <p className="text-purple-400 text-xs font-semibold tracking-wide">{work.org}</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{work.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex flex-col justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black relative overflow-hidden">
        {([
          { t: "15%", l: "10%", s: 2, o: 0.5 }, { t: "40%", r: "8%", s: 3, o: 0.35 },
          { t: "70%", l: "30%", s: 1, o: 0.7 }, { t: "85%", r: "20%", s: 2, o: 0.45 },
        ] as { t: string; l?: string; r?: string; s: number; o: number }[]).map((d, i) => (
          <div key={i} className="white-dot absolute bg-white rounded-full"
            style={{ top: d.t, left: d.l, right: d.r, width: `${d.s * 4}px`, height: `${d.s * 4}px`, opacity: d.o }} />
        ))}

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            LET&apos;S WORK
          </motion.h2>
          <motion.p
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
          >
            TOGETHER
          </motion.p>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready to bring your ideas to life? Whether it&apos;s a web app, a cybersecurity tool, or a full-stack project — let&apos;s build something amazing together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <motion.div
                className="inline-block jelly-green-btn"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                GET IN TOUCH
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2025 Gulfam Afzal · Built with Next.js &amp; ❤️</p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/GulfamAfzal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/gulfam123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="mailto:gulfamafzal84@gmail.com"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
