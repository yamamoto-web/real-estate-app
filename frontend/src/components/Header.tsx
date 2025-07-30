import { Bars3Icon } from "@heroicons/react/24/outline"; // ★追加
import logo from "../assets/machimatch-logo.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full max-w-md px-4 py-4 bg-[#FAF9F6] shadow">
      {/* 左側：ロゴ + テキスト */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="まちマッチ" className="w-28 h-auto" />
        <p className="text-base text-gray-500 font-medium">
          街とあなたを繋ぐ暮らしのAI相談
        </p>
      </div>

      {/* 右側：ハンバーガーメニュー */}
      {/* <button className="p-2 rounded hover:bg-gray-100">
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button> */}
    </header>
  );
}