"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm the portfolio assistant. Ask me about projects, skills, or how to get in touch." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setTimeout(() => widgetBtnRef.current?.focus(), 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: userText };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({ role: msg.role, content: msg.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.reply }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: error.message || "Sorry, I'm having trouble responding right now — please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Expanded Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed z-[100] bottom-[24px] right-[40px] max-sm:right-[12px] max-sm:left-[12px] w-[380px] max-sm:w-auto h-[560px] max-h-[calc(100vh-100px)] p-[4px] rounded-[24px] bg-gradient-to-br from-white to-[#a855f7] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(168,85,247,0.15)] flex flex-col origin-bottom-right box-border"
          >
            <div className="w-full h-full bg-gradient-to-b from-[#111111] to-[#141414] rounded-[20px] flex flex-col overflow-hidden box-border">
              {/* Header */}
              <div className="h-[68px] w-full shrink-0 bg-[rgba(255,255,255,0.03)] flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] box-border" style={{ padding: '0 20px' }}>
                <div className="flex items-center gap-[12px]">
                  <div className="w-[32px] h-[32px] rounded-lg overflow-hidden bg-black shrink-0 flex items-center justify-center">
                    <video src="/mascot.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center gap-[2px]">
                    <h3 className="text-white font-bold text-[15px] leading-none m-0">Portfolio Assistant</h3>
                    <p className="text-[#9ca3af] text-[12px] leading-none m-0">Ask me anything</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => widgetBtnRef.current?.focus(), 50);
                  }}
                  className="w-[32px] h-[32px] rounded-full bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.18)] flex items-center justify-center shrink-0 transition-colors ml-[12px] outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Close chat"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-[12px] box-border [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-[#0a0a0a] [&::-webkit-scrollbar-thumb]:bg-[#2a2a2a] [&::-webkit-scrollbar-thumb:hover]:bg-[#444444]" style={{ padding: '20px' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-[8px]'}`}>
                    {msg.role !== 'user' && (
                      <div className="w-[28px] h-[28px] rounded-full overflow-hidden bg-black shrink-0 flex items-center justify-center">
                        <video src="/mascot.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] text-[14px] leading-[1.5] ${msg.role === 'user'
                          ? 'bg-[rgba(168,85,247,0.18)] text-white rounded-[14px] rounded-br-[6px]'
                          : 'bg-[rgba(255,255,255,0.06)] text-[#e5e5e5] rounded-[14px] rounded-bl-[6px]'
                        }`}
                      style={{ padding: '10px 14px' }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start items-start gap-[8px]">
                    <div className="w-[28px] h-[28px] rounded-full overflow-hidden bg-black shrink-0 flex items-center justify-center">
                      <video src="/mascot.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-[78%] bg-[rgba(255,255,255,0.06)] rounded-[14px] rounded-bl-[6px] flex gap-[4px] items-center" style={{ padding: '14px' }}>
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-[6px] h-[6px] bg-[#e5e5e5] rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-[6px] h-[6px] bg-[#e5e5e5] rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-[6px] h-[6px] bg-[#e5e5e5] rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Row */}
              <div className="h-[72px] w-full shrink-0 border-t border-[rgba(255,255,255,0.1)] flex items-center gap-[10px] box-border" style={{ padding: '16px 20px' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 min-w-0 h-[40px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] focus:border-[#a855f7] focus:shadow-[0_0_8px_rgba(168,85,247,0.3)] rounded-[10px] placeholder:text-[#9ca3af] text-white text-[14px] outline-none transition-all box-border"
                  style={{ padding: '0 14px' }}
                  aria-label="Chat input"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-[40px] h-[40px] rounded-[10px] bg-gradient-to-b from-[#baff39] to-[#4de94c] flex items-center justify-center shrink-0 transition-transform disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-white/50 box-border"
                  aria-label="Send message"
                >
                  <Send size={18} className="text-black" style={{ transform: inputValue.trim() && !isLoading ? 'translateX(1px)' : 'none' }} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Widget */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            ref={widgetBtnRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-label="Open chat assistant"
            className="fixed z-[100] bottom-[24px] right-[40px] w-[90px] h-[90px] p-[4px] rounded-[16px] bg-gradient-to-br from-white to-[#a855f7] shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:scale-[1.06] transition-transform duration-200 outline-none focus-visible:ring-4 focus-visible:ring-[#a855f7]"
          >
            <div className="w-full h-full rounded-[12px] overflow-hidden bg-black relative pointer-events-none">
              <video
                src="/mascot.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
