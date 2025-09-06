"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-200">

      {/* Hero Section */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-8 sm:px-16 pt-32 pb-16 gap-12">

        {/* Left Text */}
        <div className="flex-1 text-center md:text-left -mt-4 animate-slideInLeft">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text 
                         bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 
                         mb-6 animate-pulse whitespace-nowrap">
            Web & Cybersecurity Specialist
          </h1>

          <h3 className="text-4xl sm:text-3xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 mb-4 animate-pulse">
            Hello, I’m Gulfam 👋
          </h3>

          <p className="mt-4 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl text-justify">
            I am a Computer Science student at Namal University, Mianwali with expertise in C, C++, Python, and Assembly Language (x86, MIPS). Skilled in Object-Oriented Programming, Database Management, and System Development. Passionate about Cybersecurity and building secure, efficient, and scalable software solutions that solve real-world problems.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="/cv.pdf"
              download="Gulfam_CV.pdf"   // ✅ forces download with filename
              className="px-6 py-3 rounded-lg text-black font-bold shadow-lg 
                        bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                        animate-pulse hover:scale-105 transform transition duration-300"
            >
              📄 CV
            </a>
            <a
              href="https://www.linkedin.com/in/gulfam123"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-black font-bold shadow-lg 
                         bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400
                         animate-pulse hover:scale-105 transform transition duration-300"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/GulfamAfzal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-black font-bold shadow-lg 
                         bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
                         animate-pulse hover:scale-105 transform transition duration-300"
            >
              💻 GitHub
            </a>
          </div>
        </div>

        {/* Right Profile Image */}
        <div className="flex-1 flex justify-center md:justify-start md:ml-12 animate-slideInRight">
          <div className="relative rounded-xl">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r 
                            from-red-500 via-blue-500 via-green-400 via-pink-500 to-yellow-400
                            blur-4xl opacity-95 animate-pulse"></div>

            <div className="relative p-1 bg-gray-800 rounded-xl shadow-lg">
              <Image
                src="/assets/gulfam.jpg"
                alt="Gulfam"
                width={250}
                height={250}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
