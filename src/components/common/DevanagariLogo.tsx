import React from 'react';
import { BrandTitle } from './BrandTitle';

interface DevanagariLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
}

export const DevanagariLogo: React.FC<DevanagariLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    hero: 'w-16 h-16 sm:w-20 sm:h-20',
  };

  const brandVariantMap = {
    sm: 'nav',
    md: 'nav',
    lg: 'footer',
    hero: 'hero',
  } as const;

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Combined Compass + Route Pin + Rupee SVG Icon */}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-saffron-500 via-amber-500 to-saffron-600 p-2 shadow-md shadow-saffron-500/30 group-hover:scale-105 transition-transform duration-300 ${iconSizes[size]}`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="6" fill="none" opacity="0.8" />
          <path
            d="M50 15 C35 15 25 28 25 42 C25 60 50 85 50 85 C50 85 75 60 75 42 C75 28 65 15 50 15 Z"
            fill="white"
            opacity="0.95"
          />
          <text
            x="50"
            y="48"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#EA580C"
            fontSize="32"
            fontWeight="bold"
            fontFamily="Mukta, sans-serif"
          >
            ₹
          </text>
          <circle cx="50" cy="20" r="3" fill="#FBBF24" />
          <circle cx="80" cy="50" r="3" fill="#FBBF24" />
        </svg>
      </div>

      {/* Brand Title Component */}
      <BrandTitle variant={brandVariantMap[size]} showSubtitle={showSubtitle} />
    </div>
  );
};
