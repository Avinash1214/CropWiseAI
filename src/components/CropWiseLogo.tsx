import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const CropWiseLogo: React.FC<LogoProps> = ({ className = '', size = 38 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="leafGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="aiGlow" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Outer subtle shield */}
        <rect x="4" y="4" width="56" height="56" rx="16" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />

        {/* Stylized AI Leaf with Neural Veins */}
        <path
          d="M16 48C16 48 18 24 38 14C48 20 50 36 44 44C38 52 24 50 16 48Z"
          fill="url(#leafGrad)"
          stroke="#065f46"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Central Neural Stem */}
        <path
          d="M18 46C24 40 32 30 38 16"
          stroke="#ecfdf5"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Circuit Branch Veins */}
        <path
          d="M26 38L38 34M31 29L43 25M22 43L30 45"
          stroke="#ecfdf5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Synaptic AI Neural Nodes */}
        <circle cx="38" cy="16" r="3" fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
        <circle cx="38" cy="34" r="2.5" fill="#34d399" stroke="#ffffff" strokeWidth="1" />
        <circle cx="43" cy="25" r="2" fill="#67e8f9" stroke="#ffffff" strokeWidth="1" />
        <circle cx="30" cy="45" r="2" fill="#34d399" stroke="#ffffff" strokeWidth="1" />
        <circle cx="18" cy="46" r="2" fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
      </svg>
    </div>
  );
};
