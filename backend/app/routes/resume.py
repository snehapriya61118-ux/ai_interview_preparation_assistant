from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.resume import Resume
from app.schemas.resume import ResumeResponse
from app.services.auth_service import get_current_user
from app.services.parser_service import extract_resume_text
from app.services.ai_service import ai_service

router = APIRouter(prefix="/resume", tags=["Resume"])

MAX_FILE_SIZE = 10 * 1024 * 1024 # 10MB

@router.post("/upload", response_model=ResumeResponse)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not (file.filename.endswith(".pdf") or file.filename.endswith(".docx") or file.filename.endswith(".doc") or file.filename.endswith(".txt")):
        raise HTTPException(status_code=400, detail="Please upload a PDF or DOCX resume.")

    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit.")

    try:
        text = extract_resume_text(file.filename, file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Resume could not be processed. Please try again.")

    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from uploaded resume.")

    # Analyze resume with AI
    analysis = await ai_service.analyze_resume(text)

    resume = Resume(
        user_id=current_user.id,
        filename=file.filename,
        extracted_text=text,
        analysis=analysis
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)

    return resume

@router.get("", response_model=Optional[ResumeResponse])
def get_latest_resume(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.uploaded_at.desc()).first()
    return resume

@router.post("/analyze")
async def reanalyze_resume(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = db.query(Resume).filter(Resume.user_id == current_user.id).order_by(Resume.uploaded_at.desc()).first()
    if not resume:
        raise HTTPException(status_code=404, detail="No resume uploaded yet.")

    analysis = await ai_service.analyze_resume(resume.extracted_text)
    resume.analysis = analysis
    db.commit()
    db.refresh(resume)

    return resume
