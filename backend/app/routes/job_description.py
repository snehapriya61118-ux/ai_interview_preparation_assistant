from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.schemas.job_description import JobDescriptionResponse, JobDescriptionAnalyzeRequest
from app.services.auth_service import get_current_user
from app.services.parser_service import extract_resume_text
from app.services.ai_service import ai_service

router = APIRouter(prefix="/job-description", tags=["Job Description"])

@router.post("/analyze", response_model=JobDescriptionResponse)
async def analyze_job_description(
    payload: JobDescriptionAnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    jd_text = payload.job_description_text or ""
    if not jd_text.strip():
        raise HTTPException(status_code=400, detail="Job description text cannot be empty.")

    latest_resume = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.uploaded_at.desc()).first()
    resume_text = latest_resume.extracted_text if latest_resume else ""

    analysis = await ai_service.analyze_job_description(jd_text, resume_text)

    jd_model = JobDescription(
        user_id=current_user.id,
        text=jd_text,
        analysis=analysis
    )
    db.add(jd_model)
    db.commit()
    db.refresh(jd_model)

    return jd_model

@router.get("", response_model=Optional[JobDescriptionResponse])
def get_latest_job_description(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    jd = db.query(JobDescription).filter(JobDescription.user_id == current_user.id).order_by(JobDescription.created_at.desc()).first()
    return jd
