import React, { useState } from 'react';
import { Sprout, ExternalLink, Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<Props> = ({
  language,
  onLanguageChange,
  activeSection,
  onNavigate,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[language];

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'awareness', label: t.nav.awareness },
    { id: 'diagnose', label: t.nav.diagnose },
    { id: 'send-sample', label: t.nav.sendSample },
    { id: 'track-sample', label: t.nav.trackSample },
    { id: 'practices', label: t.nav.practices },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e7dec8] transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1b4332] flex items-center justify-center text-[#d8f3dc] shadow-sm group-hover:bg-[#2d6a4f] transition-all">
              <Sprout className="w-6 h-6 text-[#95d5b2]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1b4332] block leading-none">
                {t.appName}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-[#78350f] block tracking-wide mt-0.5">
                {t.appTagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#2d6a4f] text-white shadow-sm'
                    : 'text-[#374151] hover:text-[#1b4332] hover:bg-[#ede6d6]'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* External Bhoomi Geoportal Link */}
            <a
              href="https://bhoomigeoportal-nbsslup.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#fef3c7] text-[#92400e] border border-[#fde68a] hover:bg-[#fde68a] transition-colors ml-1"
              title="ICAR-NBSS&LUP Soil Degradation Geoportal"
            >
              <span>{t.nav.geoportal}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right Action: Language Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle Pills */}
            <div
              id="lang-toggle-group"
              className="flex items-center bg-[#ede6d6] p-1 rounded-xl border border-[#dfd6c0]"
              role="radiogroup"
              aria-label="Select Language"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-[#1b4332] text-white shadow-sm'
                    : 'text-[#4b5563] hover:text-[#1b4332]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-[#1b4332] text-white shadow-sm'
                    : 'text-[#4b5563] hover:text-[#1b4332]'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('mr')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'mr'
                    ? 'bg-[#1b4332] text-white shadow-sm'
                    : 'text-[#4b5563] hover:text-[#1b4332]'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-[#374151] hover:bg-[#ede6d6] focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#faf8f5] border-b border-[#e7dec8] px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#2d6a4f] text-white shadow-sm'
                    : 'text-[#1c1917] hover:bg-[#ede6d6]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            <a
              href="https://bhoomigeoportal-nbsslup.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold bg-[#fef3c7] text-[#92400e] border border-[#fde68a]"
            >
              <span>{t.nav.geoportal} (ICAR Map)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
