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

def generate_intro(data):

    hubs = AREA_HUBS.get(data.area, [])
    hub_hint = "・".join(hubs) if hubs else "新宿・渋谷・東京・横浜などの都心"

    system = (
        "あなたは親しみやすい女性の『街・沿線選びアドバイザー』です。"
        "出力は地域・沿線・駅エリアに限定し、住宅や契約の話題は一切出しません。"
    )

    prompt = f"""
    目的：地域診断（街・沿線の仮説提示）。物件の話は禁止。

    【ユーザー条件】
    - ライフステージ：{data.stageLabel}
    - 年齢：{data.age}
    - 性別：{data.gender}
    - 予算：{data.budget}
    - 間取り：{data.plan}
    - 通勤時間：{data.time}
    - 優先事項：{', '.join(data.priority) if data.priority else 'なし'}
    - エリアカテゴリ：{data.area}（代表例：{hub_hint}）

    [出力仕様]
    - 50〜100字で“地域の観点だけ”をまとめた寄り添い文。
    - 続けて1文だけ「現在の情報では◯◯線の△△〜□□が合いそう」の形式で沿線・方角を示す。
    - 最後は必ず「では、いくつか質問させてくださいね」で締める。
    - 使ってよい話題：沿線/駅/街の雰囲気/買い物利便/治安/公園/アクセス。
    - 箇条書き・注意書き・免責は不要。2〜3文で自然に。
    """

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return completion.choices[0].message.content
