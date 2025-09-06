"use client";

import { useEffect } from "react";

export default function WorkSection() {
  useEffect(() => {
    const works = [
      {
        title: "Official Member",
        description:
          "Actively participating in IEEE community activities and contributing to technical events.",
        duration: "IEEE (Institute of Electrical and Electronics Engineers) – 2025–Present",
        image: "/images/ieee.png",
      },
      {
        title: "Teaching Assistant (OOP)",
        description:
          "Guided students in Object-Oriented Programming concepts and assignments.",
        duration: "Namal University, Mianwali – 2024–2025",
        image: "/images/ta.png",
      },
      {
        title: "Graphic Designer",
        description:
          "Worked on design projects and visual content for Rinova International.",
        duration: "Rinova International – 2023–Present",
        image: "/images/graphic.jpg",
      },
      {
        title: "Video Creator",
        description:
          "Produced a video for UNESCO's Water Competition focused on glaciers.",
        duration: "Independent Project / Competition – 2023",
        image: "/images/Vedio.jpg",
      },
    ];

    const container: HTMLElement | null = document.getElementById("work-section");
    if (!container) return;
    container.innerHTML = "";

    works.forEach((work, index) => {
      const card: HTMLElement = document.createElement("div");

      // Alternate slide from left/right
      const slideClass = index % 2 === 0 ? "animate-slideInLeft" : "animate-slideInRight";

      card.className =
        `work-card p-6 rounded-xl shadow-lg hover:shadow-[0_0_20px_#7f5af0,0_0_30px_#ff4d6d,0_0_40px_#ffa500] transition-shadow duration-500 cursor-pointer bg-gradient-to-br from-gray-800 to-gray-700 text-white max-w-sm ${slideClass}`;

      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.alignItems = "center";
      card.style.justifyContent = "flex-start";

      card.innerHTML = `
        <!-- Image -->
        <div class="mb-4 rounded-md w-full h-40 overflow-hidden flex items-center justify-center">
          <img src="${work.image}" alt="${work.title}" class="w-full h-full object-cover rounded-md"/>
        </div>

        <!-- Title -->
        <h3 class="text-xl font-bold mb-2 animated-gradient-text">${work.title}</h3>

        <!-- Description -->
        <p class="text-gray-200 text-center mb-2">${work.description}</p>

        <!-- Duration / Organization -->
        <p class="text-gray-400 text-sm italic text-center">${work.duration}</p>
      `;
      container.appendChild(card);
    });
  }, []); // ✅ No dependencies needed, ESLint-safe

  return (
    <div
      className="min-h-screen bg-black text-gray-200 p-8 flex flex-col overflow-y-auto"
      style={{ maxHeight: "100vh" }}
    >
      {/* Heading + Intro */}
      <div className="text-center mb-12 mt-32 flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative inline-block animated-gradient-heading animate-slideInRight">
          Professional Journey
          <span className="glow-underline"></span>
        </h2>
        <p className="text-gray-400 text-base mt-2 text-center sm:w-[80%] md:w-[60%] animate-slideInRight">
          A glimpse of the roles, responsibilities, and experiences that have shaped my career path.
        </p>
      </div>

      {/* Cards */}
      <div
        id="work-section"
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      ></div>

      {/* Styles */}
      <style jsx>{`
        .animated-gradient-heading {
          background: linear-gradient(to right, #a855f7, #ec4899, #f97316, #facc15);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
          text-shadow: 0 0 10px rgba(255,255,255,0.8);
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

        .animated-gradient-text {
          background: linear-gradient(to right, #7f5af0, #ff4d6d, #ffa500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
          background-size: 200% 200%;
          text-shadow: 0 0 10px rgba(255,255,255,0.7);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glowHeading {
          0% { text-shadow: 0 0 8px #ff0000, 0 0 12px #00ff00, 0 0 16px #0000ff; }
          50% { text-shadow: 0 0 12px #00ff00, 0 0 16px #0000ff, 0 0 20px #ff0000; }
          100% { text-shadow: 0 0 16px #0000ff, 0 0 20px #ff0000, 0 0 24px #00ff00; }
        }
      `}</style>
    </div>
  );
}
