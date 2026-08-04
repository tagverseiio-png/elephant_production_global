import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'elephantproductionapi.t4gverse.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
  async rewrites() {
    // Get the base backend URL (removing the /api suffix if present)
    const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const backendHost = backendApiUrl.replace(/\/api\/?$/, '');
    
    return [
      {
        // Proxy all media requests to the backend
        source: '/api/media/:path*',
        destination: `${backendHost}/api/media/:path*`,
      },
    ];
  },
};

export default nextConfig;
