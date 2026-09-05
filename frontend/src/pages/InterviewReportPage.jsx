import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInterviewReport } from '../services/api';
import GlassCard from '../components/GlassCard';
import CircularProgress from '../components/CircularProgress';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

const InterviewReportPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState({
    interview_id: 101,
    job_role: "Full Stack Software Engineer",
    overall_score: 78.0,
    technical_knowledge: 82.0,
    communication: 75.0,
    confidence: 72.0,
    problem_understanding: 80.0,
    relevance: 85.0,
    grammar: 88.0,
    strengths: [
      "Strong Python fundamentals & REST API design concepts",
      "Clear explanation of food recommendation system project",
      "Good structure when answering technical questions"
    ],
    weaknesses: [
      "Needs higher verbal confidence during situational scenarios",
      "Some technical answers were too concise, lacking deep metrics",
      "Could expand further on database query indexing details"
    ],
    recommended_preparation: [
      "Revise Python async event loop & GIL internals",
      "Practice SQL query optimization & EXPLAIN plans",
      "Prepare project architecture diagrams for STAR delivery",
      "Practice behavioral HR questions with confidence pacing",
      "Review microservices security & rate limiting"
    ],
    recommended_questions: [
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
    ]
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getInterviewReport(id || 101);
        if (res.data) {
          setReport(res.data);
        }
      } catch (err) {
        console.error("Report fetch error:", err);
      }
    };
    fetchReport();
  }, [id]);

  const metrics = [
    { label: 'Technical Knowledge', val: report.technical_knowledge, color: '#4F8CFF' },
    { label: 'Communication', val: report.communication, color: '#8B5CF6' },
    { label: 'Confidence', val: report.confidence, color: '#F59E0B' },
    { label: 'Problem Understanding', val: report.problem_understanding, color: '#22D3EE' },
    { label: 'Relevance', val: report.relevance, color: '#22C55E' },
    { label: 'Grammar', val: report.grammar, color: '#E879F9' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="text-xs font-bold text-[#A7B0C0] hover:text-white flex items-center gap-1.5 glass-subtle px-3.5 py-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            <span>Download Report PDF</span>
          </button>
        </div>
      </div>

      {/* Main Score Banner Card */}
      <GlassCard className="p-8 border-[#4F8CFF]/30 bg-gradient-to-r from-[#4F8CFF]/15 via-[#8B5CF6]/15 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="text-xs font-bold text-cyanAccent uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" />
            FINAL INTERVIEW PERFORMANCE REPORT
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Target Role: {report.job_role}
          </h1>
          <p className="text-xs text-[#A7B0C0] max-w-lg leading-relaxed">
            Congratulations on completing your mock interview session! Below is your overall performance breakdown, strengths, areas for growth, and 10 targeted revision questions.
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <CircularProgress score={report.overall_score} size={120} strokeWidth={10} label="Overall Score" />
        </div>
      </GlassCard>

      {/* 6 Metric Breakdown Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <GlassCard key={i} className="p-4 text-center">
            <span className="text-[11px] font-semibold text-[#A7B0C0] block mb-1">{m.label}</span>
            <p className="text-2xl font-extrabold text-white" style={{ color: m.color }}>{Math.round(m.val)}</p>
          </GlassCard>
        ))}
      </div>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 border-l-4 border-l-[#22C55E]">
          <h3 className="text-base font-bold text-[#22C55E] flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5" />
            Candidate Strengths
          </h3>
          <ul className="space-y-3 text-xs text-white/90">
            {report.strengths?.map((str, i) => (
              <li key={i} className="glass-subtle p-3 flex items-start gap-2.5">
                <span className="text-[#22C55E] font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6 border-l-4 border-l-[#F59E0B]">
          <h3 className="text-base font-bold text-[#F59E0B] flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" />
            Areas Needed for Improvement
          </h3>
          <ul className="space-y-3 text-xs text-white/90">
            {report.weaknesses?.map((wk, i) => (
              <li key={i} className="glass-subtle p-3 flex items-start gap-2.5">
                <span className="text-[#F59E0B] font-bold">•</span>
                <span>{wk}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Recommended Preparation Roadmap */}
      <GlassCard className="p-6 border-[#8B5CF6]/30">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
          Recommended Preparation Action Plan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {report.recommended_preparation?.map((rec, i) => (
            <div key={i} className="glass-subtle p-3.5 rounded-xl flex flex-col justify-between">
              <span className="text-xs font-bold text-[#8B5CF6] mb-1">STEP 0{i+1}</span>
              <p className="text-xs text-white/90 leading-snug">{rec}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 10 Targeted Review Questions */}
      <GlassCard className="p-6 border-[#4F8CFF]/30">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-[#4F8CFF]" />
          10 Targeted Questions for Your Weak Areas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {report.recommended_questions?.map((q, i) => (
            <div key={i} className="glass-subtle p-3.5 rounded-xl border-l-2 border-l-[#4F8CFF] text-xs text-white/90">
              <span className="text-[#4F8CFF] font-bold mr-1">Q{i+1}:</span> {q}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default InterviewReportPage;
