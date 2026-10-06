import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const currentLabel = useRef<string | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Hide on touch devices or reduced motion preference
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      // Update inner dot immediately (0 latency) via translate3d
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, select, [role="button"], .glass-card');
        if (clickable) {
          isHovered.current = true;
          const dataLabel = clickable.getAttribute('data-cursor');
          currentLabel.current = dataLabel || null;
        } else {
          isHovered.current = false;
          currentLabel.current = null;
        }
      }
    };

    // Smooth lerp loop running at 60fps
    const loop = () => {
      const lerp = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      if (ringRef.current) {
        const radius = isHovered.current ? 20 : 14;
        const scale = isHovered.current ? 1.4 : 1.0;
        ringRef.current.style.transform = `translate3d(${currentPos.current.x - radius}px, ${
          currentPos.current.y - radius
        }px, 0) scale(${scale})`;
      }

      if (labelRef.current) {
        if (currentLabel.current) {
          labelRef.current.textContent = currentLabel.current;
          labelRef.current.style.opacity = '1';
        } else {
          labelRef.current.style.opacity = '0';
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Inner Dot - Instant 0 delay */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-saffron-500 shadow-sm pointer-events-none z-[9999] will-change-transform hidden md:block"
      />

      {/* Outer Ring - Smooth 0.18 lerp */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border-2 border-amber-400/70 dark:border-amber-300/80 bg-saffron-400/10 pointer-events-none z-[9998] will-change-transform transition-all duration-150 ease-out hidden md:flex items-center justify-center"
      >
        <span
          ref={labelRef}
          className="text-[8px] font-black uppercase text-saffron-700 dark:text-amber-300 opacity-0 transition-opacity duration-150"
        />
      </div>
    </>
  );
};
