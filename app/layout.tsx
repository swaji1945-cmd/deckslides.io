import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./components/Cursor";
import SmoothScroll from "./components/SmoothScroll";
import Parallax from "./components/Parallax";

export const metadata: Metadata = {
  title: "Pitch Deck — Investor-ready pitch deck design",
  description:
    "Pitch Deck designs investor-ready pitch decks and high-impact presentations for founders, startups, and executives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <Parallax />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
