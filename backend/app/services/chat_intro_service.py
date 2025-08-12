from openai import OpenAI
from typing import List, Any

client = OpenAI()

AREA_HUBS: dict[str, List[str]] = {
    "東京23区":   ["新宿", "渋谷", "東京", "池袋", "品川"],
    "東京23区外": ["三鷹", "立川", "調布", "町田"],
    "神奈川東部": ["川崎", "武蔵小杉", "横浜", "日吉"],
    "神奈川西部": ["相模大野", "海老名", "厚木", "小田原"],
    "千葉・埼玉": ["浦和", "大宮", "船橋", "柏", "松戸"],
    "未定":       [],
}

def generate_intro(data):

    hubs = AREA_HUBS.get(data.area, [])
    hub_hint = "・".join(hubs) if hubs else "新宿・渋谷・東京・横浜などの都心"

    prompt = f"""
    あなたは親しみやすい女性の不動産営業マンです。
    以下の条件のユーザーに、50文字程度で寄り添うような口調で状況をまとめてください。
    最後に「では、いくつか質問させてくださいね」と言ってください。


    【ユーザー条件】
    - ライフステージ：{data.stageLabel}
    - 年齢：{data.age}
    - 性別：{data.gender}
    - 予算：{data.budget}
    - 間取り：{data.plan}
    - 通勤時間：{data.time}
    - 優先事項：{', '.join(data.priority) if data.priority else 'なし'}
    - エリアカテゴリ：{data.area}（代表例：{hub_hint}）
    """

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "あなたは親しみやすい女性の不動産営業マンです。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return completion.choices[0].message.content
