from fastapi import APIRouter
from app.models.session import Answer
from app.services.scoring_service import calculate_scores

router = APIRouter()

@router.post("/result")
def get_result(answer: Answer):
    return calculate_scores(answer)
