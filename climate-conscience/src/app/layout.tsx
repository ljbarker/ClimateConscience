import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarSignedOut from "./components/NavbarSignedOut";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Climate Conscience",
  description: "Berkeley AI Hackathon 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NavbarSignedOut />
      {children}
      </body>
    </html>
  );
}
