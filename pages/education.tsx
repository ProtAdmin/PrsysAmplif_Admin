import { useState, useEffect } from "react";
import Layout from "../components/Layout_User";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// 変数を定義してエラーを回避
export default function Education() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [videos, setVideos] = useState<{ id: number; title: string; url: string }[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // ✨ 修正: 使わない場合は削除も可能

  // 📌 カテゴリ取得
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`);
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []); // ✅ 依存配列を空にする  

  // 📌 選択したカテゴリの動画を取得
  const fetchVideos = async (category: string) => {
    setSelectedCategory(category);
    setSelectedVideo(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/education?category=${category}`);
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // 🔍 検索機能
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
                onClick={() => fetchVideos(category)}
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
    </Layout>
  );
}
