import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, Award, Zap } from 'lucide-react';
import CircularProgress from './CircularProgress';

const FeedbackCard = ({ evaluation, onContinue }) => {
  if (!evaluation) return null;

  const {
    overall_score = 82,
    relevance = 90,
    technical_knowledge = 84,
    communication = 78,
    confidence = 75,
    strengths = [],
    weaknesses = [],
    improved_answer = "",
    tips = []
  } = evaluation;

  const scoreBars = [
    { label: 'Relevance', val: relevance, color: '#22D3EE' },
    { label: 'Technical', val: technical_knowledge, color: '#4F8CFF' },
    { label: 'Communication', val: communication, color: '#8B5CF6' },
    { label: 'Confidence', val: confidence, color: '#F59E0B' },
  ];

  return (
    <div className="glass border-[#4F8CFF]/30 p-6 md:p-8 rounded-2xl relative overflow-hidden animate-fadeIn">
      {/* Top Header & Score Gauge */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-white/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-[#4F8CFF]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              AI Answer Evaluation
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 font-medium">
                Evaluated Instant
              </span>
            </h3>
            <p className="text-xs text-[#A7B0C0] mt-0.5">Fair, structured review based on role requirements</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <CircularProgress score={overall_score} size={90} strokeWidth={8} label="Score" />
        </div>
      </div>

      {/* Metrics Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {scoreBars.map((bar, idx) => (
          <div key={idx} className="glass-subtle p-3.5">
            <div className="flex justify-between items-center text-xs font-semibold text-[#A7B0C0] mb-1.5">
              <span>{bar.label}</span>
              <span className="text-white font-bold">{bar.val}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${bar.val}%`, backgroundColor: bar.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* What You Did Well */}
        <div className="glass-subtle p-4 border-l-4 border-l-[#22C55E]">
          <h4 className="text-sm font-bold text-[#22C55E] flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4" />
            What You Did Well
          </h4>
          <ul className="space-y-2">
            {strengths.map((str, i) => (
              <li key={i} className="text-xs text-white/90 flex items-start gap-2">
                <span className="text-[#22C55E] mt-0.5">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What You Need To Improve */}
        <div className="glass-subtle p-4 border-l-4 border-l-[#F59E0B]">
          <h4 className="text-sm font-bold text-[#F59E0B] flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4" />
            What You Need To Improve
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((weak, i) => (
              <li key={i} className="text-xs text-white/90 flex items-start gap-2">
                <span className="text-[#F59E0B] mt-0.5">•</span>
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Improved Sample Answer */}
      {improved_answer && (
        <div className="glass-subtle p-4 my-4 border-l-4 border-l-[#4F8CFF]">
          <h4 className="text-sm font-bold text-[#4F8CFF] flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4" />
            Better Sample Answer
          </h4>
          <p className="text-xs text-white/90 leading-relaxed italic bg-white/5 p-3 rounded-xl border border-white/10">
            "{improved_answer}"
          </p>
        </div>
      )}

      {/* Interview Tip */}
      {tips && tips.length > 0 && (
        <div className="glass-subtle p-4 my-4 border-l-4 border-l-[#22D3EE] bg-cyanAccent/5">
          <h4 className="text-sm font-bold text-cyanAccent flex items-center gap-2 mb-1.5">
            <Lightbulb className="w-4 h-4" />
            Interview Tip
          </h4>
          <p className="text-xs text-white/90">{tips[0]}</p>
        </div>
      )}

      {/* Continue Action Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onContinue}
          className="btn-primary px-7 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <span>Continue Interview</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
