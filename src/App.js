import awsExports from "./aws-exports";
import { Amplify } from "aws-amplify";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useState, useEffect } from "react";

Amplify.configure({ ...awsExports, ssr: true });

const AdminDashboard = () => <h2>管理者画面</h2>;
const DevDashboard = () => <h2>開発者画面</h2>;
const UserDashboard = () => <h2>一般ユーザー画面</h2>;

// ✅ Cognito に手動リダイレクトする関数
async function manualRedirectToCognito() {
  const cognitoLoginUrl =
    "https://ap-northeast-1h2ira36fy.auth.ap-northeast-1.amazoncognito.com/login"
    + "?client_id=128mcrh4ftsd1onp7q9vomaolp"
    + "&response_type=token"
    + "&scope=openid+profile+email"
    + "&redirect_uri=https://d1xj20n18wdq9y.cloudfront.net";

  console.log("🔄 Redirecting manually to Cognito:", cognitoLoginUrl);
  window.location.href = cognitoLoginUrl;
}

// ✅ IDトークンを解析する関数
function parseIdToken(idToken) {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid ID Token format");
    }
    return JSON.parse(atob(parts[1])); // デコード
  } catch (error) {
    console.error("❌ Failed to parse ID Token:", error);
    return null;
  }
}

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);  // ✅ 追加：リダイレクト中フラグ

  async function fetchUserInfo() {
    try {
      console.log("🔍 Fetching user info...");
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      let idTokenValue = hashParams.get("id_token");

      if (idTokenValue) {
        console.log("✅ ID Token from URL:", idTokenValue);
        window.history.replaceState({}, document.title, "/");
      } else {
        try {
          console.log("🔍 Checking getCurrentUser()...");
          const user = await getCurrentUser();
          idTokenValue = user?.signInUserSession?.idToken?.jwtToken;
          console.log("✅ ID Token from getCurrentUser():", idTokenValue);
        } catch {
          console.warn("⚠️ No authenticated user found. Redirecting to Cognito...");
          setRedirecting(true); // ✅ 追加: リダイレクト中フラグを設定
          manualRedirectToCognito();
          return;
        }
      }

      if (!idTokenValue) {
        console.warn("❌ No ID Token found. Redirecting to Cognito...");
        setRedirecting(true);
        manualRedirectToCognito();
        return;
      }

      const payload = parseIdToken(idTokenValue);
      if (!payload) throw new Error("❌ Failed to parse ID token payload");

      console.log("✅ User Token Payload:", payload);

      const groups = payload["cognito:groups"] || [];
      console.log("✅ User Groups:", groups);

      setUserInfo({
        username: payload["cognito:username"],
        groups: groups,
      });
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      setRedirecting(true);
      manualRedirectToCognito();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  function renderDashboard() {
    console.log("🟡 Checking user groups for dashboard rendering:", userInfo?.groups);
    
    if (!userInfo) {
      console.log("🚫 userInfo is null");
      return null; // ✅ 変更：「アクセス権がありません」を表示しない
    }

    if (userInfo.groups.includes("Proto-Admin-Group")) {
      return <AdminDashboard />;
    } else if (userInfo.groups.includes("Proto-Dev-Group")) {
      return <DevDashboard />;
    } else if (userInfo.groups.includes("Proto-User-Group")) {
      return <UserDashboard />;
    } else {
      console.log("🚫 No matching groups found:", userInfo.groups);
      return null;
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      console.log("✅ User signed out successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Sign out failed:", error);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading || redirecting ? (  // ✅ 変更：リダイレクト中は何も表示しない
        <h2>🔄 読み込み中...</h2>
      ) : userInfo ? (
        <>
          <h1>ようこそ, {userInfo.username} さん</h1>
          {renderDashboard()}
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
