/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Exclude backend folder from TypeScript compilation
  typescript: {
    ignoreBuildErrors: false,
  },
  // Exclude backend files from build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
  // Exclude backend directory from compilation
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./backend/**/*'],
    },
  },
}

module.exports = nextConfig
