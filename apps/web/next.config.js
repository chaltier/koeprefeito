/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@koeprefeito/shared", "@koeprefeito/ui"],
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["koeprefeito-dev.s3.amazonaws.com"],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
}

module.exports = nextConfig