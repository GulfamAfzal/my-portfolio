import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Gulfam&apos;s Portfolio",
  description: 'Web & Cybersecurity Specialist',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/skill' },
    { name: 'Projects', path: '/project' },
    { name: 'Work', path: '/work' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-200 m-0 p-0 overflow-hidden`}>
        {/* Navbar */}
        <header className="fixed w-full top-0 z-50 flex justify-between items-center px-8 sm:px-16 py-6 shadow-md bg-gray-800">
          <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 animate-pulse">
            Gulfam&apos;s Portfolio
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.path}
                className="relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group overflow-visible animate-fallDown"
                style={{ animationDelay: `${index * 0.15}s` }} // staggered delay
              >
                <span className="relative z-10 text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400">
                  {item.name}
                </span>
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                                bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 blur-md 
                                transition duration-500 z-0"></span>
              </Link>
            ))}
          </nav>
        </header>

        {/* Remove padding from main and hide scroll */}
        <main className="m-0 h-screen">{children}</main>
      </body>
    </html>
  );
}
