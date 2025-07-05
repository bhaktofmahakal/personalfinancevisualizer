/** @type {import('next').NextConfig} */
const nextConfig = {
  
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig