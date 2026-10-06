import React from 'react';

interface DevanagariLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
}

export const DevanagariLogo: React.FC<DevanagariLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    hero: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    hero: 'text-5xl sm:text-7xl font-extrabold'
  };

  const subtitleSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
    hero: 'text-base sm:text-xl font-medium tracking-widest uppercase'
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 group select-none ${className}`}>
      {/* SVG Icon: Compass + Route Pin + Rupee Symbol */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-500 via-amber-500 to-saffron-600 p-2 shadow-md shadow-saffron-500/30 group-hover:scale-105 transition-transform duration-300 ${iconSizes[size]}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Compass Ring */}
          <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="6" fill="none" opacity="0.8" />
          
          {/* Route Pin path */}
          <path d="M50 15 C35 15 25 28 25 42 C25 60 50 85 50 85 C50 85 75 60 75 42 C75 28 65 15 50 15 Z" fill="white" opacity="0.95" />
          
          {/* Inner Rupee Symbol ₹ in Saffron */}
          <text x="50" y="48" textAnchor="middle" dominantBaseline="middle" fill="#EA580C" fontSize="32" fontWeight="bold" fontFamily="Mukta, sans-serif">
            ₹
          </text>

          {/* Compass Needle Sparks */}
          <circle cx="50" cy="20" r="3" fill="#FBBF24" />
          <circle cx="80" cy="50" r="3" fill="#FBBF24" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <h1 className={`font-devanagari font-bold leading-none tracking-wide text-slate-900 dark:text-amber-50 ${titleSizes[size]}`}>
          <span className="bg-gradient-to-r from-saffron-600 via-amber-500 to-saffron-500 bg-clip-text text-transparent drop-shadow-sm">
            शुभ यात्रा
          </span>
        </h1>
        {showSubtitle && (
          <span className={`text-saffron-700 dark:text-amber-300 font-sans tracking-wide ${subtitleSizes[size]}`}>
            Shubh Yatra
          </span>
        )}
      </div>
    </div>
  );
};
