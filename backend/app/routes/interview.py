from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.interview import Interview
from app.models.question import InterviewQuestion
from app.models.answer import Answer
from app.schemas.interview import (
    InterviewCreateRequest, GenerateQuestionsRequest, GenerateQuestionsResponse,
    EvaluateAnswerRequest, AnswerEvaluationResponse, FollowUpRequest, FollowUpResponse,
    InterviewReportResponse
)
from app.services.auth_service import get_current_user
from app.services.ai_service import ai_service

router = APIRouter(prefix="/interview", tags=["Interview"])

@router.post("/create")
async def create_interview(
    payload: InterviewCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interview = Interview(
        user_id=current_user.id,
        job_role=payload.job_role,
        difficulty_level=payload.difficulty,
        status="in_progress",
        started_at=datetime.utcnow()
    )
    db.add(interview)
    db.commit()
    db.refresh(interview)
    return {"interview_id": interview.id, "status": interview.status}

@router.post("/generate-questions", response_model=GenerateQuestionsResponse)
async def generate_questions(
    payload: GenerateQuestionsRequest,
    current_user: User = Depends(get_current_user)
):
    questions_data = await ai_service.generate_questions(
        resume=payload.resume,
        job_description=payload.job_description,
        target_role=payload.target_role,
        difficulty=payload.difficulty,
        number_of_questions=payload.number_of_questions
    )
    return {"questions": questions_data}

@router.post("/evaluate-answer", response_model=AnswerEvaluationResponse)
async def evaluate_answer(
    payload: EvaluateAnswerRequest,
    current_user: User = Depends(get_current_user)
):
    if not payload.answer or not payload.answer.strip():
        raise HTTPException(status_code=400, detail="Answer text cannot be empty.")

    eval_result = await ai_service.evaluate_answer(
        question=payload.question,
        answer=payload.answer,
        resume=payload.resume,
        job_description=payload.job_description,
        category=payload.category,
        difficulty=payload.difficulty
    )
    return eval_result

@router.post("/follow-up", response_model=FollowUpResponse)
async def generate_follow_up(
    payload: FollowUpRequest,
    current_user: User = Depends(get_current_user)
):
    res = await ai_service.generate_follow_up(
        previous_question=payload.previous_question,
        previous_answer=payload.previous_answer,
        score=payload.score,
        current_difficulty=payload.current_difficulty
    )
    return res

@router.post("/complete")
async def complete_interview(
    interview_id: int,
    overall_score: float = 78.0,
    answers_eval: Optional[List[dict]] = Body(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interview = db.query(Interview).filter(
        Interview.id == interview_id,
        Interview.user_id == current_user.id
    ).first()

    if not interview:
        # Create record if not found
        interview = Interview(
            id=interview_id,
            user_id=current_user.id,
            job_role="Software Engineer",
            overall_score=overall_score,
            status="completed",
            started_at=datetime.utcnow(),
            completed_at=datetime.utcnow()
        )
        db.add(interview)
    else:
        interview.status = "completed"
        interview.overall_score = overall_score
        interview.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(interview)
    return {"status": "completed", "interview_id": interview.id, "overall_score": interview.overall_score}

@router.get("/history")
def get_interview_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interviews = db.query(Interview).filter(
        Interview.user_id == current_user.id
    ).order_by(Interview.started_at.desc()).all()

    return [
        {
            "id": i.id,
            "job_role": i.job_role,
            "overall_score": i.overall_score,
            "status": i.status,
            "difficulty": i.difficulty_level,
            "date": i.started_at.strftime("%Y-%m-%d %H:%M") if i.started_at else "Recent"
        }
        for i in interviews
    ]

@router.get("/{id}/report", response_model=InterviewReportResponse)
async def get_interview_report(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    interview = db.query(Interview).filter(Interview.id == id, Interview.user_id == current_user.id).first()
    job_role = interview.job_role if interview else "Software Engineer"

    report = await ai_service.generate_final_report(
        interview_id=id,
        answers_eval=[],
        job_role=job_role
    )
    if interview and interview.overall_score > 0:
        report["overall_score"] = interview.overall_score

    return report
