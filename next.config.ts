import type { NextConfig } from "next";

const API_URL = process.env.API_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/student-portal/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
