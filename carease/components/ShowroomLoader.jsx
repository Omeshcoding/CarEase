'use client';
import React from 'react';

const OffroadTireIcon = ({ className, hubColor = '#111' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="currentColor"
      strokeWidth="10"
      strokeDasharray="12 8"
      strokeLinecap="butt"
    />
    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="10" />
    <circle
      cx="50"
      cy="50"
      r="28"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />
    <path
      d="M50 50 L50 28 M50 50 L69 39 M50 50 L69 61 M50 50 L50 72 M50 50 L31 61 M50 50 L31 39"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="50" cy="50" r="16" fill={hubColor} />
    <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="6" fill="currentColor" />
  </svg>
);

const ShowroomLoader = ({
  text = 'INITIALIZING TELEMETRY...',
  subtext = 'Calibrating High-Performance Inventory',
  fullScreen = true,
  className = '',
}) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto'
    : 'w-full py-20 flex flex-col items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <style>{`
        @keyframes spinFast { 100% { transform: rotate(360deg); } }
        @keyframes mudFly {
          0% { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(24px, -14px) scale(0); opacity: 0; }
        }
        .animate-spin-fast { animation: spinFast 0.5s linear infinite; }
        .animate-mud-fly-1 { animation: mudFly 0.4s ease-out infinite; }
        .animate-mud-fly-2 { animation: mudFly 0.45s ease-out infinite 0.15s; }
      `}</style>
      <div className="relative w-20 h-20 mb-5 text-[#E11D48]">
        <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#4A2511] rounded-full animate-mud-fly-1" />
        <div className="absolute bottom-2 right-0 w-2 h-2 bg-[#654321] rounded-full animate-mud-fly-2" />
        <OffroadTireIcon
          className="w-full h-full animate-spin-fast drop-shadow-[0_0_20px_rgba(225,29,72,0.6)]"
          hubColor="#000"
        />
      </div>
      <p className="text-white font-black italic tracking-widest text-sm uppercase animate-pulse text-center px-4">
        {text}
      </p>
      {subtext && (
        <p className="text-white/40 text-xs mt-1.5 tracking-wider uppercase font-medium text-center px-4">
          {subtext}
        </p>
      )}
    </div>
  );
};

export default ShowroomLoader;
