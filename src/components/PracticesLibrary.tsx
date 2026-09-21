import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Filter,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Search,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Language, ConservationPractice } from '../types';
import { translations } from '../translations';
import { conservationPractices } from '../data/practicesData';

interface Props {
  language: Language;
}

export const PracticesLibrary: React.FC<Props> = ({ language }) => {
  const t = translations[language];

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterButtons = [
    { id: 'all', label: t.practices.filterAll },
    { id: 'erosion', label: t.practices.filterErosion },
    { id: 'salinity', label: t.practices.filterSalinity },
    { id: 'waterlogging', label: t.practices.filterWaterlogging },
    { id: 'fertility', label: t.practices.filterFertility },
  ];

  const filteredPractices = useMemo(() => {
    return conservationPractices.filter((practice) => {
      const matchesCategory = activeFilter === 'all' || practice.category === activeFilter;
      const matchesSearch =
        practice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="practices" className="py-12 sm:py-18 bg-[#fdfbf7] border-b border-[#e7dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold uppercase tracking-wider mb-3 border border-[#a3cfbb]">
            <BookOpen className="w-3.5 h-3.5 text-[#2d6a4f]" />
            <span>Agronomic Advisory Library</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight mb-3">
            {t.practices.title}
          </h2>
          <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
            {t.practices.subtitle}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {filterButtons.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setActiveFilter(btn.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    activeFilter === btn.id
                      ? 'bg-[#1b4332] text-white shadow-xs'
                      : 'bg-white border border-[#dfd6c0] text-[#44403c] hover:bg-[#faf8f5]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search practice..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#dfd6c0] bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
              />
              <Search className="w-3.5 h-3.5 text-[#9ca3af] absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* 12 Filterable Practices Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPractices.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:border-[#2d6a4f] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Badge Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      p.category === 'erosion'
                        ? 'bg-blue-100 text-blue-800'
                        : p.category === 'salinity'
                        ? 'bg-amber-100 text-amber-800'
                        : p.category === 'waterlogging'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {p.categoryLabel}
                  </span>
                  <span className="text-[10px] text-[#78350f] font-semibold bg-[#faf8f5] px-2 py-0.5 rounded border border-[#ede3cf]">
                    Cost: {p.implementationCost}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1b4332] mb-2 leading-tight">
                  {p.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed mb-4">
                  {p.description}
                </p>

                {/* Benefits List */}
                <div className="mb-4 space-y-1.5 bg-[#faf8f5] p-3 rounded-xl border border-[#ede3cf]">
                  <span className="text-[11px] font-bold text-[#1b4332] block uppercase tracking-wide">
                    {t.practices.benefitsLabel}
                  </span>
                  {p.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-[#292524]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Best For" Tag */}
              <div className="pt-3 border-t border-[#f0e9dc] mt-2">
                <span className="text-[10px] font-bold text-[#78350f] block uppercase tracking-wide">
                  {t.practices.bestForLabel}
                </span>
                <p className="text-xs font-semibold text-[#1b4332] mt-0.5">
                  {p.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredPractices.length === 0 && (
          <div className="text-center py-12 text-[#78716c] text-sm">
            No practices found matching "{searchQuery}". Try another search term or select "All Practices".
          </div>
        )}
      </div>
    </section>
  );
};
