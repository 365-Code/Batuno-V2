/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
  images: 
  {
    remotePatterns: 
    [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  }
}
