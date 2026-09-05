import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bot, User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, confirmPassword);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to register. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <GlassCard className="w-full max-w-md p-8 border-[#4F8CFF]/30">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(79,140,255,0.4)]">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create Account</h2>
          <p className="text-xs text-[#A7B0C0] mt-1">Join AI Interview Coach to start practicing</p>
        </div>

        {error && (
          <div className="p-3 mb-6 glass bg-[#EF4444]/10 border-[#EF4444]/40 rounded-xl text-xs text-[#EF4444] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-3 text-[#A7B0C0]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-[#A7B0C0]/50 focus:outline-none focus:border-[#4F8CFF]"
                placeholder="Alex Morgan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3 text-[#A7B0C0]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-[#A7B0C0]/50 focus:outline-none focus:border-[#4F8CFF]"
                placeholder="alex.morgan@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3 text-[#A7B0C0]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-[#A7B0C0]/50 focus:outline-none focus:border-[#4F8CFF]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A7B0C0] mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-3 text-[#A7B0C0]" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-[#A7B0C0]/50 focus:outline-none focus:border-[#4F8CFF]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-6"
          >
            <span>{loading ? 'Creating Account...' : 'Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-center text-[#A7B0C0] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#4F8CFF] font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default RegisterPage;
