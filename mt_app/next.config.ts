import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // Allow all external images for development (remove in production)
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  
  // Experimental optimizations
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: [
      'lucide-react',
      '@mui/material',
      '@prisma/client',
      // Add other heavy packages you're using
    ],
    // Enable CSS optimization
    optimizeCss: true,
    // Use Turbopack for faster dev builds (Next.js 13+)
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Only enable polling in Docker environments or when explicitly needed
    if (dev && process.env.DOCKER_ENV) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    // Production optimizations
    if (!dev && !isServer) {
      // Optimize chunk splitting
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Create separate chunks for vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // Separate chunk for common code
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 5,
          },
          // Separate chunk for Prisma (often large)
          prisma: {
            test: /[\\/]node_modules[\\/]@prisma[\\/]/,
            name: 'prisma',
            chunks: 'all',
            priority: 20,
          },
        },
      };
    }

    return config;
  },
  
  // Output configuration
  output: 'standalone',
  
  // Compiler options for better performance
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable gzip compression
  compress: true,
  
};

export default nextConfig;