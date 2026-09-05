import React from 'react';

const GlassCard = ({ children, className = '', hover = true, glow = false }) => {
  return (
    <div
      className={`glass ${hover ? 'glass-hover' : ''} ${
        glow ? 'shadow-[0_0_30px_rgba(79,140,255,0.25)] border-[#4F8CFF]/30' : ''
      } p-6 relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
