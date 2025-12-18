from pydantic import BaseModel
from typing import Optional

class SymptomRequest(BaseModel):
    symptoms: str
    age: Optional[int] = None
    location: Optional[str] = None

class TriageResponse(BaseModel):
    summary: str
    urgency: str
    recommended_care: str
    advice: str
