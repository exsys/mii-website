import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AosProvider from "@/providers/aos-provider";
import { MiiCharacterProvider } from "@/providers/character-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mii on Solana",
  description: "Welcome to Mii on Solana. A dynamic web experience that brings the iconic Mii maker from the Wii gaming console to the Solana blockchain platform. Dive into nostalgia as you craft your own personalized Mii character, just like the ones you remember from Wii games.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <AosProvider>
        <MiiCharacterProvider>
          <body className={inter.className}>
            {children}
          </body>
        </MiiCharacterProvider>
      </AosProvider>
    </html>
  );
}
