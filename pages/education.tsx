import { useState } from "react";
import Layout from "../components/Layout";

const categories = ["過去資料", "クラウド", "OS", "NW"];
const videos = [
  { id: 1, title: "動画 1", url: "https://proto-internal-it-system-education-bucket.s3.ap-northeast-1.amazonaws.com/M1-%E3%83%A1%E3%83%BC%E3%83%AB%E8%AA%A4%E9%80%81%E4%BF%A1.mp4" },
  { id: 2, title: "動画 2", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
  { id: 3, title: "動画 3", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
  { id: 4, title: "動画 4", url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" },
];

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="education-container">
        {/* カテゴリ選択 */}
        <aside className="category-sidebar">
          <h3>カテゴリ</h3>
          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="main-content">
          {/* 検索エリア */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 動画リスト */}
          <div className="video-list">
            {filteredVideos.map((video) => (
              <button key={video.id} className="video-btn" onClick={() => setSelectedVideo(video.url)}>
                {video.title}
              </button>
            ))}
          </div>

          {/* 動画プレイヤー */}
          <div className="video-display">
            {selectedVideo ? (
              <video controls width="100%">
                <source src={selectedVideo} type="video/mp4" />
                お使いのブラウザは video タグをサポートしていません。
              </video>
            ) : (
              <p>動画を選択してください</p>
            )}
          </div>
        </main>
      </div>

      {/* スタイル */}
      <style jsx>{`
        .education-container {
          display: flex;
          margin-left: 250px; /* Layoutのサイドバーにかぶらないように調整 */
          padding-top: 80px; /* ヘッダーの高さを確保 */
          height: 100vh;
        }
        .category-sidebar {
          width: 220px;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          position: relative; /* ヘッダーに隠れないよう調整 */
          margin-top: 20px;
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
          text-align: center;
        }
        .category-btn:hover {
          background: #007bff;
          color: white;
        }
        .category-btn.active {
          background: #007bff;
          color: white;
        }
        .main-content {
          flex-grow: 1;
          padding: 20px;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          align-items: center; /* 中央配置 */
          justify-content: center;
        }
        .search-bar {
          width: 60%;
          margin-bottom: 20px;
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
          align-items: center;
          margin-bottom: 20px;
          width: 60%;
        }
        .video-btn {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          background: white;
          border: 2px solid #007bff;
          color: #007bff;
          cursor: pointer;
          text-align: center;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        .video-btn:hover {
          background: #007bff;
          color: white;
        }
        .video-display {
          width: 60%;
          padding: 20px;
          border: 1px solid #ccc;
          background: #fff;
          display: flex;
          justify-content: center;
          border-radius: 8px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Layout>
  );
}
