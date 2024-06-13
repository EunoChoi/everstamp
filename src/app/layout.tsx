import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import StyledComponentsRegistry from "../../lib/registry";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EverStamp",
  description: "Grow Every Day",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
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
      <StyledComponentsRegistry>
        <body className={pretendard.className}>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
