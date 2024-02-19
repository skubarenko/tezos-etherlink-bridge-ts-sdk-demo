/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  /**
   * @param {import('webpack').Configuration} config 
   * @param {Parameters<import('next').NextConfig['webpack']>[1]} context 
   * @returns 
   */
  webpack: (config, context) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new context.webpack.IgnorePlugin({
        resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
      })
    );

    config.resolve = config.resolve || {};
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback.fs = false;

    return config;
  },
};

export default nextConfig;
