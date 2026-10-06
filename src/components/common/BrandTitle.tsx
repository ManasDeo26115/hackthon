import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface BrandTitleProps {
  variant?: 'hero' | 'nav' | 'footer';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandTitle: React.FC<BrandTitleProps> = ({
  variant = 'hero',
  showSubtitle = true,
  className = '',
}) => {
  const syllables = ['शु', 'भ', 'या', 'त्रा'];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tiltRafRef = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (variant !== 'hero') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);

    tiltRafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = Math.min(6, Math.max(-6, (centerY - e.clientY) / 20));
      const rotateY = Math.min(6, Math.max(-6, (e.clientX - centerX) / 20));
      setTilt({ x: rotateX, y: rotateY });
    });
  };

  const handlePointerLeave = () => {
    if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);
    setTilt({ x: 0, y: 0 });
    setHoveredIdx(null);
  };

  useEffect(() => {
    return () => {
      if (tiltRafRef.current) cancelAnimationFrame(tiltRafRef.current);
    };
  }, []);

  const sizeClasses = {
    hero: {
      title: 'text-6xl sm:text-8xl lg:text-9xl tracking-normal',
      subtitle: 'text-lg sm:text-2xl font-bold tracking-widest mt-2',
      gap: 'gap-1 sm:gap-2',
    },
    nav: {
      title: 'text-2xl sm:text-3xl font-bold tracking-normal',
      subtitle: 'text-[10px] sm:text-xs font-semibold tracking-wider',
      gap: 'gap-0.5',
    },
    footer: {
      title: 'text-4xl sm:text-5xl font-black tracking-normal',
      subtitle: 'text-sm font-bold tracking-widest mt-1',
      gap: 'gap-1',
    },
  }[variant];

  const syllableContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const syllableChildVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 0.7,
      filter: 'blur(12px)',
      rotate: -8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 14,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      style={
        variant === 'hero'
          ? {
              perspective: 1000,
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }
          : undefined
      }
    >
      {variant === 'hero' && (
        <div className="absolute -inset-8 bg-gradient-to-r from-saffron-500/20 via-amber-500/30 to-saffron-600/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none -z-10" />
      )}

      <motion.div
        variants={variant === 'hero' ? syllableContainerVariants : undefined}
        initial={variant === 'hero' ? 'hidden' : false}
        animate={variant === 'hero' ? 'visible' : false}
        className={`flex items-center ${sizeClasses.gap} font-devanagari font-black`}
      >
        {syllables.map((syllable, idx) => {
          let waveY = 0;
          let waveScale = 1;
          if (hoveredIdx !== null) {
            const dist = Math.abs(hoveredIdx - idx);
            if (dist === 0) {
              waveY = -10;
              waveScale = 1.15;
            } else if (dist === 1) {
              waveY = -4;
              waveScale = 1.06;
            }
          }

          return (
            <motion.span
              key={idx}
              variants={variant === 'hero' ? syllableChildVariants : undefined}
              onMouseEnter={() => setHoveredIdx(idx)}
              animate={{
                y: waveY !== 0 ? waveY : variant === 'hero' ? [0, -4, 0] : 0,
                scale: waveScale,
              }}
              transition={
                waveY !== 0
                  ? { type: 'spring', stiffness: 300, damping: 15 }
                  : variant === 'hero'
                  ? {
                      y: {
                        duration: 3 + idx * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: idx * 0.3,
                      },
                    }
                  : undefined
              }
              className={`inline-block relative cursor-pointer ${sizeClasses.title} bg-gradient-to-r from-saffron-600 via-amber-400 to-saffron-500 bg-clip-text text-transparent drop-shadow-md`}
            >
              {syllable}
              {idx === 1 && <span className="inline-block w-2 sm:w-4" />}
            </motion.span>
          );
        })}
      </motion.div>

      {variant === 'hero' && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.75, ease: 'easeOut' }}
          className="relative w-full max-w-xs sm:max-w-md h-1.5 mt-2 bg-gradient-to-r from-saffron-500 via-amber-400 to-saffron-600 rounded-full shadow-glow-saffron origin-center flex items-center justify-end"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 rounded-full bg-amber-400 border-2 border-white shadow-md -mr-2.5 flex items-center justify-center text-[10px]"
          >
            🧭
          </motion.div>
        </motion.div>
      )}

      {showSubtitle && (
        <motion.span
          initial={variant === 'hero' ? { opacity: 0, letterSpacing: '0.1em' } : false}
          animate={variant === 'hero' ? { opacity: 1, letterSpacing: '0.25em' } : false}
          transition={{ duration: 0.8, delay: 0.9 }}
          className={`font-sans uppercase text-saffron-700 dark:text-amber-300 font-bold ${sizeClasses.subtitle}`}
        >
          Shubh Yatra
        </motion.span>
      )}
    </div>
  );
};
