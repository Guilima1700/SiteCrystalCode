import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 86400 },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.crystalcode.com.br" }],
        destination: "https://crystalcode.com.br/:path*",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "site-crystal-code.vercel.app" }],
        destination: "https://crystalcode.com.br/:path*",
        statusCode: 301,
      },
      // Only the official production host: localhost and previews remain usable.
      {
        source: "/:path*",
        has: [
          { type: "host", value: "crystalcode.com.br" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: "https://crystalcode.com.br/:path*",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
