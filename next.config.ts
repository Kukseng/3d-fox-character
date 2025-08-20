import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**', // match all paths
      },
    ],
  },

};

export default nextConfig;
