from openai import OpenAI

client = OpenAI()

def generate_intro(data):
    prompt = f"""
    あなたは親しみやすい女性の不動産営業マンです。
    以下の条件のユーザーに、寄り添うような口調で状況をまとめてください。
    最後に「では、いくつか質問させてくださいね」と言ってください。
    文章が長くなりすぎないように注意してください。

    【ユーザー条件】
    - ライフステージ：{data.stageLabel}
    - 年齢：{data.age}
    - 性別：{data.gender}
    - 予算：{data.budget}
    - 通勤時間：{data.time}
    - 優先事項：{', '.join(data.priority) if data.priority else 'なし'}
    """

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "あなたは親しみやすい女性の不動産営業マンです。"},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return completion.choices[0].message.content
