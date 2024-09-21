/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vtttlvlxaekgkwrkhwhx.supabase.co",
        //  pathname: "/storage/v1/object/public/user_image/user_image/**", // Match the right path
      },
    ],
  },
};

export default nextConfig;
