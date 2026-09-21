import React from 'react';
import { ExternalLink, Map, Layers, Database, Compass, Globe2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
}

export const GeoportalSection: React.FC<Props> = ({ language }) => {
  const t = translations[language];

  return (
    <section id="geoportal" className="py-12 sm:py-18 bg-[#faf8f5] border-b border-[#e7dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl overflow-hidden relative">
          {/* Subtle background decoration */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Globe2 className="w-96 h-96" />
          </div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-[#d8f3dc] text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-xs border border-white/20">
              <Compass className="w-3.5 h-3.5 text-[#95d5b2]" />
              <span>{t.geoportal.subtitle}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-white">
              {t.geoportal.title}
            </h2>

            <p className="text-sm sm:text-base text-[#d8f3dc] leading-relaxed mb-6 font-normal">
              {t.geoportal.description}
            </p>

            {/* Key Features Bullet List */}
            <div className="space-y-2 mb-8 text-xs sm:text-sm text-white/95">
              {t.geoportal.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#95d5b2] text-[#1b4332] flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Prominent External Redirect Button */}
            <div className="space-y-3">
              <a
                id="btn-open-bhoomi-geoportal"
                href="https://bhoomigeoportal-nbsslup.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#fef3c7] text-[#78350f] text-base font-extrabold shadow-lg hover:bg-white active:scale-[0.99] transition-all"
              >
                <Map className="w-5 h-5 text-[#b45309]" />
                <span>{t.geoportal.openBtn}</span>
                <ExternalLink className="w-4 h-4 ml-1 text-[#b45309]" />
              </a>

              <p className="text-[11px] text-[#b7e4c7]">
                🔒 {t.geoportal.notice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
