/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        loader: 'gray-matter-loader',
      }
    )
    return cfg;
  }
}

module.exports = nextConfig
