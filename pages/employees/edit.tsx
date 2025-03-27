import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const EmployeeCreate: React.FC = () => {
  const router = useRouter();

  const [employee, setEmployee] = useState({
    id: '',
    money: '',
    in: '',
    out: '',
    status: '',
    project: '',
    skillsheet: '',
  });

  const handleChange = (key: string, value: string) => {
    setEmployee((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const url = "https://mu12g4o3v1.execute-api.ap-northeast-1.amazonaws.com/prod-DynamoDB-Users-Create";

    const payload = {
      UserID: employee.id,
      Project: {
        BillingRate: employee.money,
        IN: employee.in,
        OUT: employee.out,
        STATUS: employee.status,
        Vender: employee.project
      },
      Retiree: null,
      UserData: {
        Age: null,
        JoiningMonth: null,
        KeyEmployee: false,
        SkillSheet: employee.skillsheet
      }
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("社員を追加しました");
        router.push('/employees');
      } else {
        const errorText = await response.text();
        console.error("登録エラー:", errorText);
        alert("エラーが発生しました");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("通信エラーが発生しました");
    }
  };

  return (
    <Layout>
      <div>
        <h2>新しい社員を追加</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>社員ID:</label>
            <input
              type="text"
              value={employee.id}
              onChange={(e) => handleChange('id', e.target.value)}
            />
          </div>
          <div>
            <label>単価:</label>
            <input
              type="text"
              value={employee.money}
              onChange={(e) => handleChange('money', e.target.value)}
            />
          </div>
          <div>
            <label>参画開始日:</label>
            <input
              type="text"
              value={employee.in}
              onChange={(e) => handleChange('in', e.target.value)}
            />
          </div>
          <div>
            <label>参画終了日:</label>
            <input
              type="text"
              value={employee.out}
              onChange={(e) => handleChange('out', e.target.value)}
            />
          </div>
          <div>
            <label>ステータス:</label>
            <input
              type="text"
              value={employee.status}
              onChange={(e) => handleChange('status', e.target.value)}
            />
          </div>
          <div>
            <label>案件名（Vender）:</label>
            <input
              type="text"
              value={employee.project}
              onChange={(e) => handleChange('project', e.target.value)}
            />
          </div>
          <div>
            <label>スキルシートファイル名:</label>
            <input
              type="text"
              value={employee.skillsheet}
              onChange={(e) => handleChange('skillsheet', e.target.value)}
            />
          </div>
          <button type="button" onClick={handleSave}>
            追加
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EmployeeCreate;
