import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js badge so local previews look like the real site.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
