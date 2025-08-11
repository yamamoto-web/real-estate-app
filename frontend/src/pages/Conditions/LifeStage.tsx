import { useNavigate } from "react-router-dom";
import { stages } from "@common/stages";

export default function LifeStage() {
  const navigate = useNavigate();
  const handleSelect = (stageId: string) => {
    navigate(`/Conditions/Detail?stage=${stageId}`);
  };


  const cardClass =
    "w-full h-40 p-4 rounded-lg border border-gray-300 bg-white " +
    "hover:shadow-md hover:bg-green-50 transition " +
    "flex flex-col items-center justify-center text-center";

  return (
    <main className="min-h-screen max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 text-center mt-4 mb-6">
        あなたの現在のライフステージを教えてください
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => handleSelect(stage.id)}
            className={cardClass}
          >
            <div className="text-2xl mb-1">{stage.icon}</div>
            <div className="font-semibold">{stage.label}</div>
            {/* 補足もカード内に入れて高さを揃える。2行で省略 */}
            <div className="mt-1 text-xs text-gray-500 line-clamp-2 overflow-hidden">
              {stage.sub}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}