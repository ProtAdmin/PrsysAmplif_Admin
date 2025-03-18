import { useEffect, useState } from "react";

// ✅ Videoデータの型定義
type Video = {
  title: string;
  url: string;
  watched: boolean;
  category: string;
};

const VideoList = () => {
  // ✅ `useState` に型を指定
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl =
      "https://t35qg36r0e.execute-api.ap-northeast-1.amazonaws.com/main/prod-Cognito-Users-Create?userID=3217";

    console.log("📡 APIにリクエスト送信: ", apiUrl);

    fetch(apiUrl)
      .then(async (res) => {
        console.log("🔍 APIレスポンスステータス:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ APIレスポンスデータ: ", JSON.stringify(data, null, 2));
        if (data?.videos && Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          console.warn("⚠ APIレスポンスに 'videos' プロパティがない or 無効なデータ形式");
        }
      })
      .catch((error) => {
        console.error("❌ APIリクエスト失敗:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">動画リスト</h1>

      {/* ローディング表示 */}
      {loading && <p>🔄 データ取得中...</p>}

      {/* エラー表示 */}
      {error && <p className="text-red-500">❌ エラー: {error}</p>}

      {/* デバッグ用: APIレスポンスを表示 */}
      <pre className="bg-gray-200 p-4 text-sm">{JSON.stringify(videos, null, 2)}</pre>

      {/* 動画リスト */}
      <ul className="space-y-4">
        {videos.map((video) => (
          <li
            key={video.title}
            className={`p-4 border rounded-lg flex items-center ${
              video.watched ? "bg-green-100" : "bg-white"
            }`}
          >
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex-1"
            >
              {video.title}
            </a>
            {video.watched && (
              <span className="ml-4 text-green-600 font-bold">✔ 視聴済み</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
