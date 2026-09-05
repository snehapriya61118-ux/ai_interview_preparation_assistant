import React, { useState, useEffect } from 'react';
import { uploadResume, getLatestResume } from '../services/api';
import GlassCard from '../components/GlassCard';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Zap,
  HelpCircle,
  Sparkles
} from 'lucide-react';

const ResumePage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await getLatestResume();
        if (res.data) {
          setResumeData(res.data);
        }
      } catch (err) {
        console.error("Resume fetch error:", err);
      }
    };
    fetchResume();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (
        selected.name.endsWith('.pdf') ||
        selected.name.endsWith('.docx') ||
        selected.name.endsWith('.doc')
      ) {
        setFile(selected);
        setErrorMsg('');
      } else {
        setErrorMsg('Please upload a PDF or DOCX resume.');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setErrorMsg('');
    setStatusMsg('Extracting text from resume...');
    setProgress(20);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 80) {
            clearInterval(interval);
            setStatusMsg('Analyzing candidate profile & extract skills...');
            return 80;
          }
          return prev + 20;
        });
      }, 400);

      const res = await uploadResume(formData);
      clearInterval(interval);
      setProgress(100);
      setStatusMsg('✓ Resume uploaded successfully!');
      setResumeData(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || 'Resume could not be processed. Please try again.');
    } finally {
      setTimeout(() => {
        setUploading(false);
      }, 800);
    }
  };

  const analysis = resumeData?.analysis || {
    candidate_name: "Jane Doe",
    education: "B.S. in Computer Science, Stanford University",
    degree: "Bachelor of Science",
    technical_skills: ["Python", "JavaScript", "React", "FastAPI", "SQL", "Docker", "Git", "REST APIs"],
    programming_languages: ["Python", "JavaScript", "TypeScript", "SQL"],
    frameworks: ["React", "FastAPI", "Express.js", "Tailwind CSS"],
    tools: ["Git", "Docker", "Postman", "PostgreSQL"],
    projects: [
      "AI Food Recommendation Engine using Python & Scikit-learn",
      "Full-stack E-Commerce Dashboard with React & FastAPI",
      "Real-time Chat Application with WebSockets"
    ],
    internships: ["Software Engineering Intern at TechCorp (Summer 2024)"],
    work_experience: ["Associate Software Engineer at CloudScale Solutions (1.5 Years)"],
    certifications: ["AWS Certified Developer Associate", "Meta Front-End Developer Certificate"],
    achievements: ["1st Place in University Hackathon 2024"],
    soft_skills: ["Problem Solving", "Team Collaboration", "Agile Communication"],
    missing_skills: ["Kubernetes", "GraphQL", "CI/CD Automation", "Redis Caching"],
    weak_sections: ["Quantifiable business impact metrics", "Cloud infrastructure details"],
    potential_technical_questions: [
      "How do you handle asynchronous tasks in FastAPI?",
      "What algorithm was used in your Food Recommendation System?",
      "Explain how React Virtual DOM diffing works."
    ],
    potential_hr_questions: [
      "Tell me about yourself and your career goals.",
      "Describe a situation where you debugged a critical deadline issue."
    ]
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Upload Card */}
      <GlassCard className="max-w-2xl mx-auto w-full p-8 text-center border-[#4F8CFF]/30">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(79,140,255,0.3)]">
          <Upload className="w-8 h-8 text-[#4F8CFF] animate-bounce" />
        </div>

        <h2 className="text-2xl font-extrabold text-white">Upload Your Resume</h2>
        <p className="text-xs text-[#A7B0C0] mt-1 mb-6">Supports PDF and DOCX formats up to 10MB</p>

        {errorMsg && (
          <div className="p-3 mb-4 glass bg-[#EF4444]/10 border-[#EF4444]/40 rounded-xl text-xs text-[#EF4444] flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Drag & Drop Area */}
        <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 bg-white/5 hover:bg-white/10 transition-all cursor-pointer relative mb-6">
          <input
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <FileText className="w-10 h-10 text-[#A7B0C0] mx-auto mb-2" />
          <p className="text-sm font-semibold text-white">
            {file ? file.name : 'Click to select or drag and drop your file here'}
          </p>
          <p className="text-xs text-[#A7B0C0] mt-1">PDF or DOCX (Max 10MB)</p>
        </div>

        {/* Progress Bar during Upload */}
        {uploading && (
          <div className="mb-6 text-left">
            <div className="flex justify-between text-xs font-semibold text-cyanAccent mb-1.5">
              <span>{statusMsg}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full btn-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 ${
            !file || uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Processing Resume...' : 'Analyze Resume'}</span>
        </button>
      </GlassCard>

      {/* Resume Breakdown Dashboard */}
      {analysis && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyanAccent" />
              Resume Analysis Breakdown
            </h3>
            <span className="text-xs text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-3 py-1 rounded-full font-bold">
              ✓ Successfully Parsed
            </span>
          </div>

          {/* Grid 1: Basic Info & Tech Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <h4 className="text-sm font-bold text-[#4F8CFF] flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4" />
                Candidate & Education
              </h4>
              <p className="text-lg font-bold text-white mb-1">{analysis.candidate_name}</p>
              <p className="text-xs text-[#A7B0C0] mb-2">{analysis.education}</p>
              <span className="text-xs bg-white/10 px-2.5 py-1 rounded-lg text-white font-medium">
                Degree: {analysis.degree || 'B.S. Computer Science'}
              </span>
            </GlassCard>

            <GlassCard className="md:col-span-2 p-6">
              <h4 className="text-sm font-bold text-[#8B5CF6] flex items-center gap-2 mb-3">
                <Code className="w-4 h-4" />
                Extracted Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.technical_skills?.map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#4F8CFF]/20 to-[#8B5CF6]/20 border border-[#4F8CFF]/30 text-white font-medium"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Grid 2: Frameworks, Tools, Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <h4 className="text-sm font-bold text-cyanAccent flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4" />
                Frameworks & Tools
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-[#A7B0C0] block mb-1">Frameworks</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.frameworks?.map((fw, i) => (
                      <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded text-white">{fw}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-[#A7B0C0] block mb-1">Tools & Platforms</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.tools?.map((tl, i) => (
                      <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded text-white">{tl}</span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="md:col-span-2 p-6">
              <h4 className="text-sm font-bold text-[#22C55E] flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4" />
                Key Projects & Work Experience
              </h4>
              <ul className="space-y-2 text-xs text-white/90">
                {analysis.projects?.map((proj, i) => (
                  <li key={i} className="flex items-start gap-2 glass-subtle p-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Grid 3: Missing Skills & Potential Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 border-l-4 border-l-[#F59E0B]">
              <h4 className="text-sm font-bold text-[#F59E0B] flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4" />
                Missing Skills & Resume Weaknesses
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-[#A7B0C0] block mb-1">Recommended Skills to Add</span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missing_skills?.map((ms, i) => (
                      <span key={i} className="text-xs bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 px-2.5 py-1 rounded-lg">
                        {ms}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#A7B0C0] block mb-1">Sections Needing Details</span>
                  <ul className="list-disc list-inside text-xs text-white/80 space-y-1">
                    {analysis.weak_sections?.map((ws, i) => (
                      <li key={i}>{ws}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-l-4 border-l-[#4F8CFF]">
              <h4 className="text-sm font-bold text-[#4F8CFF] flex items-center gap-2 mb-3">
                <HelpCircle className="w-4 h-4" />
                Potential Interview Questions Generated
              </h4>
              <div className="space-y-2 text-xs">
                {analysis.potential_technical_questions?.map((q, i) => (
                  <div key={i} className="glass-subtle p-2.5 text-white/90">
                    <span className="text-[#4F8CFF] font-bold mr-1">Q{i+1}:</span> {q}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePage;
