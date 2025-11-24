import { useState } from "react";
import Link from "next/link";
// import "../styles/Layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPencilAlt, faBars  ,faAngleDoubleLeft ,faAddressCard} from "@fortawesome/free-solid-svg-icons";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // メニュー項目データ
  const menuItems = [
    { path: "/Senior", icon: faPencilAlt, label: "HOME" },
    {
      path: "https://d1ncz7o76yr13b.cloudfront.net/seniors",
      icon: faAddressCard,
      label: "シニアマネージャー 社内チャット",
      external: true,
    },
    { path: "/VideoUpdateAdmin/index.html", icon: faAddressCard, label: "動画アップロード" },
    { path: "/CognitoCreate", icon: faUser, label: "人員処理" },
  ];

  return (
    <div className="layout-container">
      {/* ヘッダー */}
      <header className="header">ProtoSystem</header>

      <div className="content">
        {/* サイドバー */}
        <nav className={`sidebar ${isSidebarOpen ? "open" : "hidden"}`}>
        <ul className="menu">
            {menuItems.map((item) => (
              <li key={item.path}>
                {item.external ? (
                  <a
                    href={item.path}
                    className="menu-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={item.icon} style={{ marginRight: "8px" }} />
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.path} className="menu-item">
                    <FontAwesomeIcon icon={item.icon} style={{ marginRight: "8px" }} />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* サイドバー開閉ボタン（常に表示） */}
        <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarOpen ? faAngleDoubleLeft : faBars} size="lg" />
        </button>

        {/* メインコンテンツ */}
        <main className={`main-content ${isSidebarOpen ? "" : "collapsed"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
