import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ship the OG fonts with every serverless function that renders share cards
  outputFileTracingIncludes: {
    "/**": ["./src/lib/og/*.ttf"],
  },
};

export default nextConfig;
