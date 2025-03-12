import React, { useEffect, useState } from 'react';
import '../styles/EmployeeList.css';
import Layout from "../components/Layout";
import { useRouter } from "next/router";

// DynamoDB のレスポンスの型
interface DynamoDBEmployee {
  UserID: string;
  UserData: {
    Name: string;
    SkillSheet?: string | null;
  };
  Project: {
    STATUS: string;
    Vender: string;
    IN: string;
    OUT: string;
    BillingRate: string;
  };
  Retiree: {
    RetireeFLG: boolean;
  };
}

// フロントエンドで使用する型
interface Employee {
  UserID: string;
  Name: string;
  status: string;
  Vender: string;
  IN: string;
  OUT: string;
  SkillSheet?: string;
  [key: string]: string | undefined;  // 🔹 インデックスシグネチャを追加
}

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const API_ENDPOINT = "https://k6c1jaiusb.execute-api.ap-northeast-1.amazonaws.com/prod-DynamoDB-Users-GetALL";
  const TABLE_NAME = "Proto_User_Profiles";

  const fetchEmployees = () => {
    fetch(`${API_ENDPOINT}?tableName=${TABLE_NAME}`)
      .then(response => response.json())
      .then((data) => {
        if (data.data) {
          const formattedData = data.data.map((employee: DynamoDBEmployee) => ({
            UserID: employee.UserID,
            Name: employee.UserData.Name,
            status: employee.Project.STATUS,
            Vender: employee.Project.Vender,
            IN: employee.Project.IN,
            OUT: employee.Project.OUT,
            BillingRate: employee.Project.BillingRate,
            SkillSheet: employee.UserData.SkillSheet || null,
          }));

          const sortedData = [...formattedData].sort((a, b) => parseInt(a.UserID) - parseInt(b.UserID));
          setEmployees(sortedData);
          setFilteredEmployees(sortedData);
        }
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
          value !== undefined && String(value).toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredEmployees(searched);
    }
  };

  // 🔹 フィルター機能
  const applyFilters = (newFilters: { [key: string]: string }) => {
    setFilters(newFilters);
    let filteredData = employees;

    Object.entries(newFilters).forEach(([column, value]) => {
      if (value) {
        filteredData = filteredData.filter(employee =>
          String(employee[column as keyof Employee] ?? "").includes(value)  // 🔹 修正
        );
      }
    });

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(employee =>
        Object.values(employee).some(value =>
          value !== undefined && String(value).toLowerCase().includes(lowerQuery)
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
            placeholder="社員ID・氏名・参画先 などで検索"
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
            {["UserID", "Name", "status", "Vender", "IN", "OUT"].map((column) => (
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
              <th>スキルシート</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.UserID}>
                <td>{employee.UserID}</td>
                <td>{employee.Name}</td>
                <td>{employee.status}</td>
                <td>{employee.Vender}</td>
                <td>{employee.BillingRate}</td>
                <td>{employee.IN}</td>
                <td>{employee.OUT}</td>
                <td>
                  {employee.SkillSheet ? (
                    <a href={employee.SkillSheet} target="_blank" rel="noopener noreferrer">
                      参照
                    </a>
                  ) : (
                    'なし'
                  )}
                </td>
                <td>
                  <button onClick={() => router.push(`/employees/edit?id=${employee.UserID}`)}>
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
