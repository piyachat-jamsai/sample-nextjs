/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.moviefone.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
