import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/predict',
        destination: 'https://water-quality-test-wmju.onrender.com/predict',
      },
    ];
  },
};

export default nextConfig;
