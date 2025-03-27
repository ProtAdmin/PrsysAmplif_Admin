import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

interface Employee {
  id: string;
  money: string;
  in: string;
  out: string;
  status: string;
  project: string;
  skillsheet: string;
}

interface DynamoDBEmployee {
  UserID: string;
  Project?: {
    BillingRate?: string;
    IN?: string;
    OUT?: string;
    STATUS?: string;
    Vender?: string;
  };
  UserData?: {
    SkillSheet?: string;
  };
}

const EmployeeEdit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [employee, setEmployee] = useState<Employee>({
    id: "",
    money: "",
    in: "",
    out: "",
    status: "",
    project: "",
    skillsheet: "",
  });

  const fetchUser = useCallback(async (userId: string) => {
    const res = await fetch(
      `https://9dt3skcirl.execute-api.ap-northeast-1.amazonaws.com/DynamoDB-User-Get?tableName=Proto_User_Profiles`
    );
    const data = await res.json();

    const target = (data.data as DynamoDBEmployee[]).find(
      (emp) => emp.UserID === userId
    );
    if (target) {
      setEmployee({
        id: target.UserID,
        money: target.Project?.BillingRate || "",
        in: target.Project?.IN || "",
        out: target.Project?.OUT || "",
        status: target.Project?.STATUS || "",
        project: target.Project?.Vender || "",
        skillsheet: target.UserData?.SkillSheet || "",
      });
    } else {
      alert("対象の社員が見つかりませんでした");
      router.push("/employees");
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      fetchUser(id as string);
    }
  }, [id, fetchUser]);

  const handleChange = (key: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const url =
      "https://mu12g4o3v1.execute-api.ap-northeast-1.amazonaws.com/prod-DynamoDB-Users-Update";

    const payload = {
      UserID: employee.id,
      Project: {
        BillingRate: employee.money,
        IN: employee.in,
        OUT: employee.out,
        STATUS: employee.status,
        Vender: employee.project,
      },
      UserData: {
        Age: null,
        JoiningMonth: null,
        KeyEmployee: false,
        SkillSheet: employee.skillsheet,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("社員情報を更新しました");
      router.push("/employees");
    } else {
      alert("更新に失敗しました");
    }
  };

  const fieldLabels: { [key in keyof Employee]: string } = {
    id: "社員ID",
    money: "単価",
    in: "参画開始日",
    out: "参画終了日",
    status: "ステータス",
    project: "参画先",
    skillsheet: "スキルシートファイル名",
  };

  return (
    <Layout>
      <h2>社員情報を編集</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {Object.entries(employee).map(([key, value]) => (
          <div key={key}>
            <label>{fieldLabels[key as keyof Employee]}</label>
            <input
              type="text"
              value={value}
              readOnly={key === "id"}
              onChange={(e) =>
                handleChange(key as keyof Employee, e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={handleSave}>
          更新
        </button>
      </form>
    </Layout>
  );
};

export default EmployeeEdit;
