import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Configure for static HTML export to host on GitHub Pages
  output: 'export',
  // If you will host at https://<username>.github.io/<repo>/ set basePath to '/<repo>'
  // basePath: '/portfolio',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
