/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 画像最適化を無効化
  },
  trailingSlash: true, // 各ページのURLの末尾に `/` を追加
};

module.exports = nextConfig;
