/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "github.com"],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
