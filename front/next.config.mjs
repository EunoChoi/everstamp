/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa';

const dev = process.env.NODE_ENV === 'development'

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: dev ? true : false,
});

const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',  // Vercel Blob을 사용하는 경우
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
};

export default withPWA(nextConfig);