import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
