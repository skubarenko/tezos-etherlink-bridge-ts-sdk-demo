import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from './components/Header';
import { config } from '@/config';
import { AppContextProvider, EtherlinkAccountProvider, TezosAccountProvider } from '@/hooks';
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
      <body className={`${inter.className} bg-white dark:bg-slate-900 max-w-screen-2xl m-auto`}>
        <AppContextProvider>
          <EtherlinkAccountProvider>
            <TezosAccountProvider>
              <>
                <Header />
                {children}
              </>
            </TezosAccountProvider>
          </EtherlinkAccountProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
