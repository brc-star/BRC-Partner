'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '919913159932';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Hello BRC STAR Partner, I would like to discuss a project.'
  )}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center group select-none print:hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Hover Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-1.5 mr-3 px-3 py-1.5 rounded-xl bg-slate-900/95 text-white border border-slate-700/80 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-semibold whitespace-nowrap">Chat on WhatsApp</span>
        <span className="text-[11px] text-slate-400 font-mono pl-1">+91 99131 59932</span>
      </div>

      {/* Round WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (+919913159932)"
        title="Chat with BRC STAR Partner on WhatsApp (+919913159932)"
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl shadow-emerald-600/40 hover:shadow-emerald-500/60 ring-2 ring-emerald-500/40 hover:ring-emerald-400/80 focus:outline-none focus:ring-4 focus:ring-emerald-400"
      >
        {/* Subtle pulsing background glow ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping pointer-events-none" />

        {/* WhatsApp Icon Image */}
        <img
          src="/images/whatsapp-icon.png"
          alt="WhatsApp BRC STAR Partner"
          width={64}
          height={64}
          className="w-full h-full object-cover block relative z-10"
          loading="eager"
          decoding="async"
        />
      </a>
    </div>
  );
}
