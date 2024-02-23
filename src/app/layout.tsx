import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from './components/Header';
import { config } from '@/config';
import {
  AppContextProvider,
  EtherlinkAccountProvider,
  TezosAccountProvider,
  LocalTokenTransfersStoreContextProvider
} from '@/hooks';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.app.name
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="dark">
      <body className={`${inter.className} max-w-screen-2xl m-auto
        bg-gray-50 dark:text-gray-100 dark:bg-slate-900`}
      >
        <AppContextProvider>
          <EtherlinkAccountProvider>
            <TezosAccountProvider>
              <LocalTokenTransfersStoreContextProvider>
                <>
                  <Header />
                  <div className="px-4">
                    {children}
                  </div>
                </>
              </LocalTokenTransfersStoreContextProvider>
            </TezosAccountProvider>
          </EtherlinkAccountProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
