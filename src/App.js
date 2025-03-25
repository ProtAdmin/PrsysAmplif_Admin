import awsExports from "./aws-exports";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

Amplify.configure({ ...awsExports, ssr: true });

// ✅ Cognito に手動リダイレクトする関数
function manualRedirectToCognito() {
  const cloudFrontDomain = window.location.origin;
  const cognitoLoginUrl =
    "https://ap-northeast-1h2ira36fy.auth.ap-northeast-1.amazoncognito.com/login"
    + "?client_id=128mcrh4ftsd1onp7q9vomaolp"
    + "&response_type=token"
    + "&scope=openid+profile+email"
    + `&redirect_uri=${encodeURIComponent(cloudFrontDomain)}`;

  window.location.href = cognitoLoginUrl;
}

// ✅ IDトークンを解析し、有効期限をチェックする関数
function parseIdToken(idToken) {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid ID Token format");
    }
    const decoded = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      console.warn("⚠️ ID Token expired. Re-authenticating...");
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("❌ Failed to parse ID Token:", error);
    return null;
  }
}

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserInfo = useCallback(async () => {
    try {
      let idTokenValue = localStorage.getItem("id_token");

      if (!idTokenValue) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        idTokenValue = hashParams.get("id_token");
        if (idTokenValue) {
          localStorage.setItem("id_token", idTokenValue);
          window.history.replaceState({}, document.title, "/");
        } else {
          manualRedirectToCognito();
          return;
        }
      }

      // ✅ IDトークンの有効期限を確認
      const payload = parseIdToken(idTokenValue);
      if (!payload) {
        localStorage.removeItem("id_token");
        manualRedirectToCognito();
        return;
      }

      const userID = payload["custom:UserID"];
      if (!userID) {
        router.push("/unauthorized");
        return;
      }

      localStorage.setItem("userId", userID);
      const groups = payload["cognito:groups"] || [];

      setUserInfo({
        username: payload["cognito:username"],
        userID: userID,
        groups: groups,
      });

      const cloudFrontDomain = window.location.origin;
      let destination = "/unauthorized";

      if (cloudFrontDomain === "https://d1xj20n18wdq9y.cloudfront.net") {
        if (groups.includes("Proto-Admin-Group")) {
          destination = "/admin";
        }
      } else if (cloudFrontDomain === "https://d2f1z4tvqap875.cloudfront.net") {
        if (groups.includes("Proto-Admin-Group") || groups.includes("Proto-User-Group")) {
          destination = "/education";
        }
      }

      router.push(destination);
    } catch (error) {
      console.error("❌ Error fetching user:", error);
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
      console.error("❌ Sign out failed:", error);
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
          <button onClick={handleSignOut} style={{ margin: "10px", padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px" }}>
            サインアウト
          </button>
        </>
      ) : null}
    </div>
  );
}