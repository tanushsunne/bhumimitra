import React from 'react';
import { Waves, Sparkles, Droplets, FlaskConical, Sprout, AlertCircle, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { degradationCards } from '../data/degradationData';

interface Props {
  language: Language;
}

export const AwarenessSection: React.FC<Props> = ({ language }) => {
  const t = translations[language];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#2563eb]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#d97706]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#0d9488]" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5 text-[#7c3aed]" />;
      case 'Sprout':
      default:
        return <Sprout className="w-5 h-5 text-[#16a34a]" />;
    }
  };

  return (
    <section id="awareness" className="py-12 sm:py-18 bg-[#fdfbf7] border-b border-[#e7dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] text-xs font-bold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>National Ecological Context</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight mb-3">
            {t.awareness.title}
          </h2>
          <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
            {t.awareness.subtitle}
          </p>
        </div>

        {/* 5 Degradation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {degradationCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:shadow-md hover:border-[#2d6a4f] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Tag */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#faf8f5] border border-[#ede3cf] flex items-center justify-center shrink-0">
                    {getIcon(card.iconName)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#f4efe6] text-[#78350f] text-[11px] font-bold tracking-tight">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#1b4332] mb-3">
                  {card.title}
                </h3>

                {/* Root Cause */}
                <div className="mb-3">
                  <span className="text-xs font-bold text-[#78350f] block mb-1 uppercase tracking-wide">
                    {t.awareness.causeLabel}
                  </span>
                  <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                    {card.cause}
                  </p>
                </div>

                {/* Effect on Yield */}
                <div className="mb-3 bg-[#faf8f5] p-3 rounded-xl border border-[#f0e9dc]">
                  <span className="text-xs font-bold text-[#b91c1c] block mb-1 uppercase tracking-wide">
                    {t.awareness.effectLabel}
                  </span>
                  <p className="text-xs sm:text-sm text-[#451a03] leading-relaxed font-medium">
                    {card.effect}
                  </p>
                </div>

                {/* Field Warning Sign */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#2d6a4f] block mb-1 uppercase tracking-wide">
                    {t.awareness.indicatorLabel}
                  </span>
                  <p className="text-xs sm:text-sm text-[#1f2937] italic">
                    "{card.indicator}"
                  </p>
                </div>
              </div>

              {/* Footer: Regions & Source Notice */}
              <div className="pt-3 border-t border-[#f0e9dc] mt-2 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-[#6b7280]">
                  <MapPin className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" />
                  <span className="truncate">{card.affectedRegions}</span>
                </div>
                <div className="text-[10px] text-[#92400e] bg-[#fffbeb] px-2 py-1 rounded font-medium border border-[#fef08a]">
                  📌 {card.sourceNotice}
                </div>
              </div>
            </div>
          ))}

          {/* Quick Informational Action Card */}
          <div className="bg-[#1b4332] text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#2d6a4f] text-[#d8f3dc] text-xs font-bold uppercase tracking-wider mb-4">
                Soil Restoration Priority
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-snug">
                Prevention Costs 10x Less Than Land Reclamation
              </h3>
              <p className="text-xs sm:text-sm text-[#d8f3dc] leading-relaxed mb-4">
                Early detection using field visual indicators allows farmers to implement bio-remediation (like green manuring, contour bunds, and mulching) before topsoil fertility is permanently lost.
              </p>
            </div>

            <div className="pt-4 border-t border-[#2d6a4f]/60 text-xs text-[#b7e4c7]">
              🌾 Regular monitoring + balanced organic amendments restores microbial soil networks within 2 cropping seasons.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
