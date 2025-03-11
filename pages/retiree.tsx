import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 🔹 退職者データの型を定義
interface Employee {
  KeyEmployee: boolean;
  Retiree: string;
  RetireeFLG: boolean; // DynamoDB のデータに合わせて `boolean` に変更
  UserID: string;
  Name: string;
}

// 🔹 退職理由ごとの円グラフコンポーネント
function ResignationPieChart() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const API_ENDPOINT = "https://k6c1jaiusb.execute-api.ap-northeast-1.amazonaws.com/prod-DynamoDB-Users-GetALL";
  const TABLE_NAME = "Proto_User_Profiles";

  useEffect(() => {
    fetch(`${API_ENDPOINT}?tableName=${TABLE_NAME}`)
      .then(response => response.json())
      .then((data) => {
        console.log("API Response:", data); // 🔹 デバッグ用
        if (data.data) {
          setEmployees(data.data);
        } else {
          setEmployees([]);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // 🔹 退職理由ごとにカウント
  const resignationReasons = employees.reduce((acc, emp) => {
    if (emp.RetireeFLG === true) {
      acc[emp.Retiree] = (acc[emp.Retiree] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // 🔹 グラフ用データ
  const chartData = Object.entries(resignationReasons).map(([reason, count]) => ({
    name: reason,
    value: count,
  }));

  // 🔹 カラー設定（ランダム色）
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"];

  return (
    <div>
      <h2>退職理由分析</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// 🔹 メインコンポーネント
export default function Home() {
  return (
    <Layout>
      <ResignationPieChart />
    </Layout>
  );
}