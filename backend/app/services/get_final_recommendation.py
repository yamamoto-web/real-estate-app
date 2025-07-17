from openai import OpenAI
from app.models.session import AnswerResponse

client = OpenAI()

def get_final_recommendation(history: list) -> AnswerResponse:
    """
    ユーザー履歴から最終的な地域おすすめを取得
    history例: [{"question": "...", "answer": "..."}, ...]
    """
    formatted_history = "\n".join([f"{h['question']} → {h['answer']}" for h in history])
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "あなたは経験豊富な不動産コンサルタントです。"
                },
                {
                    "role": "user",
                    "content": (
                        f"以下の条件を考慮して、住むのにおすすめの地域を提案してください。\n"
                        f"{formatted_history}\n"
                        "回答は簡潔に、1〜3地域程度にまとめてください。"
                    )
                },
            ],
        )
        recommendation = response.choices[0].message.content.strip()
        print(recommendation)
        return AnswerResponse(answer=recommendation, recommended_area=recommendation)
    except Exception as e:
            return AnswerResponse(
            answer=f"エラーが発生しました: {str(e)}",
            recommended_area="不明"
        )
