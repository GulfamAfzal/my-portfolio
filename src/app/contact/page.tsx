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

      {/* Simple Back Link instead of Navbar */}
      <Link
        href="/"
        className="absolute top-14 left-6 md:left-12 lg:left-20 z-50 flex items-center gap-2 text-white/70 hover:text-white transition-colors font-semibold text-sm"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Back to Portfolio</span>
        <span className="sm:hidden">Back</span>
      </Link>

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

      <main className="relative z-10 flex flex-col items-center justify-center py-20 px-6 md:px-12 lg:px-20 min-h-screen">

        {/* Heading */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter relative inline-block" style={{ marginBottom: '16px' }}>
            <span className="shiny-text">Contact Me</span>
            <span className="absolute left-0 -bottom-3 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ marginTop: '16px' }}>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you. Drop a message below!
          </p>
        </motion.div>

        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6 lg:gap-10">

          {/* Contact Form */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-gradient-to-b from-[#111] to-[#141414] border border-white/10 hover:border-[#a855f7] rounded-[20px] flex flex-col transition-colors duration-500 hover:shadow-[0_8px_40px_0_rgba(162,89,247,0.18)] h-full"
            style={{ padding: '24px', gap: '16px' }}
          >
            <h2 className="text-xl md:text-2xl font-extrabold text-white">Let&apos;s work together</h2>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1" style={{ gap: '14px' }}>
              <div className="grid sm:grid-cols-2" style={{ gap: '14px' }}>
                {["firstName", "lastName"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field === "firstName" ? "First Name" : "Last Name"}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="rounded-xl bg-[#0a0a0a] border border-white/15 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none text-gray-200 text-sm placeholder-[#9ca3af] transition-all"
                    style={{ padding: '10px 14px' }}
                  />
                ))}
              </div>
              <div className="grid sm:grid-cols-2" style={{ gap: '14px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-xl bg-[#0a0a0a] border border-white/15 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none text-gray-200 text-sm placeholder-[#9ca3af] transition-all"
                  style={{ padding: '10px 14px' }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-xl bg-[#0a0a0a] border border-white/15 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none text-gray-200 text-sm placeholder-[#9ca3af] transition-all"
                  style={{ padding: '10px 14px' }}
                />
              </div>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                className="rounded-xl bg-[#0a0a0a] border border-white/15 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 outline-none text-gray-200 text-sm resize-none placeholder-[#9ca3af] transition-all flex-1"
                style={{ padding: '10px 14px', minHeight: '120px' }}
              />

              <div className="flex items-center gap-4 flex-wrap mt-2">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="jelly-green-btn disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ padding: '12px 24px' }}
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
            className="bg-gradient-to-b from-[#111] to-[#141414] border border-white/10 hover:border-[#a855f7] rounded-[20px] flex flex-col h-full transition-colors duration-500 hover:shadow-[0_8px_40px_0_rgba(162,89,247,0.18)]"
            style={{ padding: '24px', justifyContent: 'space-between' }}
          >
            <div>
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">Get in Touch</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Have questions or want to discuss a project? Feel free to reach out using any of the methods below. I typically respond within 24 hours.
                </p>
              </div>

              <div className="flex flex-col" style={{ gap: '12px' }}>
                {[
                  { icon: Phone, label: "03454743847", color: "text-green-400", href: "tel:03454743847" },
                  { icon: Mail, label: "gulfamafzal84@gmail.com", color: "text-purple-400", href: "mailto:gulfamafzal84@gmail.com" },
                  { icon: MapPin, label: "Mianwali, Pakistan", color: "text-blue-400" },
                ].map(({ icon: Icon, label, color, href }) => (
                  href ? (
                    <a key={label} href={href} className="flex items-center gap-4 min-h-[48px] bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 rounded-xl transition-all cursor-pointer group" style={{ padding: '12px 24px' }}>
                      <Icon className={`${color} shrink-0`} size={20} />
                      <span className="text-gray-200 text-sm break-words group-hover:text-white transition-colors">{label}</span>
                    </a>
                  ) : (
                  <div key={label} className="flex items-center gap-4 min-h-[48px] bg-white/5 border border-white/10 rounded-xl" style={{ padding: '12px 24px' }}>
                    <Icon className={`${color} shrink-0`} size={20} />
                    <span className="text-gray-200 text-sm break-words">{label}</span>
                  </div>
                  )
                ))}
              </div>
            </div>

            <div className="border-t border-white/10" style={{ paddingTop: '16px' }}>
              <p className="text-gray-400 text-sm mb-4 font-medium">Also find me on:</p>
              <div className="flex flex-wrap gap-4">
                <a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold">
                  <FaGithub size={18} aria-hidden="true" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold">
                  <FaLinkedinIn size={18} aria-hidden="true" /> LinkedIn
                </a>
                <a href="mailto:gulfamafzal84@gmail.com"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold">
                  <Mail size={18} aria-hidden="true" /> Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 py-8 px-6" style={{ paddingTop: '20px' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Gulfam Afzal. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <a href="https://github.com/GulfamAfzal" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/gulfam123" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
            <a href="mailto:gulfamafzal84@gmail.com"
              className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
