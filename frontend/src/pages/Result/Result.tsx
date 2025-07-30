import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  type Area = {
  name: string;
  reason: string;
  };
  const location = useLocation();
  const navigate = useNavigate();
  const { recommended_area, comment }: { recommended_area: Area[], comment: string } = location.state || {
  recommended_area: [],
  comment: "データがありません",
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center space-y-6">
    <h2 className="text-xl font-bold text-gray-800">最終おすすめ結果</h2>

    {recommended_area.length > 0 ? (
      <>
        <div>
          <p className="text-gray-700 font-semibold mb-2">
            ✅ あなたへのおすすめTOP3
          </p>
          <ul className="text-left list-decimal list-inside text-gray-600 space-y-1">
            {recommended_area.slice(0, 3).map((area: any, idx: number) => (
              <li key={idx}>
                {area.name}（{area.reason}）
              </li>
            ))}
          </ul>
        </div>

        <p className="text-green-600 font-bold">{comment}</p>
      </>
    ) : (
      <p className="text-red-500">結果が取得できませんでした。</p>
    )}

    <button
      onClick={() => navigate("/")}
      className="mt-4 w-full bg-green-400 hover:bg-green-500 text-white font-bold rounded-lg py-2 transition"
    >
      トップに戻る
    </button>
  </div>
</main>
  );
}
