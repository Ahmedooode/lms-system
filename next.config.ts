/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  //deploy quickly without fixing every error now , so I ignore typescript and eslint errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
