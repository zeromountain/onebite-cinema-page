/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.themoviedb.org",
      },
    ],
  },
};

export default nextConfig;
