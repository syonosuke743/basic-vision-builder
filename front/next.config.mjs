/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXTAUTH_NGINX_URL: process.env.NEXTAUTH_NGINX_URL,
  },
};

export default nextConfig;
