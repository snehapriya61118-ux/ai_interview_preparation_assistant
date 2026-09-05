import React, { useState, useEffect } from 'react';
import { getPreparationPlan, togglePreparationTopic } from '../services/api';
import GlassCard from '../components/GlassCard';
import { BookOpen, CheckCircle2, Circle, Sparkles, Calendar, Layers, Trophy } from 'lucide-react';

const PreparationPlanPage = () => {
  const [days, setDays] = useState([
    {
      day: 1,
      title: "DAY 01: Python Fundamentals",
      focus: "Python Concurrency, Memory & Async",
      progress: 80,
      completed: true,
      topics: ["Async/Await Event Loops", "GIL & Multiprocessing", "Memory Management"]
    },
    {
      day: 2,
      title: "DAY 02: Database & SQL",
      focus: "Query Indexing & ACID Transactions",
      progress: 50,
      completed: false,
      topics: ["B-Tree & Hash Indexing", "EXPLAIN Query Plans", "Database Isolation Levels"]
    },
    {
      day: 3,
      title: "DAY 03: Project Architecture",
      focus: "System Design & STAR Preparation",
      progress: 60,
      completed: false,
      topics: ["STAR Project Walkthrough", "API Gateway & Load Balancing", "Redis Caching Strategy"]
    },
    {
      day: 4,
      title: "DAY 04: Technical Deep-Dive",
      focus: "REST Security & Error Handling",
      progress: 20,
      completed: false,
      topics: ["OAuth2 JWT Auth Flow", "Rate Limiting Middleware", "Global Exception Handlers"]
    },
    {
      day: 5,
      title: "DAY 05: HR & Behavioral Questions",
      focus: "Communication & Conflict Resolution",
      progress: 0,
      completed: false,
      topics: ["Tell Me About Yourself", "Overcoming Blockers", "Strengths & Weaknesses"]
    },
    {
      day: 6,
      title: "DAY 06: Mock Interview Simulation",
      focus: "Voice Interview & Timed Sessions",
      progress: 0,
      completed: false,
      topics: ["Voice Delivery Pacing", "Live Question Response", "Instant Evaluation Check"]
    },
    {
      day: 7,
      title: "DAY 07: Final Revision",
      focus: "Target 10 Weak Area Questions",
      progress: 0,
      completed: false,
      topics: ["10 Weakness Questions", "Resume Highlight Verification", "Final Practice Session"]
    }
  ]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getPreparationPlan();
        if (res.data && res.data.days) {
          setDays(res.data.days);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlan();
  }, []);

  const handleToggle = async (dayNum, currentStatus) => {
    const newStatus = !currentStatus;
    setDays((prev) =>
      prev.map((d) =>
        d.day === dayNum
          ? { ...d, completed: newStatus, progress: newStatus ? 100 : 40 }
          : d
      )
    );

    try {
      await togglePreparationTopic({
        day: dayNum,
        topic: `Day ${dayNum}`,
        completed: newStatus
      });
    } catch (err) {
      console.error(err);
    }
  };

  const completedCount = days.filter((d) => d.completed).length;
  const overallPercentage = Math.round((completedCount / days.length) * 100);

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Banner */}
      <GlassCard className="p-8 border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/15 via-[#4F8CFF]/15 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-cyanAccent uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" />
            PERSONALIZED 7-DAY PREPARATION ROADMAP
          </span>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            Interview Prep Plan
          </h1>
          <p className="text-xs text-[#A7B0C0]">
            Customized roadmap based on your resume analysis, job requirements, and weak skill areas. Click any day card to toggle completion.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 glass-subtle p-4 rounded-2xl border border-white/20">
          <Trophy className="w-10 h-10 text-[#F59E0B]" />
          <div>
            <span className="text-2xl font-extrabold text-white">{overallPercentage}%</span>
            <p className="text-xs text-[#A7B0C0]">{completedCount} of 7 Days Completed</p>
          </div>
        </div>
      </GlassCard>

      {/* 7 Day Glass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((item) => (
          <GlassCard
            key={item.day}
            onClick={() => handleToggle(item.day, item.completed)}
            className={`p-6 cursor-pointer transition-all duration-300 border-t-4 ${
              item.completed
                ? 'border-t-[#22C55E] bg-[#22C55E]/5'
                : 'border-t-[#4F8CFF] hover:border-t-[#8B5CF6]'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-white tracking-wide uppercase">
                {item.title}
              </span>
              <button
                type="button"
                className={`p-1 rounded-full ${item.completed ? 'text-[#22C55E]' : 'text-[#A7B0C0]'}`}
              >
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 fill-[#22C55E]/20" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
            </div>

            <p className="text-xs text-cyanAccent font-semibold mb-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{item.focus}</span>
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-bold text-[#A7B0C0] mb-1">
                <span>Completion</span>
                <span className="text-white">{item.completed ? '100%' : `${item.progress}%`}</span>
              </div>
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.completed
                      ? 'bg-[#22C55E]'
                      : 'bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6]'
                  }`}
                  style={{ width: item.completed ? '100%' : `${item.progress}%` }}
                />
              </div>
            </div>

            {/* Topics List */}
            <div className="space-y-1.5 pt-3 border-t border-white/10">
              {item.topics?.map((top, idx) => (
                <div key={idx} className="text-xs text-white/80 flex items-center gap-2">
                  <span className="text-[#4F8CFF] font-bold">•</span>
                  <span>{top}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default PreparationPlanPage;
