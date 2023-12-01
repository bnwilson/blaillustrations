/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        loader: 'gray-matter-loader',
      },
      {

        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
  
      }
    )
    return cfg;
  },
  async rewrites() {
    return {
      fallback: [{source: "/:path*", destination: "/_404/:path*"}]
    }
  }
}

module.exports = nextConfig
