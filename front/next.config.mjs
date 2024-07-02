/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['everstamp.s3.ap-northeast-2.amazonaws.com']
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
