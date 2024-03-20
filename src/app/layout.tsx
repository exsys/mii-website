import type { Metadata, Viewport } from "next";
import "./globals.css";
import AosProvider from "@/providers/aos-provider";
import { MiiCharacterProvider } from "@/providers/character-provider";
import localFont from 'next/font/local';

const omnesPro = localFont({
  src: [
    {
      path: "../assets/fonts/OmnesThin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../assets/fonts/OmnesExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../assets/fonts/OmnesLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesLightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/OmnesRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/OmnesMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesMediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/OmnesSemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesSemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/OmnesBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../assets/fonts/OmnesBlack.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmnesBlack.ttf",
      weight: "800",
      style: "italic",
    },
  ],
});

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
          <body className={omnesPro.className}>
            {children}
          </body>
        </MiiCharacterProvider>
      </AosProvider>
    </html>
  );
}
