from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database.session import engine
from app.database.base import Base
from app.models import * # Ensure all models are registered
from app.routes import auth, resume, job_description, interview, preparation, dashboard

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Interview Preparation & Mock Interview Platform API"
)

# CORS middleware for React Vite Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for seamless local dev & preview
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(resume.router, prefix=settings.API_V1_STR)
app.include_router(job_description.router, prefix=settings.API_V1_STR)
app.include_router(interview.router, prefix=settings.API_V1_STR)
app.include_router(preparation.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "demo_mode": settings.is_demo_mode
    }

@app.get("/")
def root():
    return {
        "message": "Welcome to AI Interview Coach API",
        "docs": "/docs",
        "demo_mode": settings.is_demo_mode
    }
