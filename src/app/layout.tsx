import './globals.css';
import { Inter, Montserrat } from 'next/font/google';

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
        {children}
      </body>
    </html>
  );
}
