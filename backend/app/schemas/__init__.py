from app.schemas.auth import UserRegister, UserLogin, TokenResponse, UserResponse
from app.schemas.resume import ResumeAnalysis, ResumeResponse
from app.schemas.job_description import JobDescriptionAnalyzeRequest, JobAnalysisResult, JobDescriptionResponse
from app.schemas.interview import (
    InterviewCreateRequest, GenerateQuestionsRequest, GenerateQuestionsResponse,
    EvaluateAnswerRequest, AnswerEvaluationResponse, FollowUpRequest, FollowUpResponse,
    InterviewReportResponse
)
from app.schemas.preparation import PreparationPlanResponse, ToggleTopicRequest

__all__ = [
    "UserRegister", "UserLogin", "TokenResponse", "UserResponse",
    "ResumeAnalysis", "ResumeResponse",
    "JobDescriptionAnalyzeRequest", "JobAnalysisResult", "JobDescriptionResponse",
    "InterviewCreateRequest", "GenerateQuestionsRequest", "GenerateQuestionsResponse",
    "EvaluateAnswerRequest", "AnswerEvaluationResponse", "FollowUpRequest", "FollowUpResponse",
    "InterviewReportResponse", "PreparationPlanResponse", "ToggleTopicRequest"
]
