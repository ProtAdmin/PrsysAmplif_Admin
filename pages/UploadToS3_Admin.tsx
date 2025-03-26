import React, { useState } from "react";
import Layout from "../components/Layout";

const API_GATEWAY_URL = "https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/S3-Upload-SkillSheet";
const UPDATE_DYNAMODB_URL = "https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/DynamoDB-User-UpdateSkillSheet";

const UploadToS3_Admin = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const isValidFileName = (fileName: string): boolean => {
    const regex = /^\d{4}_.+_スキルシート\.xlsx$/;
    return regex.test(fileName);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    if (!userId) {
      alert("ユーザーIDを入力してください");
      return;
    }

    // 🔍 ファイル名のバリデーション
    if (!isValidFileName(file.name)) {
      alert("ファイル名が不正です。\n形式: 4桁数字_AA・B_スキルシート.xlsx");
      return;
    }

    // 🔍 ファイル名と入力されたユーザーIDの整合性チェック
    const fileUserId = file.name.slice(0, 4);
    if (fileUserId !== userId) {
      alert(`ファイル名のユーザーID (${fileUserId}) と入力されたユーザーID (${userId}) が一致しません`);
      return;
    }

    setUploading(true);

    try {
      // 1. Presigned URL取得
      const presignedResponse = await fetch(API_GATEWAY_URL, {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        headers: { "Content-Type": "application/json" },
      });

      const { presignedUrl } = await presignedResponse.json();
      if (!presignedUrl) throw new Error("Presigned URL を取得できませんでした");

      // 2. S3 にアップロード
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) throw new Error("S3 アップロードに失敗しました");

      // 3. DynamoDB 更新
      const updateResponse = await fetch(UPDATE_DYNAMODB_URL, {
        method: "POST",
        body: JSON.stringify({ userId, skillSheet: file.name }),
        headers: { "Content-Type": "application/json" },
      });

      if (!updateResponse.ok) throw new Error("DynamoDB 更新に失敗しました");

      alert("アップロード成功！ 🎉");
      setFile(null);
      setUserId(""); // フォームクリア
    } catch (error) {
      console.error("エラー:", error);
      alert("アップロード時にエラーが発生しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>管理者用スキルシートアップロード</h2>
        <div style={{ marginBottom: "10px" }}>
          <label>
            対象ユーザーID（4桁）:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              maxLength={4}
              pattern="\d{4}"
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
        </div>
        <button onClick={uploadFile} disabled={uploading}>
          {uploading ? "アップロード中..." : "アップロード"}
        </button>
      </div>
    </Layout>
  );
};

export default UploadToS3_Admin;
