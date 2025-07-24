import React from "react";
import { useNavigate } from "react-router-dom";

const stages = [
  { id: "study", label: "進学・学業関連", sub: "→大学・専門学校に進学", icon: "🎓" },
  { id: "job", label: "就職・転職・転勤", sub: "→初めての就職・転職・職場変更", icon: "💼" },
  { id: "marriage", label: "結婚・同棲", sub: "→結婚・同棲を始める", icon: "💍" },
  { id: "child", label: "出産・子育て", sub: "→子育てしやすい場所へ", icon: "👶" },
  { id: "lifestyle", label: "独立・ライフスタイル変更", sub: "→独立・起業／テレワークしやすい家へ", icon: "🏠" },
  { id: "family", label: "実家・家族の都合", sub: "→実家に近い場所へ／介護・家族都合", icon: "👪" },
  { id: "other", label: "その他", sub: "→理由はないが良い場所があれば", icon: "✨" },
];

export default function LifeStage() {
  const navigate = useNavigate();

  const handleSelect = (stageId: string) => {
    navigate(`/Conditions/Detail?stage=${stageId}`);
  };

  return (
    <main className="min-h-screen max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 text-center mt-4 mb-6">
        あなたの現在のライフステージを教えてください
      </h2>

      {/* ✅ 上6つはグリッド */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {stages.slice(0, 6).map((stage) => (
          <div key={stage.id} className="flex flex-col items-center">
            <button
              onClick={() => handleSelect(stage.id)}
              className="p-4 rounded-lg border text-center w-full bg-white border-gray-300 hover:shadow-md hover:bg-green-50 transition"
            >
              <div className="text-2xl mb-1">{stage.icon}</div>
              <div className="font-semibold">{stage.label}</div>
            </button>
            <div className="text-xs text-gray-500 mt-1">{stage.sub}</div>
          </div>
        ))}
      </div>

      {/* ✅ その他はコンパクトに中央寄せ */}
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleSelect(stages[6].id)}
            className="px-6 py-4 rounded-lg border text-center bg-white border-gray-300 hover:shadow-md hover:bg-green-50 transition"
          >
            <div className="text-2xl mb-1">{stages[6].icon}</div>
            <div className="font-semibold">{stages[6].label}</div>
          </button>
          <div className="text-xs text-gray-500 mt-1">{stages[6].sub}</div>
        </div>
      </div>
    </main>
  );
}
