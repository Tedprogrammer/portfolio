import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/#projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
