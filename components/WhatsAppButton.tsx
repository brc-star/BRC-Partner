'use client';

import React from 'react';

export function WhatsAppButton() {
  const phoneNumber = '919913159932';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    'Hello BRC STAR Partner, I would like to discuss a project.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group select-none print:hidden">
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
