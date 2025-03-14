import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-1",
});

const BUCKET_NAME = "proto-internal-it-system-education-bucket";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ CORSヘッダーを追加
  res.setHeader("Access-Control-Allow-Origin", "*"); // 必要に応じてドメインを制限
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflightリクエスト対応
  }

  try {
    const { category } = req.query;

    if (!category) {
      const response = await s3.listObjectsV2({ Bucket: BUCKET_NAME, Delimiter: "/" }).promise();
      const categories = response.CommonPrefixes?.map((prefix) => prefix.Prefix!.replace("/", "")) || [];
      return res.status(200).json({ categories });
    } else {
      const response = await s3.listObjectsV2({ Bucket: BUCKET_NAME, Prefix: `${category}/` }).promise();
      const videos = response.Contents?.filter((item) => item.Key!.endsWith(".mp4")).map((item, index) => ({
        id: index + 1,
        title: item.Key!.split("/").pop() || `動画 ${index + 1}`,
        url: `https://${BUCKET_NAME}.s3.ap-northeast-1.amazonaws.com/${item.Key}`,
      })) || [];
      return res.status(200).json({ videos });
    }
  } catch (error) {
    console.error("Error fetching from S3:", error);
    res.status(500).json({ error: "Failed to fetch data from S3" });
  }
}
