/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable detailed logging in production for debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Ensure API routes are properly handled
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig