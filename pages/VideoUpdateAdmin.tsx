// pages/VideoUpdateAdmin.tsx
import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";

/** ===== API エンドポイント =====
 * あなたの API Gateway に合わせて置き換え
 */
const API_INIT =
  "https://zfkx0od8w8.execute-api.ap-northeast-1.amazonaws.com/prod/Video-Ingest-Init";

const API_TRIGGER =
  "https://zfkx0od8w8.execute-api.ap-northeast-1.amazonaws.com/prod/video-input-DB";

// カテゴリ候補（UI 用）
const CATEGORY_OPTIONS = ["全ての動画", "共通", "セキュリティ", "未分類"];

// ========================
// 型定義
// ========================
interface InitResponse {
  presignedUrl: string;
  bucket: string;
  key: string;
  expiresIn: number;
}

// ========================
// メインコンポーネント
// ========================
export default function VideoUploadAdmin() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null); // ← 追加: 任意のjpg

  // --- UI 情報（現状アップロード処理には使わないが、画面に残す） ---
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("セキュリティ");
  const [allowUsers, setAllowUsers] = useState("*");
  const [tags, setTags] = useState("");
  const [required, setRequired] = useState(true);
  const [publishAt, setPublishAt] = useState("");
  // ------------------------------------------------------------

  const [uploading, setUploading] = useState(false);
  const [wantImmediateIngest, setWantImmediateIngest] = useState(false);
  const [message, setMessage] = useState("");

  // 表示用のキー（ベース名）
  const keyBase = useMemo(() => {
    const baseFromVideo = videoFile ? videoFile.name.replace(/\.[^.]+$/, "") : "";
    const base = baseFromVideo || (title ? title : "new_video");
    return base;
  }, [videoFile, title]);

  const validate = (): string => {
    if (!videoFile) return "動画(.mp4) を選択してください";
    if (!videoFile.type.includes("mp4")) return "動画は .mp4 を選択してください";
    if (!title) return "タイトルを入力してください";

    const ONE_GB = 1024 * 1024 * 1024;
    if (videoFile.size > ONE_GB)
      return "動画サイズが大きすぎます（1GBまでに制限中）。";

    if (thumbFile && !/^image\/jpeg$/i.test(thumbFile.type)) {
      return "サムネイルは .jpg（image/jpeg）のみアップロード可能です";
    }
    return "";
  };

  // 汎用: Presigned URLを取得 → PUT まで
  const putWithInit = async (fileName: string, file: File): Promise<string> => {
    // 1) INIT で presigned URL 取得
    const initResp = await fetch(API_INIT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName,          // ここでS3キー名を指定
        fileType: file.type,
      }),
    });
    if (!initResp.ok) throw new Error(`INIT API 失敗 (${fileName})`);
    const { presignedUrl, key } = (await initResp.json()) as InitResponse;

    // 2) 取得した presigned URL へ PUT
    const putRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!putRes.ok) throw new Error(`S3 PUT 失敗 (${fileName}): ${putRes.status}`);

    return key; // 即時取り込みで使うキーを返す
  };

  const onSubmit = async () => {
    setMessage("");
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    try {
      setUploading(true);

      // mp4 をアップロード（キーはそのままファイル名を採用）
      const mp4Key = await putWithInit(videoFile!.name, videoFile!);

      // jpg が選択されていれば、"{ベース名}.jpg" に自動リネームしてアップロード
      if (thumbFile) {
        // 元拡張子に関わらず保存名は .jpg で揃える
        const jpgKey = `${keyBase}.jpg`;

        // S3 には保存名を渡すが、PUT の内容は選択したFileそのもの
        await putWithInit(jpgKey, thumbFile);
      }

      // 即時取り込み（任意・mp4キーのみ渡す）
      if (wantImmediateIngest && API_TRIGGER) {
        await fetch(API_TRIGGER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keys: [mp4Key] }),
        });
      }

      setMessage("✅ アップロード完了！（必要に応じて即時取り込みを実行）");
      // フォーム初期化
      setVideoFile(null);
      setThumbFile(null);
      setTitle("");
      setTags("");
      setAllowUsers("*");
      setRequired(true);
      setPublishAt("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(e);
      alert(`アップロード失敗: ${msg}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">動画アップロード（管理）</h2>

        <div className="space-y-4">
          {/* 動画ファイル */}
          <div>
            <label className="block font-medium mb-1">動画ファイル（.mp4）</label>
            <input
              type="file"
              accept="video/mp4"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
            {videoFile && (
              <p className="text-sm text-gray-600 mt-1">
                選択: {videoFile.name} / {(videoFile.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            )}
          </div>

          {/* サムネイル（任意） */}
          <div>
            <label className="block font-medium mb-1">サムネイル（.jpg / 任意）</label>
            <input
              type="file"
              accept="image/jpeg"
              onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
            />
            {thumbFile && (
              <p className="text-sm text-gray-600 mt-1">
                保存名: {keyBase}.jpg（選択: {thumbFile.name} / {(thumbFile.size / 1024).toFixed(1)} KB）
              </p>
            )}
          </div>

          {/* メタ情報フォーム（UI） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">タイトル</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="M1-メール誤送信"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">カテゴリ</label>
              <select
                className="w-full border rounded p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">視聴可能ユーザー</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={allowUsers}
                onChange={(e) => setAllowUsers(e.target.value)}
                placeholder="* もしくは 3217,3218"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">タグ（カンマ区切り）</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="必修, セキュリティ"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="req"
                type="checkbox"
                checked={required}
                onChange={(e) => setRequired(e.target.checked)}
              />
              <label htmlFor="req">必修</label>
            </div>

            <div>
              <label className="block font-medium mb-1">公開日時（任意）</label>
              <input
                className="w-full border rounded p-2"
                type="text"
                value={publishAt}
                onChange={(e) => setPublishAt(e.target.value)}
                placeholder="2025-11-06T09:00:00+09:00"
              />
            </div>
          </div>

          {/* 即時取り込み */}
          <div className="flex items-center gap-2">
            <input
              id="immediate"
              type="checkbox"
              checked={wantImmediateIngest}
              onChange={(e) => setWantImmediateIngest(e.target.checked)}
            />
            <label htmlFor="immediate">
              アップロード後に即時取り込みを実行する（任意）
            </label>
          </div>

          <div className="pt-2">
            <div className="text-sm text-gray-600 mb-2">
              S3格納キー（想定ベース名）: <code>{keyBase}</code>
            </div>
            <button
              onClick={onSubmit}
              disabled={uploading}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            >
              {uploading ? "アップロード中..." : "アップロード"}
            </button>
          </div>

          {message && <p className="text-green-700 mt-2">{message}</p>}
        </div>
      </div>
    </Layout>
  );
}
