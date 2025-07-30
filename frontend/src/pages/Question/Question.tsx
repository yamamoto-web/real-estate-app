import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getStageLabelById } from "@common/stageUtils";
import axios from "axios";

interface Question {
  id: string;
  text: string;
  options: string[];
}

interface IntroResponse {
  intro: string;
}

export default function ChatQA() {
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // URLのParamの取得(可読性が下がるため今後対応)
  const stage = searchParams.get("stage") ?? "";
  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  const budget = searchParams.get("budget");
  const time = searchParams.get("time");
  const priority = searchParams.get("priority")?.split(","); // カンマ区切り配列
  const stageLabel = getStageLabelById(stage); 

  const questions: Question[] = [
    {
      id: "q1",
      text: "夜疲れて帰ってきたときに、コンビニやスーパーが近いほうがいいですか？",
      options: ["はい", "どちらでもよい", "いいえ"],
    },
    {
      id: "q2",
      text: "多少家賃が高くても駅近を選びますか？",
      options: ["はい", "どちらでもよい", "いいえ"],
    },
  ];
  useEffect(() => {
  const fetchIntro = async () => {
    try {
      const response = await axios.post<IntroResponse>("http://127.0.0.1:8000/v1/chat_intro", {
        stage,
        stageLabel,
        age,
        gender,
        budget,
        time,
        priority,    
      });
      setMessages([{ role: "ai", text: response.data.intro }]);
    } catch {
      setMessages([
        {
          role: "ai",
          text: `ライフステージ「${stage}」に合わせた街選びをしますね。\nこれからいくつか質問させてください！`,
        },
      ]);
    }
  };
  fetchIntro();
}, []);

  const handleAnswer = (answer: string) => {
    const q = questions[currentQ];
    setAnswers({ ...answers, [q.id]: answer });

    setMessages((prev) => [...prev, { role: "user", text: answer }]);

    if (currentQ + 1 < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: questions[currentQ + 1].text },
        ]);
      }, 500);
      setCurrentQ(currentQ + 1);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "お疲れ様でした。これでヒアリングは完了です。" },
        ]);
      }, 500);
        // 質問終了後に+1して終了状態にする
        setCurrentQ(currentQ + 1);
    }
  };

  const handleFinalResult = async () => {
     try {
    const response = await axios.post("http://127.0.0.1:8000/v1/result", {
      stage,
      stageLabel,
      age,
      gender,
      budget,
      time,
      priority,
    });
    navigate("/Result", { state: response.data });
    } catch (error) {
      console.error("最終結果取得エラー: ", error);
    }
  };

  return (
    <main className="min-h-screen max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
        AI相談
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        （ライフステージ：{stageLabel}）
      </p>

      {/* チャット履歴 */}
      <div className="space-y-2 border rounded p-2 mb-4 bg-gray-50 h-[60vh] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "ai"
                ? "bg-white text-left"
                : "bg-green-100 text-right ml-auto"
            }`}
            >
            {msg.text}
          </div>
        ))}
      </div>

      {/* 質問選択肢 */}
      {currentQ < questions.length && (
        <div className="flex gap-2 flex-wrap">
          {questions[currentQ].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="px-4 py-2 rounded-lg border bg-white hover:bg-green-50"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* 最終結果ボタン */}
      {currentQ >= questions.length && (
        <button
          onClick={handleFinalResult}
          className="mt-2 w-full bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-lg py-2"
        >
          相談結果を見る
        </button>
      )}
    </main>
  );
}
