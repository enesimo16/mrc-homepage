import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  allowedDevOrigins: ["192.168.1.102", "192.168.1.102:3001", "localhost:3001"],
};

export default nextConfig;
