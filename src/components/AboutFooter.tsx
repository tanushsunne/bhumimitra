import React from 'react';
import { Sprout, ExternalLink, GraduationCap, Heart, ShieldAlert, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const AboutFooter: React.FC<Props> = ({ language, onNavigate }) => {
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about-footer" className="bg-[#1c1917] text-[#d6d3d1] pt-12 pb-8 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About the Academic Project Callout Banner */}
        <div className="mb-10 p-6 rounded-2xl bg-[#292524] border border-[#44403c] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#78350f] text-[#fef08a] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">
                About BhumiMitra (Concept Prototype)
              </h4>
              <p className="text-xs text-[#a8a29e] leading-relaxed max-w-2xl">
                {t.footer.academicNotice} {t.footer.disclaimer}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#1b4332] text-[#95d5b2] border border-[#2d6a4f]">
              College Demo Edition
            </span>
          </div>
        </div>

        {/* Footer Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#292524]">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-[#95d5b2]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {t.appName}
              </span>
            </div>
            <p className="text-xs text-[#a8a29e] leading-relaxed">
              Empowering grassroots soil diagnostics, raising awareness of Indian land degradation types, and exploring doorstep soil health testing services.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#f5efe6] mb-3">
              {t.footer.linksTitle}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('awareness')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.awareness}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diagnose')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.diagnose}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('send-sample')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.sendSample}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('track-sample')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.trackSample}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('practices')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.practices}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Resources */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#f5efe6] mb-3">
              {t.footer.resourcesTitle}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://bhoomigeoportal-nbsslup.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>ICAR-NBSS&LUP Bhoomi Geoportal</span>
                  <ExternalLink className="w-3 h-3 text-[#9ca3af]" />
                </a>
              </li>
              <li>
                <a
                  href="https://soilhealth.dac.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Soil Health Card Portal (DAC&FW)</span>
                  <ExternalLink className="w-3 h-3 text-[#9ca3af]" />
                </a>
              </li>
              <li>
                <a
                  href="https://icar.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Indian Council of Agricultural Research</span>
                  <ExternalLink className="w-3 h-3 text-[#9ca3af]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Presentation & Academic Credits */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#f5efe6]">
              Project Presentation
            </h5>
            <p className="text-xs text-[#a8a29e] leading-relaxed">
              Theme: <strong>Land Degradation and Soil Conservation</strong>. Developed as an academic prototype for college symposium presentation.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#292524] text-xs text-white border border-[#44403c] hover:bg-[#44403c] transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716c]">
          <p>{t.footer.rights}</p>
          <p>Made for an academic project on Land Degradation & Soil Conservation</p>
        </div>
      </div>
    </footer>
  );
};
