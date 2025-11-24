// pages/CognitoCreate.tsx
import React, { useState } from "react";
import Layout from "../components/Layout";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

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

      setMsg(`ユーザーを作成しました（sub=${json.attributes.sub}）`);

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
      {/* ← ここから shadcn デザイン */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-sky-200 via-purple-100 to-pink-200 px-4 py-10">
        <div className="w-full max-w-xl">
          {/* エラー */}
          {err && (
            <div className="mb-4">
              <Alert variant="destructive" className="shadow-md">
                <AlertTitle>エラー</AlertTitle>
                <AlertDescription>{err}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* 成功メッセージ */}
          {msg && !err && (
            <div className="mb-2 flex justify-end">
              <Alert className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 shadow-md">
                <AlertTitle className="text-xs font-semibold">
                  Success!
                </AlertTitle>
                <AlertDescription className="text-xs">{msg}</AlertDescription>
              </Alert>
            </div>
          )}

          {/* メインのカード */}
          <Card className="w-full rounded-3xl border-0 bg-white/95 shadow-2xl backdrop-blur">
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Cognito ユーザー作成
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                社員のログイン用アカウントを作成します。
                <span className="ml-1">
                  <Badge variant="outline" className="text-[10px]">
                    管理者専用
                  </Badge>
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              {/* Username */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <span>Username</span>
                  <Badge variant="destructive" className="text-[10px]">
                    必須
                  </Badge>
                </Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="employee123"
                  className="h-10 rounded-xl"
                />
                <p className="text-xs text-slate-400">
                  一意なログインIDを設定してください。
                </p>
              </div>

              {/* email */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <span>email</span>
                  <Badge variant="destructive" className="text-[10px]">
                    必須
                  </Badge>
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="xxx@example.com"
                  className="h-10 rounded-xl"
                />
                <p className="text-xs text-slate-400">
                  招待メールの送信先となるアドレスです。
                </p>
              </div>

              {/* 初期パスワード */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <span>初期パスワード</span>
                  <Badge variant="outline" className="text-[10px]">
                    任意
                  </Badge>
                </Label>
                <Input
                  value={temporaryPassword}
                  onChange={(e) => setTemporaryPassword(e.target.value)}
                  placeholder="P@ssw0rd!"
                  className="h-10 rounded-xl"
                />
                <p className="text-xs text-slate-400">
                  未変更の場合はデフォルト値が使用されます。
                </p>
              </div>

              {/* 氏名 */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <span>氏名</span>
                  <Badge variant="outline" className="text-[10px]">
                    任意
                  </Badge>
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="山田 太郎"
                  className="h-10 rounded-xl"
                />
              </div>

              {/* UserID */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <span>custom:UserID（社員番号）</span>
                  <Badge variant="outline" className="text-[10px]">
                    任意
                  </Badge>
                </Label>
                <Input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="3217"
                  className="h-10 rounded-xl"
                />
                <p className="text-xs text-slate-400">
                  社員番号や社内IDなど、DynamoDB のキーとして利用する値を想定しています。
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between px-6 pb-5 pt-1">
              <p className="text-[11px] text-slate-400">
                ※ 初回ログイン時にパスワード変更が求められます。
              </p>
              <Button
                onClick={onCreate}
                disabled={loading}
                className="min-w-[130px] rounded-xl text-sm font-semibold"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    作成中…
                  </span>
                ) : (
                  "ユーザー作成"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CognitoUserCreateAdmin;
