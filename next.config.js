/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 画像最適化を無効化
  },
  trailingSlash: true, // 各ページのURLの末尾に `/` を追加
  async rewrites() {
    return [
      {
        source: "/api/:path*",  
        destination: "https://your-nextjs-app-url.vercel.app/api/:path*", // APIのリクエストをNext.jsのサーバーへ転送
      },
    ];
  },
};

module.exports = nextConfig;
