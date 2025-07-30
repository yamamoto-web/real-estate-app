import json
from app.models.session import Answer
from openai import OpenAI

client = OpenAI()

def generate_gpt_response(answer: Answer) -> dict:
    prompt = f"""
以下のユーザー条件に基づいて、おすすめの居住エリアTOP3とその理由（30文字以内）、さらに1位をおすすめするコメントを出力してください。

【ユーザー条件】
- ライフステージ：{answer.stageLabel}
- 年齢：{answer.age}
- 性別：{answer.gender}
- 予算：{answer.budget}
- 通勤時間：{answer.time}
- 優先事項：{', '.join(answer.priority) if answer.priority else 'なし'}

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
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return json.loads(response.choices[0].message.content)
