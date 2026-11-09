import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Let Cloudflare quick tunnels load dev-only resources such as hot reload.
  allowedDevOrigins: ["*.trycloudflare.com"],
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/#projects",
        permanent: true,
      },
      {
        source: "/en/projects",
        destination: "/#projects",
        permanent: true,
      },
      {
        source: "/vi/projects",
        destination: "/vi#projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
