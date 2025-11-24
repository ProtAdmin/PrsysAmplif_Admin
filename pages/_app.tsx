// pages/_app.tsx
import type { AppProps } from "next/app";

// ⭐ Tailwind 全体スタイル（必須）
import "../styles/global.css";

// あなたのレイアウト用CSS（任意）
import "../styles/Layout.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
