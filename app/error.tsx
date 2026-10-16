'use client';

import React, { useEffect } from 'react';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // If the error is caused by stale deployment chunk cache on Vercel, auto-refresh once
    const isChunkError =
      error.message?.includes('Loading chunk') ||
      error.message?.includes('ChunkLoadError') ||
      error.name === 'ChunkLoadError';

    if (isChunkError && typeof window !== 'undefined') {
      const hasReloaded = sessionStorage.getItem('chunk_reload');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk_reload', '1');
        window.location.reload();
        return;
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#060911] px-4 text-slate-900 dark:text-slate-100">
      <div className="max-w-md w-full bg-white dark:bg-[#0e162a] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-6">
        <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight">Something went wrong</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A temporary browser exception occurred. This can happen after a new update is deployed while a previous version is cached in your browser.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem('chunk_reload');
              window.location.reload();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors cursor-pointer shadow-lg shadow-blue-600/25"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Page</span>
          </button>
          <a
            href="/"
            onClick={() => sessionStorage.removeItem('chunk_reload')}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
