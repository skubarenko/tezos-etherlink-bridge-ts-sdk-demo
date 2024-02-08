import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from './components/Header';
import { config } from '@/config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.appName
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <body className={`${inter.className} bg-white dark:bg-slate-900`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
