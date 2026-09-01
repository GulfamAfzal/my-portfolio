import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Simple in-memory rate limiter (Warning: resets on server restart or across serverless functions)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 5000; // 5 seconds

export async function POST(req: Request) {
  try {
    // Check API Key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set.');
      return NextResponse.json({ error: 'Assistant is temporarily unavailable. Please ask the site owner to configure the API key.' }, { status: 500 });
    }

    // Basic Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip);

    if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json({ error: 'You are sending messages too fast. Please wait a few seconds.' }, { status: 429 });
    }
    rateLimitMap.set(ip, now);

    // Parse the request body
    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    // Initialize Model
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash',
      systemInstruction: `You are the friendly portfolio assistant for Gulfam Afzal. 
Your goal is to answer questions about Gulfam's skills, professional journey, projects, and how to get in touch. 
Keep your responses concise (1-3 sentences) because this is a small chat widget. 
Do not use large markdown headers (like # or ##). 
Do not offer coding advice or unrelated AI assistance; stay strictly focused on Gulfam's portfolio.
Gulfam's contact: Mention they can use the "Let's Work Together" section or the Contact page on this site.
Skills: Next.js, React, Tailwind CSS, TypeScript, Python, C++, Cybersecurity, Networking, AI Automation.
Projects: ATS CV Reviewer, Network Device Monitor (NetPulse), Tailor Manager (Madinah Tailorshop), Keylogger, etc.
Journey: Software Engineering Intern at CPBM, Freelance Web Developer.`,
    });

    let formattedHistory: { role: string; parts: { text: string }[] }[] = [];
    if (history && Array.isArray(history)) {
      formattedHistory = history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));
      
      // Gemini strictly requires the history array to start with a 'user' message.
      // If our UI sends the initial 'assistant' greeting, we must slice it out.
      while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
        formattedHistory.shift();
      }
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Gemini API Error:', err);
    return NextResponse.json({ error: err.message || 'Sorry, I am having trouble connecting to my brain right now.' }, { status: 500 });
  }
}
