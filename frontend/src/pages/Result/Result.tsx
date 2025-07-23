import React from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();

  // ✅ 仮データ（後でAPI連携予定）
  const results = [
    {
      id: 1,
      city: "吉祥寺",
      reason: "子育て環境が充実しており、交通の便が良い",
      link: "https://example.com/kichijoji"
    },
    {
      id: 2,
      city: "三鷹",
      reason: "自然が多く、ファミリー向け住宅が豊富",
      link: "https://example.com/mitaka"
    },
    {
      id: 3,
      city: "荻窪",
      reason: "駅周辺に商業施設が多く生活利便性が高い",
      link: "https://example.com/ogikubo"
    },
  ];

  return (
    <main className="min-h-screen w-full max-w-md mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        AIがおすすめする街はこちらです
      </h2>

      <div className="space-y-4">
        {results.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 bg-white shadow space-y-2"
          >
            <p className="text-lg font-bold text-green-600">{item.city}</p>
            <p className="text-sm text-gray-700">{item.reason}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-500 text-sm underline"
            >
              詳細を見る
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="w-full bg-green-400 hover:bg-green-500
                   text-white text-lg font-bold rounded-lg py-3 shadow"
      >
        トップに戻る
      </button>
    </main>
  );
}
