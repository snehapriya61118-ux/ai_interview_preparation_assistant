from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class JobDescriptionAnalyzeRequest(BaseModel):
    job_description_text: Optional[str] = None
    target_role: Optional[str] = "Software Engineer"

class SkillMatchBreakdown(BaseModel):
    technical_skills: int = 82
    experience_match: int = 70
    education_match: int = 95
    keyword_match: int = 76
    overall_match: int = 81

class JobAnalysisResult(BaseModel):
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    experience_requirements: str = ""
    technologies: List[str] = []
    responsibilities: List[str] = []
    important_keywords: List[str] = []
    match_scores: SkillMatchBreakdown
    matching_skills: List[str] = []
    missing_skills: List[str] = []
    recommended_skills: List[str] = []

class JobDescriptionResponse(BaseModel):
    id: int
    user_id: int
    text: str
    analysis: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
