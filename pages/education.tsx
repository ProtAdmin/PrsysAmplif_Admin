import { useEffect, useState } from "react";
import Layout from "../components/Layout_User";

type Video = {
  title: string;
  url: string;
  watched: boolean;
  category: string;
};

const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("全ての動画");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const apiUrl =
      "https://t35qg36r0e.execute-api.ap-northeast-1.amazonaws.com/main/prod-Cognito-Users-Create?userID=3217";

    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data?.videos && Array.isArray(data.videos)) {
          setVideos(data.videos);
        }
      })
      .catch((error) => {
        console.error("❌ APIリクエスト失敗:", error);
      });
  }, []);

  // カテゴリ一覧を取得
  const categories = Array.from(new Set(videos.map((video) => video.category)));

  // 選択したカテゴリの動画を取得
  const filteredVideos = videos
    .filter((video) =>
      selectedCategory === "全ての動画" ? true : video.category === selectedCategory
    )
    .filter((video) => video.title.includes(searchTerm));

  return (
    <Layout>
      <div className="education-container">
        {/* 左サイドバー: カテゴリ一覧 */}
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

        {/* 中央: 動画プレーヤー */}
        <div className="video-display">
          {selectedVideo ? (
            <video controls width="100%" className="video-player">
              <source src={selectedVideo.url} type="video/mp4" />
              お使いのブラウザは video タグをサポートしていません。
            </video>
          ) : (
            <p className="video-placeholder">動画を選択してください</p>
          )}
        </div>

        {/* 右側: 検索欄 + 動画リスト */}
        <div className="main-content">
          {/* 検索欄 */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="動画を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 動画リスト */}
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
          grid-template-columns: 220px 2fr 3fr; /* カテゴリ, 動画リスト, 動画プレーヤー */
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
        .category-btn:hover, .category-btn.active {
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
        .video-placeholder {
          font-size: 18px;
          color: #555;
        }
        .video-player {
          max-width: 100%;
          border-radius: 8px;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .search-bar input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
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
          padding: 14px;
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
        .video-btn:hover {
          background: #007bff;
          color: white;
        }
        .no-videos {
          text-align: center;
          color: #888;
        }
      `}</style>
    </Layout>
  );
};

export default VideoList;
