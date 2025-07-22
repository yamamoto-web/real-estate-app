import { useState, useEffect } from "react";
import { startSession, sendQuestion, getResult } from "../api/sessionApi";
import gendoSilhouette from "../assets/gendo-silhouette.png"; 

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
    <div className="bg-[#F5F9FF] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 max-w-md w-full relative">
        
        {/* タイトル */}
        <div className="absolute top-3 left-3 text-xl font-bold text-[#AEE1F9]">
          まちマッチ
        </div>

        {/* ▼ 初期画面：ゲンドウ風相談役 */}
        <div className="flex items-center mb-4 mt-10">
          <img
            src={gendoSilhouette}
            alt="相談役"
            className="w-16 h-16 rounded-full bg-gray-200 p-1"
          />
          <div className="bg-[#AEE1F9] rounded-lg p-3 ml-2 text-gray-800 text-sm md:text-base">
            フッ…お前に合う街を見つけてやろう
          </div>
        </div>

        {/* 仮のボタン部分 */}
        <button
          onClick={handleNext}
          className="bg-[#B8E4C9] text-gray-700 rounded-full px-4 py-3 w-full text-sm md:text-base hover:opacity-90"
        >
          はじめる
        </button>
      </div>
    </div>
  );
}
