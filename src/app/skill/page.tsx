"use client";

import { useEffect } from "react";

// Define TypeScript types for skills
type SkillSection =
  | string[] // For Soft Skills
  | { [subsection: string]: string[] }; // For Programming & Cybersecurity sections

export default function SkillsPage() {
  useEffect(() => {
    const skills: Record<string, SkillSection> = {
      "Programming & Development": {
        Languages: [
          "Python",
          "C++",
          "MASM x86 Assembly",
          "SQL/MySQL",
          "Bash Scripting",
          "HTML",
          "CSS",
          "JavaScript",
        ],
        "Frameworks & Libraries": [
          "Flask",
          "Django",
          "React.js",
          "Next.js",
          "Tailwind CSS",
        ],
      },
      "Cybersecurity & Tools": {
        Tools: ["Nmap", "Metasploit", "SQLMap", "Ngrok"],
        Platforms: ["Linux / Kali Linux"],
      },
      "Soft Skills": [
        "Problem-solving",
        "Teaching",
        "Project management & Teamwork",
        "Time Management",
      ],
    };

    function getLogo(skill: string) {
      const logos: Record<string, string> = {
        Python: "python.jpg",
        "C++": "cpp.png",
        "MASM x86 Assembly": "assembly.png",
        "SQL/MySQL": "mysql.jpg",
        "Bash Scripting": "bash.jpg",
        HTML: "html.png",
        CSS: "css.png",
        JavaScript: "javascript.jpg",
        Flask: "flask.png",
        Django: "django.png",
        "React.js": "react.png",
        "Next.js": "next.png",
        "Tailwind CSS": "tailwind.jpg",
        Nmap: "nmap.jpg",
        Metasploit: "metasploit.png",
        SQLMap: "sqlmap.jpg",
        Ngrok: "ngrok.png",
        "Linux / Kali Linux": "linux.jpg",
        "Problem-solving": "problem.png",
        Teaching: "teaching.jpg",
        "Project management & Teamwork": "teamwork.png",
        "Time Management": "time.jpg",
      };
      return `/logos/${logos[skill] || "default.png"}`;
    }

    function generateSkills() {
      const container: HTMLElement | null = document.getElementById("skills-section");
      if (!container) return;
      container.innerHTML = "";

      for (const section in skills) {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "skills-section";

        // Section Title
        const sectionTitle: HTMLElement = document.createElement("h2");
        sectionTitle.textContent = section;
        sectionTitle.style.background =
          "linear-gradient(90deg, #a855f7, #ec4899, #facc15)";
        sectionTitle.style.backgroundSize = "200% auto";
        sectionTitle.style.webkitBackgroundClip = "text";
        sectionTitle.style.backgroundClip = "text";
        sectionTitle.style.color = "transparent";
        sectionTitle.style.textAlign = "center";
        sectionTitle.style.fontSize = "1.875rem"; // 3xl
        sectionTitle.style.fontWeight = "800"; // extrabold
        sectionTitle.style.marginBottom = "2rem";
        sectionTitle.style.animation = "gradientMove 3s linear infinite";
        sectionDiv.appendChild(sectionTitle);

        if (Array.isArray(skills[section])) {
          // Soft Skills
          const grid = document.createElement("div");
          grid.className =
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mt-6";

          skills[section].forEach((skill: string, index: number) => {
            const card = document.createElement("div");
            const animationClass =
              index % 4 < 2 ? "animate-slideInLeft" : "animate-slideInRight";

            card.className = `flex flex-col items-center gap-2 skill-card ${animationClass}`;
            card.innerHTML = `
              <img src="${getLogo(skill)}" alt="${skill}" class="w-16 h-16 object-contain" />
              <p class="text-gray-200 text-center mt-4">${skill}</p>
            `;
            grid.appendChild(card);
          });

          // Keep grid aligned
          while (grid.children.length % 4 !== 0) {
            const empty = document.createElement("div");
            empty.className = "w-16 h-16 opacity-0";
            grid.appendChild(empty);
          }

          sectionDiv.appendChild(grid);
        } else {
          // Subsections like Languages, Tools
          for (const sub in skills[section]) {
            const subTitle: HTMLElement = document.createElement("h3");
            subTitle.textContent = sub;
            subTitle.style.background =
              "linear-gradient(90deg, #a855f7, #ec4899, #facc15)";
            subTitle.style.backgroundSize = "200% auto";
            subTitle.style.WebkitBackgroundClip = "text";
            subTitle.style.backgroundClip = "text";
            subTitle.style.color = "transparent";
            subTitle.style.textAlign = "center";
            subTitle.style.fontSize = "1.5rem"; // 2xl
            subTitle.style.fontWeight = "600"; // semi-bold
            subTitle.style.marginTop = "2rem";
            subTitle.style.marginBottom = "1.5rem";
            subTitle.style.animation = "gradientMove 3s linear infinite";
            sectionDiv.appendChild(subTitle);

            const grid = document.createElement("div");
            grid.className =
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mt-4";

            skills[section][sub].forEach((skill: string, index: number) => {
              const card = document.createElement("div");
              const animationClass =
                index % 4 < 2 ? "animate-slideInLeft" : "animate-slideInRight";

              card.className = `flex flex-col items-center gap-2 skill-card ${animationClass}`;
              card.innerHTML = `
                <img src="${getLogo(skill)}" alt="${skill}" class="w-16 h-16 object-contain" />
                <p class="text-gray-200 text-center mt-4">${skill}</p>
              `;
              grid.appendChild(card);
            });

            // Keep grid aligned
            while (grid.children.length % 4 !== 0) {
              const empty = document.createElement("div");
              empty.className = "w-16 h-16 opacity-0";
              grid.appendChild(empty);
            }

            sectionDiv.appendChild(grid);
          }
        }

        container.appendChild(sectionDiv);
      }
    }

    generateSkills();
  }, []); // ✅ No missing dependency needed here

  return (
    <div className="min-h-screen bg-black text-gray-200 p-8 flex flex-col">
      <p className="text-lg mb-10 text-center">
        Here&apos;s a snapshot of my professional expertise and technical
        capabilities.
        <br />
        I&apos;ve divided my skills into Programming & Development, Cybersecurity & 
        Tools, and Soft Skills.
      </p>

      <div
        id="skills-section"
        className="space-y-16 overflow-y-auto pr-4"
        style={{ maxHeight: "80vh" }}
      ></div>
    </div>
  );
}
