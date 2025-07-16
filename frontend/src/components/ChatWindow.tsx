import { useEffect, useState } from "react";
import { startSession, sendQuestion, getResult } from "../api/sessionApi";

interface HistoryItem {
  q: string;
  a: string;
}

export default function ChatWindow() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [result, setResult] = useState<{ final_answer: string; recommended_area: string } | null>(null);

  useEffect(() => {
    async function init() {
      const id = await startSession();
      setSessionId(id);
    }
    init();
  }, []);

  async function handleSend() {
    if (!question.trim()) return;

    // セッション開始（まだなら）
    if (!sessionId) {
      const newSessionId = await startSession();
      console.log("新規セッションID:", newSessionId);
      setSessionId(newSessionId);
    }

    // 質問送信
    if (sessionId) {
      const res = await sendQuestion(sessionId, question);

      console.log("APIレスポンス:", res); // ★ここでレスポンスを確認

      setHistory((prev) => [...prev, { q: question, a: res.answer }]);
      setQuestion("");
    }
  }

  return (
    <div>
      <h1>不動産相談AI</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="質問を入力"
      />
      <button onClick={handleSend}>送信</button>

      <div>
        {history.map((item, index) => (
          <div key={index}>
            <p>Q: {item.q}</p>
            <p>A: {item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
