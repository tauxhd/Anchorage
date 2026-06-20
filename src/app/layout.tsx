import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Anchorage Business & Transport Services",
  description:
    "Reliable Solutions in Transport, Leasing, Waste Removal and Business Support. Serving Port Moresby, Papua New Guinea.",
  keywords:
    "transport, vehicle leasing, waste removal, PMV, business advisory, Papua New Guinea, NCD",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
