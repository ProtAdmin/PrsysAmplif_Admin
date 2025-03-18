import React, { useEffect, useState } from "react";
import "../styles/EmployeeList.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

// DynamoDB のレスポンスの型
interface DynamoDBEmployee {
  UserID: string;
  Name: string;
  Project: {
    STATUS: string;
    Vender: string;
    IN: string;
    OUT: string;
    BillingRate: string;
  };
  UserData: {
    SkillSheet?: string | null;
    KeyEmployee?: boolean;
    Age?: string;
    JoiningMonth?: string;
  };
  Retiree: {
    RetireeFLG: boolean;
    Reason?: string;
  };
  watch?: Record<string, boolean>;
}

// フロントエンドで使用する型
interface Employee {
  UserID: string;
  Name: string;
  status: string;
  Vender: string;
  IN: string;
  OUT: string;
  BillingRate: string;
  SkillSheet?: string | null;
  KeyEmployee?: boolean;
  Age?: string;
  JoiningMonth?: string;
  RetireeFLG: boolean;
  RetireeReason?: string;
  watch?: Record<string, boolean>;
}

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const API_ENDPOINT =
    "https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/DynamoDB-User-Get";
  const TABLE_NAME = "Proto_User_Profiles";

  const fetchEmployees = async () => {
    try {
      const params = new URLSearchParams({ tableName: TABLE_NAME });
      const response = await fetch(`${API_ENDPOINT}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (!result.data || !Array.isArray(result.data)) {
        console.error("No valid data received:", result);
        return;
      }

      const formattedData: Employee[] = result.data.map(
        (employee: DynamoDBEmployee) => ({
          UserID: employee.UserID || "不明",
          Name: employee.Name || "不明",
          status: employee.Project?.STATUS || "不明",
          Vender: employee.Project?.Vender || "不明",
          IN: employee.Project?.IN || "不明",
          OUT: employee.Project?.OUT || "不明",
          BillingRate: employee.Project?.BillingRate || "不明",
          SkillSheet: employee.UserData?.SkillSheet || null,
          KeyEmployee: employee.UserData?.KeyEmployee || false,
          Age: employee.UserData?.Age || "不明",
          JoiningMonth: employee.UserData?.JoiningMonth || "不明",
          RetireeFLG: employee.Retiree?.RetireeFLG || false,
          RetireeReason: employee.Retiree?.Reason || "不明",
          watch: employee.watch || {},
        })
      );

      console.log("Formatted Data:", formattedData);

      // 🔹 IDを数値順にソート
      const sortedData = formattedData.sort(
        (a, b) => parseInt(a.UserID, 10) - parseInt(b.UserID, 10)
      );

      setEmployees(sortedData);
      setFilteredEmployees(sortedData);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
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
      const searched = employees.filter((employee) =>
        Object.values(employee).some(
          (value) =>
            value !== undefined &&
            String(value).toLowerCase().includes(lowerQuery)
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
        filteredData = filteredData.filter((employee) =>
          String(employee[column as keyof Employee] ?? "").includes(value)
        );
      }
    });

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter((employee) =>
        Object.values(employee).some(
          (value) =>
            value !== undefined &&
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
          <button
            className="add-button"
            onClick={() => router.push("/employees/edit")}
          >
            新規追加
          </button>
          <button
            className="filter-button"
            onClick={() => setShowFilterOptions((prev) => !prev)}
          >
            フィルター
          </button>
        </div>

        {/* フィルターメニュー */}
        {showFilterOptions && (
          <div className="filter-options">
            {["UserID", "Name", "status", "Vender", "IN", "OUT"].map(
              (column) => (
                <div key={column}>
                  <label>{column}:</label>
                  <input
                    type="text"
                    value={filters[column] || ""}
                    onChange={(e) => {
                      const newFilters = {
                        ...filters,
                        [column]: e.target.value,
                      };
                      applyFilters(newFilters);
                    }}
                  />
                </div>
              )
            )}
            <div>
              <button
                className="reset-filter-button"
                onClick={() => applyFilters({})}
              >
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
                    <a
                      href={employee.SkillSheet}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      参照
                    </a>
                  ) : (
                    "なし"
                  )}
                </td>
                <td>
                  <button
                    onClick={() =>
                      router.push(`/employees/edit?id=${employee.UserID}`)
                    }
                  >
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
