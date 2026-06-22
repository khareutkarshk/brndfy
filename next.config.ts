import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brndfy.com",
      },
    ],
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
