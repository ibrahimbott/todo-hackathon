/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // trailingSlash: true,
  images: {
    unoptimized: true
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV === 'development'
    if (isDev) {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8000/api/:path*',
        },
      ]
    }
    return []
  }
}

module.exports = nextConfig