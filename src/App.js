import awsExports from "./aws-exports";
import { Amplify } from "aws-amplify";
import { fetchAuthSession, signOut } from "@aws-amplify/auth"; // ✅ Amplify v6対応
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

Amplify.configure({ ...awsExports, ssr: true });

// ✅ 手動ログイン
function manualRedirectToCognito() {
  const cloudFrontDomain = window.location.origin;
  const cognitoLoginUrl =
    "https://ap-northeast-1h2ira36fy.auth.ap-northeast-1.amazoncognito.com/login" +
    "?client_id=128mcrh4ftsd1onp7q9vomaolp" +
    "&response_type=token" +
    "&scope=openid+profile+email" +
    `&redirect_uri=${encodeURIComponent(cloudFrontDomain)}`;

  window.location.href = cognitoLoginUrl;
}

// ✅ トークンの期限チェック
function isTokenExpired(token) {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp && decoded.exp < currentTime;
  } catch (e) {
    console.error("❌ トークンパース失敗:", e);
    return true;
  }
}

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserInfo = useCallback(async () => {
    try {
      let idToken = localStorage.getItem("id_token");

      if (!idToken) {
        // URLから取得
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        idToken = hashParams.get("id_token");
        if (idToken) {
          localStorage.setItem("id_token", idToken);
          window.history.replaceState({}, document.title, "/");
        } else {
          manualRedirectToCognito();
          return;
        }
      }

      // ✅ トークンの有効期限が切れていたら、リフレッシュ試行
      if (isTokenExpired(idToken)) {
        console.warn("⚠️ IDトークンの期限切れ。リフレッシュ試行中...");
        try {
          const session = await fetchAuthSession(); // 🔄 トークン自動リフレッシュ
          const refreshedToken = session.tokens?.idToken?.toString();

          if (!refreshedToken) {
            throw new Error("トークンリフレッシュ失敗");
          }

          idToken = refreshedToken;
          localStorage.setItem("id_token", idToken);
          console.log("🔄 トークンリフレッシュ成功");
        } catch (refreshError) {
          console.error("❌ トークンリフレッシュ失敗:", refreshError);
          localStorage.removeItem("id_token");
          manualRedirectToCognito();
          return;
        }
      }

      const [, payload] = idToken.split(".");
      const decoded = JSON.parse(atob(payload));

      const userID = decoded["custom:UserID"];
      if (!userID) {
        router.push("/unauthorized");
        return;
      }

      localStorage.setItem("userId", userID);
      const groups = decoded["cognito:groups"] || [];

      setUserInfo({
        username: decoded["cognito:username"],
        userID,
        groups,
      });

      // ✅ リダイレクトルール
      const cloudFrontDomain = window.location.origin;
      let destination = "/unauthorized";

      if (cloudFrontDomain === "https://d1xj20n18wdq9y.cloudfront.net") {
        if (groups.includes("Proto-Admin-Group")) {
          destination = "/admin";
        } else if (groups.includes("Proto-Junior-Group")){
          destination = "/Junior";
        } else if (groups.includes("Proto-Senior-Group")){
          destination = "/Senior";
        }
      } else if (cloudFrontDomain === "https://d2f1z4tvqap875.cloudfront.net") {
        if (
          groups.includes("Proto-Admin-Group") ||
          groups.includes("Proto-User-Group")
        ) {
          destination = "/education";
        }
      }

      router.push(destination);
    } catch (error) {
      console.error("❌ ユーザー情報の取得エラー:", error);
      manualRedirectToCognito();
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  async function handleSignOut() {
    try {
      await signOut();
      localStorage.removeItem("id_token");
      localStorage.removeItem("userId");
      router.push("/");
    } catch (error) {
      console.error("❌ サインアウト失敗:", error);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? (
        <h2>🔄 読み込み中...</h2>
      ) : userInfo ? (
        <>
          <h2>✅ ユーザー情報を確認中...</h2>
          <p>ユーザー名: {userInfo.username}</p>
          <p>ユーザーID: {userInfo.userID}</p>
          <p>グループ: {userInfo.groups.join(", ")}</p>
          <button
            onClick={handleSignOut}
            style={{
              margin: "10px",
              padding: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            サインアウト
          </button>
        </>
      ) : null}
    </div>
  );
}
