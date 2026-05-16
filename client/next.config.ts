import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  distDir: "build",
  async rewrites() {
    return [
      {
        source: "/express-api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
