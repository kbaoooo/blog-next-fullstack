/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: false,
      },
      transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
      webpack: (config) => {
        config.externals.push({
          'utf-8-validate': 'commonjs utf-8-validate',
          'bufferutil': 'commonjs bufferutil',
        });
        return config;
    },
    images: {
      domains: ['randomuser.me', 'picsum.photos'],
    },
};

export default nextConfig;
