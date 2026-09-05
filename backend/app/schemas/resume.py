from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel

class ResumeAnalysis(BaseModel):
    candidate_name: str
    education: Optional[str] = None
    degree: Optional[str] = None
    technical_skills: List[str] = []
    programming_languages: List[str] = []
    frameworks: List[str] = []
    tools: List[str] = []
    projects: List[str] = []
    internships: List[str] = []
    work_experience: List[str] = []
    certifications: List[str] = []
    achievements: List[str] = []
    soft_skills: List[str] = []
    missing_skills: List[str] = []
    weak_sections: List[str] = []
    possible_topics: List[str] = []
    potential_technical_questions: List[str] = []
    potential_hr_questions: List[str] = []

class ResumeResponse(BaseModel):
    id: int
    user_id: int
    filename: str
    extracted_text: str
    analysis: Optional[Dict[str, Any]] = None
    uploaded_at: datetime

    class Config:
        from_attributes = True
