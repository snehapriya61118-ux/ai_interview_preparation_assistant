import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ResumePage from './pages/ResumePage';
import JobDescriptionPage from './pages/JobDescriptionPage';
import MockInterviewPage from './pages/MockInterviewPage';
import InterviewReportPage from './pages/InterviewReportPage';
import PreparationPlanPage from './pages/PreparationPlanPage';
import PerformancePage from './pages/PerformancePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Hide sidebar on landing, login, register pages if desired, or show standard layout
  const isAuthOrLanding = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#070B1A] text-white flex flex-col relative selection:bg-[#4F8CFF] selection:text-white">
      {/* Ambient Glowing Background Orbs */}
      <div className="bg-glow-container">
        <div className="glow-orb-blue" />
        <div className="glow-orb-purple" />
        <div className="glow-orb-cyan" />
      </div>

      <div className="flex flex-1 relative z-10">
        {/* Glass Sidebar */}
        {!isAuthOrLanding && (
          <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        )}

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/job-description" element={<JobDescriptionPage />} />
              <Route path="/mock-interview" element={<MockInterviewPage />} />
              <Route path="/report/:id" element={<InterviewReportPage />} />
              <Route path="/preparation" element={<PreparationPlanPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
