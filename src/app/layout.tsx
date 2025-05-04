import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Netspire | Modern Web Agency',
  description: 'Crafting innovative digital experiences that transform brands',
  icons: {
    icon: [],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-netspire-black">
          {children}
        </main>
      </body>
    </html>
  );
} 