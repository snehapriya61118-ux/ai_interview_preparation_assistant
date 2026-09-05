# AI Interview Coach 🚀

> A full-stack, AI-powered interview preparation and voice-enabled mock interview platform for job seekers. Built with a futuristic **Glassmorphism UI** system, React Vite, Python FastAPI, SQLAlchemy, and adaptive LLM evaluation engine.

---

## 🌟 Key Features

1. **Futuristic Glassmorphism UI Design System**
   - HSL/RGB glass surface cards, ambient background glowing orbs, circular score progress gauges, and animated AI avatar.
2. **AI Resume & Job Description Parser**
   - Extract text from **PDF** and **DOCX** resumes.
   - Breakdown skills, frameworks, tools, projects, internships, missing skills, and weak sections.
   - Compare resume against job descriptions to generate match scores (Technical 82%, Experience 70%, Education 95%, Keyword 76%, Overall 81%).
3. **Adaptive AI Mock Interview Room**
   - Multi-category question generator (HR, Resume-based, Technical, Situational, Dynamic Follow-ups).
   - Adaptive difficulty curve (Easy → Medium → Hard).
   - Animated glass AI interviewer avatar with glowing speaking pulse animations.
4. **Voice & Text Interview Response**
   - Microphone recording using browser Web Speech API & HTML5 Audio with live transcript editing.
   - Status indicators: `"Listening..."`, `"Transcribing..."`, `"Answer detected"`.
5. **Instant Answer Evaluation & Feedback Card**
   - Immediate answer scoring (0-100) with breakdown across Relevance, Technical, Communication, Confidence, and Grammar.
   - Highlights *"What You Did Well"*, *"What You Need To Improve"*, *"Improved STAR Sample Answer"*, and *"Interview Tip"*.
6. **Final Performance Report & 10 Targeted Questions**
   - Complete post-interview performance analysis with domain skill radar/bar metrics.
   - 10 targeted practice questions customized for identified weak areas.
7. **Personalized 7-Day Preparation Plan**
   - Interactive day-by-day roadmap with progress tracking and clickable completion toggles.
8. **Progress Tracking Dashboard**
   - Score history charts, improvement tracking (+20 points), and recent interview logs.
9. **Zero-Config Standalone DEMO_MODE**
   - Works 100% out of the box even when no LLM/STT API key is configured.

---

## 🛠 Technology Stack

- **Frontend**: React.js (Vite), Tailwind CSS, React Router v6, Axios, Lucide Icons, Google Fonts (Inter & Poppins).
- **Backend**: Python 3.12, FastAPI, Uvicorn, SQLAlchemy, Pydantic v2.
- **Database**: SQLite for development, PostgreSQL compatible for production.
- **Security**: JWT Authentication, Bcrypt Password Hashing, CORS Protection.
- **Parsers**: `pypdf`, `python-docx`.

---

## 🏗 Project Architecture

```
antigravity mini/
├── frontend/
│   ├── src/
│   │   ├── components/       # GlassCard, AIAvatar, CircularProgress, VoiceRecorder, FeedbackCard, Sidebar, Navbar
│   │   ├── context/          # AuthContext provider
│   │   ├── pages/            # LandingPage, LoginPage, RegisterPage, DashboardPage, ResumePage, JobDescriptionPage, MockInterviewPage, InterviewReportPage, PreparationPlanPage, PerformancePage, SettingsPage
│   │   ├── services/         # Axios API client
│   │   ├── App.jsx           # React Router & Glass layout wrapper
│   │   ├── index.css         # Glassmorphism CSS design system & glowing ambient background orbs
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── app/
│   │   ├── database/         # SQLAlchemy session & Base model
│   │   ├── models/           # User, Resume, JobDescription, Interview, Question, Answer, PreparationPlan
│   │   ├── schemas/          # Pydantic request/response schemas
│   │   ├── services/         # AI Service, Auth Service, Parser Service, Speech Service
│   │   ├── routes/           # Auth, Resume, JobDescription, Interview, Preparation, Dashboard
│   │   ├── config.py         # Application settings & Demo mode detection
│   │   └── main.py           # FastAPI application entry point
│   ├── requirements.txt
│   └── venv/
├── README.md
└── .env.example
```

---

## ⚙️ Environment Variables

Copy `.env.example` to create your `.env` file:

```env
SECRET_KEY=ai_interview_coach_super_secret_jwt_key_2026_change_in_production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

DATABASE_URL=sqlite:///./ai_interview_coach.db

# Leave blank to automatically activate zero-config DEMO_MODE
LLM_API_KEY=
LLM_PROVIDER=openai
LLM_MODEL=gpt-4o-mini
SPEECH_TO_TEXT_API_KEY=
```

---

## 🚀 How to Run Backend & Frontend

### 1. Backend Setup & Run (FastAPI)

```bash
cd backend
# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Install backend dependencies
pip install -r requirements.txt

# Start FastAPI server on port 8000
uvicorn app.main:app --reload --port 8000
```

Backend API will be live at `http://localhost:8000`  
Swagger API Docs available at `http://localhost:8000/docs`

---

### 2. Frontend Setup & Run (React Vite)

```bash
cd frontend
# Install node packages
npm install

# Start Vite dev server
npm run dev
```

Frontend application will be live at `http://localhost:5173`

---

## 💡 Configuring AI API Key & Demo Mode

1. **Demo Mode (Default)**: If `LLM_API_KEY` is left blank in `.env` or in the **Settings** page, the application automatically triggers `DEMO_MODE`. All resume analysis, job description matching, interview question generation, voice transcriptions, instant feedback scoring, and preparation plans run dynamically with zero external dependencies.
2. **Live AI Integration**: To connect live OpenAI / Gemini model APIs, simply paste your key into `.env` as `LLM_API_KEY=sk-...` or set it inside the application **Settings** screen.

---

## 📜 License

MIT License - AI Interview Coach 2026.
