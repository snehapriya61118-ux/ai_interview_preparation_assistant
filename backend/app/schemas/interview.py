from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class InterviewCreateRequest(BaseModel):
    job_role: str = "Software Engineer"
    difficulty: str = "Medium" # Easy, Medium, Hard
    resume_id: Optional[int] = None
    job_description_id: Optional[int] = None

class GenerateQuestionsRequest(BaseModel):
    resume: Optional[str] = ""
    job_description: Optional[str] = ""
    target_role: str = "Software Engineer"
    difficulty: str = "Medium"
    number_of_questions: int = 5

class QuestionItem(BaseModel):
    id: int
    category: str # HR, Resume, Technical, Situational, Follow-up
    difficulty: str # Easy, Medium, Hard
    question: str

class GenerateQuestionsResponse(BaseModel):
    questions: List[QuestionItem]

class EvaluateAnswerRequest(BaseModel):
    question: str
    answer: str
    resume: Optional[str] = ""
    job_description: Optional[str] = ""
    category: Optional[str] = "Technical"
    difficulty: Optional[str] = "Medium"

class AnswerEvaluationResponse(BaseModel):
    overall_score: int
    correctness: int
    relevance: int
    communication: int
    confidence: int
    technical_knowledge: int
    grammar: int
    feedback: str
    strengths: List[str]
    weaknesses: List[str]
    improved_answer: str
    tips: List[str]

class FollowUpRequest(BaseModel):
    previous_question: str
    previous_answer: str
    score: int
    current_difficulty: str

class FollowUpResponse(BaseModel):
    follow_up_question: str
    next_category: str
    next_difficulty: str

class InterviewReportResponse(BaseModel):
    interview_id: int
    job_role: str
    overall_score: float
    technical_knowledge: float
    communication: float
    confidence: float
    problem_understanding: float
    relevance: float
    grammar: float
    strengths: List[str]
    weaknesses: List[str]
    recommended_preparation: List[str]
    recommended_questions: List[str]
    completed_at: str
