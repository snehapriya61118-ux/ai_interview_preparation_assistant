from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.preparation_plan import PreparationPlan
from app.schemas.preparation import PreparationPlanResponse, ToggleTopicRequest
from app.services.auth_service import get_current_user
from app.services.ai_service import ai_service

router = APIRouter(prefix="/preparation-plan", tags=["Preparation Plan"])

@router.get("", response_model=PreparationPlanResponse)
async def get_preparation_plan(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plan_record = db.query(PreparationPlan).filter(PreparationPlan.user_id == current_user.id).order_by(PreparationPlan.created_at.desc()).first()

    if not plan_record:
        days_data = await ai_service.generate_preparation_plan()
        plan_record = PreparationPlan(
            user_id=current_user.id,
            plan=days_data
        )
        db.add(plan_record)
        db.commit()
        db.refresh(plan_record)
        days = days_data
    else:
        days = plan_record.plan

    # Compute overall progress
    total_days = len(days)
    completed_days = sum(1 for d in days if d.get("completed", False))
    overall_progress = int((completed_days / total_days) * 100) if total_days > 0 else 0

    return {
        "id": plan_record.id,
        "user_id": current_user.id,
        "days": days,
        "overall_progress": overall_progress
    }

@router.post("/toggle")
async def toggle_topic_completion(
    payload: ToggleTopicRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    plan_record = db.query(PreparationPlan).filter(PreparationPlan.user_id == current_user.id).order_by(PreparationPlan.created_at.desc()).first()

    if not plan_record:
        days_data = await ai_service.generate_preparation_plan()
        plan_record = PreparationPlan(user_id=current_user.id, plan=days_data)
        db.add(plan_record)

    days = list(plan_record.plan)
    for day in days:
        if day["day"] == payload.day:
            day["completed"] = payload.completed
            if payload.completed:
                day["progress"] = 100
            else:
                day["progress"] = 50
            break

    plan_record.plan = days
    db.commit()
    db.refresh(plan_record)

    return {"status": "updated", "day": payload.day, "completed": payload.completed}
