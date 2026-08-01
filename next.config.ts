import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Generates a static HTML build in an 'out' folder
  images: {
    unoptimized: true, // Required for GitHub Pages static hosting
  },
};

export default nextConfig;
