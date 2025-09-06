"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures client-side rendering for animations
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs
      .send(
        "service_vbcg6rb",
        "template_nhooq4n",
        formData,
        "7amzs27ImaSCPyAB3"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        },
        () => setStatus("Failed to send message. Try again!")
      );
  };

  return (
    <div className="min-h-screen bg-[#111827] text-gray-200 flex flex-col items-center justify-start pt-32 px-6">

      {/* Gradient Animated Heading */}
      {mounted && (
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold mb-16 text-center relative inline-block animated-gradient-heading"
        >
          Contact Me
          <span className="glow-underline"></span>
        </motion.h1>
      )}

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8">

        {/* Form Card */}
        {mounted && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#1f2937] p-6 rounded-xl shadow-lg flex flex-col gap-4 border border-transparent hover:border-green-400 hover:shadow-[0_0_20px_#22c55e] transition-all duration-500"
          >
            <h2 className="text-2xl font-bold text-green-400">Let's work together</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="p-2 rounded-lg bg-[#374151] border border-[#4b5563] focus:border-green-400 outline-none text-gray-200 text-sm"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="p-2 rounded-lg bg-[#374151] border border-[#4b5563] focus:border-green-400 outline-none text-gray-200 text-sm"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-2 rounded-lg bg-[#374151] border border-[#4b5563] focus:border-green-400 outline-none text-gray-200 text-sm"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="p-2 rounded-lg bg-[#374151] border border-[#4b5563] focus:border-green-400 outline-none text-gray-200 text-sm"
                />
              </div>
              <textarea
                name="message"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleChange}
                required
                className="p-2 rounded-lg bg-[#374151] border border-[#4b5563] focus:border-green-400 outline-none text-gray-200 resize-none h-28 text-sm"
              />
              <button
                type="submit"
                className="p-3 bg-white text-[#111827] font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300 text-base"
              >
                Send Message
              </button>
              {status && <p className="text-center mt-1 text-green-400 text-sm">{status}</p>}
            </form>
          </motion.div>
        )}

        {/* Contact Info Card */}
        {mounted && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#1f2937] p-6 rounded-xl shadow-lg flex flex-col gap-4 border border-transparent hover:border-green-400 hover:shadow-[0_0_20px_#22c55e] transition-all duration-500"
          >
            <h2 className="text-2xl font-bold text-green-400">Get in Touch</h2>
            <p className="text-gray-300 text-sm">
              Have questions or want to discuss a project? Feel free to reach out using any of the following methods.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 p-3 bg-[#374151] rounded-lg border border-[#4b5563] hover:border-green-400 transition-all">
                <FaPhone className="text-green-400 text-xl" />
                <span className="text-gray-200 text-sm">03454743847</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#374151] rounded-lg border border-[#4b5563] hover:border-green-400 transition-all">
                <FaEnvelope className="text-green-400 text-xl" />
                <span className="text-gray-200 text-sm">gulfamafzal84@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#374151] rounded-lg border border-[#4b5563] hover:border-green-400 transition-all">
                <FaMapMarkerAlt className="text-green-400 text-xl" />
                <span className="text-gray-200 text-sm">Mianwali, Pakistan</span>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* Gradient & Glow Styles */}
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
