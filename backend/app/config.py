import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI Interview Coach"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"

    SECRET_KEY: str = os.getenv("SECRET_KEY", "ai_interview_coach_super_secret_jwt_key_2026_change_in_production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ai_interview_coach.db")

    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "openai")
    LLM_MODEL: str = os.getenv("LLM_MODEL", "gpt-4o-mini")
    SPEECH_TO_TEXT_API_KEY: str = os.getenv("SPEECH_TO_TEXT_API_KEY", "")

    @property
    def is_demo_mode(self) -> bool:
        return not bool(self.LLM_API_KEY and self.LLM_API_KEY.strip())

settings = Settings()
