/**
 * 一問一答のコンテナコンポーネント（状態＆遷移の中核）。
 * 役割:
 *  - URLパラメータの取得と API への受け渡し
 *  - イントロ取得（useIntroOnce）とチャット履歴の管理
 *  - 質問の進行・回答処理・最終結果送信
 * 責務分割:
 *  - 表示: components/ChatMessages, components/QuickReplies
 *  - 副作用: hooks/useIntroOnce
 *  - 型: types.ts
 * メモ:
 *  - UI（JSX構造や className）は維持。内部ロジックだけ分離して見通しを向上。
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStageLabelById } from "@common/stageUtils";
import { useIntroOnce } from "./hooks/useIntroOnce";
import { ChatMessages } from "./components/ChatMessages";
import { QuickReplies } from "./components/QuickReplies";
import type { Msg, Question } from "./types";

export default function ChatQA() {
  const nav = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const stage = params.get("stage") ?? "";
  const age = params.get("age");
  const gender = params.get("gender");
  const budget = params.get("budget");
  const plan = params.get("plan");
  const time = params.get("time");
  const area = params.get("area");
  const priority = (params.get("priority") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const stageLabel = getStageLabelById(stage);
  const apiUrl = import.meta.env.VITE_API_URL;

  // --- 状態 ---
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [weights, setWeights] = useState<Record<string, number>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  const timers = useRef<number[]>([]);

  const speak = (text: string, delay = 400) => {
  setTyping(true);
  const id = window.setTimeout(() => {
    setMessages((prev) => [...prev, { role: "ai", text }]);
    setTyping(false);
  }, delay);
  timers.current.push(id);
  };
  
  // アンマウント時にタイマー解除
  useEffect(() => {
    return () => {
      timers.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // --- 質問事項一覧---
  // 1問目は“最優先を決める”を動的生成
  const firstQuestion: Question | null = useMemo(
    () =>
      priority.length >= 2
        ? {
            id: "topPriority",
            text: "この3つの中で、いちばん大事なのはどれですか？",
            options: priority.slice(0, 3),
          }
        : null,
    [priority]
  );

  const baseQuestions: Question[] = [
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
  const questions: Question[] = firstQuestion ? [firstQuestion, ...baseQuestions] : baseQuestions;
  // --- 質問事項一覧---------ここまで-------

  // --- イントロ＋1問目の自動表示（StrictMode 対策込み） ---
  useIntroOnce({
    apiUrl,
    payload: { stage, stageLabel, age, gender, budget, plan, time, area, priority },
    firstQuestionText: questions[0]?.text,
    onIntro: (intro) => setMessages([{ role: "ai", text: intro }]),
    onShowFirstQuestion: (text) => setMessages((prev) => [...prev, { role: "ai", text }]),
    onTyping: setTyping,
    scrollToBottom,
  });

  // --- 回答処理 ---
  const handleAnswer = (answer: string) => {
    const q = questions[currentQ];
    setMessages((prev) => [...prev, { role: "user", text: answer }]);

    // 1問目で重みを決定（1位=3 / 残り=2,1）
    if (q.id === "topPriority" && firstQuestion) {
      const top = answer;
      const rest = firstQuestion.options.filter((o) => o !== top);
      setWeights({
        [top]: 3,
        ...(rest[0] && { [rest[0]]: 2 }),
        ...(rest[1] && { [rest[1]]: 1 }),
      });
    }
  //回答時に「入力中...」を表示し、次の質問を少し遅延して表示
     if (currentQ + 1 < questions.length) {
      setCurrentQ((i) => i + 1);
      speak(questions[currentQ + 1].text); 
    } else {
      setCurrentQ((i) => i + 1);
      speak("お疲れ様でした。これでヒアリングは完了です。"); 
    }
  };

  // --- 最終結果 ---
  const handleFinalResult = async () => {
    try {
      const res = await fetch(`${apiUrl}/v1/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage,
          stageLabel,
          age,
          gender,
          budget,
          plan,
          time,
          area,
          priority,
          weights,
        }),
      });
      const data = await res.json();
      nav("/Result", { state: data });
    } catch (e) {
      console.error("最終結果取得エラー:", e);
    }
  };

  // --- スクロール追随 ---
  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  return (
    <main className="min-h-screen max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 text-center mb-4">AI相談</h2>
      <p className="text-sm text-gray-500 text-center mb-4">（ライフステージ：{stageLabel}）</p>

      <ChatMessages messages={messages} typing={typing} ref={bottomRef} />

      {currentQ < questions.length ? (
        <QuickReplies options={questions[currentQ].options} onSelect={handleAnswer} />
      ) : (
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
