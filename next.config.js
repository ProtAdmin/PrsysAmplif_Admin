/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 静的エクスポートを有効化
  images: {
    unoptimized: true, // S3ではnext/imageが使えないため
  },
  trailingSlash: true, // 各ページのURLの末尾に `/` を追加
};

module.exports = nextConfig;
