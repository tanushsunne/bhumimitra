import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { DismissibleBanner } from './components/DismissibleBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AwarenessSection } from './components/AwarenessSection';
import { DiagnoseSection } from './components/DiagnoseSection';
import { SendSampleSection } from './components/SendSampleSection';
import { TrackSampleSection } from './components/TrackSampleSection';
import { PracticesLibrary } from './components/PracticesLibrary';
import { GeoportalSection } from './components/GeoportalSection';
import { AboutFooter } from './components/AboutFooter';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('bhumimitra_lang') as Language;
    return saved === 'hi' || saved === 'mr' || saved === 'en' ? saved : 'en';
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [samplePrefill, setSamplePrefill] = useState<{ crop?: string; location?: string } | undefined>(undefined);
  const [targetSampleId, setTargetSampleId] = useState<string | undefined>(undefined);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bhumimitra_lang', lang);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiagnoseToSendSample = (data?: { crop?: string; location?: string }) => {
    setSamplePrefill(data);
    scrollToSection('send-sample');
  };

  const handleSendSampleToTrack = (sampleId: string) => {
    setTargetSampleId(sampleId);
    scrollToSection('track-sample');
  };

  // Observe active section on scroll
  useEffect(() => {
    const sections = ['home', 'awareness', 'diagnose', 'send-sample', 'track-sample', 'practices', 'geoportal'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] flex flex-col antialiased selection:bg-[#2d6a4f] selection:text-white">
      {/* 1. Dismissible Prototype Warning Banner */}
      <DismissibleBanner language={language} />

      {/* 2. Main Top Navbar with Language Toggle and Geoportal Link */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          language={language}
          onDiagnoseClick={() => scrollToSection('diagnose')}
          onSendSampleClick={() => scrollToSection('send-sample')}
        />

        {/* Awareness Section: Land Degradation in India */}
        <AwarenessSection language={language} />

        {/* Diagnose My Land (Core Feature with Photo + Questionnaire + AI Report) */}
        <DiagnoseSection
          language={language}
          onNavigateToSendSample={handleDiagnoseToSendSample}
        />

        {/* Send a Sample (Simulated Doorstep Service) */}
        <SendSampleSection
          language={language}
          prefillData={samplePrefill}
          onNavigateToTrack={handleSendSampleToTrack}
        />

        {/* Track My Sample (Status Timeline & Demo Soil Health Card) */}
        <TrackSampleSection
          language={language}
          initialSampleId={targetSampleId}
        />

        {/* Conservation Practices Library (12 Filterable Practices) */}
        <PracticesLibrary language={language} />

        {/* Bhoomi Geoportal External Redirect Section */}
        <GeoportalSection language={language} />
      </main>

      {/* About Project & Academic Footer */}
      <AboutFooter
        language={language}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
