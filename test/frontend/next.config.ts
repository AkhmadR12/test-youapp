// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Semua request ke `/api/*` diarahkan ke backend
        destination: "http://localhost:3000/api/:path*", // Sesuaikan port backend
      },
    ];
  },
};

export default nextConfig;
