import { useState } from "react";
import Link from "next/link";
// import "../styles/Layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTasks, faUser, faCheck, faPencilAlt, faBars  ,faAngleDoubleLeft} from "@fortawesome/free-solid-svg-icons";

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
    { path: "/admin", icon: faPencilAlt, label: "HOME" },
    { path: "/employees", icon: faUsers, label: "社員一覧" },
    { path: "/projects", icon: faTasks, label: "案件一覧" },
    { path: "/process/edit", icon: faUser, label: "人員処理" },
    { path: "/attendance", icon: faCheck, label: "勤怠管理" },
    { path: "/education", icon: faPencilAlt, label: "新人教育" },
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
                <Link href={item.path} className="menu-item">
                  <FontAwesomeIcon icon={item.icon} style={{ marginRight: "8px" }} />
                  {item.label}
                </Link>
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
