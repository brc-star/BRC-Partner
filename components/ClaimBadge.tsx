'use client';

import React from 'react';
import { ClaimStatus } from '@/types/claim-proof';
import { CLAIM_STATUS_CONFIG } from '@/lib/claim-proof-data';
import { ShieldCheck, Cpu, Layers, Sparkles, AlertCircle, ExternalLink } from 'lucide-react';

interface ClaimBadgeProps {
  status: ClaimStatus;
  claimId?: string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  onClick?: (claimId?: string) => void;
  className?: string;
}

export function ClaimBadge({
  status,
  claimId,
  size = 'sm',
  showPulse = false,
  onClick,
  className = '',
}: ClaimBadgeProps) {
  const config = CLAIM_STATUS_CONFIG[status] || CLAIM_STATUS_CONFIG.VERIFIED;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-xs px-3 py-1.5 gap-2',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  const isInteractive = Boolean(onClick);

  return (
    <span
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={(e) => {
        if (isInteractive && onClick) {
          e.stopPropagation();
          onClick(claimId);
        }
      }}
      onKeyDown={(e) => {
        if (isInteractive && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          e.stopPropagation();
          onClick(claimId);
        }
      }}
      title={`${config.label}: ${config.description}${isInteractive ? ' Click to inspect evidence.' : ''}`}
      className={`inline-flex items-center font-mono font-semibold uppercase tracking-wider rounded-md border transition-all select-none group ${config.badgeClass} ${sizeClasses[size]} ${isInteractive ? 'cursor-pointer hover:brightness-125 focus:outline-none focus:ring-1 focus:ring-blue-400' : ''} ${className}`}
    >
      <span className="relative flex items-center justify-center">
        {showPulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${config.dotClass}`}
          />
        )}
        <span className={`relative inline-flex rounded-full ${config.dotClass} ${dotSizes[size]}`} />
      </span>
      <span>{config.shortLabel}</span>
      {isInteractive && (
        <span className="text-[9px] opacity-70 group-hover:opacity-100 transition-opacity">
          • PROOF
        </span>
      )}
    </span>
  );
}
