import React, { useState } from "react";
import Layout from "../components/Layout";

const API_GATEWAY_URL = "https://your-cloudfront-domain.cloudfront.net/upload/get-presigned-url"; // CloudFront 経由のAPI Gatewayエンドポイント
const UPDATE_DYNAMODB_URL = "https://your-cloudfront-domain.cloudfront.net/update-dynamodb"; // DynamoDB 更新API

const UploadToS3 = ({ userId }: { userId: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    setUploading(true);

    try {
      // 🔹 1. CloudFront 経由で Presigned URL を取得
      const presignedResponse = await fetch(API_GATEWAY_URL, {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        headers: { "Content-Type": "application/json" },
      });

      const { presignedUrl } = await presignedResponse.json();
      if (!presignedUrl) {
        throw new Error("Presigned URL を取得できませんでした");
      }

      // 🔹 2. Presigned URL を使って S3 にファイルをアップロード
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error("S3 アップロードに失敗しました");
      }

      // 🔹 3. アップロード成功後に DynamoDB の `SkillSheet` を更新
      const updateResponse = await fetch(UPDATE_DYNAMODB_URL, {
        method: "POST",
        body: JSON.stringify({
          userId,
          skillSheet: file.name, // ファイル名を DynamoDB に保存
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!updateResponse.ok) {
        throw new Error("DynamoDB 更新に失敗しました");
      }

      alert("アップロード成功！ 🎉");
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
      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
      <button onClick={uploadFile} disabled={uploading}>
        {uploading ? "アップロード中..." : "アップロード"}
      </button>
    </div>
    </Layout>
  );
};

export default UploadToS3;
