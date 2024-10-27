/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.files.bbci.co.uk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.funradio.sk',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;