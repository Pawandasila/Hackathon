import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
  // Additional optimizations for Vercel deployment
  poweredByHeader: false,
  compress: true,
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
