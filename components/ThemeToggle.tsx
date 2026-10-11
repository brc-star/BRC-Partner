'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative inline-flex items-center justify-center gap-2 p-2 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/60 ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800/90 text-amber-400 border border-slate-800 shadow-sm hover:border-slate-700'
          : 'bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 shadow-sm hover:border-slate-300'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Sun Icon (Visible in Dark Mode to switch to Light) */}
        <Sun
          className={`w-5 h-5 transition-all duration-300 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
              : '-rotate-90 scale-0 opacity-0 absolute'
          }`}
        />

        {/* Moon Icon (Visible in Light Mode to switch to Dark) */}
        <Moon
          className={`w-5 h-5 transition-all duration-300 transform ${
            !isDark
              ? 'rotate-0 scale-100 opacity-100 text-slate-700 group-hover:text-blue-600 drop-shadow-[0_0_6px_rgba(37,99,235,0.3)]'
              : 'rotate-90 scale-0 opacity-0 absolute'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}
