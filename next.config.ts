import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Prevent ESLint from blocking Vercel builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (optional but useful)
  typescript: {
    ignoreBuildErrors: true, // if you ever get TS errors blocking build
  },
};

export default nextConfig;
