import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'wallpapers.com',
      'images.pexels.com',
      'cdn.pixabay.com',
      'www.wallpaperflare.com',
      'cdn.wallpapersafari.com',
      'www.gov.il',
      'www.rimi.org'
    ],
  }
};

export default nextConfig;
