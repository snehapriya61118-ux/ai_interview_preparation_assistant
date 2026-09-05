import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

const AIAvatar = ({ isSpeaking = false, isProcessing = false, personaName = "AI Interviewer" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer Pulsing Glow */}
        <div
          className={`absolute rounded-full transition-all duration-700 ${
            isSpeaking
              ? 'w-36 h-36 bg-gradient-to-r from-[#4F8CFF]/40 to-[#8B5CF6]/40 blur-xl animate-pulse-glow'
              : isProcessing
              ? 'w-32 h-32 bg-cyanAccent/30 blur-lg animate-spin'
              : 'w-28 h-28 bg-[#4F8CFF]/20 blur-md'
          }`}
        />

        {/* Outer Ring */}
        <div
          className={`w-28 h-28 rounded-full border-2 p-1 flex items-center justify-center transition-colors duration-500 ${
            isSpeaking
              ? 'border-[#4F8CFF] shadow-[0_0_25px_rgba(79,140,255,0.6)]'
              : isProcessing
              ? 'border-cyanAccent shadow-[0_0_20px_rgba(34,211,238,0.5)]'
              : 'border-white/20'
          }`}
        >
          {/* Avatar Glass Sphere */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0F1630] to-[#070B1A] glass border border-white/30 flex items-center justify-center relative overflow-hidden shadow-inner">
            <Bot
              className={`w-12 h-12 transition-transform duration-500 ${
                isSpeaking ? 'text-[#4F8CFF] scale-110' : 'text-[#A7B0C0]'
              }`}
            />
            {isSpeaking && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6]/30 to-transparent pointer-events-none" />
            )}
          </div>
        </div>

        {/* Status Sparkle Badge */}
        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] p-1.5 rounded-full shadow-lg border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-white tracking-wide">{personaName}</h3>
      <p className="text-xs text-[#A7B0C0] mt-0.5 flex items-center justify-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${
            isSpeaking
              ? 'bg-[#22C55E] animate-ping'
              : isProcessing
              ? 'bg-[#22D3EE] animate-pulse'
              : 'bg-[#4F8CFF]'
          }`}
        />
        {isSpeaking ? 'Speaking...' : isProcessing ? 'Analyzing response...' : 'Active & Listening'}
      </p>
    </div>
  );
};

export default AIAvatar;
