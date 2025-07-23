import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // ✅ ユーザーの質問を履歴に追加
    const newMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    // ✅ 仮のAI回答（後でAPI連携）
    const aiReply: Message = {
      role: "ai",
      text: `なるほど、「${input}」ですね！`,
    };
    setTimeout(() => {
      setMessages((prev) => [...prev, aiReply]);
    }, 500);

    setInput("");
  };

  return (
    <main className="min-h-screen flex flex-col w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
        AIと相談してみましょう
      </h2>

      {/* チャット履歴エリア */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 border rounded p-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-green-100 text-right ml-auto"
                : "bg-white text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 入力フォーム */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力"
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleSend}
          className="bg-green-400 hover:bg-green-500 text-white font-bold rounded px-4"
        >
          送信
        </button>
      </div>

      {/* 結果画面へ */}
      <button
        onClick={() => navigate("/Result")}
        className="mt-4 w-full bg-green-400 hover:bg-green-500
                   text-white text-lg font-bold rounded-lg py-3 shadow"
      >
        結果を見る
      </button>
    </main>
  );
}
