import React, { useState, useEffect } from "react";
import Layout from "../components/Layout_User";

const API_GATEWAY_URL = "https://1f0e9vnvac.execute-api.ap-northeast-1.amazonaws.com/main/upload";
const UPDATE_DYNAMODB_URL = "https://1f0e9vnvac.execute-api.ap-northeast-1.amazonaws.com/main/update-dynamodb-api";

const UploadToS3 = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("ユーザーIDが見つかりません。ログインしていますか？");
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // 🔍 ファイル名のバリデーション関数
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
      alert("ユーザーIDが取得できませんでした");
      return;
    }

    // 🔍 ファイル名バリデーション
    if (!isValidFileName(file.name)) {
      alert("ファイル名が不正です。\n形式: 4桁数字_AA・B_スキルシート.xlsx");
      return;
    }

    setUploading(true);

    try {
      // 1. Presigned URL 取得
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

      // 3. DynamoDB を更新
      const updateResponse = await fetch(UPDATE_DYNAMODB_URL, {
        method: "POST",
        body: JSON.stringify({ userId, skillSheet: file.name }),
        headers: { "Content-Type": "application/json" },
      });

      if (!updateResponse.ok) throw new Error("DynamoDB 更新に失敗しました");

      alert("アップロード成功！ 🎉");
      setFile(null);
    } catch (error) {
      console.error("エラー:", error);
      alert("アップロード時にエラーが発生しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={uploadFile} disabled={uploading}>
          {uploading ? "アップロード中..." : "アップロード"}
        </button>
      </div>
    </Layout>
  );
};

export default UploadToS3;
