'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// 1. Procedural High-Intensity Particle Texture (Piercing white-hot center with tight neon aura)
function createSharpParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = 64;
    const cy = 64;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.1)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// 2. Procedural Speed Rain Streak Texture (Bright bottom head fading upward into a smooth motion trail)
function createSpeedStreakTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = 32;

    // Glowing motion trail tapering upward
    const trailGrad = ctx.createLinearGradient(0, 256, 0, 0);
    trailGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    trailGrad.addColorStop(0.08, 'rgba(255, 255, 255, 0.95)');
    trailGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
    trailGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
    trailGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = trailGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 16, 230);
    ctx.lineTo(cx + 16, 230);
    ctx.lineTo(cx + 4, 10);
    ctx.lineTo(cx - 4, 10);
    ctx.closePath();
    ctx.fill();

    // Sharp bright needle core
    const coreGrad = ctx.createLinearGradient(0, 256, 0, 0);
    coreGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    coreGrad.addColorStop(0.2, 'rgba(255, 255, 255, 1.0)');
    coreGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.7)');
    coreGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = coreGrad;
    ctx.fillRect(cx - 2, 10, 4, 230);

    // Bright head dot
    const headGrad = ctx.createRadialGradient(cx, 235, 0, cx, 235, 16);
    headGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    headGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.9)');
    headGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.3)');
    headGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = headGrad;
    ctx.beginPath();
    ctx.arc(cx, 235, 16, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// 3. Procedural Vertical Anamorphic Laser Flare Texture (For long neon beam auras)
function createVerticalFlareTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = 64;
    const cy = 256;

    const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
    outerGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    outerGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.75)');
    outerGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.3)');
    outerGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.05)');
    outerGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    ctx.save();
    ctx.scale(0.22, 1.0);
    ctx.fillStyle = outerGrad;
    ctx.fillRect(0, 0, 128 / 0.22, 512);
    ctx.restore();

    // Sharp central needle core
    const coreGrad = ctx.createLinearGradient(cx - 3, 0, cx + 3, 0);
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
    coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = coreGrad;
    ctx.fillRect(cx - 3, 0, 6, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// 4. Procedural Bokeh Orb Texture (Out-of-focus luminous discs)
function createBokehOrbTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = 64;
    const cy = 64;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.45)');
    grad.addColorStop(0.9, 'rgba(255, 255, 255, 0.15)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// Ultra-Vibrant Neon Palette
const NEON_PALETTE = [
  new THREE.Color('#00f0ff'), // 0: Pure Vivid Cyan
  new THREE.Color('#00d2ff'), // 1: Sky Electric Blue
  new THREE.Color('#0070f3'), // 2: Cobalt Laser Blue
  new THREE.Color('#3b82f6'), // 3: Bright Royal Blue
  new THREE.Color('#9333ea'), // 4: Neon Purple
  new THREE.Color('#d946ef'), // 5: Radiant Fuchsia
  new THREE.Color('#ff007f'), // 6: Hot Magenta / Pink
  new THREE.Color('#ff1493'), // 7: Deep Hot Pink
  new THREE.Color('#00ff66'), // 8: Electric Neon Lime
  new THREE.Color('#10b981'), // 9: Emerald Laser
  new THREE.Color('#ffee00'), // 10: Brilliant Yellow
  new THREE.Color('#ff9900'), // 11: Vibrant Neon Orange
  new THREE.Color('#ff4400'), // 12: Electric Coral Orange
];

export default function NeonParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2500
    );
    camera.position.z = 500;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const container = containerRef.current;
    container.appendChild(renderer.domElement);

    // Textures
    const sharpParticleTex = createSharpParticleTexture();
    const speedStreakTex = createSpeedStreakTexture();
    const verticalFlareTex = createVerticalFlareTexture();
    const bokehOrbTex = createBokehOrbTexture();

    // Bounds in 3D world space
    const boundX = isMobile ? 500 : 900;
    const boundY = 780;
    const boundZ = 450;

    // =========================================================================
    // 1. FAST VERTICAL NEON LIGHT STREAMS (High-speed downward laser beams)
    // =========================================================================
    const streamCount = isMobile ? 130 : isTablet ? 250 : 380;

    // 1A. Sharp Core Laser Lines (LineSegments: [Head at y, Tail at y + length])
    const streamPositions = new Float32Array(streamCount * 2 * 3);
    const streamColors = new Float32Array(streamCount * 2 * 3);
    const streamSpeeds = new Float32Array(streamCount);
    const streamLengths = new Float32Array(streamCount);
    const streamX = new Float32Array(streamCount);
    const streamY = new Float32Array(streamCount);
    const streamZ = new Float32Array(streamCount);

    // 1B. Flare Heads (Points at tip of each stream)
    const flareHeadPositions = new Float32Array(streamCount * 3);
    const flareHeadColors = new Float32Array(streamCount * 3);
    const flareHeadSizes = new Float32Array(streamCount);

    // 1C. Vertical Glow Flares (Anamorphic aura trailing behind head)
    const auraPositions = new Float32Array(streamCount * 3);
    const auraColors = new Float32Array(streamCount * 3);
    const auraSizes = new Float32Array(streamCount);

    const setStreamColor = (index: number, col: THREE.Color, depthMultiplier: number) => {
      const idxHead = index * 2;
      const idxTail = index * 2 + 1;

      // Head vertex: White-hot neon intense core
      streamColors[idxHead * 3 + 0] = Math.min(col.r * 2.5 * depthMultiplier, 3.5);
      streamColors[idxHead * 3 + 1] = Math.min(col.g * 2.5 * depthMultiplier, 3.5);
      streamColors[idxHead * 3 + 2] = Math.min(col.b * 2.5 * depthMultiplier, 3.5);

      // Tail vertex: Smooth fading trailing glow
      streamColors[idxTail * 3 + 0] = col.r * 0.05;
      streamColors[idxTail * 3 + 1] = col.g * 0.05;
      streamColors[idxTail * 3 + 2] = col.b * 0.05;

      // Flare head dot
      flareHeadColors[index * 3 + 0] = Math.min(col.r * 3.0 * depthMultiplier, 4.0);
      flareHeadColors[index * 3 + 1] = Math.min(col.g * 3.0 * depthMultiplier, 4.0);
      flareHeadColors[index * 3 + 2] = Math.min(col.b * 3.0 * depthMultiplier, 4.0);

      // Aura ribbon
      auraColors[index * 3 + 0] = col.r * 1.6 * depthMultiplier;
      auraColors[index * 3 + 1] = col.g * 1.6 * depthMultiplier;
      auraColors[index * 3 + 2] = col.b * 1.6 * depthMultiplier;
    };

    for (let i = 0; i < streamCount; i++) {
      const x = (Math.random() - 0.5) * boundX * 2.2;
      // Distribute evenly along Y on startup so falling motion is active instantly
      const y = (Math.random() - 0.5) * boundY * 2.4;
      const z = (Math.random() - 0.5) * boundZ * 2.0;

      // Varied lengths: fast streams have dynamic trails
      const length = 55 + Math.random() * (isMobile ? 130 : 280);
      // High-velocity multiplier for fast continuous falling
      const speed = (2.2 + Math.random() * 5.8) * (prefersReducedMotion ? 0.1 : 1.0);

      streamX[i] = x;
      streamY[i] = y;
      streamZ[i] = z;
      streamLengths[i] = length;
      streamSpeeds[i] = speed;

      const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      const depthMultiplier = 0.8 + ((z + boundZ) / (boundZ * 2)) * 0.85;

      setStreamColor(i, col, depthMultiplier);

      flareHeadSizes[i] = (18 + Math.random() * 26) * (isMobile ? 0.8 : 1.0);
      auraSizes[i] = (length * 0.85) * (isMobile ? 0.75 : 1.0);
    }

    // 1A. LineSegments Geometry & Material
    const streamGeometry = new THREE.BufferGeometry();
    const streamPosAttr = new THREE.BufferAttribute(streamPositions, 3);
    const streamColAttr = new THREE.BufferAttribute(streamColors, 3);
    streamGeometry.setAttribute('position', streamPosAttr);
    streamGeometry.setAttribute('color', streamColAttr);

    const streamMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      linewidth: isMobile ? 1.5 : 2.0,
    });
    const streamLines = new THREE.LineSegments(streamGeometry, streamMaterial);
    scene.add(streamLines);

    // 1B. Flare Heads (Points)
    const flareHeadGeometry = new THREE.BufferGeometry();
    const flareHeadPosAttr = new THREE.BufferAttribute(flareHeadPositions, 3);
    const flareHeadColAttr = new THREE.BufferAttribute(flareHeadColors, 3);
    flareHeadGeometry.setAttribute('position', flareHeadPosAttr);
    flareHeadGeometry.setAttribute('color', flareHeadColAttr);
    flareHeadGeometry.setAttribute('size', new THREE.BufferAttribute(flareHeadSizes, 1));

    const flareHeadMaterial = new THREE.PointsMaterial({
      size: isMobile ? 26 : 38,
      map: sharpParticleTex,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flareHeadPoints = new THREE.Points(flareHeadGeometry, flareHeadMaterial);
    scene.add(flareHeadPoints);

    // 1C. Vertical Glow Flares (Points with vertical texture)
    const auraGeometry = new THREE.BufferGeometry();
    const auraPosAttr = new THREE.BufferAttribute(auraPositions, 3);
    const auraColAttr = new THREE.BufferAttribute(auraColors, 3);
    auraGeometry.setAttribute('position', auraPosAttr);
    auraGeometry.setAttribute('color', auraColAttr);
    auraGeometry.setAttribute('size', new THREE.BufferAttribute(auraSizes, 1));

    const auraMaterial = new THREE.PointsMaterial({
      size: isMobile ? 65 : 105,
      map: verticalFlareTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const auraPoints = new THREE.Points(auraGeometry, auraMaterial);
    scene.add(auraPoints);

    // =========================================================================
    // 2. FAST DIGITAL RAIN NEEDLE STREAKS (High-Speed Motion Trail Particles)
    // =========================================================================
    const rainCount = isMobile ? 450 : isTablet ? 850 : 1300;
    const rainPositions = new Float32Array(rainCount * 2 * 3);
    const rainColors = new Float32Array(rainCount * 2 * 3);
    const rainSpeeds = new Float32Array(rainCount);
    const rainLengths = new Float32Array(rainCount);
    const rainX = new Float32Array(rainCount);
    const rainY = new Float32Array(rainCount);
    const rainZ = new Float32Array(rainCount);

    const setRainColor = (index: number, col: THREE.Color, depthMultiplier: number) => {
      const idxHead = index * 2;
      const idxTail = index * 2 + 1;

      // Head: Bright vivid neon
      rainColors[idxHead * 3 + 0] = Math.min(col.r * 2.8 * depthMultiplier, 3.5);
      rainColors[idxHead * 3 + 1] = Math.min(col.g * 2.8 * depthMultiplier, 3.5);
      rainColors[idxHead * 3 + 2] = Math.min(col.b * 2.8 * depthMultiplier, 3.5);

      // Tail: Fast tapering luminous streak
      rainColors[idxTail * 3 + 0] = col.r * 0.08;
      rainColors[idxTail * 3 + 1] = col.g * 0.08;
      rainColors[idxTail * 3 + 2] = col.b * 0.08;
    };

    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * boundX * 2.3;
      const y = (Math.random() - 0.5) * boundY * 2.4;
      const z = (Math.random() - 0.5) * boundZ * 2.2;

      // High variation in speed: extremely fast needle rain to medium streaks
      const speedTier = Math.random();
      let speed = 3.5 + Math.random() * 6.0; // Medium-fast default
      let length = 20 + Math.random() * 50;

      if (speedTier > 0.75) {
        // High-speed laser needle
        speed = 8.0 + Math.random() * 9.5;
        length = 60 + Math.random() * 90;
      } else if (speedTier < 0.25) {
        // Slower background streak
        speed = 2.0 + Math.random() * 3.0;
        length = 15 + Math.random() * 30;
      }

      speed *= prefersReducedMotion ? 0.1 : 1.0;

      rainX[i] = x;
      rainY[i] = y;
      rainZ[i] = z;
      rainLengths[i] = length;
      rainSpeeds[i] = speed;

      const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      const depthMultiplier = 0.7 + ((z + boundZ) / (boundZ * 2)) * 0.85;

      setRainColor(i, col, depthMultiplier);
    }

    const rainGeometry = new THREE.BufferGeometry();
    const rainPosAttr = new THREE.BufferAttribute(rainPositions, 3);
    const rainColAttr = new THREE.BufferAttribute(rainColors, 3);
    rainGeometry.setAttribute('position', rainPosAttr);
    rainGeometry.setAttribute('color', rainColAttr);

    const rainMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
    });
    const rainLines = new THREE.LineSegments(rainGeometry, rainMaterial);
    scene.add(rainLines);

    // =========================================================================
    // 3. LUMINOUS NEON PARTICLES & NODES (Continuously falling stardust & sparks)
    // =========================================================================
    const particleCount = isMobile ? 800 : isTablet ? 1400 : 2200;
    const partPositions = new Float32Array(particleCount * 3);
    const partColors = new Float32Array(particleCount * 3);
    const partSizes = new Float32Array(particleCount);
    const partSpeeds = new Float32Array(particleCount);
    const partTwinklePhase = new Float32Array(particleCount);
    const partSwaySpeed = new Float32Array(particleCount);
    const partSwayAmp = new Float32Array(particleCount);

    const setPartColor = (index: number, col: THREE.Color, depthMultiplier: number) => {
      partColors[index * 3 + 0] = Math.min(col.r * 2.2 * depthMultiplier, 3.0);
      partColors[index * 3 + 1] = Math.min(col.g * 2.2 * depthMultiplier, 3.0);
      partColors[index * 3 + 2] = Math.min(col.b * 2.2 * depthMultiplier, 3.0);
    };

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * boundX * 2.3;
      const y = (Math.random() - 0.5) * boundY * 2.4;
      const z = (Math.random() - 0.5) * boundZ * 2.2;

      partPositions[i * 3 + 0] = x;
      partPositions[i * 3 + 1] = y;
      partPositions[i * 3 + 2] = z;

      const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      const depthMultiplier = 0.65 + ((z + boundZ) / (boundZ * 2)) * 0.9;
      setPartColor(i, col, depthMultiplier);

      // Particle size distribution
      const r = Math.random();
      let size = 6 + Math.random() * 10;
      if (r > 0.82) {
        size = 18 + Math.random() * 22; // Glowing spark
      } else if (r > 0.96) {
        size = 32 + Math.random() * 42; // Radiant neon node
      }

      partSizes[i] = size * (isMobile ? 0.75 : 1.0);

      // Speed variation
      const spd = (1.8 + Math.random() * 4.5) * (prefersReducedMotion ? 0.1 : 1.0);
      partSpeeds[i] = spd;
      partTwinklePhase[i] = Math.random() * Math.PI * 2;
      partSwaySpeed[i] = 1.0 + Math.random() * 2.5;
      partSwayAmp[i] = 0.15 + Math.random() * 0.45;
    }

    const particleGeometry = new THREE.BufferGeometry();
    const particlePosAttr = new THREE.BufferAttribute(partPositions, 3);
    const particleColAttr = new THREE.BufferAttribute(partColors, 3);
    particleGeometry.setAttribute('position', particlePosAttr);
    particleGeometry.setAttribute('color', particleColAttr);
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(partSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 18 : 26,
      map: sharpParticleTex,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // =========================================================================
    // 4. LARGE BOKEH ORBS (Foreground & Midground glowing discs falling gracefully)
    // =========================================================================
    const bokehCount = isMobile ? 30 : 65;
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);
    const bokehSizes = new Float32Array(bokehCount);
    const bokehSpeeds = new Float32Array(bokehCount);
    const bokehPhase = new Float32Array(bokehCount);

    for (let i = 0; i < bokehCount; i++) {
      const x = (Math.random() - 0.5) * boundX * 2.0;
      const y = (Math.random() - 0.5) * boundY * 2.2;
      const z = -120 + Math.random() * 320;

      bokehPositions[i * 3 + 0] = x;
      bokehPositions[i * 3 + 1] = y;
      bokehPositions[i * 3 + 2] = z;

      const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      bokehColors[i * 3 + 0] = col.r * 1.7;
      bokehColors[i * 3 + 1] = col.g * 1.7;
      bokehColors[i * 3 + 2] = col.b * 1.7;

      bokehSizes[i] = (45 + Math.random() * 85) * (isMobile ? 0.7 : 1.0);
      bokehSpeeds[i] = (1.2 + Math.random() * 2.8) * (prefersReducedMotion ? 0.1 : 1.0);
      bokehPhase[i] = Math.random() * Math.PI * 2;
    }

    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPosAttr = new THREE.BufferAttribute(bokehPositions, 3);
    bokehGeometry.setAttribute('position', bokehPosAttr);
    bokehGeometry.setAttribute('color', new THREE.BufferAttribute(bokehColors, 3));
    bokehGeometry.setAttribute('size', new THREE.BufferAttribute(bokehSizes, 1));

    const bokehMaterial = new THREE.PointsMaterial({
      size: isMobile ? 60 : 90,
      map: bokehOrbTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bokehPoints = new THREE.Points(bokehGeometry, bokehMaterial);
    scene.add(bokehPoints);

    // =========================================================================
    // MOUSE & SCROLL PARALLAX HANDLERS
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Observer
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0));
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // FAST TOP-TO-BOTTOM CONTINUOUS RENDER / ANIMATION LOOP
    // =========================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.06);

      // Smooth inertia parallax (horizontal sway & slight tilt without changing downward direction)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      camera.position.x = mouseX * 45;
      camera.position.y = -mouseY * 30 - (scrollY * 0.12) % 300;
      camera.lookAt(0, -scrollY * 0.05, 0);

      // -----------------------------------------------------------------------
      // 1. UPDATE VERTICAL NEON STREAMS (High speed falling from TOP to BOTTOM)
      // -----------------------------------------------------------------------
      const sPosArr = streamPosAttr.array as Float32Array;
      const fPosArr = flareHeadPosAttr.array as Float32Array;
      const aPosArr = auraPosAttr.array as Float32Array;
      let streamColorsChanged = false;

      for (let i = 0; i < streamCount; i++) {
        const speed = streamSpeeds[i];
        const length = streamLengths[i];

        // Active fast downward travel (TOP -> BOTTOM)
        streamY[i] -= speed * 125 * delta;

        // Infinite loop recycling: when head passes below bottom boundary
        if (streamY[i] + length < -boundY * 1.1) {
          // Immediately recycle to the top with randomized offset
          streamY[i] = boundY * 1.1 + Math.random() * 220;
          streamX[i] = (Math.random() - 0.5) * boundX * 2.2;
          streamZ[i] = (Math.random() - 0.5) * boundZ * 2.0;

          // Randomize velocity and length for natural variation
          streamLengths[i] = 55 + Math.random() * (isMobile ? 130 : 280);
          streamSpeeds[i] = (2.2 + Math.random() * 5.8) * (prefersReducedMotion ? 0.1 : 1.0);

          // Randomize color on respawn
          const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
          const depthMultiplier = 0.8 + ((streamZ[i] + boundZ) / (boundZ * 2)) * 0.85;
          setStreamColor(i, col, depthMultiplier);
          streamColorsChanged = true;
        }

        const x = streamX[i];
        const y = streamY[i];
        const z = streamZ[i];

        // Head vertex (Bottom of the traveling streak)
        const idxHead = i * 2;
        sPosArr[idxHead * 3 + 0] = x;
        sPosArr[idxHead * 3 + 1] = y;
        sPosArr[idxHead * 3 + 2] = z;

        // Tail vertex (Trailing behind above the head)
        const idxTail = i * 2 + 1;
        sPosArr[idxTail * 3 + 0] = x;
        sPosArr[idxTail * 3 + 1] = y + length;
        sPosArr[idxTail * 3 + 2] = z;

        // Flare head point (at the traveling head)
        fPosArr[i * 3 + 0] = x;
        fPosArr[i * 3 + 1] = y;
        fPosArr[i * 3 + 2] = z;

        // Aura ribbon (centered along the trail)
        aPosArr[i * 3 + 0] = x;
        aPosArr[i * 3 + 1] = y + length * 0.45;
        aPosArr[i * 3 + 2] = z;
      }

      streamPosAttr.needsUpdate = true;
      flareHeadPosAttr.needsUpdate = true;
      auraPosAttr.needsUpdate = true;
      if (streamColorsChanged) {
        streamColAttr.needsUpdate = true;
        flareHeadColAttr.needsUpdate = true;
        auraColAttr.needsUpdate = true;
      }

      // -----------------------------------------------------------------------
      // 2. UPDATE FAST DIGITAL RAIN STREAKS (High-speed downward needles)
      // -----------------------------------------------------------------------
      const rPosArr = rainPosAttr.array as Float32Array;
      let rainColorsChanged = false;

      for (let i = 0; i < rainCount; i++) {
        const speed = rainSpeeds[i];
        const length = rainLengths[i];

        // Fast downward fall
        rainY[i] -= speed * 110 * delta;

        // Infinite loop recycling
        if (rainY[i] + length < -boundY * 1.15) {
          rainY[i] = boundY * 1.15 + Math.random() * 200;
          rainX[i] = (Math.random() - 0.5) * boundX * 2.3;
          rainZ[i] = (Math.random() - 0.5) * boundZ * 2.2;

          const speedTier = Math.random();
          let newSpeed = 3.5 + Math.random() * 6.0;
          let newLength = 20 + Math.random() * 50;

          if (speedTier > 0.75) {
            newSpeed = 8.0 + Math.random() * 9.5;
            newLength = 60 + Math.random() * 90;
          } else if (speedTier < 0.25) {
            newSpeed = 2.0 + Math.random() * 3.0;
            newLength = 15 + Math.random() * 30;
          }

          rainSpeeds[i] = newSpeed * (prefersReducedMotion ? 0.1 : 1.0);
          rainLengths[i] = newLength;

          const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
          const depthMultiplier = 0.7 + ((rainZ[i] + boundZ) / (boundZ * 2)) * 0.85;
          setRainColor(i, col, depthMultiplier);
          rainColorsChanged = true;
        }

        const x = rainX[i];
        const y = rainY[i];
        const z = rainZ[i];

        const idxHead = i * 2;
        rPosArr[idxHead * 3 + 0] = x;
        rPosArr[idxHead * 3 + 1] = y;
        rPosArr[idxHead * 3 + 2] = z;

        const idxTail = i * 2 + 1;
        rPosArr[idxTail * 3 + 0] = x;
        rPosArr[idxTail * 3 + 1] = y + length;
        rPosArr[idxTail * 3 + 2] = z;
      }

      rainPosAttr.needsUpdate = true;
      if (rainColorsChanged) {
        rainColAttr.needsUpdate = true;
      }

      // -----------------------------------------------------------------------
      // 3. UPDATE LUMINOUS PARTICLES (Continuous downward shower with sparkle)
      // -----------------------------------------------------------------------
      const pPosArr = particlePosAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const speed = partSpeeds[i];
        // Continuous downward movement (TOP -> BOTTOM)
        pPosArr[i * 3 + 1] -= speed * 95 * delta;

        // Subtle lateral sway as it falls
        const phase = partTwinklePhase[i] + elapsedTime * partSwaySpeed[i];
        pPosArr[i * 3 + 0] += Math.sin(phase) * partSwayAmp[i];

        // Immediate recycle from bottom to top
        if (pPosArr[i * 3 + 1] < -boundY * 1.15) {
          pPosArr[i * 3 + 1] = boundY * 1.15 + Math.random() * 100;
          pPosArr[i * 3 + 0] = (Math.random() - 0.5) * boundX * 2.3;
          pPosArr[i * 3 + 2] = (Math.random() - 0.5) * boundZ * 2.2;
          partSpeeds[i] = (1.8 + Math.random() * 4.5) * (prefersReducedMotion ? 0.1 : 1.0);
        }
      }
      particlePosAttr.needsUpdate = true;

      // -----------------------------------------------------------------------
      // 4. UPDATE LARGE BOKEH ORBS (Descending smooth depth layer)
      // -----------------------------------------------------------------------
      const bPosArr = bokehPosAttr.array as Float32Array;
      for (let i = 0; i < bokehCount; i++) {
        const speed = bokehSpeeds[i];
        // Continuous downward motion
        bPosArr[i * 3 + 1] -= speed * 70 * delta;

        const phase = bokehPhase[i] + elapsedTime * 0.8;
        bPosArr[i * 3 + 0] += Math.cos(phase) * 0.4;

        // Immediate recycle from bottom to top
        if (bPosArr[i * 3 + 1] < -boundY * 1.15) {
          bPosArr[i * 3 + 1] = boundY * 1.15 + Math.random() * 120;
          bPosArr[i * 3 + 0] = (Math.random() - 0.5) * boundX * 2.0;
          bPosArr[i * 3 + 2] = -120 + Math.random() * 320;
          bokehSpeeds[i] = (1.2 + Math.random() * 2.8) * (prefersReducedMotion ? 0.1 : 1.0);
        }
      }
      bokehPosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // =========================================================================
    // CLEANUP DISPOSAL
    // =========================================================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      streamGeometry.dispose();
      flareHeadGeometry.dispose();
      auraGeometry.dispose();
      rainGeometry.dispose();
      particleGeometry.dispose();
      bokehGeometry.dispose();

      streamMaterial.dispose();
      flareHeadMaterial.dispose();
      auraMaterial.dispose();
      rainMaterial.dispose();
      particleMaterial.dispose();
      bokehMaterial.dispose();

      sharpParticleTex.dispose();
      speedStreakTex.dispose();
      verticalFlareTex.dispose();
      bokehOrbTex.dispose();

      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="neon-three-background"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Subtle targeted center vignette: dampens only directly behind the central hero text zone, keeping sides, top, and surrounding animation crystal clear and bright */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_35%,rgba(6,9,17,0.45)_0%,rgba(6,9,17,0.15)_65%,transparent_100%)] pointer-events-none" />
    </div>
  );
}
