/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  
  // Image configuration
  images: {
    domains: ['placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' ws: wss:",
              "media-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=(self)',
              'microphone=(self)',
              'geolocation=()',
              'interest-cohort=()',
              'payment=()',
              'usb=()'
            ].join(', ')
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        ]
      }
    ]
  },

  // URL rewrites for security (hide .php extensions and direct access)
  async rewrites() {
    return [
      // Rewrite clean URLs to actual files
      {
        source: '/terms',
        destination: '/terms-conditions'
      },
      {
        source: '/privacy',
        destination: '/privacy-policy'
      },
      {
        source: '/terminated',
        destination: '/user-terminated'
      },
      {
        source: '/suspended',
        destination: '/user-suspended'
      },
      {
        source: '/maintenance',
        destination: '/maintenance-mode'
      }
    ]
  },

  // Redirect patterns for security
  async redirects() {
    return [
      // Block direct access to sensitive paths
      {
        source: '/api/internal/:path*',
        destination: '/404',
        permanent: false
      },
      {
        source: '/.env:path*',
        destination: '/404',
        permanent: false
      },
      {
        source: '/config:path*',
        destination: '/404',
        permanent: false
      }
    ]
  },

  // Webpack configuration for additional security
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      config.optimization.minimize = true
    }

    // Add anti-tampering measures
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },
}

module.exports = nextConfig