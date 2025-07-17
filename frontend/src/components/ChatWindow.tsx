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

    // セッション開始
    if (!sessionId) {
      const newSessionId = await startSession();
      console.log("新規セッションID:", newSessionId);
      setSessionId(newSessionId);
    }

    // 質問送信
    if (sessionId) {
      const res = await sendQuestion(sessionId, question);
      
      // レスポンスを確認
      console.log("APIレスポンス:", res);

      setHistory((prev) => [...prev, { q: question, a: res.answer }]);
      setQuestion("");
    }
  }

  // 相談完了ボタンクリック時
  async function handleFinish() {
    if (!sessionId) return;

    const res = await getResult(sessionId);
    console.log("相談結果:", res);
    
    // 相談結果の保存
    setResult(res); 
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
      {/* 相談完了ボタン */}
      <button onClick={handleFinish} style={{ marginLeft: "10px" }}>
        相談完了
      </button>

      {/* 履歴表示 */}
      <div>
        {history.map((item, index) => (
          <div key={index}>
            <p>Q: {item.q}</p>
            <p>A: {item.a}</p>
          </div>
        ))}
      </div>
      {/* 最終提案表示 */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>相談結果</h2>
          <p>{result.final_answer}</p>
          <p><strong>おすすめ地域:</strong> {result.recommended_area}</p>
        </div>
        )}
    </div>
  );
}
