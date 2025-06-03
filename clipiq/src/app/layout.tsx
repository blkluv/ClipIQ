import {ClerkProvider} from '@clerk/nextjs'
import type { Metadata } from "next";
import "./globals.css";
import {Manrope} from 'next/font/google'
import { ThemeProvider } from '@/components/theme';
const manrope = Manrope({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Video Sharing Platform",
  description: "Share AI Powered Videos With Your Friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.className} bg-[#171717]`}
      >
      <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
          {children}
      
    </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}