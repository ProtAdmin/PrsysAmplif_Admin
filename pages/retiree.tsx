import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Bar, XAxis, YAxis, Legend, Line, Scatter, ComposedChart, ScatterChart } from "recharts";
import dayjs from "dayjs";

interface DynamoDBEmployee {
  UserID: string;
  UserData: {
    JoiningMonth: string;
    Age?: number;
  };
  Retiree: {
    RetireeFLG: boolean;
    Reason: string;
  };
}

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF", "#FF9F40"];

const getYearsOfServiceCategory = (joiningMonth: string): string => {
  const now = dayjs();
  const joinDate = dayjs(joiningMonth, "YYYYMM");
  const years = now.diff(joinDate, "year", true);
  const formattedYears = Math.round(years * 10) / 10;

  if (formattedYears <= 0.5) return "半年以下";
  if (formattedYears <= 1) return "1年以下";
  if (formattedYears <= 3) return "3年以下";
  if (formattedYears <= 5) return "5年以下";
  return "10年以下";
};

function ResignationAnalysis() {
  const [employees, setEmployees] = useState<DynamoDBEmployee[]>([]);
  const API_ENDPOINT = "https://mu12g4o3v1.execute-api.ap-northeast-1.amazonaws.com/prod-DynamoDB-Users-GetALL";
  const TABLE_NAME = "Proto_User_Profiles";

  useEffect(() => {
    fetch(`${API_ENDPOINT}?tableName=${TABLE_NAME}`)
      .then(response => response.json())
      .then((data) => {
        if (data.data) {
          setEmployees(data.data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const retiredEmployees = employees.filter(emp => emp.Retiree?.RetireeFLG);

  const ageGroups = {
    "全年代": retiredEmployees,
    "20代": retiredEmployees.filter(emp => emp.UserData.Age && emp.UserData.Age >= 20 && emp.UserData.Age < 30),
    "30代": retiredEmployees.filter(emp => emp.UserData.Age && emp.UserData.Age >= 30 && emp.UserData.Age < 40),
    "40代": retiredEmployees.filter(emp => emp.UserData.Age && emp.UserData.Age >= 40 && emp.UserData.Age < 50),
    "その他": retiredEmployees.filter(emp => emp.UserData.Age && (emp.UserData.Age < 20 || emp.UserData.Age >= 50))
  };

  const resignationData = Object.entries(ageGroups["全年代"].reduce((acc, emp) => {
    acc[emp.Retiree.Reason] = (acc[emp.Retiree.Reason] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)).map(([name, value]) => ({ name, value }));

  return (
    <Layout>
      <h2>退職分析</h2>

      {/* 1. 棒グラフ + 折れ線グラフを重ねる */}
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <div style={{ width: "60%" }}>
          <h3>退職理由の分布（棒グラフ + 折れ線グラフ）</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={resignationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#36A2EB" />
              <Line type="monotone" dataKey="value" stroke="#FF6384" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. 年代別の円グラフを2x2で表示 */}
      <h3>年代別の退職理由分布（円グラフ）</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "20px",
        justifyContent: "center"
      }}>
        {Object.entries(ageGroups).map(([group, employees], groupIndex) => {
          const serviceYears = employees.reduce((acc, emp) => {
            const category = getYearsOfServiceCategory(emp.UserData.JoiningMonth);
            acc[category] = (acc[category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

          return (
            <div key={groupIndex} style={{ textAlign: "center" }}>
              <h4>{group} の退職理由分布</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={Object.entries(serviceYears).map(([name]) => ({ name, value: serviceYears[name] }))}
                    dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                    {Object.entries(serviceYears).map(([,], index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      {/* 3. 散布図 */}
      <h3>年齢と継続年数の関係（散布図）</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="x" name="継続年数" />
          <YAxis dataKey="y" name="年齢" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="退職者" data={retiredEmployees.map(emp => ({
            x: dayjs().diff(dayjs(emp.UserData.JoiningMonth, "YYYYMM"), "year", true),
            y: emp.UserData.Age || 30,
            category: emp.Retiree.Reason
          }))} fill="#4CAF50" />
        </ScatterChart>
      </ResponsiveContainer>
    </Layout>
  );
}

export default ResignationAnalysis;
