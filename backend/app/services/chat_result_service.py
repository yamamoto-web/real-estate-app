import json
from app.models.session import Answer
from openai import OpenAI
from typing import List

client = OpenAI()

AREA_HUBS: dict[str, List[str]] = {
    "東京23区":   ["新宿", "渋谷", "東京", "池袋", "品川"],
    "東京23区外": ["三鷹", "立川", "調布", "町田"],
    "神奈川東部": ["川崎", "武蔵小杉", "横浜", "日吉"],
    "神奈川西部": ["相模大野", "海老名", "厚木", "小田原"],
    "千葉・埼玉": ["浦和", "大宮", "船橋", "柏", "松戸"],
    "未定":       [],
}

def generate_gpt_response(answer: Answer) -> dict:
    
    hubs = AREA_HUBS.get(answer.area, [])
    hub_hint = "・".join(hubs) if hubs else "新宿・渋谷・東京・横浜などの都心"


    system = (
        "あなたは親しみやすい女性の『街・沿線選びアドバイザー』です。"
        "出力は地域・沿線・駅エリアに限定し、住宅や契約の話題は一切出しません。"
    )
    
    prompt = f"""
    以下のユーザー条件に基づいて、おすすめの居住エリアTOP3とその理由（30文字以内）、さらに1位をおすすめするコメントを出力してください。

    【ユーザー条件】
    - ライフステージ：{answer.stageLabel}
    - 年齢：{answer.age}
    - 性別：{answer.gender}
    - 予算：{answer.budget}
    - 間取り{answer.plan}
    - 通勤時間：{answer.time}
    - 優先事項：{', '.join(answer.priority) if answer.priority else 'なし'}
    - エリアカテゴリ：{answer.area}（代表例：{hub_hint}

    【出力形式】
    {{
        "recommended_area": [
        {{ "name": "地域名", "reason": "理由（30文字以内）" }},
        ...
        ],
    "comment": "あなたには〇〇がぴったりです！"
    }}
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return json.loads(response.choices[0].message.content)
