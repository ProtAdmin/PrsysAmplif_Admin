import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout_User";

type Video = {
  title: string;
  url: string;
  watched: boolean;
  category: string;
};

// 🔍 ID トークンをデコードする関数
function parseIdToken(idToken: string) {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid ID Token format");
    }
    return JSON.parse(atob(parts[1])); // デコード
  } catch (error) {
    console.error("❌ Failed to parse ID Token:", error);
    return null;
  }
}

const VideoList = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("全ての動画");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const idToken = localStorage.getItem("id_token");
        if (!idToken) {
          console.warn("⚠️ No ID Token found. Redirecting to unauthorized page...");
          router.push("/unauthorized");
          return;
        }

        const payload = parseIdToken(idToken);
        if (!payload) {
          console.warn("⚠️ ID Token parsing failed. Redirecting to unauthorized page...");
          router.push("/unauthorized");
          return;
        }

        const userID = payload["custom:UserID"];
        console.log("🔹 取得した UserID:", userID);

        const apiUrl = `https://t35qg36r0e.execute-api.ap-northeast-1.amazonaws.com/main/prod-Cognito-Users-Create?userID=${userID}`;
        console.log("🌍 API URL:", apiUrl);

        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("📦 APIレスポンス:", data);

        if (data?.videos && Array.isArray(data.videos)) {
          const filteredVideos = data.videos.filter(
            (video: Video) => !video.title.includes("Dummy")
          );
          setVideos(filteredVideos);
        }
      } catch (error) {
        console.error("❌ 動画データ取得失敗:", error);
      }
    };

    fetchUserID();
  }, [router]);

  // 🔹 ユーザーが動画を視聴完了したら Lambda に送信する関数
  const handleVideoWatched = async (videoTitle: string) => {
    try {
      const idToken = localStorage.getItem("id_token");
      if (!idToken) {
        console.warn("⚠️ No ID Token found.");
        return;
      }

      const payload = parseIdToken(idToken);
      if (!payload) {
        console.warn("⚠️ Failed to parse ID Token.");
        return;
      }

      const userID = payload["custom:UserID"];
      console.log("🔹 Sending request for userID:", userID, "video:", videoTitle);

      const apiUrl = "https://1f0e9vnvac.execute-api.ap-northeast-1.amazonaws.com/main/UpdateWatchHistory"; // 🔹 Lambda の API Gateway URL

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, videoTitle })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      console.log("✅ Video watched flag updated:", videoTitle);

      // 🔹 UI 側でも `watched: true` に更新
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.title === videoTitle ? { ...video, watched: true } : video
        )
      );
    } catch (error) {
      console.error("❌ Error updating watched status:", error);
    }
  };

  // 🔹 カテゴリ一覧を取得
  const categories = Array.from(new Set(videos.map((video) => video.category)));

  // 🔹 選択したカテゴリの動画を取得
  const filteredVideos = videos
    .filter((video) =>
      selectedCategory === "全ての動画" ? true : video.category === selectedCategory
    )
    .filter((video) => video.title.includes(searchTerm));

  return (
    <Layout>
      <div className="education-container">
        <aside className="category-sidebar">
          <h3>カテゴリ</h3>
          <div className="category-buttons">
            <button
              className={`category-btn ${selectedCategory === "全ての動画" ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory("全ての動画");
                setSelectedVideo(null);
              }}
            >
              全ての動画
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedVideo(null);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        <div className="video-display">
          {selectedVideo ? (
            <video
              key={selectedVideo.title}
              controls
              width="100%"
              className="video-player"
              onEnded={() => handleVideoWatched(selectedVideo.title)}
            >
              <source src={selectedVideo.url} type="video/mp4" />
              お使いのブラウザは video タグをサポートしていません。
            </video>
          ) : (
            <p className="video-placeholder">動画を選択してください</p>
          )}
        </div>

        <div className="main-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="動画を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="video-list">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <button
                  key={video.title}
                  className={`video-btn ${video.watched ? "watched" : ""}`}
                  onClick={() => setSelectedVideo(video)}
                >
                  {video.title}
                </button>
              ))
            ) : (
              <p className="no-videos">動画が見つかりません</p>
            )}
          </div>
        </div>
      </div>

      {/* スタイル */}
      <style jsx>{`
        .education-container {
          display: grid;
          grid-template-columns: 220px 2fr 3fr;
          gap: 20px;
          padding: 20px;
          height: 90vh;
          max-width: 1400px;
          margin: auto;
        }
        .category-sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          font-weight: bold;
        }
        .category-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .category-btn {
          padding: 12px;
          font-size: 16px;
          background: white;
          border: 2px solid #007bff;
          color: #007bff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .category-btn:hover,
        .category-btn.active {
          background: #007bff;
          color: white;
        }
        .video-display {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid #007bff;
          background: #fff;
          padding: 15px;
          border-radius: 12px;
          min-height: 300px;
        }
        .video-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 70vh;
        overflow-y: auto;
        width: 100%;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 8px;
        }
        .video-btn {
          padding: 12px;
          font-size: 16px;
          background: white;
          border: 2px solid #007bff;
          color: #007bff;
          border-radius: 6px;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
          width: 100%;
        }
        .video-btn:hover,
        .video-btn.active {
          background: #007bff;
          color: white;
        }
        .education-container {
          display: grid;
          grid-template-columns: 220px 2fr 3fr;
          gap: 20px;
          padding: 20px;
        }
        .category-sidebar { background: #f8f9fa; padding: 20px; }
        .category-btn { border: 2px solid #007bff; color: #007bff; }
        .category-btn:hover, .category-btn.active { background: #007bff; color: white; }
        .video-player { border: 2px solid #007bff; border-radius: 8px; }
        .video-btn { border: 2px solid #007bff; }
        .video-btn.watched { background: #ccc; color: #555; }
      `}</style>
    </Layout>
  );
};

export default VideoList;
