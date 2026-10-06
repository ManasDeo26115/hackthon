import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer device (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small main Saffron dot */}
      <div
        className="custom-cursor bg-saffron-500 rounded-full w-2.5 h-2.5 shadow-sm"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0)`,
        }}
      />

      {/* Trailing Gold aura ring */}
      <div
        className={`custom-cursor border-2 border-amber-400/60 dark:border-amber-300/80 rounded-full ${
          isHovered ? 'w-10 h-10 -ml-2 -mt-2 bg-saffron-400/20 scale-110' : 'w-7 h-7'
        }`}
        style={{
          transform: `translate3d(${position.x - (isHovered ? 20 : 14)}px, ${
            position.y - (isHovered ? 20 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
};
