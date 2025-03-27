import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout_User";
import Image from "next/image";

type Video = {
  title: string;
  url: string;
  watched: boolean;
  category: string;
  thumbnail?: string;
};

function parseIdToken(idToken: string) {
  try {
    const parts = idToken.split(".");
    if (parts.length !== 3) throw new Error("Invalid ID Token format");
    return JSON.parse(atob(parts[1]));
  } catch (error) {
    console.error("❌ Failed to parse ID Token:", error);
    return null;
  }
}

const VideoList = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("全ての動画");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const idToken = localStorage.getItem("id_token");
        if (!idToken) return router.push("/unauthorized");

        const payload = parseIdToken(idToken);
        if (!payload) return router.push("/unauthorized");

        const userID = payload["custom:UserID"];
        const apiUrl = `https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/Video-Get-Videos?userID=${userID}`;

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (data?.videos && Array.isArray(data.videos)) {
          const filtered = data.videos.filter((v: Video) => !v.title.includes("Dummy"));
          setVideos(filtered);
        }
      } catch (error) {
        console.error("❌ 動画データ取得失敗:", error);
      }
    };
    fetchUserID();
  }, [router]);

  const handleVideoWatched = async (videoTitle: string) => {
    try {
      const idToken = localStorage.getItem("id_token");
      if (!idToken) return;

      const payload = parseIdToken(idToken);
      if (!payload) return;

      const userID = payload["custom:UserID"];
      const apiUrl = "https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/DynamoDB-User-UpdateWatchHistory";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, videoTitle }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      setVideos((prev) =>
        prev.map((v) => (v.title === videoTitle ? { ...v, watched: true } : v))
      );
    } catch (error) {
      console.error("❌ Error updating watched status:", error);
    }
  };

  const categories = Array.from(new Set(videos.map((v) => v.category)));

  const filteredVideos = videos
    .filter((v) => selectedCategory === "全ての動画" || v.category === selectedCategory)
    .filter((v) => v.title.includes(searchTerm));

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
            >全ての動画</button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedVideo(null);
                }}
              >{cat}</button>
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
                <div
                  key={video.title}
                  className={`video-card ${video.watched ? "watched" : ""}`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <Image
                    src={video.thumbnail || "/placeholder.jpg"}
                    alt={video.title}
                    width={160}
                    height={90}
                    className="video-thumbnail"
                  />
                  <div className="video-title">{video.title.replace(".mp4", "")}</div>
                </div>
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
        .video-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          border: 2px solid #007bff;
          padding: 8px;
          border-radius: 10px;
          background: white;
          transition: transform 0.2s;
        }
        .video-card:hover {
          transform: scale(1.03);
          background: #e6f0ff;
        }
        .video-card.watched {
          opacity: 0.6;
        }
        .video-thumbnail {
          width: 160px;
          height: 90px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 6px;
        }
        .video-title {
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          color: #333;
        }
        .video-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
          padding: 10px;
          max-height: 70vh;
          overflow-y: auto;
          background: #f9f9f9;
          border-radius: 8px;
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
