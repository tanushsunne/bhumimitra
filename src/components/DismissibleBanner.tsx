import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
}

export const DismissibleBanner: React.FC<Props> = ({ language }) => {
  const [dismissed, setDismissed] = useState(false);
  const t = translations[language];

  if (dismissed) {
    return (
      <div className="bg-[#fef3c7] border-b border-[#fde68a] px-4 py-1 text-xs text-[#92400e] text-center flex items-center justify-center gap-2">
        <span className="font-medium">🎓 Academic Prototype Mode</span>
        <button
          onClick={() => setDismissed(false)}
          className="underline hover:text-[#78350f] transition-colors"
        >
          Show simulation notice
        </button>
      </div>
    );
  }

  return (
    <div
      id="prototype-banner"
      role="alert"
      className="bg-[#fffbeb] border-b border-[#fcd34d] px-4 py-2.5 sm:py-2 text-[#92400e] relative shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 font-medium">
          <div className="w-5 h-5 rounded-full bg-[#fef08a] flex items-center justify-center shrink-0 text-[#b45309]">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
          <span className="tracking-tight">
            <strong>Concept Prototype:</strong> {t.prototypeBanner}
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded hover:bg-[#fde68a] text-[#78350f] transition-colors shrink-0"
          title="Dismiss notification"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
