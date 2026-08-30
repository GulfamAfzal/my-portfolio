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
  { title: "ATS-CV-Reviewer", description: "AI-powered Applicant Tracking System and CV Reviewer using Gemini AI.", tech: ["Python", "Gemini AI", "n8n"], link: "#", image: "/images/ats_cv_reviewer.jpg" },
  { title: "Network Device Monitor", description: "Industrial Network Device Monitoring System with real-time tracking.", tech: ["Flask", "SQLite", "JavaScript"], link: "#", image: "/images/network_monitor.jpg" },
  { title: "Omnilink Ecommerce Core", description: "Robust e-commerce backend system architecture and API.", tech: ["JavaScript"], link: "#", image: "/images/ecommerce_core.jpg" },
  { title: "Fullstack ToDo App", description: "Feature-rich To-Do app with SSR and WebSockets integration.", tech: ["Next.js", "SQLite3", "TypeScript"], link: "#", image: "/images/todo_app.jpg" },
  { title: "Keylogger", description: "A keylogger built as a system monitoring experiment.", tech: ["Assembly Language"], link: "#", image: "/images/keylogger.jpg" },
  { title: "History of Pakistan Web App", description: "A web application to showcase the history of Pakistan.", tech: ["React.js", "Tailwind CSS", "MySQL"], link: "#", image: "/images/pakistan.png" },
  { title: "File Compression Tool", description: "A tool to compress and decompress files using Huffman coding.", tech: ["C++", "Algorithms"], link: "#", image: "/images/file.jpg" },
  { title: "Chess Game", description: "A console-based Chess game implementing classic rules and logic.", tech: ["C++", "Algorithms"], link: "#", image: "/images/chess.jpg" },
  { title: "Snake and Ladder Game", description: "A fun console-based Snake and Ladder game built with C++.", tech: ["C++", "OOP"], link: "#", image: "/images/snake.jpg" },
  { title: "Tic-Tac-Toe", description: "A two-player Tic-Tac-Toe game with win-checking logic.", tech: ["C++", "Game Dev"], link: "#", image: "/images/tick.jpg" },
  { title: "Theft Detection System", description: "A model to detect theft by identifying guns being pointed using video data.", tech: ["Python", "Roboflow", "OpenCV"], link: "#", image: "/images/theft.jpg" },
  { title: "Spring Motion Simulator", description: "Interactive Python simulation of spring motion and harmonic oscillation.", tech: ["Python", "Matplotlib", "Animation"], link: "#", image: "/images/simulation.jpg" },
  { title: "Portfolio Website", description: "Personal portfolio website showcasing skills, projects, and experience.", tech: ["Next.js", "Tailwind CSS"], link: "#", image: "/images/portfolio.png" },
  { title: "E-Wallet", description: "An object-oriented C++ project simulating digital wallet operations.", tech: ["C++", "OOP"], link: "#", image: "/images/wallet.png" },
  { title: "Syncera — Skill Exchange Platform", description: "A software engineering project for a skill exchange platform.", tech: ["Software Engineering"], link: "#", image: "/images/skill.jpg" },
  { title: "BCD Calculator", description: "Digital Logic Design project to implement a BCD calculator.", tech: ["DLD", "C++"], link: "#", image: "/images/BCD.png" },
  { title: "Tailor Manager", description: "A digital dashboard web application for managing tailor shop operations.", tech: ["JavaScript"], link: "#", image: "/images/tailor_manager.jpg" },
  { title: "File Integrity Checker", description: "Cybersecurity tool to detect unauthorized file modifications via hashing.", tech: ["Python", "SHA-256"], link: "#", image: "/images/file_integrity.jpg" },
];

export type JourneyItem = {
  title: string;
  org: string;
  description: string;
  fullText: string;
  image?: string;
};

