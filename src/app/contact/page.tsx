"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .send(
        "service_vbcg6rb",
        "template_nhooq4n",
        formData,
        "7amzs27ImaSCPyAB3"
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        },
        () => setStatus("error")
      );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* Minimal Back Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-5xl rounded-2xl bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-semibold text-sm">
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
        <span className="font-black italic text-lg tracking-tight text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Gulfam</span> Afzal
        </span>
        <div className="flex items-center gap-4">
          <a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors p-1">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors p-1">
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </header>

      {/* Background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-400 opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-52 h-52 bg-gradient-to-br from-blue-400 to-purple-500 opacity-[0.08] rounded-full blur-3xl" />
      </div>

      {/* White dots */}
      {([
        { t: "15%", l: "5%" }, { t: "40%", r: "6%" },
        { t: "70%", l: "20%" }, { t: "85%", r: "15%" },
      ] as { t: string; l?: string; r?: string }[]).map((d, i) => (
        <div key={i} className="white-dot fixed bg-white rounded-full"
          style={{ top: d.t, left: d.l, right: d.r, width: "6px", height: "6px", opacity: 0.4 }} />
      ))}

      <main className="relative z-10 flex flex-col items-center justify-start pt-32 md:pt-40 pb-20 px-4 md:px-8 min-h-screen">

        {/* Heading */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 relative inline-block">
            <span className="shiny-text">Contact Me</span>
            <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you. Drop a message below!
          </p>
        </motion.div>

        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6 lg:gap-10">

          {/* Contact Form */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 md:p-8 flex flex-col gap-5 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(162,89,247,0.12)]"
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-white">Let&apos;s work together</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {["firstName", "lastName"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field === "firstName" ? "First Name" : "Last Name"}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-gray-200 text-sm placeholder-gray-500 transition-colors"
                  />
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-gray-200 text-sm placeholder-gray-500 transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-gray-200 text-sm placeholder-gray-500 transition-colors"
                />
              </div>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="p-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 outline-none text-gray-200 text-sm resize-none placeholder-gray-500 transition-colors"
              />

              <div className="flex items-center gap-4 flex-wrap">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="jelly-green-btn disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </motion.button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-green-400 text-sm font-semibold">
                      ✓ Message sent successfully!
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-red-400 text-sm font-semibold">
                      ✗ Failed to send. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 md:p-8 flex flex-col gap-6 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(162,89,247,0.12)]"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">Get in Touch</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Have questions or want to discuss a project? Feel free to reach out using any of the methods below. I typically respond within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: Phone, label: "03454743847", color: "text-green-400" },
                { icon: Mail, label: "gulfamafzal84@gmail.com", color: "text-purple-400" },
                { icon: MapPin, label: "Mianwali, Pakistan", color: "text-blue-400" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-xl transition-colors">
                  <Icon className={`${color} shrink-0`} size={20} />
                  <span className="text-gray-200 text-sm break-all">{label}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-gray-400 text-sm mb-4 font-medium">Also find me on:</p>
              <div className="flex gap-4">
                <a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold">
                  <FaGithub size={18} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold">
                  <FaLinkedinIn size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-sm">© 2025 Gulfam Afzal · Built with Next.js &amp; ❤️</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors" aria-label="GitHub">
              <FaGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
