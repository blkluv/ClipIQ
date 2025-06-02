import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "ClipIQ",
  description: "instand record and share videos with AI features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-[#171717]`}
      >
        {children}
      </body>
    </html>
  );
}
