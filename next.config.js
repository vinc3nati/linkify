/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["robohash.org", "qpvnambnwbpdxbsoqekg.supabase.co"],
  },
};

module.exports = nextConfig;
