import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, FileText, Mic, Award, Zap, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  const features = [
    {
      icon: FileText,
      title: 'AI Resume & JD Parser',
      description: 'Upload PDF or DOCX resumes and job descriptions. Get instant skill gap matching and potential technical questions.',
      color: '#4F8CFF'
    },
    {
      icon: Mic,
      title: 'Voice & Text Mock Interview',
      description: 'Real-time interactive mock interview room with Speech-to-Text voice answers, animated AI avatar, and live transcription.',
      color: '#8B5CF6'
    },
    {
      icon: Zap,
      title: 'Adaptive AI Questions',
      description: 'Dynamic difficulty adjustments (Easy → Medium → Hard) based on your performance and follow-up questions in real-time.',
      color: '#22D3EE'
    },
    {
      icon: Award,
      title: 'Instant Answer Evaluation',
      description: 'Get immediate score breakdowns (Relevance, Technical, Communication, Confidence) and improved STAR sample answers.',
      color: '#22C55E'
    }
  ];

  const steps = [
    { num: '01', title: 'Upload Resume & Target JD', desc: 'System parses your skills, projects, and compares match percentage.' },
    { num: '02', title: 'Enter AI Interview Room', desc: 'AI Interviewer asks role-specific HR, Technical, and Situational questions.' },
    { num: '03', title: 'Answer via Voice or Text', desc: 'Speak into your microphone or type answers with live editable transcript.' },
    { num: '04', title: 'Get Prep Report & 7-Day Plan', desc: 'Receive instant answer scoring, weakness report, and personalized study roadmap.' }
  ];

  return (
    <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
      {/* Hero Section */}
      <section className="text-center pt-8 md:pt-16 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border-[#4F8CFF]/40 text-cyanAccent text-xs font-semibold tracking-wide uppercase shadow-[0_0_20px_rgba(79,140,255,0.2)]">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Next-Generation AI Interview Coach</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Ace Your Next Tech Interview with <br />
          <span className="bg-gradient-to-r from-[#4F8CFF] via-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">
            AI-Powered Mock Practice
          </span>
        </h1>

        <p className="text-base md:text-lg text-[#A7B0C0] max-w-2xl leading-relaxed">
          Upload your resume, match job requirements, attend live voice-enabled mock interviews with an adaptive AI interviewer, and receive instant feedback reports.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Link to="/mock-interview" className="btn-primary px-8 py-4 rounded-xl font-bold text-base flex items-center gap-3">
            <Mic className="w-5 h-5" />
            <span>Start Mock Interview</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/resume" className="btn-secondary px-8 py-4 rounded-xl font-bold text-base flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#4F8CFF]" />
            <span>Upload Resume</span>
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <GlassCard key={i} className="flex flex-col justify-between">
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white/20"
                  style={{ background: `radial-gradient(circle, ${feat.color}33 0%, rgba(0,0,0,0) 80%)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feat.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-[#A7B0C0] leading-relaxed">{feat.description}</p>
              </div>
            </GlassCard>
          );
        })}
      </section>

      {/* How It Works Section */}
      <section className="glass p-8 md:p-12 rounded-3xl border-[#8B5CF6]/30">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">How AI Interview Coach Works</h2>
          <p className="text-xs md:text-sm text-[#A7B0C0] mt-2">Four simple steps to transform your interview confidence</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="glass-subtle p-6 relative flex flex-col justify-between">
              <span className="text-3xl font-extrabold text-[#4F8CFF]/40 mb-3 block">{s.num}</span>
              <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
              <p className="text-xs text-[#A7B0C0] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
