/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig; 