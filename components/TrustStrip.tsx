'use client';

import React from 'react';
import { Layers, Cpu, Gauge, ShieldCheck, Smartphone, LifeBuoy } from 'lucide-react';
import { TRUST_PILLARS } from '@/lib/data';

const iconMap = {
  Layers: Layers,
  Cpu: Cpu,
  Gauge: Gauge,
  ShieldCheck: ShieldCheck,
  Smartphone: Smartphone,
  LifeBuoy: LifeBuoy,
};

export function TrustStrip() {
  return (
    <section
      id="trust-expertise-strip"
      className="border-y border-slate-800/80 bg-[#080d18] py-8 relative z-20"
      aria-label="Core Technology Commitments"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            BRC STAR • Engineering Standards & Architecture Pillars
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_PILLARS.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.icon as keyof typeof iconMap] || Layers;
            return (
              <div
                key={pillar.title}
                id={`trust-pillar-${idx}`}
                className="group p-4 rounded-xl bg-[#0c1322] border border-slate-800/80 hover:border-blue-500/50 hover:bg-[#10192e] transition-all duration-200 flex flex-col items-start gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:scale-105 transition-all">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="text-[11px] text-slate-400 leading-snug mt-1 line-clamp-2">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
