export async function exchangeCodeForToken(code) {
  const clientId = "YOUR_CLIENT_ID";  // CognitoのアプリクライアントID
  const clientSecret = "YOUR_CLIENT_SECRET"; // クライアントシークレット（設定していない場合は不要）
  const redirectUri = "https://d1xj20n18wdq9y.cloudfront.net"; // CognitoのリダイレクトURI
  const region = "ap-northeast-1"; // Cognitoのリージョン
  const tokenEndpoint = `https://${region}h2ira36fy.auth.${region}.amazoncognito.com/oauth2/token`;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // クライアントシークレットがない場合は不要
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Token Response:", data);
    return data.id_token; // IDトークンを返す
  } catch (error) {
    console.error("❌ Error exchanging code for token:", error);
    return null;
  }
}
