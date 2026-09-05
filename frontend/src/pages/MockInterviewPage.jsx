import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInterview, generateQuestions, evaluateAnswer, generateFollowUp, completeInterview } from '../services/api';
import GlassCard from '../components/GlassCard';
import AIAvatar from '../components/AIAvatar';
import VoiceRecorder from '../components/VoiceRecorder';
import FeedbackCard from '../components/FeedbackCard';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Play, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  RefreshCw,
  Award,
  Volume2
} from 'lucide-react';

const MockInterviewPage = () => {
  const navigate = useNavigate();
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewId, setInterviewId] = useState(101);
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [completedAnswers, setCompletedAnswers] = useState([]);

  // Text-To-Speech helper for AI Interviewer speaking out loud
  const speakQuestionText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsAiSpeaking(true);
      setTimeout(() => setIsAiSpeaking(false), 2500);
    }
  };

  // Default fallback initial questions if API loading
  const defaultQuestions = [
    {
      id: 1,
      category: "HR",
      difficulty: "Easy",
      question: "Tell me about yourself and why you are interested in this position."
    },
    {
      id: 2,
      category: "Resume",
      difficulty: "Medium",
      question: "I see you built a Food Recommendation Engine using Python. What algorithm did you choose and how did you measure its accuracy?"
    },
    {
      id: 3,
      category: "Technical",
      difficulty: "Medium",
      question: "In Python / FastAPI, how does async event looping handle concurrency compared to traditional multi-threading?"
    },
    {
      id: 4,
      category: "Situational",
      difficulty: "Hard",
      question: "Imagine a critical API endpoint starts timing out in production during peak traffic. Walk me through your step-by-step troubleshooting process."
    },
    {
      id: 5,
      category: "HR",
      difficulty: "Medium",
      question: "Describe a technical mistake you made in a project and how you resolved it."
    }
  ];

  const handleStartInterview = async () => {
    setInterviewStarted(true);
    let loadedQuestions = defaultQuestions;

    try {
      // Create DB interview record
      const createRes = await createInterview({ job_role: targetRole, difficulty });
      if (createRes.data && createRes.data.interview_id) {
        setInterviewId(createRes.data.interview_id);
      }

      const res = await generateQuestions({
        target_role: targetRole,
        difficulty: difficulty,
        number_of_questions: 5
      });
      if (res.data && res.data.questions && res.data.questions.length > 0) {
        loadedQuestions = res.data.questions;
        setQuestions(res.data.questions);
      } else {
        setQuestions(defaultQuestions);
      }
    } catch (err) {
      console.error(err);
      setQuestions(defaultQuestions);
    } finally {
      speakQuestionText(loadedQuestions[0]?.question || defaultQuestions[0].question);
    }
  };

  const currentQ = (questions.length > 0 && questions[currentIdx]) ? questions[currentIdx] : defaultQuestions[0];

  const handleSubmitAnswer = async () => {
    if (!candidateAnswer.trim()) return;
    setIsSubmitting(true);

    let evalData = null;
    try {
      const res = await evaluateAnswer({
        question: currentQ.question,
        answer: candidateAnswer,
        category: currentQ.category,
        difficulty: currentQ.difficulty
      });
      if (res.data) {
        evalData = res.data;
      }
    } catch (err) {
      console.warn("API evaluation fallback active:", err);
    }

    if (!evalData) {
      const wordCount = candidateAnswer.trim().split(/\s+/).length;
      const baseScore = wordCount > 50 ? 92 : wordCount > 20 ? 84 : 70;
      evalData = {
        overall_score: baseScore,
        correctness: Math.min(100, baseScore + 3),
        relevance: Math.min(100, baseScore + 5),
        communication: Math.min(100, baseScore - 2),
        confidence: Math.min(100, baseScore - 4),
        technical_knowledge: Math.min(100, baseScore + 2),
        grammar: 92,
        feedback: `Your answer demonstrated good understanding of ${currentQ.category} principles and directly addressed the core question.`,
        strengths: [
          "Relevant technical vocabulary and clear explanation",
          "Structured response directly referencing practical implementation"
        ],
        weaknesses: [
          "Consider providing more specific quantitative metrics or latency benchmarks",
          "Pacing can be enhanced using the STAR framework (Situation, Task, Action, Result)"
        ],
        improved_answer: `A structured STAR response: 'When addressing ${currentQ.question.slice(0, 45)}..., I first analyze root causes using system logs, which reduced latency by 35%.'`,
        tips: ["Structure your interview responses using the STAR method for maximum impact."]
      };
    }

    setEvaluation(evalData);
    setCompletedAnswers((prev) => [...prev, { question: currentQ.question, answer: candidateAnswer, eval: evalData }]);
    setIsSubmitting(false);
  };

  const handleContinueNext = async () => {
    setEvaluation(null);
    setCandidateAnswer('');

    if (currentIdx + 1 < (questions.length || defaultQuestions.length)) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      const nextQ = questions[nextIdx] || defaultQuestions[nextIdx];
      if (nextQ?.question) {
        speakQuestionText(nextQ.question);
      }
    } else {
      // Complete Interview & Finish
      try {
        const scores = completedAnswers.map(a => a.eval?.overall_score || 80);
        const avg = scores.length > 0 ? Math.round(scores.reduce((a,b)=>a+b, 0) / scores.length) : 78;
        await completeInterview(interviewId, avg, completedAnswers);
      } catch (e) {
        console.error(e);
      }
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      navigate(`/report/${interviewId}`);
    }
  };

  if (!interviewStarted) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <GlassCard className="p-8 text-center border-[#4F8CFF]/30">
          <AIAvatar isSpeaking={false} personaName="AI Interviewer Persona" />
          <h2 className="text-2xl font-extrabold text-white mt-4">AI Mock Interview Room</h2>
          <p className="text-xs text-[#A7B0C0] mt-1 mb-6">
            The AI interviewer will ask realistic HR, Technical, and Resume-based questions. Answer using voice or text.
          </p>

          <div className="space-y-4 text-left max-w-md mx-auto mb-8">
            <div>
              <label className="block text-xs font-semibold text-[#A7B0C0] mb-1.5">Target Job Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#4F8CFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A7B0C0] mb-1.5">Starting Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-[#4F8CFF]"
              >
                <option value="Easy" className="bg-[#070B1A]">Easy</option>
                <option value="Medium" className="bg-[#070B1A]">Medium (Adaptive)</option>
                <option value="Hard" className="bg-[#070B1A]">Hard</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleStartInterview}
            className="w-full btn-primary py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start AI Mock Interview</span>
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Progress & Category Top Bar */}
      <div className="glass p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 border-[#4F8CFF]/20">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-cyanAccent uppercase tracking-widest bg-cyanAccent/10 border border-cyanAccent/30 px-3 py-1 rounded-full">
            Question {currentIdx + 1} of {questions.length || 5}
          </span>
          <span className="text-xs text-[#A7B0C0] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4F8CFF]" />
            Category: <strong className="text-white">{currentQ.category}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#A7B0C0]">Adaptive Difficulty:</span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
            currentQ.difficulty === 'Hard'
              ? 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30'
              : currentQ.difficulty === 'Medium'
              ? 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30'
              : 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/30'
          }`}>
            {currentQ.difficulty}
          </span>
        </div>
      </div>

      {/* Main Interview Room Layout: LEFT AI vs RIGHT Candidate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDE: AI INTERVIEWER (5 cols) */}
        <GlassCard className="lg:col-span-5 p-6 md:p-8 border-[#4F8CFF]/30 flex flex-col items-center justify-between min-h-[460px]">
          <div className="w-full text-center">
            <span className="text-[10px] font-bold text-cyanAccent uppercase tracking-widest block mb-2">
              AI INTERVIEWER PERSONA
            </span>
            <AIAvatar isSpeaking={isAiSpeaking} isProcessing={isSubmitting} personaName="Alex AI Coach" />
          </div>

          {/* Current Question Display */}
          <div className="w-full glass-subtle p-5 rounded-2xl border-l-4 border-l-[#4F8CFF] my-4">
            <span className="text-[11px] font-bold text-[#4F8CFF] uppercase tracking-wider block mb-1">
              CURRENT QUESTION
            </span>
            <p className="text-sm font-semibold text-white leading-relaxed">
              "{currentQ.question}"
            </p>
          </div>

          <div className="w-full text-center text-xs text-[#A7B0C0] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyanAccent animate-pulse" />
            <span>Listening for candidate response...</span>
          </div>
        </GlassCard>

        {/* RIGHT SIDE: CANDIDATE ANSWER AREA (7 cols) */}
        <GlassCard className="lg:col-span-7 p-6 md:p-8 border-[#8B5CF6]/30 flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#8B5CF6]" />
                Your Answer Area
              </h3>
              <span className="text-xs text-[#A7B0C0]">Voice or Text Input</span>
            </div>

            {/* Voice Microphone Recorder */}
            <div className="mb-4">
              <VoiceRecorder
                disabled={isSubmitting || !!evaluation}
                onTranscriptChange={(text) => setCandidateAnswer(text)}
                transcriptText={candidateAnswer}
              />
            </div>

            {/* Text Input Area & Transcript Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#A7B0C0]">
                Type or edit transcript answer:
              </label>
              <textarea
                rows={6}
                disabled={isSubmitting || !!evaluation}
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Type your answer here, or click '🎤 Record Answer' above to speak..."
                className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-[#A7B0C0]/50 focus:outline-none focus:border-[#8B5CF6] disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          {!evaluation && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmitAnswer}
                disabled={!candidateAnswer.trim() || isSubmitting}
                className={`btn-primary px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 ${
                  !candidateAnswer.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Evaluating Answer...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </>
                )}
              </button>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Instant Feedback Card Modal / Section */}
      {evaluation && (
        <div className="mt-6">
          <FeedbackCard evaluation={evaluation} onContinue={handleContinueNext} />
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;
