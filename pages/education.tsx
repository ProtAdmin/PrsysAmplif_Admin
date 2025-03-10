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
          <h3> カテゴリ</h3>
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
              
          
        </main>
      </div>

      {/* スタイル */}
      <style jsx>{`
        .education-container {
          display: grid;
          grid-template-columns: 180px 1fr 200px; /* サイドバー・メイン・動画リストの3カラム */
          grid-template-rows: auto;
          gap: 10px; /* 余白を減らす */
          padding: 20px;
          height: 90vh;
        }
        .category-sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center; /* テキストを中央揃え */
          font-weight: bold; /* 太字で視認性アップ（オプション） */
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
          display: flex;
          flex-direction: column;
          align-items: center; /* 中央揃え */
          justify-content: flex-start;
          flex-grow: 1; /* 残りの幅を埋める */
          gap: 5px;
          padding: 0;
          margin: 0;
          width: auto; /* 固定幅を解除 */
        }
        .search-bar {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
        .search-bar input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
        .video-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 5px;
          align-items: start;
          padding: 0;
          margin: 0;
          width: 100%; /* リストを適切に配置 */
        }
        .video-btn {
          padding: 10px;
          background: white;
          border: 2px solid #007bff;
          color: #007bff;
          cursor: pointer;
          text-align: center;
          border-radius: 6px;
          transition: all 0.3s ease;
          width: 100%;
        }
        .video-btn:hover {
          background: #007bff;
          color: white;
        }
        .video-display {
          width: 100%;
          height: auto;
          border: 2px solid #007bff; /* 青枠を均等にする */
          box-sizing: border-box; /* ボーダーを含めたサイズ計算 */
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
          padding: 10px;
          margin: 0; /* 余白の影響をなくす */
          overflow: hidden; /* 枠線が途切れないようにする */
        }
        .video-display video {
          width: 100%;
          height: auto;
          max-height: 100%;
          display: block; /* 動画の余白をなくす */
        }
      `}</style>
    </Layout>
  );
}
