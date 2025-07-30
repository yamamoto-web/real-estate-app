from typing import List
from pydantic import BaseModel

class AreaResult(BaseModel):
    name: str
    reason: str

class FinalResultResponse(BaseModel):
    recommended_area: List[AreaResult]
    comment: str