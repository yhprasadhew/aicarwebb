/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "content-security-policy",
            value: "frame-src 'self' https://roadsidecoder.created.app;"
          }
        ]
      }
    ];
  }
  /* config options here */
};

export default nextConfig;
