import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startSession, sendQuestion, getResult } from "../../api/sessionApi";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");

  // ✅ 初回レンダリング時にセッション開始
  useEffect(() => {
    const initSession = async () => {
      const id = await startSession();
      console.log("Session started:", id);
      setSessionId(id);

      // 初期メッセージをAI役で表示
      setMessages([
        { role: "ai", text: "フッ…お前に合う街を見つけてやろう" },
      ]);
    };
    initSession();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    // ✅ ユーザーの質問を履歴に追加
    const newMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      // ✅ AIに質問送信 & 応答を受け取る
      const aiResponse = await sendQuestion(sessionId, input);

      // 返ってくるデータ構造が { answer: "～～" } なら以下
      const aiReply: Message = { role: "ai", text: aiResponse.answer };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error("AI応答取得エラー:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "すまん…今は答えられないようだ" },
      ]);
    }

    setInput("");
  };

  const handleResult = async () => {
    if (!sessionId) return;
    try {
      const finalResult = await getResult(sessionId);
      console.log("最終結果:", finalResult);
      navigate("/Result", { state: { result: finalResult } });
    } catch (error) {
      console.error("結果取得エラー:", error);
      alert("結果取得に失敗しました");
    }
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
        onClick={handleResult}
        className="mt-4 w-full bg-green-400 hover:bg-green-500
                   text-white text-lg font-bold rounded-lg py-3 shadow"
      >
        結果を見る
      </button>
    </main>
  );
}
