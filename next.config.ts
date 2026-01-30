import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "backendphotographywebapp.onrender.com",
    ],
  },
};

export default nextConfig;
