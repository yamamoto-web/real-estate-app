/**
 * Question ページ専用のカスタムフック。
 * 役割:
 *  - /v1/chat_intro を「1度だけ」呼び、イントロ文を取得
 *  - 「入力中…」のブレイク演出（タイマー）
 *  - 1問目のテキストを自動投入
 * 特徴:
 *  - React StrictMode の useEffect 二重実行を didInit でガード
 *  - setTimeout のクリーンアップを徹底
 * 使い方（Question.tsx から）:
 *  useIntroOnce({
 *    apiUrl, payload, firstQuestionText,
 *    onIntro, onShowFirstQuestion, onTyping, scrollToBottom
 *  })
 */
import { useEffect, useRef } from "react";
import axios from "axios";

type Payload = Record<string, unknown>;

export function useIntroOnce(opts: {
  apiUrl: string;
  payload: Payload;
  firstQuestionText?: string;
  onIntro: (intro: string) => void;
  onShowFirstQuestion: (text: string) => void;
  onTyping: (v: boolean) => void;
  scrollToBottom?: () => void;
}) {
  const { apiUrl, payload, firstQuestionText, onIntro, onShowFirstQuestion, onTyping, scrollToBottom } = opts;
  const didInit = useRef(false);             // StrictMode 対策
  const timers = useRef<number[]>([]);       // タイマーID管理

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    (async () => {
      try {
        const res = await axios.post<{ intro: string }>(`${apiUrl}/v1/chat_intro`, payload);
        onIntro(res.data.intro);
      } catch {
        onIntro(
          `ライフステージ「${String(payload["stageLabel"] ?? "")}」に合わせた街選びをしますね。\nこれからいくつか質問させてください！`
        );
      } finally {
        // ブレイク演出 → 1問目の自動表示
        timers.current.push(
          window.setTimeout(() => {
            onTyping(true);
            scrollToBottom?.();
          }, 300)
        );
        timers.current.push(
          window.setTimeout(() => {
            onTyping(false);
            if (firstQuestionText) onShowFirstQuestion(firstQuestionText);
            scrollToBottom?.();
          }, 1100)
        );
      }
    })();

    return () => {
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
      onTyping(false);
    };
  }, []);
}
