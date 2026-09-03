'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// 1. Procedural High-Intensity Particle Texture:
// Features a solid white-hot piercing core surrounded by a tight, luminous neon halo
function createSharpParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = 64;
    const cy = 64;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64);
    // Solid white-hot center for authentic neon illumination
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.18, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.45)');
    grad.addColorStop(0.78, 'rgba(255, 255, 255, 0.12)');
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

// 2. Procedural Vertical Anamorphic Laser Flare Texture:
// Recreates the vertical light streaks and flare crowns seen in the reference
function createVerticalFlareTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = 64;
    const cy = 256;

    // Outer soft glow
    const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
    outerGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    outerGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.7)');
    outerGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)');
    outerGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.04)');
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

    const vFade = ctx.createLinearGradient(0, 0, 0, 512);
    vFade.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    vFade.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    vFade.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
    vFade.addColorStop(0.7, 'rgba(255, 255, 255, 0.8)');
    vFade.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = coreGrad;
    ctx.fillRect(cx - 3, 0, 6, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// 3. Procedural Large Bokeh Orb Texture (Cinematic out-of-focus glowing disc)
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
    grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.5)');
    grad.addColorStop(0.9, 'rgba(255, 255, 255, 0.2)');
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

// Ultra-Vibrant Neon Palette directly from the visual reference image:
// Electric Cyan, Neon Blue, Magenta / Hot Pink, Violet, Neon Green / Lime, Sunburst Yellow, Neon Orange
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

    // WebGL Renderer with High Dynamic Range Color Space
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
    renderer.setClearColor(0x000000, 0); // Transparent so DOM background provides rich contrast

    const container = containerRef.current;
    container.appendChild(renderer.domElement);

    // Textures
    const sharpParticleTex = createSharpParticleTexture();
    const verticalFlareTex = createVerticalFlareTexture();
    const bokehOrbTex = createBokehOrbTexture();

    // Bounds in 3D world space
    const boundX = isMobile ? 480 : 850;
    const boundY = 750;
    const boundZ = 450;

    // =========================================================================
    // 1. VERTICAL NEON LIGHT STREAMS & LASER TRAILS (The Key Visual Element)
    // =========================================================================
    const streamCount = isMobile ? 140 : isTablet ? 260 : 420;

    // 1A. Sharp Core Laser Lines (LineSegments)
    const streamPositions = new Float32Array(streamCount * 2 * 3);
    const streamColors = new Float32Array(streamCount * 2 * 3);
    const streamSpeeds = new Float32Array(streamCount);
    const streamLengths = new Float32Array(streamCount);
    const streamX = new Float32Array(streamCount);
    const streamY = new Float32Array(streamCount);
    const streamZ = new Float32Array(streamCount);
    const streamColorObjs: THREE.Color[] = [];

    // 1B. Luminous Flare Heads (Points at the tip of each stream)
    const flareHeadPositions = new Float32Array(streamCount * 3);
    const flareHeadColors = new Float32Array(streamCount * 3);
    const flareHeadSizes = new Float32Array(streamCount);

    // 1C. Glowing Stream Aura Ribbons (Points with vertical streak texture)
    const auraPositions = new Float32Array(streamCount * 3);
    const auraColors = new Float32Array(streamCount * 3);
    const auraSizes = new Float32Array(streamCount);

    for (let i = 0; i < streamCount; i++) {
      const x = (Math.random() - 0.5) * boundX * 2.1;
      const y = (Math.random() - 0.5) * boundY * 2.2;
      const z = (Math.random() - 0.5) * boundZ * 2.0;

      // Varied lengths: from short streaks to long dramatic cascades
      const length = 45 + Math.random() * (isMobile ? 120 : 260);
      const speed = (1.2 + Math.random() * 3.2) * (prefersReducedMotion ? 0.08 : 1.0);

      streamX[i] = x;
      streamY[i] = y;
      streamZ[i] = z;
      streamLengths[i] = length;
      streamSpeeds[i] = speed;

      const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)].clone();
      streamColorObjs.push(col);

      // Depth brightness multiplier (closer = even brighter)
      const depthMultiplier = 0.8 + ((z + boundZ) / (boundZ * 2)) * 0.8;

      // Line Head (Bright white-neon leading point)
      const idxHead = i * 2;
      streamPositions[idxHead * 3 + 0] = x;
      streamPositions[idxHead * 3 + 1] = y;
      streamPositions[idxHead * 3 + 2] = z;

      streamColors[idxHead * 3 + 0] = Math.min(col.r * 2.2 * depthMultiplier, 3.0);
      streamColors[idxHead * 3 + 1] = Math.min(col.g * 2.2 * depthMultiplier, 3.0);
      streamColors[idxHead * 3 + 2] = Math.min(col.b * 2.2 * depthMultiplier, 3.0);

      // Line Tail (Fades softly upward)
      const idxTail = i * 2 + 1;
      streamPositions[idxTail * 3 + 0] = x;
      streamPositions[idxTail * 3 + 1] = y + length;
      streamPositions[idxTail * 3 + 2] = z;

      streamColors[idxTail * 3 + 0] = col.r * 0.08;
      streamColors[idxTail * 3 + 1] = col.g * 0.08;
      streamColors[idxTail * 3 + 2] = col.b * 0.08;

      // Flare Head Dot
      flareHeadPositions[i * 3 + 0] = x;
      flareHeadPositions[i * 3 + 1] = y;
      flareHeadPositions[i * 3 + 2] = z;

      flareHeadColors[i * 3 + 0] = Math.min(col.r * 2.8 * depthMultiplier, 3.5);
      flareHeadColors[i * 3 + 1] = Math.min(col.g * 2.8 * depthMultiplier, 3.5);
      flareHeadColors[i * 3 + 2] = Math.min(col.b * 2.8 * depthMultiplier, 3.5);

      flareHeadSizes[i] = (16 + Math.random() * 26) * (isMobile ? 0.8 : 1.0);

      // Vertical Streak Aura (centered slightly behind head)
      auraPositions[i * 3 + 0] = x;
      auraPositions[i * 3 + 1] = y + length * 0.4;
      auraPositions[i * 3 + 2] = z;

      auraColors[i * 3 + 0] = col.r * 1.5 * depthMultiplier;
      auraColors[i * 3 + 1] = col.g * 1.5 * depthMultiplier;
      auraColors[i * 3 + 2] = col.b * 1.5 * depthMultiplier;

      auraSizes[i] = (length * 0.8) * (isMobile ? 0.75 : 1.0);
    }

    // 1A. LineSegments Geometry & Material (Crisp laser lines)
    const streamGeometry = new THREE.BufferGeometry();
    const streamPosAttr = new THREE.BufferAttribute(streamPositions, 3);
    streamGeometry.setAttribute('position', streamPosAttr);
    streamGeometry.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));

    const streamMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      linewidth: isMobile ? 1.5 : 2.0,
    });
    const streamLines = new THREE.LineSegments(streamGeometry, streamMaterial);
    scene.add(streamLines);

    // 1B. Flare Heads (Points with circular sharp glow)
    const flareHeadGeometry = new THREE.BufferGeometry();
    const flareHeadPosAttr = new THREE.BufferAttribute(flareHeadPositions, 3);
    flareHeadGeometry.setAttribute('position', flareHeadPosAttr);
    flareHeadGeometry.setAttribute('color', new THREE.BufferAttribute(flareHeadColors, 3));
    flareHeadGeometry.setAttribute('size', new THREE.BufferAttribute(flareHeadSizes, 1));

    const flareHeadMaterial = new THREE.PointsMaterial({
      size: isMobile ? 24 : 36,
      map: sharpParticleTex,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const flareHeadPoints = new THREE.Points(flareHeadGeometry, flareHeadMaterial);
    scene.add(flareHeadPoints);

    // 1C. Vertical Glow Flares (Anamorphic vertical laser flares)
    const auraGeometry = new THREE.BufferGeometry();
    const auraPosAttr = new THREE.BufferAttribute(auraPositions, 3);
    auraGeometry.setAttribute('position', auraPosAttr);
    auraGeometry.setAttribute('color', new THREE.BufferAttribute(auraColors, 3));
    auraGeometry.setAttribute('size', new THREE.BufferAttribute(auraSizes, 1));

    const auraMaterial = new THREE.PointsMaterial({
      size: isMobile ? 55 : 95,
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
    // 2. DENSE FIELD OF LUMINOUS NEON PARTICLES (Sharp Points & Nodes)
    // =========================================================================
    const particleCount = isMobile ? 1100 : isTablet ? 1900 : 3000;
    const partPositions = new Float32Array(particleCount * 3);
    const partColors = new Float32Array(particleCount * 3);
    const partSizes = new Float32Array(particleCount);
    const partVelocities = new Float32Array(particleCount);
    const partTwinklePhase = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * boundX * 2.3;
      const y = (Math.random() - 0.5) * boundY * 2.3;
      const z = (Math.random() - 0.5) * boundZ * 2.2;

      partPositions[i * 3 + 0] = x;
      partPositions[i * 3 + 1] = y;
      partPositions[i * 3 + 2] = z;

      const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      const depthMultiplier = 0.65 + ((z + boundZ) / (boundZ * 2)) * 0.9;

      partColors[i * 3 + 0] = col.r * 1.8 * depthMultiplier;
      partColors[i * 3 + 1] = col.g * 1.8 * depthMultiplier;
      partColors[i * 3 + 2] = col.b * 1.8 * depthMultiplier;

      // Particle size distribution: dense pinprick stars + distinct bright nodes
      const r = Math.random();
      let size = 4 + Math.random() * 8;
      if (r > 0.85) {
        size = 15 + Math.random() * 20; // Medium glowing star
      } else if (r > 0.96) {
        size = 28 + Math.random() * 38; // Bright luminous node
      }

      partSizes[i] = size * (isMobile ? 0.75 : 1.0);
      partVelocities[i] = (0.3 + Math.random() * 1.1) * (prefersReducedMotion ? 0.05 : 1.0);
      partTwinklePhase[i] = Math.random() * Math.PI * 2;
    }

    const particleGeometry = new THREE.BufferGeometry();
    const particlePosAttr = new THREE.BufferAttribute(partPositions, 3);
    particleGeometry.setAttribute('position', particlePosAttr);
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(partColors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(partSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 16 : 24,
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
    // 3. LARGE BOKEH ORBS (Foreground & Midground depth layers)
    // =========================================================================
    const bokehCount = isMobile ? 35 : 75;
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);
    const bokehSizes = new Float32Array(bokehCount);
    const bokehSpeeds = new Float32Array(bokehCount);
    const bokehPhase = new Float32Array(bokehCount);

    for (let i = 0; i < bokehCount; i++) {
      const x = (Math.random() - 0.5) * boundX * 2.0;
      const y = (Math.random() - 0.5) * boundY * 2.0;
      const z = -150 + Math.random() * 350;

      bokehPositions[i * 3 + 0] = x;
      bokehPositions[i * 3 + 1] = y;
      bokehPositions[i * 3 + 2] = z;

      const col = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      bokehColors[i * 3 + 0] = col.r * 1.6;
      bokehColors[i * 3 + 1] = col.g * 1.6;
      bokehColors[i * 3 + 2] = col.b * 1.6;

      bokehSizes[i] = (45 + Math.random() * 75) * (isMobile ? 0.7 : 1.0);
      bokehSpeeds[i] = (0.2 + Math.random() * 0.7) * (prefersReducedMotion ? 0.05 : 1.0);
      bokehPhase[i] = Math.random() * Math.PI * 2;
    }

    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPosAttr = new THREE.BufferAttribute(bokehPositions, 3);
    bokehGeometry.setAttribute('position', bokehPosAttr);
    bokehGeometry.setAttribute('color', new THREE.BufferAttribute(bokehColors, 3));
    bokehGeometry.setAttribute('size', new THREE.BufferAttribute(bokehSizes, 1));

    const bokehMaterial = new THREE.PointsMaterial({
      size: isMobile ? 55 : 85,
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
    // RENDER / ANIMATION LOOP
    // =========================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.08);

      // Smooth inertia parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.06;

      camera.position.x = mouseX * 55;
      camera.position.y = -mouseY * 40 - (scrollY * 0.15) % 400;
      camera.lookAt(0, -scrollY * 0.06, 0);

      // 1. Update Vertical Streams (Laser Lines + Flare Heads + Auras)
      const sPosArr = streamPosAttr.array as Float32Array;
      const fPosArr = flareHeadPosAttr.array as Float32Array;
      const aPosArr = auraPosAttr.array as Float32Array;

      for (let i = 0; i < streamCount; i++) {
        const speed = streamSpeeds[i];
        const length = streamLengths[i];

        // Move head downward
        streamY[i] -= speed * 75 * delta;

        // Reset when passing bottom boundary
        if (streamY[i] < -boundY) {
          streamY[i] = boundY + Math.random() * 150;
          streamX[i] = (Math.random() - 0.5) * boundX * 2.1;
        }

        const x = streamX[i];
        const y = streamY[i];
        const z = streamZ[i];

        // Head vertex
        const idxHead = i * 2;
        sPosArr[idxHead * 3 + 0] = x;
        sPosArr[idxHead * 3 + 1] = y;
        sPosArr[idxHead * 3 + 2] = z;

        // Tail vertex
        const idxTail = i * 2 + 1;
        sPosArr[idxTail * 3 + 0] = x;
        sPosArr[idxTail * 3 + 1] = y + length;
        sPosArr[idxTail * 3 + 2] = z;

        // Flare head point
        fPosArr[i * 3 + 0] = x;
        fPosArr[i * 3 + 1] = y;
        fPosArr[i * 3 + 2] = z;

        // Aura ribbon
        aPosArr[i * 3 + 0] = x;
        aPosArr[i * 3 + 1] = y + length * 0.45;
        aPosArr[i * 3 + 2] = z;
      }

      streamPosAttr.needsUpdate = true;
      flareHeadPosAttr.needsUpdate = true;
      auraPosAttr.needsUpdate = true;

      // 2. Update Glowing Particles Field (Subtle vertical drift + lateral twinkle sway)
      const pPosArr = particlePosAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const v = partVelocities[i];
        pPosArr[i * 3 + 1] -= v * 45 * delta;

        const phase = partTwinklePhase[i] + elapsedTime * 1.2;
        pPosArr[i * 3 + 0] += Math.sin(phase) * 0.22;

        if (pPosArr[i * 3 + 1] < -boundY * 1.15) {
          pPosArr[i * 3 + 1] = boundY * 1.15;
          pPosArr[i * 3 + 0] = (Math.random() - 0.5) * boundX * 2.3;
        }
      }
      particlePosAttr.needsUpdate = true;

      // 3. Update Large Bokeh Orbs (Gentle floating motion)
      const bPosArr = bokehPosAttr.array as Float32Array;
      for (let i = 0; i < bokehCount; i++) {
        const spd = bokehSpeeds[i];
        bPosArr[i * 3 + 1] -= spd * 35 * delta;
        const phase = bokehPhase[i] + elapsedTime * 0.6;
        bPosArr[i * 3 + 0] += Math.cos(phase) * 0.35;

        if (bPosArr[i * 3 + 1] < -boundY * 1.15) {
          bPosArr[i * 3 + 1] = boundY * 1.15;
          bPosArr[i * 3 + 0] = (Math.random() - 0.5) * boundX * 2.0;
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
      particleGeometry.dispose();
      bokehGeometry.dispose();

      streamMaterial.dispose();
      flareHeadMaterial.dispose();
      auraMaterial.dispose();
      particleMaterial.dispose();
      bokehMaterial.dispose();

      sharpParticleTex.dispose();
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
