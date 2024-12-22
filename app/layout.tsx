import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import DynamicBackground from "./utils/DynamicBackground";

import { Inter, Playfair_Display, DM_Sans } from 'next/font/google'
import Layout from "./components/layout";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans'
})

export const metadata: Metadata = {
  title: 'ArchStudio - Modern Architectural Solutions',
  description: 'Professional architectural services including interior design, landscape design, and home design.',
  keywords: ['architecture', 'interior design', 'landscape design', 'home design'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${dmSans.variable} antialiased`}
      >
        <ThemeProvider>
          <DynamicBackground>
            <div className="flex min-h-screen flex-col">
              <Layout>
                {children}
              </Layout>
            </div>
          </DynamicBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
