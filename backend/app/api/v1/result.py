from fastapi import APIRouter
from app.models.session import Answer
from app.models.result import FinalResultResponse
from app.services.chat_result_service import generate_gpt_response

router = APIRouter()

@router.post("/result", response_model=FinalResultResponse)
def get_result(answer: Answer):
    return generate_gpt_response(answer)
