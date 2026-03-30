import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BuildNG - Nigerian Construction Project Management",
  description:
    "The all-in-one platform transforming construction project management across Nigeria. Escrow payments, materials tracking, quality assurance, and more.",
  keywords: [
    "construction",
    "project management",
    "Nigeria",
    "escrow",
    "building",
    "contractor",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
