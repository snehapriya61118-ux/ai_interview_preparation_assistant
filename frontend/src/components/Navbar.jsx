import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Sparkles, Bot, Menu } from 'lucide-react';

const Navbar = ({ onMobileMenuToggle }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="glass border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg text-[#A7B0C0] hover:text-white hover:bg-white/10"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 md:hidden">
          <Bot className="w-6 h-6 text-[#4F8CFF]" />
          <span className="font-extrabold text-white text-sm">AI COACH</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-[#A7B0C0]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span>AI Interview System Ready</span>
          <span className="text-white/30">•</span>
          <span className="px-2 py-0.5 rounded-full bg-[#4F8CFF]/20 text-[#4F8CFF] border border-[#4F8CFF]/30">
            DEMO MODE ACTIVE
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl glass-subtle">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center font-bold text-white text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-tight">{user?.name || 'Alex Morgan'}</p>
                <p className="text-[10px] text-[#A7B0C0]">Job Candidate</p>
              </div>
            </div>

            <button
              onClick={logout}
              title="Logout"
              className="p-2 rounded-xl text-[#A7B0C0] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-secondary px-4 py-2 text-xs">
              Log In
            </Link>
            <Link to="/register" className="btn-primary px-4 py-2 text-xs">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
