/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable Next.js image optimization for remote images from Hygraph / Graphassets
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-eu-west-2.hygraph.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.hygraph.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'eu-west-2.graphassets.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
