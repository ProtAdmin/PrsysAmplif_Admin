import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";// ✅ Layoutを適用

const EmployeeEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const isEditing = !!id;

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
    [key: string]: string;  // 🔹 インデックスシグネチャを追加
  }
  
  
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

  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:8080/api/employees/${id}`)
        .then((res) => res.json())
        .then((data) => setEmployee(data))
        .catch((err) => console.error('Error fetching employee:', err));
    }
  }, [id, isEditing]);

  const handleChange = (key: keyof Employee, value: string) => {
    setEmployee((prev) => ({
      ...prev,
      [key]: value,
    }));
  };  

  const handleSave = async () => {
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/api/employees/${id}`
      : 'http://localhost:8080/api/employees';

    interface EmployeePayload {
        id: number;
        name: string;
        email: string;
        money: number;
        in: number;
        out: number;
        mail: string;
        status: string;
        project: string;
        skillsheet: string;
        _id?: number;
    }

    const payload: EmployeePayload = {
      ...employee,
      id: parseInt(employee.id, 10) || 0,
      money: parseInt(employee.money, 10) || 0,
      in: parseInt(employee.in, 10) || 0,
      out: parseInt(employee.out, 10) || 0,
    };

    // 🔹 MongoDBの自動生成IDを削除（新規作成時のみ）
    if (!isEditing && payload._id) {
      delete payload._id;
    }

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert(isEditing ? '社員情報を更新しました' : '社員を追加しました');
      router.push('/employees');
    } else {
      alert('エラーが発生しました');
    }
  };

  const handleDelete = async () => {
    if (!isEditing) return;

    if (confirm('本当に削除しますか？')) {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, { method: 'DELETE' });

      if (response.ok) {
        alert('社員を削除しました');
        router.push('/employees');
      } else {
        alert('削除に失敗しました');
      }
    }
  };

  // 🏷️ ラベル名のマッピング
  const labels: { [key: string]: string } = {
    id: '社員ID',
    name: '氏名',
    email: 'メールアドレス',
    money: '単価',
    in: '参画開始',
    out: '参画終了',
    mail: '連絡先',
    status: 'ステータス',
    project: '参画先',
    skillsheet: 'スキルシート',
  };

  return (
    <Layout>
      <div>
        <h2>{isEditing ? '社員情報を編集' : '新しい社員を追加'}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.keys(employee).map((key) => (
            <div key={key}>
              <label>{labels[key] || key}:</label>
              <input
                type="text"
                value={employee[key] as string}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleSave}>
            {isEditing ? '更新' : '追加'}
          </button>
          {isEditing && (
            <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
              削除
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default EmployeeEdit;
