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
    domains: ['everstamp.s3.ap-northeast-2.amazonaws.com']
  },
  compiler: {
    styledComponents: true,
  },
};

export default withPWA(nextConfig);