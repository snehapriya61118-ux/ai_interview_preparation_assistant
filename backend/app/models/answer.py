from datetime import datetime
from sqlalchemy import Column, Integer, Text, Float, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.base import Base

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("interview_questions.id", ondelete="CASCADE"), nullable=False)
    answer_text = Column(Text, nullable=False)
    score = Column(Float, default=0.0)
    evaluation = Column(JSON, nullable=True) # overall_score, correctness, relevance, strengths, weaknesses, improved_answer, tips
    created_at = Column(DateTime, default=datetime.utcnow)

    question = relationship("InterviewQuestion", back_populates="answers")
