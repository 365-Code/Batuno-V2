/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
    images: {
        remotePatterns: [
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
