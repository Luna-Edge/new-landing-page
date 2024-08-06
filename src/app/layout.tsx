import type { Metadata } from "next";

import "./globals.scss";
import "../styles/fonts/LufgaFont.css";

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
