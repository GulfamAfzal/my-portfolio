"use client";

import { useEffect } from "react";

export default function ProjectsPage() {
  useEffect(() => {
    const projects = [
      {
        title: "Keylogger",
        description: "A keylogger built as a system monitoring experiment.",
        tech: ["Assembly Language"],
        image: "/images/keylogger.jpg",
      },
      {
        title: "History of Pakistan Web App",
        description: "A web application to showcase the history of Pakistan.",
        tech: ["React.js", "Tailwind CSS", "MySQL"],
        image: "/images/pakistan.png",
      },
      {
        title: "File Compression Tool",
        description: "A tool to compress and decompress files.",
        tech: ["C++", "Algorithms"],
        image: "/images/file.jpg",
      },
      {
        title: "Chess Game",
        description: "A console-based Chess game implementing classic rules.",
        tech: ["C++", "Algorithms"],
        image: "/images/chess.jpg",
      },
      {
        title: "Snake and Ladder Game",
        description: "A fun console-based Snake and Ladder game built with C++.",
        tech: ["C++", "OOP"],
        image: "/images/snake.jpg",
      },
      {
        title: "Tic-Tac-Toe",
        description: "A two-player Tic-Tac-Toe game with win-checking logic.",
        tech: ["C++", "Game Dev"],
        image: "/images/tick.jpg",
      },
      {
        title: "Theft Detection System",
        description:
          "A model to detect theft by identifying guns being pointed using video data.",
        tech: ["Python", "Roboflow", "OpenCV"],
        image: "/images/theft.jpg",
      },
      {
        title: "Spring Motion Simulator",
        description:
          "Interactive Python simulation of spring motion and harmonic oscillation.",
        tech: ["Python", "Matplotlib", "Animation"],
        image: "/images/simulation.jpg",
      },
      {
        title: "Portfolio Website",
        description:
          "Personal portfolio website showcasing skills, projects, and experience.",
        tech: ["React.js", "Next.js", "Tailwind CSS"],
        image: "/images/portfolio.png",
      },
      {
        title: "E-Wallet",
        description:
          "An object-oriented C++ project simulating digital wallet operations.",
        tech: ["C++", "OOP"],
        image: "/images/wallet.png",
      },
      {
        title: "Syncera - Skill Exchange Platform",
        description: "A software engineering project for a skill exchange platform.",
        tech: ["Software Engineering"],
        image: "/images/skill.jpg",
      },
      {
        title: "BCD Calculator",
        description: "Digital Logic Design project to implement a BCD calculator.",
        tech: ["DLD", "C++"],
        image: "/images/BCD.png",
      },
    ];

    const container: HTMLElement | null = document.getElementById("projects-section");
    if (!container) return;
    container.innerHTML = "";

    projects.forEach((project, index) => {
      const card: HTMLElement = document.createElement("div");

      // Add slide animation classes alternately
      const slideClass = index % 2 === 0 ? "animate-slideInLeft" : "animate-slideInRight";

      card.className =
        `project-card p-4 rounded-xl shadow-lg hover:shadow-[0_0_30px_#22d3ee,0_0_40px_#f43f5e,0_0_50px_#22c55e] transition-shadow duration-500 cursor-pointer bg-gradient-to-br from-gray-800 to-gray-700 ${slideClass}`;

      card.style.minHeight = "20rem";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.justifyContent = "flex-start";

      const titleWords = project.title
        .split(" ")
        .map((w) => `<span class="animated-glow-text">${w}</span>`)
        .join(" ");

      const descWords = project.description
        .split(" ")
        .map((w) => `<span class="animated-glow-text-small">${w}</span>`)
        .join(" ");

      card.innerHTML = `
        <div class="project-image mb-4 bg-gray-800 rounded-md w-full h-40 overflow-hidden flex items-center justify-center">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover"/>
        </div>

        <h3 class="text-lg font-bold mb-2">${titleWords}</h3>

        <p class="text-sm mb-4">${descWords}</p>

        <div class="flex flex-wrap gap-2">
          ${project.tech
            .map(
              (tech) =>
                `<span class="px-2 py-1 rounded-md text-xs text-black font-semibold bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 hover:animate-pulse">${tech}</span>`
            )
            .join("")}
        </div>
      `;
      container.appendChild(card);
    });
  }, []); // ✅ No dependencies, ESLint-safe

  return (
    <div
      className="min-h-screen bg-black text-gray-200 p-8 flex flex-col overflow-y-auto"
      style={{ maxHeight: "100vh" }}
    >
      {/* Heading + Intro */}
      <div className="text-center mb-12 mt-16 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative inline-block animated-gradient-heading animate-slideInRight">
          Projects & Creations
          <span className="glow-underline"></span>
        </h2>
        <p className="text-gray-400 text-base mt-2 text-center sm:w-[80%] md:w-[60%] animate-slideInRight">
          A collection of my academic and personal projects showcasing
          problem-solving, creativity, and modern technologies.
        </p>
      </div>

      {/* Projects Grid */}
      <div
        id="projects-section"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        style={{ paddingBottom: "2rem" }}
      ></div>

      {/* Styles */}
      <style jsx>{`
        .animated-gradient-heading {
          background: linear-gradient(
            to right,
            #a855f7,
            #ec4899,
            #f97316,
            #facc15
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .glow-underline {
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff);
          border-radius: 2px;
          animation: glowHeading 2s infinite alternate;
        }

        .animated-glow-text {
          background: linear-gradient(
            90deg,
            #ff0000,
            #ff7f00,
            #ffff00,
            #00ff00,
            #0000ff,
            #8b00ff
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glowRainbow 3s linear infinite;
          background-size: 300% 300%;
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 20px rgba(255, 255, 255, 0.7);
          margin-right: 4px;
        }

        .animated-glow-text-small {
          background: linear-gradient(
            90deg,
            #00ffff,
            #ff00ff,
            #ffff00,
            #ff0000,
            #00ff00,
            #0000ff
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glowRainbow 4s linear infinite;
          background-size: 300% 300%;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7),
            0 0 18px rgba(255, 255, 255, 0.5);
          margin-right: 3px;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes glowHeading {
          0% {
            text-shadow: 0 0 8px #ff0000, 0 0 12px #00ff00, 0 0 16px #0000ff;
          }
          50% {
            text-shadow: 0 0 12px #00ff00, 0 0 16px #0000ff, 0 0 20px #ff0000;
          }
          100% {
            text-shadow: 0 0 16px #0000ff, 0 0 20px #ff0000, 0 0 24px #00ff00;
          }
        }

        @keyframes glowRainbow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
