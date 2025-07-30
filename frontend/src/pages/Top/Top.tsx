import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Top() {
  const navigate = useNavigate();
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
  return (
    <main
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto text-center space-y-6"
      style={{
      height: "calc(var(--vh, 1vh) * 100)",  // JavaScriptで取得した高さを使う
      overflow: "hidden"
      }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-relaxed text-center">
        <span className="block">
          <span className="text-green-500">街</span>が変われば、<span className="text-green-500">暮らし</span>が変わる
        </span>
        <span className="block mt-1">
          <span className="text-green-500">暮らし</span>が変われば、<span className="text-green-500">人生</span>が変わる
        </span>
      </h2>

      <div className="mt-2 mb-4 text-sm text-gray-500 text-center">
      ※AIがあなたのライフステージに合う街を提案します
      </div>

      <button
          onClick={() => navigate("/Conditions/LifeStage")}
          className="w-full max-w-xs bg-green-400 hover:bg-green-500 text-white text-lg font-bold rounded-full py-3 transition shadow-md"
        >
          相談を始める
      </button>
    </main>
     );
}