'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

import type { App } from '@/core/app';

const loadApp = async (): Promise<App | null> => {
  try {
    if (typeof window === 'undefined')
      return null;

    const appModule = await import('@/core/app');
    const app = new appModule.App();
    await app.start();

    return app;
  }
  catch {
    return null;
  }
};

const AppContext = createContext<App | null>(null);

export const AppContextProvider = (props: { children: ReactNode }) => {
  const [currentValue, setCurrentValue] = useState<App | null>(null);

  useEffect(
    () => {
      loadApp().then(setCurrentValue);
    },
    []
  );

  return <AppContext.Provider value={currentValue}>
    {props.children}
  </AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
