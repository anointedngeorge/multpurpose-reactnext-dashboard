/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'media.istockphoto.com',
          },
          {hostname: "img.daisyui.com"},
          {hostname: "127.0.0.1"},
          
          {hostname: "europeapi.sharashellacademy.com"},
          {hostname: "media.giphy.com"},
        ],
      },
  env: {
    APIBASEURl: process.env.APIBASEURl,
  },
};

export default nextConfig;
