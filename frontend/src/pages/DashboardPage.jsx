import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../services/api';
import GlassCard from '../components/GlassCard';
import { 
  Mic, 
  FileText, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Calendar,
  ArrowUpRight,
  Sparkles,
  Zap
} from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    candidate_name: 'Alex Morgan',
    resume_status: 'Uploaded & Analyzed',
    current_preparation_score: 84,
    interviews_completed: 8,
    average_interview_score: 82,
    skill_match_score: 86,
    improvement_points: '+18%',
    recent_interviews: [
      { id: 1, job_role: 'Full Stack Developer', score: 82, status: 'completed', date: 'Yesterday' },
      { id: 2, job_role: 'Python Backend Engineer', score: 76, status: 'completed', date: '3 days ago' },
      { id: 3, job_role: 'React Frontend Developer', score: 69, status: 'completed', date: '1 week ago' }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        if (res.data) {
          setStats((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error("Dashboard stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Interview Score',
      value: `${stats.average_interview_score}/100`,
      icon: Award,
      color: '#4F8CFF',
      sub: 'Based on 8 mock sessions'
    },
    {
      title: 'Interviews Completed',
      value: stats.interviews_completed,
      icon: Mic,
      color: '#8B5CF6',
      sub: 'Completed mock rounds'
    },
    {
      title: 'Skill Match',
      value: `${stats.skill_match_score}%`,
      icon: Target,
      color: '#22D3EE',
      sub: 'Resume to JD alignment'
    },
    {
      title: 'Improvement',
      value: stats.improvement_points,
      icon: TrendingUp,
      color: '#22C55E',
      sub: 'Score growth overall'
    }
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Banner */}
      <div className="glass p-6 md:p-8 rounded-3xl border-[#4F8CFF]/30 bg-gradient-to-r from-[#4F8CFF]/15 via-[#8B5CF6]/15 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyanAccent mb-2">
            <Sparkles className="w-4 h-4" />
            <span>WELCOME BACK</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Hello, {stats.candidate_name}!
          </h1>
          <p className="text-xs md:text-sm text-[#A7B0C0] mt-1 flex items-center gap-2">
            <span>Resume Status:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 font-medium">
              {stats.resume_status}
            </span>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/mock-interview" className="btn-primary px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2">
            <Mic className="w-4 h-4" />
            <span>Start New Interview</span>
          </Link>
          <Link to="/resume" className="btn-secondary px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#4F8CFF]" />
            <span>Upload Resume</span>
          </Link>
          <Link to="/preparation" className="btn-secondary px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
            <span>Prep Plan</span>
          </Link>
        </div>
      </div>

      {/* 4 Glass Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <GlassCard key={i} className="flex flex-col justify-between p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#A7B0C0] uppercase tracking-wider">{c.title}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                  style={{ backgroundColor: `${c.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white tracking-tight">{c.value}</span>
                <p className="text-[11px] text-[#A7B0C0] mt-1">{c.sub}</p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Main Content Grid: Recent Interviews & Preparation Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Interviews List (2 cols) */}
        <GlassCard className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-[#4F8CFF]" />
                Recent Mock Interviews
              </h3>
              <Link to="/performance" className="text-xs text-[#4F8CFF] font-semibold flex items-center gap-1 hover:underline">
                <span>View All History</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {stats.recent_interviews.map((item) => (
                <div
                  key={item.id}
                  className="glass-subtle p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-white/10 flex items-center justify-center font-bold text-xs text-[#4F8CFF]">
                      #{item.id}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.job_role}</h4>
                      <p className="text-xs text-[#A7B0C0] flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#22C55E]">{item.score}/100</span>
                      <p className="text-[10px] text-[#A7B0C0] capitalize">{item.status}</p>
                    </div>
                    <Link
                      to={`/report/${item.id}`}
                      className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white hover:bg-[#4F8CFF] transition-colors"
                    >
                      Report
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A7B0C0]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyanAccent" />
              <span>You improved by +20 points over 4 sessions!</span>
            </span>
            <Link to="/mock-interview" className="text-[#4F8CFF] font-bold hover:underline">
              Practice Next Question →
            </Link>
          </div>
        </GlassCard>

        {/* Preparation Plan Snapshot (1 col) */}
        <GlassCard className="p-6 flex flex-col justify-between border-[#8B5CF6]/30">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
                7-Day Prep Roadmap
              </h3>
              <span className="text-xs font-bold text-cyanAccent">Day 2 of 7</span>
            </div>

            <div className="space-y-4">
              <div className="glass-subtle p-3.5 border-l-4 border-l-[#22C55E]">
                <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                  <span>DAY 01: Fundamentals</span>
                  <span className="text-[#22C55E]">100%</span>
                </div>
                <p className="text-[11px] text-[#A7B0C0]">Python Async & Data Structures</p>
              </div>

              <div className="glass-subtle p-3.5 border-l-4 border-l-[#4F8CFF]">
                <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                  <span>DAY 02: Database & SQL</span>
                  <span className="text-[#4F8CFF]">50%</span>
                </div>
                <p className="text-[11px] text-[#A7B0C0]">Indexes & Query Plans</p>
              </div>

              <div className="glass-subtle p-3.5 border-l-4 border-l-white/20 opacity-60">
                <div className="flex justify-between items-center text-xs font-bold text-white mb-1">
                  <span>DAY 03: System Design</span>
                  <span>0%</span>
                </div>
                <p className="text-[11px] text-[#A7B0C0]">APIs & Redis Caching</p>
              </div>
            </div>
          </div>

          <Link
            to="/preparation"
            className="w-full btn-secondary mt-6 py-2.5 rounded-xl text-xs font-bold text-center block"
          >
            View Full 7-Day Plan
          </Link>
        </GlassCard>
      </div>
    </div>
  );
};

export default DashboardPage;
