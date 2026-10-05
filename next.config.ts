import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site deploys to GitHub Pages (see .github/workflows/deploy.yml).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
