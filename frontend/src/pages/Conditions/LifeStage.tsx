import { useNavigate } from "react-router-dom";
import { stages } from "@common/stages";

export default function LifeStage() {
  const navigate = useNavigate();

  const handleSelect = (stageId: string) => {
    navigate(`/Conditions/Detail?stage=${stageId}`);
  };

  return (
    <main className="min-h-screen max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 text-center mt-4 mb-6">
        あなたの現在のライフステージを教えてください
      </h2>

      {/* 上6つはグリッド */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {stages.slice(0, 6).map((stage) => (
          <div key={stage.id} className="flex flex-col items-center">
            <button
              onClick={() => handleSelect(stage.id)}
              className="p-4 rounded-lg border text-center w-full bg-white border-gray-300 hover:shadow-md hover:bg-green-50 transition"
            >
              <div className="text-2xl mb-1">{stage.icon}</div>
              <div className="font-semibold">{stage.label}</div>
            </button>
            <div className="text-xs text-gray-500 mt-1">{stage.sub}</div>
          </div>
        ))}
      </div>

      {/* その他はコンパクトに中央寄せ */}
      <div className="mt-4 flex justify-center">
        <div className="flex flex-col items-center">
          <button
            onClick={() => handleSelect(stages[6].id)}
            className="px-6 py-4 rounded-lg border text-center bg-white border-gray-300 hover:shadow-md hover:bg-green-50 transition"
          >
            <div className="text-2xl mb-1">{stages[6].icon}</div>
            <div className="font-semibold">{stages[6].label}</div>
          </button>
          <div className="text-xs text-gray-500 mt-1">{stages[6].sub}</div>
        </div>
      </div>
    </main>
  );
}
