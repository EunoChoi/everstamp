/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
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