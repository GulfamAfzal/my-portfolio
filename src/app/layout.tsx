import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import Chatbot from '@/components/Chatbot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: "Gulfam Afzal | Web & Cybersecurity Specialist",
  description: 'Portfolio of Gulfam Afzal — Computer Science student at Namal University specializing in Web Development and Cybersecurity.',
  openGraph: {
    title: 'Gulfam Afzal | Web & Cybersecurity Specialist',
    description: 'Portfolio of Gulfam Afzal — Computer Science student at Namal University, Mianwali, specializing in Web Development and Cybersecurity.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        {/* Global animated background container */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
          {/* Background blobs */}
          <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-400 opacity-15 rounded-full blur-3xl animate-blob1" />
          <div className="absolute top-2/3 right-1/4 w-52 h-52 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 opacity-10 rounded-full blur-3xl animate-blob2" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-purple-900/10 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.08),transparent_50%)]" />

          {/* Floating dots (white) */}
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
          <div className="animate-float-dot absolute top-24 left-24 w-3 h-3 bg-purple-500 rounded-full hidden md:block" style={{ animationDelay: '0.2s' }} />
          <div className="animate-float-dot absolute top-40 right-36 w-5 h-5 bg-blue-500 rounded-full hidden md:block" style={{ animationDelay: '0.5s' }} />
          <div className="animate-float-dot absolute bottom-36 left-1/4 w-2 h-2 bg-pink-500 rounded-full hidden md:block" style={{ animationDelay: '0.8s' }} />
        </div>
        
        {/* Main Content */}
        <div className="relative z-0">
          {children}
        </div>
        
        <Chatbot />
      </body>
    </html>
  );
}
