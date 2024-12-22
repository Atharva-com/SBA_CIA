import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { ReactNode } from 'react';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;