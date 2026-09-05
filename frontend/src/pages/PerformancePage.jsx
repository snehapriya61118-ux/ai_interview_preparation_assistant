import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import GlassCard from '../components/GlassCard';
import CircularProgress from '../components/CircularProgress';
import { BarChart3, TrendingUp, Award, Zap, Sparkles, CheckCircle2, Mic } from 'lucide-react';

const PerformancePage = () => {
  const [stats, setStats] = useState({
    candidate_name: 'Alex Morgan',
    average_interview_score: 82,
    interviews_completed: 8,
    improvement_points: '+20 points',
    score_progression: [
      { interview: 'Interview 1', score: 62 },
      { interview: 'Interview 2', score: 69 },
      { interview: 'Interview 3', score: 76 },
      { interview: 'Interview 4', score: 82 }
    ]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        if (res.data) {
          setStats((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const domainScores = [
    { name: 'Technical Knowledge', score: 84, color: '#4F8CFF' },
    { name: 'Communication & Delivery', score: 78, color: '#8B5CF6' },
    { name: 'Confidence & Voice', score: 75, color: '#F59E0B' },
    { name: 'Problem Understanding', score: 86, color: '#22D3EE' },
    { name: 'Answer Relevance', score: 90, color: '#22C55E' },
    { name: 'Grammar & Clarity', score: 88, color: '#E879F9' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Banner */}
      <GlassCard className="p-8 border-[#4F8CFF]/30 bg-gradient-to-r from-[#4F8CFF]/15 via-[#8B5CF6]/15 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-cyanAccent uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" />
            PERFORMANCE & PROGRESS TRACKER
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            Interview Analytics Dashboard
          </h1>
          <p className="text-xs text-[#A7B0C0]">
            Track your mock interview score progression over time and review domain skill mastery.
          </p>
        </div>

        <div className="glass-subtle p-4 rounded-2xl flex items-center gap-3 border border-[#22C55E]/40">
          <Zap className="w-8 h-8 text-[#22C55E]" />
          <div>
            <span className="text-sm font-extrabold text-white">Score Improvement</span>
            <p className="text-lg font-black text-[#22C55E]">You improved by 20 points!</p>
          </div>
        </div>
      </GlassCard>

      {/* Progress Charts & Historical Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score Progression Bars (7 cols) */}
        <GlassCard className="lg:col-span-7 p-6 border-[#4F8CFF]/30">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#4F8CFF]" />
            Mock Interview Score Progression
          </h3>

          <div className="space-y-6">
            {stats.score_progression?.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white flex items-center gap-2">
                    <Mic className="w-3.5 h-3.5 text-[#4F8CFF]" />
                    {item.interview}
                  </span>
                  <span className="text-[#22C55E]">{item.score}/100</span>
                </div>
                <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4F8CFF] via-[#8B5CF6] to-[#22C55E] transition-all duration-1000 ease-out"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A7B0C0]">
            <span>Interview 1 → 62 score</span>
            <span className="text-[#22C55E] font-bold">Interview 4 → 82 score (+20 pts)</span>
          </div>
        </GlassCard>

        {/* Domain Skill Gauges (5 cols) */}
        <GlassCard className="lg:col-span-5 p-6 border-[#8B5CF6]/30">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#8B5CF6]" />
            Domain Skill Mastery
          </h3>

          <div className="space-y-4">
            {domainScores.map((ds, idx) => (
              <div key={idx} className="glass-subtle p-3 rounded-xl flex items-center justify-between">
                <span className="text-xs font-semibold text-white">{ds.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${ds.score}%`, backgroundColor: ds.color }} />
                  </div>
                  <span className="text-xs font-bold text-white w-8 text-right">{ds.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default PerformancePage;
