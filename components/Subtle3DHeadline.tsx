'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

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

function subscribeDevice(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getDeviceSnapshot(): 'desktop' | 'tablet' | 'mobile' {
  if (typeof window === 'undefined') return 'desktop';
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const width = window.innerWidth;
  if (isCoarse || width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function Subtle3DHeadline({ heroRef }: Subtle3DHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const deviceCapability = useSyncExternalStore(
    subscribeDevice,
    getDeviceSnapshot,
    () => 'desktop'
  );

  // Raw mouse coordinates relative to center (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-smooth spring physics for heavy, luxurious feel (no jitter, no abrupt bouncing)
  const springConfig = { damping: 30, stiffness: 85, mass: 0.85 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle 3D rotations (strictly restrained between ~3.2deg and -3.2deg on desktop)
  const rotateX = useTransform(smoothMouseY, [-1, 1], [3.2, -3.2]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-3.8, 3.8]);

  // Micro parallax translations
  const translateX = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const translateY = useTransform(smoothMouseY, [-1, 1], [-4, 4]);

  // Dynamic dimensional specular lighting position
  const lightPositionX = useTransform(smoothMouseX, [-1, 1], [25, 75]);
  const lightPositionY = useTransform(smoothMouseY, [-1, 1], [25, 75]);

  // Specular light radial background transformation (called unconditionally at top level)
  const lightBackground = useTransform(
    [lightPositionX, lightPositionY],
    ([x, y]) =>
      `radial-gradient(ellipse 65% 45% at ${x}% ${y}%, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.08), transparent 70%)`
  );

  // Track mouse across the parent hero area if provided, or default to container
  useEffect(() => {
    if (prefersReducedMotion || deviceCapability === 'mobile') return;

    const targetElement = heroRef?.current || containerRef.current;
    if (!targetElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = targetElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Normalize between -1 and 1 from center
      const normX = Math.max(-1, Math.min(1, ((x / rect.width) - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, ((y / rect.height) - 0.5) * 2));

      // Scale down on tablet
      const multiplier = deviceCapability === 'tablet' ? 0.45 : 1;

      mouseX.set(normX * multiplier);
      mouseY.set(normY * multiplier);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
    };

    targetElement.addEventListener('mousemove', handleMouseMove);
    targetElement.addEventListener('mouseenter', handleMouseEnter);
    targetElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      targetElement.removeEventListener('mousemove', handleMouseMove);
      targetElement.removeEventListener('mouseenter', handleMouseEnter);
      targetElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [heroRef, deviceCapability, prefersReducedMotion, mouseX, mouseY]);

  // Entrance animation variants
  const containerVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          filter: 'blur(10px)',
          y: 18,
          scale: 0.985,
        },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1.1,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: prefersReducedMotion ? 0 : 0.14,
      },
    },
  };

  const lineVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          y: 12,
          filter: 'blur(6px)',
        },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative max-w-4xl mx-auto select-none"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Futuristic Specular Sheen (Moves with cursor behind/across the 3D plane) */}
      {!prefersReducedMotion && deviceCapability !== 'mobile' && (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-4 pointer-events-none rounded-3xl opacity-0 transition-opacity duration-700 blur-2xl"
          style={{
            opacity: isHovered ? 0.45 : 0.2,
            background: lightBackground,
          }}
        />
      )}

      {/* 3D Floating Motion Wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={
          prefersReducedMotion || deviceCapability === 'mobile'
            ? undefined
            : {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="will-change-transform"
      >
        {/* Main Headline with preserved classes and 2-line layout */}
        <h1
          id="hero-headline"
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Line 1: Build Digital Products That */}
          <motion.span
            variants={lineVariants}
            className="block lg:inline transition-all duration-300"
            style={{
              transform: deviceCapability !== 'mobile' && !prefersReducedMotion ? 'translateZ(10px)' : undefined,
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.45)',
            }}
          >
            Build Digital Products That{' '}
          </motion.span>

          {/* Line 2: Move Your Business Forward. (Subtly higher Z-depth for 3D stereoscopic layered parallax) */}
          <motion.span
            variants={lineVariants}
            className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent block lg:inline whitespace-normal lg:whitespace-nowrap transition-all duration-300"
            style={{
              transform: deviceCapability !== 'mobile' && !prefersReducedMotion ? 'translateZ(22px)' : undefined,
              filter: 'drop-shadow(0 4px 18px rgba(99, 102, 241, 0.28))',
            }}
          >
            Move Your Business Forward.
          </motion.span>
        </h1>
      </motion.div>
    </div>
  );
}
