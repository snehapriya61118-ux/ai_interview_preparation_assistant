import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Mic, 
  BarChart3, 
  BookOpen, 
  Settings, 
  Sparkles,
  Bot,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume', path: '/resume', icon: FileText },
    { name: 'Job Description', path: '/job-description', icon: Briefcase },
    { name: 'Mock Interview', path: '/mock-interview', icon: Mic },
    { name: 'Performance', path: '/performance', icon: BarChart3 },
    { name: 'Preparation', path: '/preparation', icon: BookOpen },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Brand Logo & Header */}
        <div className="flex items-center justify-between px-2 py-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(79,140,255,0.4)]">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white tracking-wide leading-tight">
                AI INTERVIEW
              </h1>
              <span className="text-xs font-semibold text-cyanAccent tracking-widest uppercase">
                COACH
              </span>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1.5 rounded-lg text-[#A7B0C0] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-[#4F8CFF]/40 text-white shadow-[0_0_20px_rgba(79,140,255,0.2)]'
                      : 'text-[#A7B0C0] hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner */}
      <div className="glass-subtle p-4 rounded-xl text-center border border-[#8B5CF6]/30 bg-gradient-to-b from-[#8B5CF6]/10 to-transparent">
        <div className="flex items-center justify-center gap-1 text-xs font-bold text-cyanAccent mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRO AI INTERVIEWER</span>
        </div>
        <p className="text-[11px] text-[#A7B0C0]">Adaptive feedback engine active</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="w-64 glass border-r border-white/10 p-5 min-h-screen sticky top-0 z-30 shrink-0 hidden md:block">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Slide-over Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <div className="relative w-64 max-w-[80vw] bg-[#070B1A] border-r border-white/10 p-5 h-full z-10 flex flex-col justify-between">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
