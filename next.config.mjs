/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_SERVER_URL}`,
      `${process.env.NEXT_PUBLIC_S3_URL}`,
      `${process.env.NEXT_PUBLIC_S3_DOMAIN}`
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }
    return [
      {
        source: "/proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`
      }
    ];
  }
};
export default nextConfig;
