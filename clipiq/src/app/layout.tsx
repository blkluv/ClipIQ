export const dynamic = "force-dynamic";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import { ReactQueryProvider } from "@/lib/reactquery";
import { Toaster } from "sonner";
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClipIQ - Video Sharing Platform",
  description: "Share AI Powered Videos instantly with ClipIQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/images/logo.jpeg" />
          {/* Or use .png or .svg if you prefer */}
        </head>
        <body className={`${manrope.className} bg-gray-200 dark:bg-[#171717]  overflow-x-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              {children}
              <Toaster/>
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
