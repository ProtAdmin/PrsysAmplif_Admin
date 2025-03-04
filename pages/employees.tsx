import React, { useEffect, useState } from 'react';
import '../styles/EmployeeList.css';
import Layout from "../components/Layout"; // ✅ Layoutを適用
import { useRouter } from "next/router";

interface Employee {
    _id?: string;
    id: number;
    name: string;
    email: string;
    money: number;
    in: number;
    out: number;
    mail: string;
    status: string;
    project: string;
    skillsheet?: string;
    [key: string]: unknown;
}

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // 🔹 社員情報を取得する関数（ID順にソート）
  const fetchEmployees = () => {
    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then((data: Employee[]) => {
        const sortedData = [...data].sort((a, b) => a.id - b.id);
        setEmployees(sortedData);
        setFilteredEmployees(sortedData);
      })
      .catch(error => console.error('Error fetching employees:', error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 🔍 検索機能
  const applySearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      applyFilters(filters);
    } else {
      const lowerQuery = query.toLowerCase();
      const searched = employees.filter(employee =>
        Object.values(employee).some(value =>
          String(value).toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredEmployees(searched);
    }
  };

  // 🔹 複数カラムフィルター
  const applyFilters = (newFilters: { [key: string]: string }) => {
    setFilters(newFilters);
    let filteredData = employees;

    Object.entries(newFilters).forEach(([column, value]) => {
      if (value) {
        filteredData = filteredData.filter(employee =>
          String(employee[column]).includes(value)
        );
      }
    });

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(employee =>
        Object.values(employee).some(value =>
          String(value).toLowerCase().includes(lowerQuery)
        )
      );
    }

    setFilteredEmployees(filteredData);
  };

  return (
    <Layout>
      <div className="employee-list">
        <h2>社員一覧</h2>

        {/* 🔍 検索ボックス */}
        <div className="search-container">
          <input
            type="text"
            placeholder="社員ID・氏名・メール・参画先 などで検索"
            value={searchQuery}
            onChange={(e) => applySearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="button-container">
          <button className="refresh-button" onClick={fetchEmployees}>
            ページの更新
          </button>
          <button className="add-button" onClick={() => router.push("/employees/edit")}>
            新規追加
          </button>
          <button className="filter-button" onClick={() => setShowFilterOptions((prev) => !prev)}>
            フィルター
          </button>
        </div>

        {/* フィルターメニュー */}
        {showFilterOptions && (
          <div className="filter-options">
            {["id", "name", "status", "project", "money", "in", "out", "mail"].map((column) => (
              <div key={column}>
                <label>{column}:</label>
                <input
                  type="text"
                  value={filters[column] || ''}
                  onChange={(e) => {
                    const newFilters = { ...filters, [column]: e.target.value };
                    applyFilters(newFilters);
                  }}
                />
              </div>
            ))}
            <div>
              <button className="reset-filter-button" onClick={() => applyFilters({})}>
                フィルターを解除
              </button>
            </div>
          </div>
        )}

        {/* テーブル */}
        <table className="styled-table">
          <thead>
            <tr>
              <th>社員ID</th>
              <th>氏名</th>
              <th>状況</th>
              <th>参画先</th>
              <th>単価</th>
              <th>参画開始</th>
              <th>参画終了</th>
              <th>メール</th>
              <th>スキルシート</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id || employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.status}</td>
                <td>{employee.project}</td>
                <td>{employee.money}</td>
                <td>{employee.in}</td>
                <td>{employee.out}</td>
                <td>{employee.mail}</td>
                <td>
                  {employee.skillsheet ? (
                    <a href={employee.skillsheet} target="_blank" rel="noopener noreferrer">
                      スキルシートを開く
                    </a>
                  ) : (
                    'なし'
                  )}
                </td>
                <td>
                  <button onClick={() => router.push(`/employees/edit?id=${employee._id}`)}>
                    編集
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default EmployeeList;
