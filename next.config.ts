import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Static HTML export
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'], // Remove all console except error and warn
    },
  },
};

export default nextConfig;