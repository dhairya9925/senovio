import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://media.senovio.in";
const r2PublicHost = new URL(r2PublicUrl).hostname;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: r2PublicHost,
      },
    ],
  },
};

export default withPayload(nextConfig);
