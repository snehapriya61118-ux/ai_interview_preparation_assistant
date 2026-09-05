import React, { useState } from 'react';
import { analyzeJobDescription } from '../services/api';
import GlassCard from '../components/GlassCard';
import CircularProgress from '../components/CircularProgress';
import { 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Target,
  FileText,
  BookOpen
} from 'lucide-react';

const JobDescriptionPage = () => {
  const [jdText, setJdText] = useState(
    "We are looking for a Senior Full Stack Engineer with strong experience in Python, FastAPI, React, SQL databases, and RESTful API architecture. Experience with Docker, Redis, and Cloud deployments is preferred."
  );
  const [targetRole, setTargetRole] = useState("Full Stack Engineer");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState({
    required_skills: ["Python", "FastAPI", "React", "REST APIs", "SQL"],
    preferred_skills: ["Docker", "Redis", "Cloud Deployments"],
    experience_requirements: "2-4 years full stack web development",
    technologies: ["Python", "FastAPI", "React", "PostgreSQL", "Tailwind CSS"],
    responsibilities: [
      "Architect clean, RESTful APIs using FastAPI",
      "Build dynamic Glassmorphism user interfaces in React",
      "Optimize SQL database query performance"
    ],
    important_keywords: ["Full-Stack", "FastAPI", "React", "REST API", "Database Indexing"],
    match_scores: {
      technical_skills: 82,
      experience_match: 70,
      education_match: 95,
      keyword_match: 76,
      overall_match: 81
    },
    matching_skills: ["Python", "React", "FastAPI", "SQL", "REST APIs"],
    missing_skills: ["Redis Caching", "Docker Containerization"],
    recommended_skills: ["Learn Redis Caching Strategy", "Master Docker Container Deployments"]
  });

  const handleAnalyze = async () => {
    if (!jdText.trim()) return;
    setLoading(true);
    try {
      const res = await analyzeJobDescription({
        job_description_text: jdText,
        target_role: targetRole
      });
      if (res.data && res.data.analysis) {
        setAnalysisResult(res.data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scores = analysisResult?.match_scores || {
    technical_skills: 82,
    experience_match: 70,
    education_match: 95,
    keyword_match: 76,
    overall_match: 81
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header & Inputs */}
      <GlassCard className="p-8 border-[#4F8CFF]/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(79,140,255,0.4)]">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Job Description & Skill Match</h2>
            <p className="text-xs text-[#A7B0C0]">Paste a target job posting to compare against your uploaded resume</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1.5">Target Job Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#4F8CFF]"
              placeholder="e.g. Software Engineer / Full Stack Developer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1.5">Job Description Text</label>
            <textarea
              rows={5}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-[#A7B0C0]/50 focus:outline-none focus:border-[#4F8CFF]"
              placeholder="Paste job description requirements, responsibilities, and required tech stack..."
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span>{loading ? 'Comparing Resume vs JD...' : 'Analyze & Match Resume'}</span>
          </button>
        </div>
      </GlassCard>

      {/* Match Breakdown & Analytics */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Main Overall Match Banner */}
          <GlassCard className="p-8 border-[#22D3EE]/30 bg-gradient-to-r from-[#4F8CFF]/15 via-[#8B5CF6]/15 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold text-cyanAccent uppercase tracking-widest block mb-1">
                RESUME-JOB MATCH ANALYSIS
              </span>
              <h3 className="text-3xl font-extrabold text-white mb-2">
                Overall Match: <span className="text-cyanAccent">{scores.overall_match}%</span>
              </h3>
              <p className="text-xs text-[#A7B0C0] max-w-lg leading-relaxed">
                Your profile demonstrates high alignment with core technical requirements. Master the missing recommended skills below to boost match rate to 95%+.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <CircularProgress score={scores.overall_match} size={110} strokeWidth={9} label="Match" />
            </div>
          </GlassCard>

          {/* 4 Skill Gauges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <GlassCard className="p-4 text-center">
              <span className="text-xs text-[#A7B0C0] font-semibold">Technical Skills</span>
              <p className="text-2xl font-extrabold text-[#4F8CFF] mt-1">{scores.technical_skills}%</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <span className="text-xs text-[#A7B0C0] font-semibold">Experience Match</span>
              <p className="text-2xl font-extrabold text-[#8B5CF6] mt-1">{scores.experience_match}%</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <span className="text-xs text-[#A7B0C0] font-semibold">Education Match</span>
              <p className="text-2xl font-extrabold text-[#22C55E] mt-1">{scores.education_match}%</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <span className="text-xs text-[#A7B0C0] font-semibold">Keyword Match</span>
              <p className="text-2xl font-extrabold text-cyanAccent mt-1">{scores.keyword_match}%</p>
            </GlassCard>
          </div>

          {/* Skill Lists Grid: Matching vs Missing vs Recommended */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Matching Skills */}
            <GlassCard className="p-6 border-l-4 border-l-[#22C55E]">
              <h4 className="text-sm font-bold text-[#22C55E] flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                Matching Skills ({analysisResult.matching_skills?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.matching_skills?.map((sk, i) => (
                  <span key={i} className="text-xs bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] px-2.5 py-1 rounded-lg">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Missing Skills */}
            <GlassCard className="p-6 border-l-4 border-l-[#EF4444]">
              <h4 className="text-sm font-bold text-[#EF4444] flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4" />
                Missing Skills ({analysisResult.missing_skills?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysisResult.missing_skills?.map((ms, i) => (
                  <span key={i} className="text-xs bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] px-2.5 py-1 rounded-lg">
                    ✗ {ms}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Recommended Learning */}
            <GlassCard className="p-6 border-l-4 border-l-cyanAccent">
              <h4 className="text-sm font-bold text-cyanAccent flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4" />
                Recommended to Learn
              </h4>
              <ul className="space-y-2 text-xs text-white/90">
                {analysisResult.recommended_skills?.map((rec, i) => (
                  <li key={i} className="glass-subtle p-2 text-cyanAccent font-medium flex items-center gap-2">
                    <span>•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionPage;
