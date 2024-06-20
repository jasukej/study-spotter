/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "avatars.githubusercontent.com",
              port: '', 
              pathname: '/u/**',
            },
            {
              protocol: "https",
              hostname: "lh3.googleusercontent.com",
              port: '', 
              pathname: '/a/**',
            },
            {
              protocol: "https",
              hostname: "res.cloudinary.com",
              port: '', 
            }
          ],
    },
    experimental: {
      serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
    webpack: (config) => {
      // See https://webpack.js.org/configuration/resolve/#resolvealias
      config.externals.push({
        sharp: 'commonjs sharp'
      });
      
      return config;
    },
};

export default nextConfig;
