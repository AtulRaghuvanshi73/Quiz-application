import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display, Caveat_Brush } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const caveatBrush = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat-brush",
});

export const metadata: Metadata = {
  title: "Test Your Knowledge - Quiz App",
  description: "Interactive quiz to test your knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} ${caveatBrush.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}