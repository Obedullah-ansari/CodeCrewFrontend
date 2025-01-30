import type { NextConfig } from "next";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.pexels.com",
      "newhuboa-wwokpxse.b4a.run",
      "assets.aceternity.com",
      "images.unsplash.com",
      "img.freepik.com",
      "localhost",
      "res.cloudinary.com",
      "code-crew-backend.vercel.app"
    ],
  },
  webpack: (config, { isServer }) => {
    // Add Monaco Webpack Plugin for client-side only
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ["javascript", "css", "html"], // Add other languages as needed
          filename: "static/[name].worker.js",
        })
      );
    }

    return config;
  },
};

export default nextConfig;