const journeyData: JourneyItem[] = [
  { 
    title: "Guest Speaker", 
    org: "IEEE RAS COMSATS Wah", 
    description: "Delivered a session on creating professional presentations using Canva.", 
    fullText: `🎉 Honored to Share This Achievement!\n\nI am truly honored to have been invited as a Guest Speaker by IEEE Robotics and Automation Society (RAS), [COMSATS University Islamabad](https://www.linkedin.com/company/comsats-university/), Wah Campus, to deliver a session on: "Introduction to Canva and How to Create Professional Presentations Using Canva."\n\nIt was a wonderful opportunity to share practical techniques for designing impactful, professional presentations while engaging with talented and enthusiastic students. Seeing their curiosity and creativity made this experience truly rewarding.\n\nI would like to express my sincere gratitude to [IEEE](https://www.linkedin.com/company/ieee/), [IEEE Robotics and Automation Society](https://www.linkedin.com/company/ieee-ras/), [COMSATS University Islamabad](https://www.linkedin.com/company/comsats-university/), Wah Campus, and the organizing team for their warm hospitality and for presenting me with a Certificate of Appreciation. This recognition motivates me to continue contributing to the community through knowledge sharing and professional development.\n\nA special thanks to [SYED ARSALAN](https://www.linkedin.com/in/syed-arsalan-9a122525a/) (Vice Chairperson, [IEEE RAS CUI Wah](https://www.linkedin.com/company/ieee-ras-cui-wah/) Chapter) for the invitation, excellent coordination, and for making this session a success.\n\nI look forward to collaborating on more workshops, seminars, and opportunities that inspire learning, creativity, and innovation.\n\n[#IEEE](https://www.linkedin.com/search/results/all/?keywords=%23ieee) [#RoboticsAndAutomation](https://www.linkedin.com/search/results/all/?keywords=%23roboticsandautomation) [#Canva](https://www.linkedin.com/search/results/all/?keywords=%23canva) [#PublicSpeaking](https://www.linkedin.com/search/results/all/?keywords=%23publicspeaking)`,
    image: "/images/journey_1.jpg"
  },
  {
    title: "2nd Runner-Up",
    org: "Aurax Speed Programming",
    description: "Secured 2nd Runner-Up at Bahria University speed programming competition.",
    fullText: `Proud to share that I secured 2nd Runner-Up in an Aurax Speed Programming Competition held at [Bahria University](https://www.linkedin.com/company/bahria-university/), Islamabad, alongside my teammate [Usman Ghani](https://www.linkedin.com/in/usmanghanics/)\n\nCompeting against participants from 25+ universities was honestly both challenging and exciting; every problem pushed us to think faster, stay calm, and trust our teamwork.\n\nGrateful to [Namal University](https://www.linkedin.com/company/namal-university-mianwali/) for their continued support and for the opportunity to represent and grow.\n\nOne important takeaway from this experience: in real competitions, you can’t rely on AI or external help, it’s your logic, practice, and problem-solving mindset that truly matter. Tools can support learning, but they can’t replace the ability to think under pressure.\n\nMoments like these remind me how much there is still to learn, and that’s the best part of this journey. Looking forward to improving and coming back even stronger\n\n[#Programming](https://www.linkedin.com/search/results/all/?keywords=%23programming) [#ProblemSolving](https://www.linkedin.com/search/results/all/?keywords=%23problemsolving)`,
    image: "/images/journey_2.jpg"
  },
  {
    title: "Graphic Designer",
    org: "IEEE Islamabad Section",
    description: "Serving as Graphic Designer for the IEEE Islamabad Section.",
    fullText: `I am currently serving as the Graphic Designer of the IEEE Islamabad Section. It has been a fantastic experience creating visual content and contributing to the community.`,
    image: "/images/journey_3.jpg"
  },
  {
    title: "Student Ambassador",
    org: "Namal University",
    description: "Represented Namal University during BS Admissions Outreach Campaign.",
    fullText: `I had the privilege to represent Namal University during our recent BS Admissions Outreach Campaign held from 11–13 February 2026 in Okara, Sahiwal, and Depalpur.\n\nWe visited multiple colleges and engaged with 2nd-year students to guide them about academic programs, scholarships, and student life at Namal. During the sessions, we highlighted Namal’s modern infrastructure, industry-oriented curriculum, and strong focus on market-driven skills aligned with current industry demands.\n\nInteracting with aspiring students, addressing their queries, and presenting the vision and opportunities at Namal was a truly enriching experience. This outreach not only allowed me to contribute to my university but also significantly enhanced my communication, leadership, and presentation skills.\n\nGrateful for the opportunity and looking forward to more impactful engagements ahead.\n\n[#NamalUniversity](https://www.linkedin.com/search/results/all/?keywords=%23namaluniversity) [#StudentAmbassador](https://www.linkedin.com/search/results/all/?keywords=%23studentambassador)`,
    image: "/images/journey_4.jpg"
  },
  {
    title: "4th Position - Cybersecurity",
    org: "Team RDX Workshop",
    description: "Secured 4th position overall in a 3-day Cybersecurity Workshop CTF.",
    fullText: `Team RDX from FAST University Islamabad recently conducted a 3-day Cybersecurity Workshop at our campus.\n\nSpecial thanks to [Hafiz Muhammad Ibrahim Iqbal](https://www.linkedin.com/in/hafiz-muhammad-ibrahim-iqbal-29389429b/), the head of the team, for leading the workshop and sharing valuable knowledge.\n\nThe workshop included daily challenges with a live scoreboard to track our progress. I’m glad to share that I secured 4th position overall in the competition.\n\nGrateful for this learning experience and looking forward to applying these skills further! 🚀🔐\n\n[#CyberSecurity](https://www.linkedin.com/search/results/all/?keywords=%23cybersecurity) [#CTF](https://www.linkedin.com/search/results/all/?keywords=%23ctf)`,
    image: "/images/journey_5.jpg"
  },
  {
    title: "Python for Everybody",
    org: "Dr. Charles Severance",
    description: "Successfully completed the Python fundamentals and APIs course.",
    fullText: `Excited to share that I have successfully completed the “Python for Everybody” course by Dr. Charles Severance (Dr. Chuck)! 🐍\n\nThis journey deepened my understanding of Python fundamentals, data structures, web scraping, and working with APIs. I’m now even more confident in applying Python to real-world projects and problem-solving.`,
    image: "/images/journey_6.jpg"
  },
  {
    title: "Linux & Shell Scripting",
    org: "IBM (Coursera)",
    description: "Completed Hands-on Introduction to Linux Commands and Shell Scripting.",
    fullText: `Excited to share that I have successfully completed the “Hands-on Introduction to Linux Commands and Shell Scripting” course, authorized by IBM and offered through Coursera.\n\nThis course helped me strengthen my skills in Linux, shell scripting, and command-line operations — a valuable step forward in my journey toward cybersecurity and system administration.`,
    image: "/images/journey_7.jpg"
  },
  {
    title: "System & Network Security",
    org: "LearnKartS (Coursera)",
    description: "Deepened understanding of IoT security, scanning, and network resilience.",
    fullText: `Thrilled to share that I have successfully completed the System and Network Security course by LearnKartS through Coursera.\n\nThis course deepened my understanding of:\n🔹 IoT security methodologies\n🔹 Network scanning & vulnerability assessment\n🔹 DDoS, jamming, and rolling code attacks\n🔹 Best practices for securing connected systems\n\nCybersecurity isn’t just about defense — it’s about staying ahead. Excited to apply these skills to build stronger, safer, and more resilient networks. 💻`,
    image: "/images/journey_8.jpg"
  },
  {
    title: "C++ Patterns: Creational",
    org: "Software Engineering",
    description: "Deepened understanding of creational design patterns in C++.",
    fullText: `I am excited to have completed the "C++ Design Patterns: Creational" course as part of my software engineering assignment! This course deepened my understanding of key design patterns and their implementation in C++, a crucial skill for creating robust and scalable software systems.\n\nA special thanks to [Asiya Batool](https://www.linkedin.com/in/asiya-batool-125079340/) for her insightful guidance and support. Your expertise and encouragement have been invaluable in this learning journey!`,
    image: "/images/journey_9.jpg"
  },
  {
    title: "C++ Patterns: Behavioral",
    org: "LinkedIn Learning",
    description: "Mastered behavioral design patterns for object interactions.",
    fullText: `Thrilled to share that I’ve completed the C++ Design Patterns: Behavioral course on LinkedIn Learning!\n\nThis course provided deep insights into designing robust and scalable software by mastering behavioral design patterns. These patterns help in:\n- Managing object interactions and responsibilities efficiently.\n- Writing cleaner, more maintainable, and flexible C++ code.\n- Leveraging patterns like Strategy, Observer, Command, State, and more to solve real-world programming challenges.`,
    image: "/images/journey_10.jpg"
  },
  {
    title: "C++ Patterns: Structural",
    org: "LinkedIn Learning",
    description: "Explored structural patterns for organizing object relationships.",
    fullText: `I’ve recently completed the C++ Design Patterns: Structural course on LinkedIn Learning as part of our Software Engineering assignment.\n\nThis course deepened my understanding of structural design patterns, which are essential for organizing and simplifying relationships between objects and classes. Key concepts I explored include:\n\n1. Adapter Pattern: Bridging incompatible interfaces for seamless integration.\n2. Composite Pattern: Managing object hierarchies by treating individual and grouped objects uniformly.\n3. Decorator Pattern: Adding features dynamically to objects without altering their structure.\n4. Facade Pattern: Providing simplified interfaces to complex subsystems.\n5. Proxy Pattern: Controlling access to objects for security, logging, or performance enhancements.`,
    image: "/images/journey_11.jpg"
  },
  { title: "Official Member", org: "IEEE — 2025–Present", description: "Actively participating in IEEE community activities and contributing to technical events.", fullText: "Actively participating in IEEE community activities and contributing to technical events.", image: "/images/journey_12.jpg" },
  { title: "Teaching Assistant", org: "Namal University — 2024–2025", description: "Guided students in Object-Oriented Programming concepts and assignments.", fullText: "Guided students in Object-Oriented Programming concepts and assignments.", image: "/images/journey_13.jpg" },
  { title: "Graphic Designer", org: "Rinova International — 2023–Present", description: "Worked on design projects and visual content for Rinova International.", fullText: "Worked on design projects and visual content for Rinova International.", image: "/images/journey_14.jpg" },
  { title: "Video Creator", org: "Independent Project — 2023", description: "Produced a video for UNESCO's Water Competition focused on glaciers.", fullText: "Produced a video for UNESCO's Water Competition focused on glaciers.", image: "/images/journey_15.jpg" }
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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });

  useLayoutEffect(() => {
    const node = tabRefs[activeTab].current;
    if (node) setIndicatorStyle({ left: node.offsetLeft, top: node.offsetTop, width: node.offsetWidth, height: node.offsetHeight });
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
    <div className="relative flex flex-col items-center w-full mt-10">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Skill categories"
        className="inline-flex items-center bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl gap-1 sm:gap-2 relative w-auto max-w-[95vw] overflow-x-auto no-scrollbar -top-10 md:-top-16"
        style={{ padding: '0.5rem 1rem' }}
      >
        <div
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-blue-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 ease-out z-0"
          style={{ left: indicatorStyle.left, top: indicatorStyle.top, width: indicatorStyle.width, height: indicatorStyle.height, pointerEvents: "none" }}
        />
        {tabNames.map((tab, idx) => (
          <button
            key={tab}
            ref={tabRefs[idx]}
            onClick={() => setActiveTab(idx)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setActiveTab((idx + 1) % tabNames.length);
              if (e.key === 'ArrowLeft') setActiveTab((idx - 1 + tabNames.length) % tabNames.length);
            }}
            role="tab"
            aria-selected={activeTab === idx}
            className={`relative z-10 whitespace-nowrap text-sm sm:text-base font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${activeTab === idx ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            style={{ padding: '0.75rem 1.75rem' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="w-full flex-1 flex flex-col justify-center pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full"
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
  return (
    <motion.div
      className="group relative flex flex-col bg-gradient-to-b from-[#111] to-[#141414] border border-white/40 rounded-2xl overflow-hidden hover:border-[3px] hover:border-[#a855f7] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_8px_30px_-5px_rgba(168,85,247,0.15)] h-full w-[280px] sm:w-[320px] shrink-0 backdrop-blur-sm"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="w-full h-40 relative overflow-hidden bg-black">
        <Image src={project.image || "/images/portfolio.png"} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col" style={{ padding: '24px' }}>
        <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-3 line-clamp-1">{project.title}</h3>
        <p className="text-[#9ca3af] text-[14px] leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 3).map((t, i) => (
            <span key={t} className={`text-[11px] font-semibold tracking-wider border rounded-full px-2.5 py-1 ${i === 0 ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-white/5 text-gray-300 border-white/10'}`}>
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors">
          <span>View Details</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

function JourneyCard({ item, index, onClick }: { item: JourneyItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="group relative flex flex-col bg-gradient-to-b from-[#111] to-[#141414] border border-white/40 rounded-2xl overflow-hidden hover:border-[3px] hover:border-[#a855f7] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_8px_30px_-5px_rgba(168,85,247,0.15)] h-full w-[280px] sm:w-[320px] shrink-0 backdrop-blur-sm cursor-pointer"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      <div className="w-full h-40 relative overflow-hidden bg-black">
        <Image src={item.image || "/images/portfolio.png"} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />
      </div>

      <div className="flex-1 flex flex-col" style={{ padding: '24px' }}>
        <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-3 line-clamp-1">{item.title}</h3>
        <p className="text-[#9ca3af] text-[14px] leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-[11px] font-semibold tracking-wider border rounded-full px-2.5 py-1 bg-purple-500/20 text-purple-300 border-purple-500/30 line-clamp-1">
            {item.org}
          </span>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors">
          <span>View Details</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
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
  const [reelState, setReelState] = useState<'auto' | 'force-paused' | 'force-playing'>('auto');
  const [journeyReelState, setJourneyReelState] = useState<'auto' | 'force-paused' | 'force-playing'>('auto');
  const [selectedJourney, setSelectedJourney] = useState<JourneyItem | null>(null);

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
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-5xl rounded-[2rem] bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-between transition-all duration-500 ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0 pointer-events-none"
          }`}
        style={{ padding: "12px 32px" }}
        onMouseEnter={() => setShowHeader(true)}
      >
        <a href="#" className="font-black italic text-lg md:text-2xl tracking-tight text-white whitespace-nowrap" style={{ marginLeft: "10px" }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Gulfam</span> Afzal
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-2 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center justify-center text-white/80 font-semibold hover:text-white transition-all rounded-full border border-white/25 bg-white/5 hover:bg-white/15 hover:border-white/55 text-sm tracking-wide"
              style={{ padding: "8px 24px" }}
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
              <Image src="/assets/gulfam.jpeg" alt="Gulfam Afzal" width={112} height={112} className="w-full h-full object-cover" />
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

          <p className="hero-subtitle text-base sm:text-lg md:text-xl font-bold tracking-wide text-gray-300 mb-8">
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
              className="flex items-center justify-center gap-3 mb-20"
            >
              <span className="flex-1 max-w-[80px] sm:max-w-[120px] h-px bg-gradient-to-r from-transparent to-purple-400/60" />
              <span className="text-sm sm:text-base md:text-lg font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-blue-300 text-center">
                {motivationalQuotes[quoteIndex]}
              </span>
              <span className="flex-1 max-w-[80px] sm:max-w-[120px] h-px bg-gradient-to-l from-transparent to-blue-400/60" />
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-5 justify-center items-center mb-14" style={{ marginTop: '48px' }}>
            <motion.a
              href="#projects"
              style={{ padding: "16px 40px" }}
              className="flex items-center justify-center border-2 border-white text-white font-bold text-sm sm:text-base tracking-wide hover:bg-white hover:text-black transition-colors rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW WORK
            </motion.a>
            <motion.a
              href="/contact"
              style={{ padding: "16px 40px" }}
              className="flex items-center justify-center border-2 border-purple-400 text-purple-400 font-bold text-sm sm:text-base tracking-wide hover:bg-purple-400 hover:text-black transition-colors rounded-full"
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
              <p className="text-xs text-white/60 tracking-wide mt-0.5">PROJECTS</p>
            </div>
            <div className="w-px h-8 bg-white/20" aria-hidden="true" />
            <div>
              <p className="text-2xl font-black text-white">3+</p>
              <p className="text-xs text-white/60 tracking-wide mt-0.5">YEARS CODING</p>
            </div>
            <div className="w-px h-8 bg-white/20" aria-hidden="true" />
            <div>
              <p className="text-2xl font-black text-white">4+</p>
              <p className="text-xs text-white/60 tracking-wide mt-0.5">CYBER TOOLS</p>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── ABOUT SECTION ────────────────────────────────────── */}
      <section id="about" className="about-section min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Subtle White dots */}
        {([
          { t: "10%", l: "5%", s: 2, o: 0.15 }, { t: "30%", r: "8%", s: 3, o: 0.1 },
          { t: "60%", l: "20%", s: 1, o: 0.2 }, { t: "80%", r: "15%", s: 2, o: 0.15 },
        ] as { t: string; l?: string; r?: string; s: number; o: number }[]).map((d, i) => (
          <div key={i} className="white-dot absolute bg-white rounded-full"
            style={{ top: d.t, left: d.l, right: d.r, width: `${d.s * 4}px`, height: `${d.s * 4}px`, opacity: d.o }} />
        ))}

        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="shiny-text">ABOUT ME</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-4 w-full items-center md:items-start">
            <div className="about-text flex flex-col gap-6 md:gap-7 items-center md:items-start text-center md:text-left pt-2">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 text-justify max-w-xl">
                I&apos;m a Computer Science student at <span className="text-purple-400 font-bold">Namal University, Mianwali</span>, with a strong focus on <span className="text-white font-bold">Cybersecurity, Software Development, Networking, and AI Automation</span>.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-gray-400 text-justify max-w-xl">
                I have experience with <span className="text-gray-200 font-bold">Python, C++, JavaScript, React.js, Next.js, HTML, CSS, MySQL, and MongoDB</span>, along with <span className="text-gray-200 font-bold">Object-Oriented Programming, Database Management, and System Development</span>. My cybersecurity skill set includes <span className="text-gray-200 font-bold">Network Security, Penetration Testing, Linux, Wireshark, Nmap, Burp Suite, and Security Operations concepts</span>.
              </p>
              <div className="flex flex-col items-center gap-5 pt-2">
                <a
                  href="/cv.pdf"
                  download="Gulfam_CV.pdf"
                  className="jelly-green-btn gap-3 group"
                >
                  <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                  <span>Download CV</span>
                </a>

                <div className="flex items-center justify-center gap-4">
                  <motion.a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:text-purple-400 hover:border-purple-500/40 hover:bg-purple-500/20 transition-all rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    aria-label="GitHub">
                    <FaGithub size={22} />
                  </motion.a>
                  <motion.a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/20 transition-all rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    aria-label="LinkedIn">
                    <FaLinkedinIn size={22} />
                  </motion.a>
                  <motion.a href="mailto:gulfamafzal84@gmail.com"
                    className="p-3 bg-green-500/10 border border-green-500/20 text-green-300 hover:text-green-400 hover:border-green-500/40 hover:bg-green-500/20 transition-all rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    aria-label="Email">
                    <Mail size={22} />
                  </motion.a>
                </div>
              </div>
            </div>

            <motion.div
              className="relative flex justify-center md:justify-end mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-[280px] lg:max-w-[320px] aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl relative group">
                <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="w-full h-full bg-[#0a0a0a] rounded-[22px] overflow-hidden relative z-10">
                  <Image
                    src="/assets/gulfam.jpeg"
                    alt="Gulfam Afzal"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS / EXPERIENCE TABS ───────────────────────────── */}
      <section id="experience" className="min-h-screen flex flex-col pt-32 pb-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 zebra-bg pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col flex-1 justify-evenly">
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="shiny-text">{statTabs[statTab].title}</span>
          </motion.h2>

          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12" role="region" aria-live="polite" aria-atomic="true">
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
                    <div className="mb-5 flex justify-center" aria-hidden="true">
                      <stat.icon size={44} className="text-white" />
                    </div>
                    <h3 className="text-3xl sm:text-5xl font-black text-white mb-3">{stat.number}</h3>
                    <p className="text-white/70 font-bold tracking-widest text-xs sm:text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center w-full">
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
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4 text-center relative -top-10 md:-top-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="shiny-text">SKILLS</span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-14 text-base sm:text-lg relative -top-10 md:-top-16">A breakdown of my technical expertise and capabilities.</p>
          <SkillTabSwitcher />
        </div>
      </section>

      {/* ── PROJECTS SECTION ─────────────────────────────────── */}
      <section id="projects" className="pb-24 md:pb-32 relative overflow-hidden" style={{ background: "#080808", paddingTop: '160px', scrollMarginTop: '100px', paddingLeft: '5%', paddingRight: '5%' }}>
        {([
          { t: "5%", l: "3%", s: 2, o: 0.5 }, { t: "25%", r: "5%", s: 3, o: 0.35 },
          { t: "55%", l: "15%", s: 1, o: 0.7 }, { t: "80%", r: "12%", s: 2, o: 0.45 },
        ] as { t: string; l?: string; r?: string; s: number; o: number }[]).map((d, i) => (
          <div key={i} className="white-dot absolute bg-white rounded-full"
            style={{ top: d.t, left: d.l, right: d.r, width: `${d.s * 4}px`, height: `${d.s * 4}px`, opacity: d.o }} />
        ))}
        <div className="w-full mx-auto flex flex-col items-center" style={{ maxWidth: '1280px' }}>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', width: '100%' }}
          >
            <span className="shiny-text">PROJECTS</span>
          </motion.h2>
          <p className="text-purple-200/80 text-center text-base sm:text-lg max-w-2xl font-medium" style={{ textAlign: 'center', margin: '0 auto 40px auto' }}>
            A collection of my academic and personal projects showcasing problem-solving, creativity, and modern technologies.
          </p>
          <div className="w-full relative group py-4" style={{ marginBottom: '88px' }}>
            <div
              className="flex gap-6 animate-marquee w-max cursor-pointer hover:[animation-play-state:paused]"
              style={{
                animationPlayState:
                  reelState === 'force-paused' ? 'paused' :
                    reelState === 'force-playing' ? 'running' :
                      undefined
              }}
              onMouseLeave={() => {
                if (reelState === 'force-playing') setReelState('auto');
              }}
              onClick={() => {
                if (reelState === 'auto') setReelState('force-paused');
                else if (reelState === 'force-paused') setReelState('force-playing');
                else setReelState('force-paused');
              }}
            >
              {[...projects, ...projects].map((project, index) => (
                <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
              ))}
            </div>

            {/* Edge Fading Overlays */}
            <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL JOURNEY ─────────────────────────────── */}
      <section id="work" className="min-h-screen flex flex-col justify-center py-24 md:py-32 relative overflow-hidden bg-black">
        <div className="w-full flex flex-col items-center z-10 px-6 md:px-12 lg:px-20 mb-12">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center shiny-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            PROFESSIONAL JOURNEY
          </motion.h2>
          <p className="text-gray-400 text-center mb-6 text-base sm:text-lg max-w-2xl">
            Roles, responsibilities, and experiences that have shaped my career path.
          </p>
        </div>

        <div className="w-full relative group py-4" style={{ marginBottom: '88px' }}>
          <div
            className="flex gap-6 animate-marquee w-max cursor-pointer hover:[animation-play-state:paused]"
            style={{
              animationPlayState:
                journeyReelState === 'force-paused' ? 'paused' :
                  journeyReelState === 'force-playing' ? 'running' :
                    undefined
            }}
            onMouseLeave={() => {
              if (journeyReelState === 'force-playing') setJourneyReelState('auto');
            }}
            onClick={() => {
              if (journeyReelState === 'auto') setJourneyReelState('force-paused');
              else if (journeyReelState === 'force-paused') setJourneyReelState('force-playing');
              else setJourneyReelState('force-paused');
            }}
          >
            {[...journeyData, ...journeyData].map((item, index) => (
              <JourneyCard key={`${item.title}-${index}`} item={item} index={index} onClick={() => setSelectedJourney(item)} />
            ))}
          </div>

          {/* Edge Fading Overlays */}
          <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-center w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-black relative overflow-hidden">
        {([
          { t: "15%", l: "10%", s: 2, o: 0.5 }, { t: "40%", r: "8%", s: 3, o: 0.35 },
          { t: "70%", l: "30%", s: 1, o: 0.7 }, { t: "85%", r: "20%", s: 2, o: 0.45 },
        ] as { t: string; l?: string; r?: string; s: number; o: number }[]).map((d, i) => (
          <div key={i} className="white-dot absolute bg-white rounded-full"
            style={{ top: d.t, left: d.l, right: d.r, width: `${d.s * 4}px`, height: `${d.s * 4}px`, opacity: d.o }} />
        ))}

        <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center relative z-10">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-12 shiny-text"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.span
              className="block"
              variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            >
              LET&apos;S WORK
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              TOGETHER
            </motion.span>
          </motion.h2>

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
      <footer className="w-full bg-[#080808] border-t border-white/10 pt-20 pb-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Brand/Bio */}
            <div className="col-span-1 flex flex-col gap-4">
              <h3 className="text-2xl font-black text-white tracking-tighter">GULFAM AFZAL</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                A passionate software engineer specializing in modern web development, cybersecurity, and building intuitive digital experiences.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="col-span-1 flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-widest text-sm uppercase">Quick Links</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-400">
                <li><Link href="#about" className="hover:text-purple-400 transition-colors">About</Link></li>
                <li><Link href="#skills" className="hover:text-purple-400 transition-colors">Skills</Link></li>
                <li><Link href="#projects" className="hover:text-purple-400 transition-colors">Projects</Link></li>
                <li><Link href="#contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            {/* Socials */}
            <div className="col-span-1 flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-widest text-sm uppercase">Connect</h4>
              <div className="flex items-center gap-4">
                <a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]" aria-label="GitHub">
                  <FaGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]" aria-label="LinkedIn">
                  <FaLinkedinIn size={18} />
                </a>
                <a href="mailto:gulfamafzal84@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]" aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Divider & Copyright */}
          <div className="w-full h-px bg-white/10" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold tracking-wide text-gray-500">
            <p>© {new Date().getFullYear()} Gulfam Afzal. All rights reserved.</p>
            <p className="flex items-center gap-1">Built with Next.js & <span className="text-red-500">❤️</span></p>
          </div>
        </div>
      </footer>

      {/* ── DETAILS MODAL ───────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedJourney && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJourney(null)}
          >
            <motion.div
              className="bg-[#111] border border-white/20 rounded-2xl p-6 md:p-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-[0_0_50px_rgba(168,85,247,0.15)]"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedJourney(null)}
              >
                <X size={20} />
              </button>
              
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 pr-8">{selectedJourney.title}</h3>
              <p className="text-purple-400 font-semibold mb-8">{selectedJourney.org}</p>
              
              <div className="text-gray-300 leading-relaxed text-sm md:text-base space-y-4">
                {selectedJourney.fullText.split('\n').map((line, i) => {
                  if (!line.trim()) return <br key={i} />;
                  const parts = line.split(/(\[[^\]]+\]\([^)]+\))/g);
                  return (
                    <p key={i}>
                      {parts.map((part, j) => {
                        const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
                        if (match) {
                          return <a key={j} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 hover:underline">{match[1]}</a>;
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
