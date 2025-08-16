/**
 * チャット履歴の表示コンポーネント（見た目専用）。
 * 役割:
 *  - messages を吹き出し風に描画
 *  - typing=true のとき「入力中…」を表示
 *  - 最下部スクロール位置の ref を受け取り、末尾にダミー要素を配置
 * 注意:
 *  - 副作用なし（描画のみ）。ロジックはコンテナ/フック側に分離。
 */
import { forwardRef, memo, type ForwardedRef } from "react";
import type { Msg } from "../types";

export const ChatMessages = memo(
  forwardRef(function ChatMessages(
    { messages, typing }: { messages: Msg[]; typing: boolean },
    bottomRef: ForwardedRef<HTMLDivElement>
  ) {
    return (
      <div className="space-y-2 border rounded p-2 mb-4 bg-gray-50 h-[60vh] overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={`p-2 rounded-lg max-w-[80%] ${
              m.role === "ai" ? "bg-white text-left" : "bg-green-100 text-right ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="p-2 rounded-lg max-w-[80%] bg-white text-left text-gray-400">入力中…</div>
        )}
        <div ref={bottomRef} />
      </div>
    );
  })
);
