'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';

interface Subtle3DHeadlineProps {
  heroRef?: React.RefObject<HTMLElement | null>;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Subtle3DHeadline({ heroRef }: Subtle3DHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const transformWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Dynamic values for physics spring lerp
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const isHovering = useRef(false);
  const animFrameId = useRef<number | null>(null);
  const startTime = useRef<number>(0);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  useEffect(() => {
    if (isReducedMotion) return;

    startTime.current = performance.now();

    const isTouchOnly = () => {
      return (
        window.matchMedia('(pointer: coarse)').matches &&
        !window.matchMedia('(pointer: fine)').matches
      );
    };

    const getHeroElement = (): HTMLElement | null => {
      if (heroRef?.current) return heroRef.current;
      return (
        document.getElementById('hero-section') ||
        containerRef.current?.closest('section') ||
        null
      );
    };

    // Track pointer movement across the hero section
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouchOnly()) return;

      const heroEl = getHeroElement();
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      const margin = 80;

      if (
        e.clientY >= rect.top - margin &&
        e.clientY <= rect.bottom + margin &&
        e.clientX >= rect.left - margin &&
        e.clientX <= rect.right + margin
      ) {
        // Normalize coordinates from center of the hero section (-1 to 1)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
        const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
        const multiplier = isTablet ? 0.5 : 1.0;

        targetX.current = normX * multiplier;
        targetY.current = normY * multiplier;
        isHovering.current = true;
      } else if (isHovering.current) {
        targetX.current = 0;
        targetY.current = 0;
        isHovering.current = false;
      }
    };

    const handlePointerLeave = () => {
      targetX.current = 0;
      targetY.current = 0;
      isHovering.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', handlePointerLeave);

    // Continuous 60/120fps Animation Loop (requestAnimationFrame)
    const animate = (now: number) => {
      const elapsed = (now - startTime.current) / 1000;

      // Subtle, gentle floating breathing oscillation (even before mouse interaction)
      // Slow sinusoidal period (5.5s) with subtle amplitude
      const idleTiltX = Math.sin(elapsed * 1.1) * 0.75;
      const idleTiltY = Math.cos(elapsed * 0.9) * 0.95;
      const idleFloatY = Math.sin(elapsed * 1.1) * 2.2;

      // High-precision lerp for ultra-smooth spring feel (damping ~0.065)
      const lerpFactor = 0.065;
      currentX.current += (targetX.current - currentX.current) * lerpFactor;
      currentY.current += (targetY.current - currentY.current) * lerpFactor;

      // Restrained 3D rotation limits:
      // rotateX: -normY * 3.4deg + idleTiltX
      // rotateY: normX * 3.8deg + idleTiltY
      const rotX = -currentY.current * 3.4 + idleTiltX;
      const rotY = currentX.current * 3.8 + idleTiltY;

      // Micro parallax translations: max ~5.5px
      const transX = currentX.current * 5.5;
      const transY = currentY.current * 4.5 + idleFloatY;

      if (transformWrapperRef.current) {
        transformWrapperRef.current.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0px)`;
      }

      if (glowRef.current) {
        // Specular glow dynamically tracks cursor and subtle breathing
        const glowX = 50 + currentX.current * 28;
        const glowY = 50 + currentY.current * 24;
        const glowOpacity = isHovering.current ? 0.38 : 0.18;
        glowRef.current.style.opacity = `${glowOpacity}`;
        glowRef.current.style.background = `radial-gradient(ellipse 65% 50% at ${glowX.toFixed(1)}% ${glowY.toFixed(1)}%, rgba(96, 165, 250, 0.24), rgba(168, 85, 247, 0.12), transparent 70%)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, [heroRef, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative max-w-4xl mx-auto headline-3d-entrance"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Futuristic Specular Sheen (Moves with 3D perspective) */}
      {!isReducedMotion && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute -inset-6 pointer-events-none rounded-3xl blur-2xl transition-opacity duration-700 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(96, 165, 250, 0.22), rgba(168, 85, 247, 0.1), transparent 70%)',
          }}
        />
      )}

      {/* 3D Floating Motion Wrapper */}
      <div
        ref={transformWrapperRef}
        className="will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Headline with preserved classes and 2-line layout */}
        <h1
          id="hero-headline"
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Line 1: Build Digital Products That */}
          <span
            className="block lg:inline transition-all duration-300"
            style={{
              display: 'inline-block',
              transform: !isReducedMotion ? 'translateZ(12px)' : undefined,
              textShadow: '0 3px 16px rgba(0, 0, 0, 0.55)',
            }}
          >
            Build Digital Products That{' '}
          </span>

          {/* Line 2: Move Your Business Forward. (Subtly higher Z-depth for 3D stereoscopic layered parallax) */}
          <span
            className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent block lg:inline whitespace-normal lg:whitespace-nowrap transition-all duration-300"
            style={{
              display: 'inline-block',
              transform: !isReducedMotion ? 'translateZ(26px)' : undefined,
              filter: 'drop-shadow(0 4px 20px rgba(99, 102, 241, 0.32))',
            }}
          >
            Move Your Business Forward.
          </span>
        </h1>
      </div>
    </div>
  );
}
