from pydantic import BaseModel
from typing import List, Optional

class SessionStartResponse(BaseModel):
    session_id: str

class QuestionPayload(BaseModel):
    session_id: str
    question: str

class AnswerResponse(BaseModel):
    answer: str
    recommended_area: str

class HistoryItem(BaseModel):
    question: str
    answer: str

class ResultResponse(BaseModel):
    session_id: str
    final_answer: str
    recommended_area: str
    history: List[HistoryItem]

class Answer(BaseModel):
    stage: str
    stageLabel: Optional[str] = None
    age: str = ""
    gender: str = ""
    area: str = ""
    time: str = ""
    budget: str = ""
    priority: List[str] = []

class IntroRequest(BaseModel):
    stage: str
    stageLabel: Optional[str] = None
    age: str = ""
    gender: str = ""
    area: str = ""
    time: str = ""
    budget: str = ""
    priority: List[str] = []
