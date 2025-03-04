import type { AppProps } from "next/app";
import "../styles/Layout.css"; // グローバルCSSを適用

function MyApp({ Component, pageProps }: AppProps) { // ✅ 型を指定
  return <Component {...pageProps} />;
}

export default MyApp;
