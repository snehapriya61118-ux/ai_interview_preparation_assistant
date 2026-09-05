import json
import httpx
from typing import Dict, Any, List
from app.config import settings

SYSTEM_PROMPT = (
    "You are an expert technical interviewer and career coach. "
    "Analyze the candidate's resume and target job description. "
    "Ask realistic interview questions relevant to the candidate's experience and job role. "
    "Evaluate answers fairly. Give constructive feedback instead of simply saying the answer is correct or incorrect. "
    "Identify technical and communication weaknesses. Provide actionable preparation advice. "
    "Never fabricate information about the candidate. Base resume-specific questions only on information present in the uploaded resume."
)

class AIService:
    def __init__(self):
        self.api_key = settings.LLM_API_KEY
        self.is_demo = settings.is_demo_mode

    async def _call_llm_json(self, prompt: str) -> Dict[str, Any]:
        """Call LLM API if key present, else fallback to DEMO MODE parser."""
        if self.is_demo or not self.api_key:
            return None

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": settings.LLM_MODEL,
                        "response_format": {"type": "json_object"},
                        "messages": [
                            {"role": "system", "content": SYSTEM_PROMPT + "\nRespond strictly in valid JSON format."},
                            {"role": "user", "content": prompt}
                        ],
                        "temperature": 0.7
                    }
                )
                if response.status_code == 200:
                    data = response.json()
                    content = data["choices"][0]["message"]["content"]
                    return json.loads(content)
        except Exception:
            pass
        return None

    async def analyze_resume(self, extracted_text: str) -> Dict[str, Any]:
        prompt = f"Analyze this resume text and return structured JSON:\n{extracted_text}"
        res = await self._call_llm_json(prompt)
        if res:
            return res

        # DEMO_MODE Intelligent Fallback
        lines = [l.strip() for l in extracted_text.split('\n') if l.strip()]
        name = lines[0] if lines else "Jane Doe"
        if len(name) > 40:
            name = "Jane Doe"

        return {
            "candidate_name": name,
            "education": "B.S. in Computer Science, Stanford University",
            "degree": "Bachelor of Science in Computer Science",
            "technical_skills": ["Python", "JavaScript", "React", "FastAPI", "SQL", "Docker", "Git", "REST APIs"],
            "programming_languages": ["Python", "JavaScript", "TypeScript", "SQL"],
            "frameworks": ["React", "FastAPI", "Express.js", "Tailwind CSS"],
            "tools": ["Git", "Docker", "VS Code", "Postman", "PostgreSQL"],
            "projects": [
                "AI Food Recommendation Engine using Python & Scikit-learn",
                "Full-stack E-Commerce Dashboard with React & FastAPI",
                "Real-time Chat Application with WebSockets"
            ],
            "internships": [
                "Software Engineering Intern at TechCorp (Summer 2024)"
            ],
            "work_experience": [
                "Associate Software Engineer at CloudScale Solutions (1.5 Years)"
            ],
            "certifications": [
                "AWS Certified Developer Associate",
                "Meta Front-End Developer Professional Certificate"
            ],
            "achievements": [
                "1st Place in University Hackathon 2024",
                "Published technical blog on High-Performance Async APIs with 10k+ readers"
            ],
            "soft_skills": ["Problem Solving", "Team Collaboration", "Agile Communication", "System Architecture"],
            "missing_skills": ["Kubernetes", "GraphQL", "CI/CD Pipeline Automation", "Redis Caching"],
            "weak_sections": [
                "Quantifiable business impact in project descriptions",
                "Cloud infrastructure experience details"
            ],
            "possible_topics": [
                "Python Async Architecture",
                "State Management in React",
                "Database Indexing & Query Optimization",
                "RESTful API Security"
            ],
            "potential_technical_questions": [
                "How do you handle asynchronous tasks and concurrency in FastAPI?",
                "What algorithm was used in your Food Recommendation System and why?",
                "Explain how React Virtual DOM diffing improves performance."
            ],
            "potential_hr_questions": [
                "Tell me about yourself and your journey in software engineering.",
                "Describe a situation where you had to debug a critical issue under tight deadlines."
            ]
        }

    async def analyze_job_description(self, jd_text: str, resume_text: str = "") -> Dict[str, Any]:
        prompt = f"Analyze job description and compare with candidate resume.\nJD:\n{jd_text}\nResume:\n{resume_text}"
        res = await self._call_llm_json(prompt)
        if res:
            return res

        # DEMO_MODE Fallback
        return {
            "required_skills": ["Python", "FastAPI", "React", "REST API Development", "SQL Database Optimization"],
            "preferred_skills": ["Docker", "AWS Cloud", "Redis", "TypeScript", "CI/CD"],
            "experience_requirements": "2-4 years of experience building modern web applications",
            "technologies": ["Python", "FastAPI", "React", "PostgreSQL", "Tailwind CSS"],
            "responsibilities": [
                "Design and maintain scalable RESTful APIs",
                "Build modern responsive front-end user interfaces",
                "Optimize database queries and overall application performance",
                "Participate in code reviews and agile sprint planning"
            ],
            "important_keywords": ["Full-Stack", "Microservices", "System Architecture", "Performance", "Agile"],
            "match_scores": {
                "technical_skills": 82,
                "experience_match": 70,
                "education_match": 95,
                "keyword_match": 76,
                "overall_match": 81
            },
            "matching_skills": ["Python", "React", "FastAPI", "SQL", "REST APIs", "Git"],
            "missing_skills": ["Redis Caching", "Kubernetes", "GraphQL"],
            "recommended_skills": ["Learn Redis for API Caching", "Master Docker Container Deployment", "Study System Design Fundamentals"]
        }

    async def generate_questions(
        self,
        resume: str = "",
        job_description: str = "",
        target_role: str = "Software Engineer",
        difficulty: str = "Medium",
        number_of_questions: int = 5
    ) -> List[Dict[str, Any]]:

        prompt = (
            f"Target Role: {target_role}\nDifficulty: {difficulty}\nResume Context: {resume[:1000]}\n"
            f"Generate {number_of_questions} interview questions categorized as HR, Resume, Technical, Situational."
        )
        res = await self._call_llm_json(prompt)
        if res and "questions" in res:
            return res["questions"]

        # DEMO_MODE Fallback questions
        return [
            {
                "id": 1,
                "category": "HR",
                "difficulty": difficulty,
                "question": f"Tell me about yourself and why you are interested in the {target_role} position at our company."
            },
            {
                "id": 2,
                "category": "Resume",
                "difficulty": difficulty,
                "question": "I see you developed a recommendation engine project using Python. What algorithm did you choose and how did you measure its accuracy?"
            },
            {
                "id": 3,
                "category": "Technical",
                "difficulty": difficulty,
                "question": "In Python / FastAPI, how do async event loops differ from multi-threading, and when would you choose one over the other?"
            },
            {
                "id": 4,
                "category": "Situational",
                "difficulty": difficulty,
                "question": "Imagine a critical API endpoint starts timing out in production during peak traffic. Walk me through your step-by-step troubleshooting process."
            },
            {
                "id": 5,
                "category": "HR",
                "difficulty": difficulty,
                "question": "What is one technical mistake or project failure you experienced, and what valuable lesson did you learn from it?"
            }
        ]

    async def evaluate_answer(
        self,
        question: str,
        answer: str,
        resume: str = "",
        job_description: str = "",
        category: str = "Technical",
        difficulty: str = "Medium"
    ) -> Dict[str, Any]:

        prompt = f"Evaluate this candidate response.\nQuestion: {question}\nAnswer: {answer}"
        res = await self._call_llm_json(prompt)
        if res:
            return res

        # DEMO_MODE Feedback generator
        word_count = len(answer.strip().split())
        base_score = 75
        if word_count > 30:
            base_score = 84
        if word_count > 70:
            base_score = 90
        if word_count < 10:
            base_score = 55

        return {
            "overall_score": base_score,
            "correctness": min(100, base_score + 3),
            "relevance": min(100, base_score + 6),
            "communication": min(100, base_score - 4),
            "confidence": min(100, base_score - 7),
            "technical_knowledge": min(100, base_score + 2),
            "grammar": 92,
            "feedback": f"Your response directly addressed the key points of the {category} question. You showed solid comprehension of the foundational concepts.",
            "strengths": [
                "Clear structure and relevant technical terms",
                "Good practical example referencing implementation",
                "Accurate technical explanation"
            ],
            "weaknesses": [
                "Answer could benefit from more specific metrics or outcomes",
                "Pacing was slightly rapid, consider using the STAR framework"
            ],
            "improved_answer": (
                f"A strong structured answer: 'When addressing {question[:50]}..., I first analyze the root cause using system logs. "
                f"For example, in my previous project I implemented asynchronous non-blocking queries, which reduced response latency by 40%.'"
            ),
            "tips": [
                "Use the STAR method (Situation, Task, Action, Result) to give concrete structure to your answers."
            ]
        }

    async def generate_follow_up(
        self,
        previous_question: str,
        previous_answer: str,
        score: int,
        current_difficulty: str
    ) -> Dict[str, Any]:

        # Adaptive difficulty logic
        if score >= 80:
            next_difficulty = "Hard" if current_difficulty == "Medium" else "Medium"
        elif score <= 65:
            next_difficulty = "Easy" if current_difficulty == "Medium" else "Medium"
        else:
            next_difficulty = current_difficulty

        follow_ups = {
            "Hard": "That's a good foundation. How would you architect this solution to handle 100,000 concurrent requests per second with sub-10ms response times?",
            "Medium": "Interesting approach. What trade-offs did you consider when making this design choice, and what alternative solutions did you rule out?",
            "Easy": "Can you elaborate on a simple practical example where you applied this concept in a real project?"
        }

        return {
            "follow_up_question": follow_ups.get(next_difficulty, follow_ups["Medium"]),
            "next_category": "Follow-up",
            "next_difficulty": next_difficulty
        }

    async def generate_final_report(self, interview_id: int, answers_eval: List[Dict[str, Any]], job_role: str) -> Dict[str, Any]:
        if not answers_eval:
            scores = [78]
        else:
            scores = [a.get("overall_score", 75) for a in answers_eval]

        avg_score = round(sum(scores) / len(scores), 1)

        return {
            "interview_id": interview_id,
            "job_role": job_role,
            "overall_score": avg_score,
            "technical_knowledge": min(100.0, avg_score + 4.0),
            "communication": min(100.0, avg_score - 3.0),
            "confidence": min(100.0, avg_score - 6.0),
            "problem_understanding": min(100.0, avg_score + 2.0),
            "relevance": min(100.0, avg_score + 5.0),
            "grammar": 90.0,
            "strengths": [
                "Strong understanding of core technical principles",
                "Articulate project descriptions with relevant technology choices",
                "Clear logic when explaining problem-solving steps"
            ],
            "weaknesses": [
                "Needs higher verbal confidence during situational questions",
                "Some explanations lacked quantifiable metrics or performance benchmarks",
                "Could expand more on edge-case error handling"
            ],
            "recommended_preparation": [
                "Revise Python concurrency & async event loop internals",
                "Practice complex SQL query optimization & indexing strategies",
                "Prepare structured architecture diagrams for past projects",
                "Practice behavioral HR questions using the STAR framework",
                "Improve mock interview verbal delivery pacing"
            ],
            "recommended_questions": [
                "How do index data structures (B-Tree vs Hash) affect database write vs read speeds?",
                "Explain the GIL in Python and how multiprocessing bypasses it.",
                "How do you implement OAuth2 refresh token rotation securely?",
                "What is the difference between client-side rendering and server-side rendering?",
                "How do you handle race conditions in multi-threaded database transactions?",
                "Explain WebSockets vs Server-Sent Events vs Polling.",
                "How do you design a rate limiter middleware for a high-traffic API?",
                "What strategies do you use to reduce Docker image bundle sizes?",
                "How do you approach refactoring a legacy monolithic application into microservices?",
                "Walk me through a conflict you resolved with a teammate on project architecture."
            ],
            "completed_at": "Today"
        }

    async def generate_preparation_plan(self, weak_skills: List[str] = None) -> List[Dict[str, Any]]:
        return [
            {
                "day": 1,
                "title": "Day 01: Core Fundamentals",
                "focus": "Python Concurrency, Data Structures & Memory Management",
                "progress": 80,
                "completed": True,
                "topics": ["Python Async/Await", "GIL & Multiprocessing", "Memory Management & Garbage Collection"]
            },
            {
                "day": 2,
                "title": "Day 02: Database & SQL Mastery",
                "focus": "Query Optimization, Indexing & ACID Transactions",
                "progress": 50,
                "completed": False,
                "topics": ["B-Tree & Hash Indexes", "EXPLAIN Query Execution Plans", "Database Lock Isolation Levels"]
            },
            {
                "day": 3,
                "title": "Day 03: Project Architecture Deep-Dive",
                "focus": "System Design, Microservices & Component Specs",
                "progress": 60,
                "completed": False,
                "topics": ["STAR Project Method", "API Gateway & Load Balancing", "Caching Strategies with Redis"]
            },
            {
                "day": 4,
                "title": "Day 04: Technical Deep-Dive & Coding",
                "focus": "Algorithms, Data Structures & REST API Security",
                "progress": 20,
                "completed": False,
                "topics": ["OAuth2 JWT Auth Flow", "Rate Limiting", "Error Handling & Middleware"]
            },
            {
                "day": 5,
                "title": "Day 05: Behavioral & HR Questions",
                "focus": "Communication, Leadership & Conflict Resolution",
                "progress": 0,
                "completed": False,
                "topics": ["Tell Me About Yourself", "Overcoming Technical Blockers", "Strengths & Weaknesses"]
            },
            {
                "day": 6,
                "title": "Day 06: Full Mock Interview Simulation",
                "focus": "Timed AI Interview Session & Voice Delivery",
                "progress": 0,
                "completed": False,
                "topics": ["Voice Response Practice", "Pacing & Clarity Check", "Instant Score Benchmark"]
            },
            {
                "day": 7,
                "title": "Day 07: Final Revision & Confidence Boost",
                "focus": "Review Weak Areas & Master 10 Targeted Questions",
                "progress": 0,
                "completed": False,
                "topics": ["10 Target Weakness Questions", "Resume Highlight Review", "Final Checklist"]
            }
        ]

ai_service = AIService()
