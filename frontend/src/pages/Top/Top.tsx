import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Top() {
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
    <div
      className="flex flex-col items-center justify-between"
      style={{
        height: "calc(var(--vh) * 100)",
        backgroundColor: "#FAF9F6", // ★ロゴと同じ背景色
      }}
    >
      <Header />

      <main className="flex flex-col items-center w-full max-w-md text-center space-y-6 mt-6">
        <h2 className="text-3xl font-bold text-gray-800 leading-snug">
          街を変えると、暮らしが変わる
        </h2>
        <p className="text-base text-gray-500">
          あなたにぴったりの街をAIが提案します
        </p>

        <div className="bg-white shadow-sm rounded-lg px-3 py-1 text-gray-700 text-sm">
          フッ…お前に合う街を見つけてやろう
        </div>

        <img
          src="/assets/gendo-silhouette.png"
          alt="キャラクター"
          className="w-20 h-auto rounded-md shadow-sm"
        />

        <button className="w-full max-w-xs bg-green-400 hover:bg-green-500 text-white text-lg font-bold rounded-full py-3 transition shadow-md">
          相談を始める
        </button>
      </main>

      <Footer />
    </div>
  );
}
