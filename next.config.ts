import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          buffer: require.resolve("buffer/"),
        },
      },
    };
  },
};

export default nextConfig;
