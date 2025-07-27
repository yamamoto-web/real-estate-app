import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommended_area, comment } = location.state || {
    recommended_area: [],
    comment: "データがありません",
  };

  return (
    <main className="min-h-screen max-w-md mx-auto p-4 text-center">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        最終おすすめ結果
      </h2>

      <div className="bg-white rounded-lg shadow p-4 space-y-2">
        {recommended_area.length > 0 ? (
          <>
            <p className="text-gray-700 font-semibold">
              ✅ あなたへのおすすめTOP3
            </p>
            <ul className="text-left list-decimal list-inside text-gray-600">
              {recommended_area.slice(0, 3).map((area: string, idx: number) => (
                <li key={idx}>{area}</li>
              ))}
            </ul>
            <p className="mt-4 text-green-600 font-bold">{comment}</p>
          </>
        ) : (
          <p className="text-red-500">結果が取得できませんでした。</p>
        )}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 w-full bg-green-400 hover:bg-green-500 text-white font-bold rounded-lg py-2"
      >
        トップに戻る
      </button>
    </main>
  );
}
