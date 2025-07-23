import React from "react";
import { useNavigate } from "react-router-dom";

export default function LifeStage() {
  const navigate = useNavigate();

  // ✅ 仮データ（将来はAPI or 定数管理に変更予定）
  const stages = [
    { id: 1, label: "一人暮らし" },
    { id: 2, label: "結婚・同棲" },
    { id: 3, label: "子育て" },
    { id: 4, label: "セカンドライフ" },
  ];

  // ✅ ボタンクリック時の処理（詳細条件画面へ遷移予定）
  const handleSelect = (stageId: number) => {
    console.log("選択されたステージID:", stageId);
    navigate("/Conditions/Detail"); // → 詳細条件画面に遷移予定
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center
                 w-full max-w-md mx-auto text-center space-y-6 p-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        あなたのライフステージを選んでください
      </h2>

      <div className="w-full space-y-4">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => handleSelect(stage.id)}
            className="w-full bg-green-400 hover:bg-green-500
                       text-white text-lg font-bold rounded-lg py-3
                       shadow transition"
          >
            {stage.label}
          </button>
        ))}
      </div>
    </main>
  );
}