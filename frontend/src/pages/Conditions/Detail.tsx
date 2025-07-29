import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStageLabelById } from "@common/stageUtils";

export default function Conditions() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const stage = params.get("stage") ?? "";

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [area, setArea] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [priority, setPriority] = useState<string[]>([]);
  const stageLabel = getStageLabelById(stage);

  const handlePrioritySelect = (item: string) => {
    if (priority.includes(item)) {
      setPriority(priority.filter((i) => i !== item));
    } else if (priority.length < 3) {
      setPriority([...priority, item]);
    } else {
      alert("選べるのは最大3件までです");
    }
  };

  const handleNext = () => {
    if (!age || !area || !time || !budget || priority.length === 0) {
      alert("必須項目をすべて選択してください");
      return;
    }
    navigate(
      `/Question?stage=${stage}&age=${age}&gender=${gender}&area=${area}&time=${time}&budget=${budget}&priority=${priority.join(",")}`
    );
  };

  const renderButtons = (
    options: string[],
    selected: string,
    setSelected: (value: string) => void
  ) =>
    options.map((opt) => (
      <button
        key={opt}
        onClick={() => setSelected(opt)}
        className={`px-4 py-2 rounded-lg border transition ${
          selected === opt
            ? "bg-green-400 text-white"
            : "bg-white border-gray-300 hover:bg-green-50"
        }`}
      >
        {opt}
      </button>
    ));

  return (
    <main className="min-h-screen max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold text-gray-800 text-center mt-4 mb-6">
        あなたの条件を教えてください
      </h2>
      <p className="text-sm text-gray-500 text-center mb-4">
        （ライフステージ：{stageLabel}）
      </p>

      {/* 年齢 */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">年齢</h3>
        <div className="flex gap-2 flex-wrap">
          {renderButtons(["10代", "20代", "30代", "40代以上"], age, setAge)}
        </div>
      </div>

      {/* 性別 */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">性別（任意）</h3>
        <div className="flex gap-2 flex-wrap">
          {renderButtons(["男性", "女性", "選択しない"], gender, setGender)}
        </div>
      </div>

      {/* エリア */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">勤務・生活エリア</h3>
        <div className="flex gap-2 flex-wrap">
          {renderButtons(
            ["東京23区", "東京都下", "神奈川東部", "千葉・埼玉"],
            area,
            setArea
          )}
        </div>
      </div>

      {/* 通勤時間 */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">通勤・通学時間</h3>
        <div className="flex gap-2 flex-wrap">
          {renderButtons(["15分以内", "30分以内", "1時間以内"], time, setTime)}
        </div>
      </div>

      {/* 予算 */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">予算</h3>
        <div className="flex gap-2 flex-wrap">
          {renderButtons(["5万円台","6万円台", "7万円台", "10万円以上"], budget, setBudget)}
        </div>
      </div>

      {/* 優先条件 */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">上位3件優先条件（必須）</h3>
        <div className="flex gap-2 flex-wrap">
          {["駅近", "スーパーが近い", "治安が良い", "家賃が安い", "自然が多い"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => handlePrioritySelect(opt)}
                className={`px-4 py-2 rounded-lg border transition ${
                  priority.includes(opt)
                    ? "bg-green-400 text-white"
                    : "bg-white border-gray-300 hover:bg-green-50"
                }`}
              >
                {opt}
              </button>
            )
          )}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-6 w-full bg-green-400 hover:bg-green-500 text-white font-bold rounded-lg py-3"
      >
        次へ進む
      </button>
    </main>
  );
}
