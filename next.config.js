/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['randomuser.me', 'source.unsplash.com'],
  },
  // Fix for favicon error
  webpack(config) {
    return config;
  },
}

module.exports = nextConfig 