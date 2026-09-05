from datetime import datetime
from sqlalchemy import Column, Integer, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class PreparationPlan(Base):
    __tablename__ = "preparation_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    plan = Column(JSON, nullable=False) # 7-day structure with topics and completion states
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="preparation_plans")
