from app.models.session import Answer

# 仮スコアテーブル（後でDBや外部ファイルに移行可能）
area_candidates = {
    "中野区": {"駅近": 30, "スーパーが近い": 20, "30分以内": 15, "7万円台": 10},
    "荻窪": {"駅近": 25, "スーパーが近い": 20, "30分以内": 10, "7万円台": 15},
    "三軒茶屋": {"駅近": 20, "スーパーが近い": 25, "30分以内": 10, "7万円台": 5},
}

def calculate_scores(answer: Answer):
    scores = {}
    for area, weights in area_candidates.items():
        score = 0
        # 優先条件
        for p in answer.priority:
            score += weights.get(p, 0)
        # 通勤時間
        score += weights.get(answer.time, 0)
        # 予算
        score += weights.get(answer.budget, 0)
        scores[area] = score

    # スコア順に並べ替え
    sorted_areas = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    recommended = [a for a, _ in sorted_areas]
    return {"recommended_area": recommended, "scores": scores}


def generate_final_comment(answer: Answer, top_area: str):
    # 簡易コメント（優先条件の先頭を利用）
    if answer.priority:
        return f"{answer.priority[0]}を重視されるあなたには{top_area}がぴったりです！"
    return f"{top_area}はバランスの取れた地域です。"