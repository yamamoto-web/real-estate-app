export default function ChatWindow() {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">不動産相談AI</h1>

      <div className="space-y-2 mb-4 bg-gray-50 p-3 rounded h-60 overflow-y-auto">
        {/* チャット履歴がここに入る想定 */}
        <p className="text-sm"><span className="font-semibold">Q:</span> おすすめ地域は？</p>
        <p className="text-sm"><span className="font-semibold text-blue-600">A:</span> 東京都では代々木や恵比寿がおすすめです。</p>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="質問を入力"
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">送信</button>
        <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">相談終了</button>
      </div>
    </div>
  );
}
