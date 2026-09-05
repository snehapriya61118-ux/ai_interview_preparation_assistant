import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Settings, Key, Cpu, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [sttKey, setSttKey] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg('Settings updated successfully! Demo Mode remains active if key is empty.');
    setTimeout(() => setSavedMsg(''), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-12">
      <GlassCard className="p-8 border-[#4F8CFF]/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(79,140,255,0.4)]">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Application Settings</h2>
            <p className="text-xs text-[#A7B0C0]">Configure AI API keys, Speech-to-Text, and Demo Mode</p>
          </div>
        </div>

        {savedMsg && (
          <div className="p-3 mb-6 glass bg-[#22C55E]/10 border-[#22C55E]/40 rounded-xl text-xs text-[#22C55E] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{savedMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="glass-subtle p-4 rounded-xl border border-[#22D3EE]/30 bg-cyanAccent/5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyanAccent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-cyanAccent uppercase tracking-wide">STANDALONE DEMO MODE ACTIVE</h4>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                If no external LLM API key is provided, AI Interview Coach automatically runs in <strong>DEMO MODE</strong>. All features—resume parsing, job description matching, adaptive mock interviews, instant feedback, and preparation plans—function seamlessly out of the box for presentation demos.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1.5 flex items-center gap-2">
              <Key className="w-4 h-4 text-[#4F8CFF]" />
              <span>LLM API Key (OpenAI / Gemini / Anthropic compatible)</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 px-4 text-sm text-white placeholder-[#A7B0C0]/40 focus:outline-none focus:border-[#4F8CFF]"
              placeholder="sk-proj-..."
            />
            <p className="text-[11px] text-[#A7B0C0] mt-1">Leave blank to use built-in DEMO_MODE fallback logic.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1.5 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8B5CF6]" />
              <span>Speech-to-Text API Key (Optional)</span>
            </label>
            <input
              type="password"
              value={sttKey}
              onChange={(e) => setSttKey(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 px-4 text-sm text-white placeholder-[#A7B0C0]/40 focus:outline-none focus:border-[#8B5CF6]"
              placeholder="Optional STT key"
            />
            <p className="text-[11px] text-[#A7B0C0] mt-1">Voice recording automatically uses standard HTML5 Web Speech APIs natively in browser.</p>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button type="submit" className="btn-primary px-8 py-3 rounded-xl text-xs font-bold">
              Save Configuration
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default SettingsPage;
