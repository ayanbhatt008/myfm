import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
            },
        ],
    },
    allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
