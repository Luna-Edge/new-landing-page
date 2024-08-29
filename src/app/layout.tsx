import type { Metadata } from "next";

import "./globals.scss";
import "../styles/fonts/LufgaFont.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

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
