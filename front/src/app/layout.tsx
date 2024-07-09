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

        <link href="/splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/splashscreens/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />

        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Everstamp" />
        <meta property="og:description" content="감정 일기를 적고 습관을 실천하세요. 당신의 긍정적 변화와 성장을 응원합니다. :)" />
        <meta property="og:image" content="https://i.ibb.co/WfHNc58/shareImg.png" />
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
