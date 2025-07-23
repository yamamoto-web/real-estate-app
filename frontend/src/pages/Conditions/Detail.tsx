import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Conditions() {
  const navigate = useNavigate();

  // ✅ 仮のstate（後でAPI連携時に整理）
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    prefecture: "",
    station: "",
    commuteTime: "",
    budget: "",
    priority1: "",
    priority2: "",
    priority3: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("入力内容:", formData);
    navigate("/Question"); // ✅ 結果画面へ遷移
  };

  return (
    <main className="min-h-screen w-full max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">詳細条件を入力してください</h2>

      {/* 年齢・性別 */}
      <div className="flex space-x-2">
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="年齢"
          className="flex-1 border rounded p-2"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="flex-1 border rounded p-2"
        >
          <option value="">性別</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
      </div>

      {/* 都道府県・エリア */}
      <input
        type="text"
        name="prefecture"
        value={formData.prefecture}
        onChange={handleChange}
        placeholder="都道府県 / エリア"
        className="w-full border rounded p-2"
      />

      {/* 最寄り駅・エリア */}
      <input
        type="text"
        name="station"
        value={formData.station}
        onChange={handleChange}
        placeholder="通勤/通学 最寄り駅・エリア"
        className="w-full border rounded p-2"
      />

      {/* 通勤時間 */}
      <input
        type="text"
        name="commuteTime"
        value={formData.commuteTime}
        onChange={handleChange}
        placeholder="通勤/通学時間 (例:30分)"
        className="w-full border rounded p-2"
      />

      {/* 予算 */}
      <input
        type="number"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        placeholder="予算 (円)"
        className="w-full border rounded p-2"
      />

      {/* 上位3件優先項目 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">上位3件優先項目（必須）</p>
        <input
          type="text"
          name="priority1"
          value={formData.priority1}
          onChange={handleChange}
          placeholder="1位"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="priority2"
          value={formData.priority2}
          onChange={handleChange}
          placeholder="2位"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="priority3"
          value={formData.priority3}
          onChange={handleChange}
          placeholder="3位"
          className="w-full border rounded p-2"
        />
      </div>

      {/* 決定ボタン */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-400 hover:bg-green-500
                   text-white text-lg font-bold rounded-lg py-3 shadow"
      >
        AIに相談する
      </button>
    </main>
  );
}
