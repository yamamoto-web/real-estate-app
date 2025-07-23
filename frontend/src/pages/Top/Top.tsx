import React from "react";

export default function Top() {
  return (
    <main className="flex flex-col items-center w-full max-w-md text-center space-y-6 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 leading-snug">
        街を変えると、暮らしが変わる
      </h2>
      <p className="text-base text-gray-500">
        あなたにぴったりの街をAIが提案します
      </p>

      <div className="bg-white shadow-sm rounded-lg px-4 py-2 text-gray-700 text-sm max-w-sm">
        ※AIがあなたのライフステージに合う街を提案します
      </div>

      <button className="w-full max-w-xs bg-green-400 hover:bg-green-500 text-white text-lg font-bold rounded-full py-3 transition shadow-md">
        相談を始める
      </button>
    </main>
  );
}