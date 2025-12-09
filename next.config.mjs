/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uuwtvcdjaewnbdypkhad.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'minionsart.github.io', 
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;