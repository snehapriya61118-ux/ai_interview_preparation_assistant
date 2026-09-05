import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Check, Edit2, Volume2, AlertCircle } from 'lucide-react';

const VoiceRecorder = ({ onTranscriptChange, transcriptText, disabled = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [permissionError, setPermissionError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Web Speech API initialization
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setStatusText('Listening...');
        setPermissionError('');
      };

      recognition.onresult = (event) => {
        setStatusText('Answer detected');
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        onTranscriptChange(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setPermissionError('Microphone permission is required for voice interviews.');
        } else {
          setStatusText('Voice transcription error. Please type your answer.');
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        if (!statusText.includes('error')) {
          setStatusText('Transcribing complete. You can edit your transcript below.');
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (disabled) return;
    setPermissionError('');

    if (!recognitionRef.current) {
      // Fallback speech simulation if browser does not support SpeechRecognition natively
      if (!isRecording) {
        setIsRecording(true);
        setStatusText('Listening...');
        setTimeout(() => {
          setStatusText('Answer detected');
          onTranscriptChange("In my previous role, I designed scalable REST APIs using Python and FastAPI, implementing OAuth2 authentication and optimizing PostgreSQL queries.");
          setIsRecording(false);
          setStatusText('Transcribing complete. You can edit your transcript below.');
        }, 3000);
      } else {
        setIsRecording(false);
      }
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setStatusText('Transcribing...');
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
        setIsRecording(false);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Microphone Record Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={toggleRecording}
          disabled={disabled}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
            isRecording
              ? 'bg-[#EF4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse'
              : 'btn-secondary hover:border-[#4F8CFF] text-white'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#4F8CFF]" />}
          <span>{isRecording ? 'Stop Recording' : '🎤 Record Answer'}</span>
        </button>

        {statusText && (
          <span className="text-xs font-semibold text-cyanAccent flex items-center gap-1.5 glass-subtle px-3 py-1.5">
            <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-[#EF4444] animate-ping' : 'bg-cyanAccent'}`} />
            {statusText}
          </span>
        )}
      </div>

      {permissionError && (
        <div className="p-3 glass border-[#EF4444]/40 bg-[#EF4444]/10 rounded-xl text-xs text-[#EF4444] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{permissionError}</span>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
