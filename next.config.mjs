/** @type {import('next').NextConfig} */
import "dotenv/config";

const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
  }
};

export default nextConfig;
