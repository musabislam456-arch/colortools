'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

interface ToastContextType {
  showToast: (message: string, hex?: string) => void;
  copyToClipboard: (text: string, label?: string) => Promise<void>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; hex?: string } | null>(
    null
  );

  const showToast = useCallback((message: string, hex?: string) => {
    setToast({ message, hex });
    setTimeout(() => {
      setToast(null);
    }, 2400);
  }, []);

  const copyToClipboard = useCallback(
    async (text: string, label?: string) => {
      try {
        await navigator.clipboard.writeText(text);
        showToast(label ? `Copied ${label} to clipboard` : `Copied: ${text}`, text.startsWith('#') ? text : undefined);
      } catch {
        showToast(`Copied: ${text}`);
      }
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, copyToClipboard }}>
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-white/[0.12] bg-[#141720]/95 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {toast.hex ? (
            <div
              className="h-4 w-4 rounded-full border border-white/20 shrink-0 shadow-sm"
              style={{ backgroundColor: toast.hex }}
            />
          ) : (
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
          )}
          <span className="font-mono text-xs text-zinc-200">{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
