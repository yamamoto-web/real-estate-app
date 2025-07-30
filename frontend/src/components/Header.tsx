// import { Bars3Icon } from "@heroicons/react/24/outline"; // ★追加
import logo from "../assets/machimatch-logo.png";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between w-full max-w-md px-4 bg-[#FAF9F6] shadow">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="まちマッチ" className="w-28 h-auto" />
        <p className="text-base text-gray-500 font-medium">
          街とあなたを繋ぐ暮らしのAI相談
        </p>
      </div>
    </header>
  );
}