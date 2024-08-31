/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'media.istockphoto.com',
          },
          {hostname: "img.daisyui.com"}
        ],
      },
};

export default nextConfig;
