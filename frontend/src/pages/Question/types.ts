/**
 * Question ページの共通型定義。
 * - Msg: チャットの1メッセージ（AI or ユーザー）
 * - Question: 一問一答の1問（id / テキスト / 選択肢）
 * 他ファイル（ChatQA / ChatMessages など）から参照される、UI非依存の型集です。
 */
export type Msg = { 
  role: "ai" | "user"; 
  text: string 
};

export type Question = {
  id: string;
  text: string;
  options: string[];
};
