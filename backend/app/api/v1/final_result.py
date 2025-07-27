from fastapi import APIRouter
from app.models.session import Answer
from app.services.scoring_service import calculate_scores, generate_final_comment

router = APIRouter()

@router.post("/final_result")
def get_final_result(answer: Answer):
    result = calculate_scores(answer)
    top_area = result["recommended_area"][0]
    comment = generate_final_comment(answer, top_area)
    return {
        "recommended_area": result["recommended_area"],
        "scores": result["scores"],
        "comment": comment
    }