/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "./",
  webpack: (config) => {
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  }

};

module.exports = nextConfig;
