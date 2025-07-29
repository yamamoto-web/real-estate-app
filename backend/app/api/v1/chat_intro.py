from fastapi import APIRouter
from app.models.session import IntroRequest
from app.services.chat_intro_service import generate_intro

router = APIRouter()

@router.post("/chat_intro")
def chat_intro(data: IntroRequest):
    print(data)
    return {"intro": generate_intro(data)}