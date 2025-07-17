import { useState, useEffect } from "react";
import { startSession, sendQuestion, getResult } from "../api/sessionApi";

export default function ChatWindow() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [distance, setDistance] = useState("");
  const [sessionId, setSessionId] = useState("");

  // 初回レンダリング時にセッションを開始
  useEffect(() => {
    const initSession = async () => {
      const id = await startSession();
      console.log("Session started:", id);
      setSessionId(id);
    };
    initSession();
  }, []);

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      if (!sessionId) {
        alert("セッションが開始されていません");
        return;
      }

      // まず最後にもう一度「まとめ質問」を送る（履歴に追加する）
      await sendQuestion(
        sessionId,
        `エリア:${area}、予算:${budget}万円、駅距離:${distance}でおすすめの地域は？`
      );

      // その後、最終結果を取得する
      const finalResult = await getResult(sessionId);
      alert(`最終おすすめ地域: ${finalResult.recommended_area}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">不動産相談ステップ</h2>

      {step === 1 && (
        <div>
          <p className="mb-2">1. 住みたい地域を教えてください</p>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-2">2. 希望予算を教えてください（万円）</p>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="mb-2">3. 駅からの距離を教えてください（徒歩○分など）</p>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="mb-2 font-semibold">4. 条件をまとめます</p>
          <p>地域: {area}</p>
          <p>予算: {budget} 万円</p>
          <p>駅距離: {distance}</p>
        </div>
      )}

      <button
        onClick={handleNext}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {step < 4 ? "次へ" : "相談結果を見る"}
      </button>
    </div>
  );
}
