/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber', 'framer-motion']
  }
};

export default nextConfig;
