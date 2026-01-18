import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'], // Remove all console except error and warn
    },
  },
};

export default nextConfig;