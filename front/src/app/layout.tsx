import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import StyledComponentsRegistry from "../../lib/registry";
import { SessionProvider } from "next-auth/react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EverStamp",
  description: "Grow Every Day",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  // interactiveWidget: 'resizes-content',
  themeColor: '#FFFFFF',
  // interactiveWidget: 'overlays-content'
}

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Everstamp" />
        <meta property="og:description" content="Grow Every Day" />
        <meta property="og:image" content="https://i.ibb.co/Z8rGMfW/shareImg.png" />
      </head>
      <SessionProvider>
        <StyledComponentsRegistry>
          <body className={pretendard.className}>
            {children}
          </body>
        </StyledComponentsRegistry>
      </SessionProvider>
    </html>
  );
}
