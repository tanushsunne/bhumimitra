import React from 'react';
import { Camera, FlaskConical, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Activity, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  onDiagnoseClick: () => void;
  onSendSampleClick: () => void;
}

export const HeroSection: React.FC<Props> = ({
  language,
  onDiagnoseClick,
  onSendSampleClick,
}) => {
  const t = translations[language];

  return (
    <section id="hero-section" className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-[#e7dec8]">
      {/* Subtle organic background pattern */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none bg-[radial-gradient(#2d6a4f_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Top Content */}
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5e9] border border-[#a3cfbb] text-[#1b4332] text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2d6a4f] animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1b4332] tracking-tight leading-[1.15] mb-5">
            {t.hero.title}
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-xl text-[#44403c] leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
            {t.hero.subtext}
          </p>

          {/* Large Action Buttons (Farmer-Friendly & Touch Accessible) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-8">
            <button
              id="hero-btn-diagnose"
              onClick={onDiagnoseClick}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#1b4332] text-white text-base sm:text-lg font-bold shadow-md hover:bg-[#2d6a4f] active:scale-[0.98] transition-all focus:ring-4 focus:ring-[#95d5b2]"
            >
              <Camera className="w-5 h-5 text-[#95d5b2]" />
              <span>{t.hero.ctaDiagnose}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              id="hero-btn-sample"
              onClick={onSendSampleClick}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#78350f] text-white text-base sm:text-lg font-bold shadow-md hover:bg-[#92400e] active:scale-[0.98] transition-all focus:ring-4 focus:ring-[#fde68a]"
            >
              <FlaskConical className="w-5 h-5 text-[#fde68a]" />
              <span>{t.hero.ctaSample}</span>
            </button>
          </div>

          {/* Trust callout */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#78350f] font-medium bg-[#fcf9f2] px-4 py-2 rounded-lg border border-[#ede3cf]">
            <ShieldCheck className="w-4 h-4 text-[#2d6a4f]" />
            <span>{t.hero.callout}</span>
          </div>
        </div>

        {/* 3-Step "How It Works" Strip */}
        <div id="how-it-works" className="mt-14 sm:mt-20 pt-10 border-t border-[#e7dec8]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1b4332]">
              {t.howItWorks.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534e] mt-1">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:border-[#2d6a4f] transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6 text-[#2d6a4f]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2d6a4f]">Stage 1</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1b4332]">
                    {t.howItWorks.step1Title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[#44403c] leading-relaxed">
                {t.howItWorks.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:border-[#2d6a4f] transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#fef3c7] text-[#92400e] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-[#b45309]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b45309]">Stage 2</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1b4332]">
                    {t.howItWorks.step2Title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[#44403c] leading-relaxed">
                {t.howItWorks.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:border-[#2d6a4f] transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#ede9fe] text-[#5b21b6] flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                  <FlaskConical className="w-6 h-6 text-[#6d28d9]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6d28d9]">Stage 3</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#1b4332]">
                    {t.howItWorks.step3Title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-[#44403c] leading-relaxed">
                {t.howItWorks.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
