from datetime import datetime
from sqlalchemy import Column, Integer, Text, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    text = Column(Text, nullable=False)
    analysis = Column(JSON, nullable=True) # Required skills, match score breakdown, matching/missing skills
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="job_descriptions")
