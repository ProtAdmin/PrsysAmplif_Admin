import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";

interface Employee {
  id: string;
  name: string;
  email: string;
  money: string;
  in: string;
  out: string;
  mail: string;
  status: string;
  project: string;
  skillsheet: string;
  [key: string]: string;
}

const EmployeeEdit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = !!id;

  const [employee, setEmployee] = useState<Employee>({
    id: '',
    name: '',
    email: '',
    money: '',
    in: '',
    out: '',
    mail: '',
    status: '',
    project: '',
    skillsheet: '',
  });

  // 修正された handleChange 関数
  const handleChange = (key: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const url = isEditing
      ? `https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/prod-DynamoDB-Users-Update`
      : `https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/prod-DynamoDB-Users-Update`;

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
      },
      watch: {
        Dummy01: false, Dummy02: false, Dummy03: false, Dummy04: false,
        Dummy05: false, Dummy06: false, Dummy07: false, Dummy08: false,
        Dummy09: false, Dummy10: false
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("社員を追加しました");
      router.push('/employees');
    } else {
      alert("エラーが発生しました");
    }
  };

  return (
    <Layout>
      <div>
        <h2>{isEditing ? '社員情報を編集' : '新しい社員を追加'}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.keys(employee).map((key) => (
            <div key={key}>
              <label>{key}:</label>
              <input
                type="text"
                value={employee[key] as string}
                onChange={(e) => handleChange(key as keyof Employee, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleSave}>
            {isEditing ? '更新' : '追加'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EmployeeEdit;
