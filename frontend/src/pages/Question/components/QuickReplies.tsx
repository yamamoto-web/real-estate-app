/**
 * 選択肢ボタン群（見た目専用）。
 * 役割:
 *  - options の配列をボタン化して横並び表示
 *  - クリックで選択値を親へ返す（onSelect）
 * 注意:
 *  - レイアウト/スタイルは Tailwind の className で調整。
 */
import { memo } from "react";

export const QuickReplies = memo(function QuickReplies({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (opt: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="px-4 py-2 rounded-lg border bg-white hover:bg-green-50"
        >
          {opt}
        </button>
      ))}
    </div>
  );
});
