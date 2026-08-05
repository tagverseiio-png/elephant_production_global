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
    // Determine the backend URL. Vercel build might not have NEXT_PUBLIC_API_URL 
    // populated depending on the environment variable settings, so we fallback 
    // to the production URL instead of localhost to prevent Vercel proxy 404s.
    const defaultBackend = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:4000/api'
      : 'https://elephantproductionapi.t4gverse.com/api';
      
    const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || defaultBackend;
    const backendHost = backendApiUrl.replace(/\/api\/?$/, '');
    
    return [
      {
        // Proxy all media requests to the backend
        source: '/api/media/:path*',
        destination: `${backendHost}/api/media/:path*`,
      },
      {
        // Proxy upload requests directly to bypass Next.js API route body limits
        source: '/api/upload',
        destination: `${backendHost}/api/upload`,
      },
      {
        source: '/api/upload/multiple',
        destination: `${backendHost}/api/upload/multiple`,
      },
    ];
  },
};

export default nextConfig;
