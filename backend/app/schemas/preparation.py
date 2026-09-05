from typing import List, Dict, Any
from pydantic import BaseModel

class PreparationDay(BaseModel):
    day: int
    title: str
    focus: str
    progress: int
    completed: bool
    topics: List[str]

class PreparationPlanResponse(BaseModel):
    id: int
    user_id: int
    days: List[PreparationDay]
    overall_progress: int

class ToggleTopicRequest(BaseModel):
    day: int
    topic: str
    completed: bool
