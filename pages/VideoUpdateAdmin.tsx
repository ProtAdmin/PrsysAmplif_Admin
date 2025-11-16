// pages/VideoUpdateAdmin.tsx
import React, { useMemo, useRef, useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";

const API_INIT =
  "https://zfkx0od8w8.execute-api.ap-northeast-1.amazonaws.com/prod/Video-Ingest-Init";
const API_TRIGGER =
  "https://zfkx0od8w8.execute-api.ap-northeast-1.amazonaws.com/prod/video-input-DB";

interface InitResponse {
  presignedUrl: string;
  bucket: string;
  key: string;
  expiresIn: number;
}

const CATEGORY_OPTIONS = ["全ての動画", "共通", "セキュリティ", "未分類"];

export default function VideoUploadAdmin() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);

  // UI メタ
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("セキュリティ");
  const [allowUsers, setAllowUsers] = useState("*");
  const [tags, setTags] = useState("");
  const [required, setRequired] = useState(true);
  const [publishAt, setPublishAt] = useState("");

  // 状態系
  const [uploading, setUploading] = useState(false);
  const [progressVideo, setProgressVideo] = useState(0);
  const [progressThumb, setProgressThumb] = useState(0);
  const [wantImmediateIngest, setWantImmediateIngest] = useState(false);
  const [message, setMessage] = useState("");
  const dzRef = useRef<HTMLDivElement>(null);

  // 表示用のキー（ベース名）
  const keyBase = useMemo(() => {
    const baseFromVideo = videoFile ? videoFile.name.replace(/\.[^.]+$/, "") : "";
    return baseFromVideo || (title ? title : "new_video");
  }, [videoFile, title]);

  const humanMB = (n: number): string => (n / (1024 * 1024)).toFixed(1);

  // D&D（動画 or jpg を判定）
  const onDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;

    for (const f of files) {
      if (f.type.includes("mp4")) setVideoFile(f);
      else if (/^image\/jpeg$/i.test(f.type)) setThumbFile(f);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validate = (): string => {
    if (!videoFile) return "動画(.mp4) を選択してください";
    if (!videoFile.type.includes("mp4")) return "動画は .mp4 を選択してください";
    if (!title) return "タイトルを入力してください";
    const ONE_GB = 1024 * 1024 * 1024;
    if (videoFile.size > ONE_GB) return "動画サイズが大きすぎます（1GBまでに制限中）。";
    if (thumbFile && !/^image\/jpeg$/i.test(thumbFile.type)) {
      return "サムネイルは .jpg（image/jpeg）のみアップロード可能です";
    }
    return "";
  };

  // 署名URLでPUT（進捗を反映）
  const putWithInit = async (
    fileName: string,
    file: File,
    onProgress?: (pct: number) => void
  ): Promise<string> => {
    const initResp = await fetch(API_INIT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName,
        fileType: file.type,
      }),
    });
    if (!initResp.ok) throw new Error(`INIT API 失敗 (${fileName})`);
    const { presignedUrl, key } = (await initResp.json()) as InitResponse;

    // fetch での正確なプログレスは難しいので xhr を併用
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", presignedUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.upload.onprogress = (evt: ProgressEvent) => {
        if (!onProgress || !evt.lengthComputable) return;
        const pct = Math.round((evt.loaded / evt.total) * 100);
        onProgress(pct);
      };
      xhr.onload = () =>
        xhr.status >= 200 && xhr.status < 300
          ? resolve()
          : reject(new Error(`S3 PUT 失敗 (${fileName}): ${xhr.status}`));
      xhr.onerror = () => reject(new Error(`S3 PUT ネットワーク失敗 (${fileName})`));
      xhr.send(file);
    });

    onProgress?.(100);
    return key;
  };

  const onSubmit = async (): Promise<void> => {
    setMessage("");
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    try {
      setUploading(true);
      setProgressVideo(0);
      setProgressThumb(0);

      // mp4
      const mp4Key = await putWithInit(videoFile!.name, videoFile!, setProgressVideo);

      // jpg（任意）
      if (thumbFile) {
        const jpgKey = `${keyBase}.jpg`;
        await putWithInit(jpgKey, thumbFile, setProgressThumb);
      }

      // 即時取り込み
      if (wantImmediateIngest) {
        const resp = await fetch(API_TRIGGER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keys: [mp4Key] }),
        });
        if (!resp.ok) throw new Error("取り込みAPI失敗");
      }

      setMessage("✅ アップロード完了！（必要に応じて即時取り込みを実行）");

      // Reset
      setVideoFile(null);
      setThumbFile(null);
      setTitle("");
      setTags("");
      setAllowUsers("*");
      setRequired(true);
      setPublishAt("");
      setProgressVideo(0);
      setProgressThumb(0);
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
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white rounded-xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">動画アップロード（管理）</h1>
        <p className="opacity-90 mt-1">
          MP4 と任意の JPG をアップロード。必要なら即時取り込みで S3→移動 &amp; DynamoDB 登録。
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 左：アップロードゾーン */}
        <section className="xl:col-span-2 space-y-6">
          <div
            ref={dzRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="rounded-xl border border-dashed border-slate-300 bg-white shadow-sm hover:shadow-md transition p-6"
          >
            <h2 className="text-lg font-semibold">動画ファイル（.mp4）</h2>
            <p className="text-sm text-slate-500 mb-3">
              ドラッグ＆ドロップまたは下のボタンから選択（最大 1GB / MP4 のみ）
            </p>
            <label className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md cursor-pointer">
              ファイルを選択
              <input
                type="file"
                accept="video/mp4"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
            </label>

            {videoFile && (
              <div className="mt-4 rounded-lg border bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{videoFile.name}</div>
                    <div className="text-xs text-slate-500">{humanMB(videoFile.size)} MB</div>
                  </div>
                  <span className="text-xs rounded-full px-2 py-1 bg-slate-200">.mp4</span>
                </div>
                {uploading && (
                  <div className="mt-3">
                    <div className="h-2 w-full bg-slate-200 rounded">
                      <div
                        className="h-2 bg-indigo-600 rounded transition-all"
                        style={{ width: `${progressVideo}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      アップロード中… {progressVideo}%
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* サムネイル */}
          <div className="rounded-xl border bg-white shadow-sm hover:shadow-md transition p-6">
            <h2 className="text-lg font-semibold">サムネイル（.jpg / 任意）</h2>
            <p className="text-sm text-slate-500 mb-3">
              保存名は自動で <code className="font-mono">{keyBase}.jpg</code> になります。
            </p>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-black text-white text-sm font-medium rounded-md cursor-pointer">
                JPG を選択
                <input
                  type="file"
                  accept="image/jpeg"
                  className="hidden"
                  onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
                />
              </label>
              {thumbFile && (
                <span className="text-xs text-slate-600">
                  {thumbFile.name} / {humanMB(thumbFile.size)} MB
                </span>
              )}
            </div>

            {thumbFile && (
              <div className="mt-4 flex items-center gap-4">
                <Image
                  src={URL.createObjectURL(thumbFile)}
                  alt="thumb"
                  width={96}
                  height={96}
                  className="rounded-lg border object-cover"
                />
                {uploading && (
                  <div className="flex-1">
                    <div className="h-2 w-full bg-slate-200 rounded">
                      <div
                        className="h-2 bg-slate-800 rounded transition-all"
                        style={{ width: `${progressThumb}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      サムネイル送信… {progressThumb}%
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 右：詳細入力 */}
        <aside className="space-y-6">
          <div className="rounded-xl border bg-white shadow-sm hover:shadow-md transition p-6">
            <h3 className="text-base font-semibold mb-4">動画の詳細</h3>
            <label className="block text-sm font-medium mb-1">タイトル</label>
            <input
              className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="M1-メール誤送信"
            />

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">カテゴリ</label>
                <select
                  className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">視聴可能ユーザー</label>
                <input
                  className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  value={allowUsers}
                  onChange={(e) => setAllowUsers(e.target.value)}
                  placeholder="* もしくは 3217,3218"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">タグ（カンマ区切り）</label>
                <input
                  className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="必修, セキュリティ"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">必修</label>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">公開日時（任意）</label>
                <input
                  className="w-full rounded-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  value={publishAt}
                  onChange={(e) => setPublishAt(e.target.value)}
                  placeholder="2025-11-06T09:00:00+09:00"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white shadow-sm hover:shadow-md transition p-6">
            <h3 className="text-base font-semibold mb-4">取り込みオプション</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">アップロード後に即時取り込み</div>
                <div className="text-xs text-slate-500">S3移動 &amp; DynamoDB 追加をすぐ実行します</div>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                checked={wantImmediateIngest}
                onChange={(e) => setWantImmediateIngest(e.target.checked)}
              />
            </div>
            <div className="mt-4 text-xs text-slate-500">
              S3格納キー（想定ベース名）： <code className="font-mono">{keyBase}</code>
            </div>
          </div>

          <button
            onClick={onSubmit}
            disabled={uploading}
            className="w-full inline-flex items-center justify-center h-11 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg disabled:opacity-50"
          >
            {uploading ? "アップロード中…" : "アップロード"}
          </button>

          {message && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm p-3">
              {message}
            </div>
          )}
        </aside>
      </div>
    </Layout>
  );
}
