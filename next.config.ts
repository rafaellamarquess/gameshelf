// next.config.ts
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["res.cloudinary.com"], 
  },

  // outras configs se tiver...
};

export default withPWA({
  dest: "public",
  disable: isDev,
  register: true,
  skipWaiting: true,
})(nextConfig);
