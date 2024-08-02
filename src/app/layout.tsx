import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "./styles/fonts/LufgaFont.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUNA EDGE",
  description: "Luna Edge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
