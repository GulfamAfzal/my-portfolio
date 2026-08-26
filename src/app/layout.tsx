import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Gulfam Afzal | Web & Cybersecurity Specialist",
  description: 'Portfolio of Gulfam Afzal — Computer Science student at Namal University specializing in Web Development and Cybersecurity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
