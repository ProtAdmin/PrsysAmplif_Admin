// pages/CognitoCreate.tsx
import React, { useState } from "react";
import Layout from "../components/Layout";

const API_CREATE_USER =
  "https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/Cognito-User-Create";

interface CreateUserRequest {
  Username: string;
  email: string;
  name?: string;
  userId?: string;
  temporaryPassword?: string;
}

interface CreateUserResponse {
  message: string;
  attributes: { sub: string };
  error?: string;
}

// ✅ JSX.Element を削除して React.FC に変更
const CognitoUserCreateAdmin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("P@ssw0rd!");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const onCreate = async (): Promise<void> => {
    setMsg("");
    setErr("");

    if (!username || !email) {
      setErr("Username と email は必須です。");
      return;
    }

    try {
      setLoading(true);

      const payload: CreateUserRequest = {
        Username: username,
        email,
        name: name || undefined,
        userId: userId || undefined,
        temporaryPassword: temporaryPassword || undefined,
      };

      const res = await fetch(API_CREATE_USER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json: CreateUserResponse = await res.json();

      if (!res.ok) throw new Error(json.error || "作成に失敗しました");

      setMsg(`✅ 作成完了: ${json.message}（sub=${json.attributes.sub}）`);

      // フォーム初期化
      setUsername("");
      setEmail("");
      setName("");
      setUserId("");
      setTemporaryPassword("P@ssw0rd!");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setErr(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl p-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Cognito ユーザー作成（管理）
        </h2>
        <p className="text-gray-600 mb-8 text-sm">
          Username と email は必須。その他の属性は任意です。
        </p>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="employee123"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="xxx@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">氏名（任意）</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="山田 太郎"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              custom:UserID（社員番号など）
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="3217"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">
              初期パスワード（任意）
            </label>
            <input
              type="text"
              value={temporaryPassword}
              onChange={(e) => setTemporaryPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="P@ssw0rd!"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={onCreate}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "作成中…" : "ユーザー作成"}
            </button>
          </div>

          {(msg || err) && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm mt-4 ${
                err
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
              }`}
            >
              {err || msg}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CognitoUserCreateAdmin;
