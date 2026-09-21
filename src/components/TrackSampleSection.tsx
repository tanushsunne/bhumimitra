import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  FlaskConical,
  FileText,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Language, SampleRequest, SampleStatus, MockSoilReport } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  initialSampleId?: string;
}

const DEFAULT_DEMO_SAMPLE_ID = 'BM-2026-7842';

export const TrackSampleSection: React.FC<Props> = ({
  language,
  initialSampleId,
}) => {
  const t = translations[language];

  const [inputSampleId, setInputSampleId] = useState(initialSampleId || DEFAULT_DEMO_SAMPLE_ID);
  const [activeRequest, setActiveRequest] = useState<SampleRequest | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [recentList, setRecentList] = useState<SampleRequest[]>([]);

  // Default demonstration mock sample
  const demoSample: SampleRequest = {
    id: DEFAULT_DEMO_SAMPLE_ID,
    farmerName: 'Balasaheb Shinde',
    phone: '9850123490',
    village: 'Pimpalgaon',
    district: 'Nashik',
    state: 'Maharashtra',
    landSize: '3.2 Acres',
    crop: 'Grapes & Onion',
    pickupDate: '2026-09-21',
    testsWanted: ['pH & EC', 'Organic Carbon', 'N-P-K', 'Micronutrients'],
    createdAt: '2026-09-20T10:00:00Z',
    status: 'Report ready',
    statusHistory: [
      { status: 'Requested', timestamp: 'Yesterday, 10:00 AM', note: 'Sample requested on portal.' },
      { status: 'Picked up', timestamp: 'Yesterday, 03:30 PM', note: 'Collected by Krishi Mitra agent.' },
      { status: 'In lab', timestamp: 'Today, 09:15 AM', note: 'Chemical spectrometry analysis completed.' },
      { status: 'Report ready', timestamp: 'Today, 11:45 AM', note: 'Certified Soil Health Card released.' },
    ],
    reportData: {
      sampleId: DEFAULT_DEMO_SAMPLE_ID,
      farmerName: 'Balasaheb Shinde',
      villageDistrict: 'Pimpalgaon, Nashik, Maharashtra',
      soilTexture: 'Medium Black Clay Loam',
      testedOn: '21 Sep 2026',
      parameters: [
        { name: 'Soil pH (1:2.5)', unit: 'pH', value: 8.35, benchmark: '6.5 – 7.5', rating: 'High', indicator: 'Alkaline' },
        { name: 'Electrical Conductivity', unit: 'dS/m', value: 1.62, benchmark: '< 1.0', rating: 'Medium', indicator: 'Mild Saline' },
        { name: 'Organic Carbon (OC)', unit: '%', value: 0.38, benchmark: '> 0.75%', rating: 'Low', indicator: 'Severe Deficit' },
        { name: 'Available Nitrogen (N)', unit: 'kg/ha', value: 168, benchmark: '280 – 560', rating: 'Low', indicator: 'Low Nitrogen' },
        { name: 'Available Phosphorus (P)', unit: 'kg/ha', value: 16.5, benchmark: '23 – 56', rating: 'Medium', indicator: 'Medium' },
        { name: 'Available Potassium (K)', unit: 'kg/ha', value: 395, benchmark: '145 – 340', rating: 'High', indicator: 'High/Sufficient' },
        { name: 'Available Zinc (Zn)', unit: 'ppm', value: 0.44, benchmark: '> 0.60', rating: 'Low', indicator: 'Deficient' },
        { name: 'Available Iron (Fe)', unit: 'ppm', value: 3.9, benchmark: '> 4.5', rating: 'Low', indicator: 'Chlorosis Risk' },
      ],
      fertilizerRecommendations: [
        { nutrient: 'Nitrogen (N)', product: 'Urea', dosage: '120 kg/acre (split application)', timing: '3 doses: Vegetative, Flowering, Fruit set' },
        { nutrient: 'Phosphorus (P)', product: 'Single Super Phosphate (SSP)', dosage: '80 kg/acre', timing: 'Basal placement at pruning' },
        { nutrient: 'Potassium (K)', product: 'Potassium Sulphate (SOP 0-0-50)', dosage: '30 kg/acre', timing: 'Foliar or fertigation during berry growth' },
        { nutrient: 'Zinc Micronutrient', product: 'Chelated Zinc (Zn-EDTA 12%)', dosage: '1.5 g/L foliar spray', timing: 'During active flush' },
      ],
      soilAmendments: [
        { amendment: 'Agricultural Gypsum', quantity: '2.0 tonnes / acre', purpose: 'To replace excess sodium on clay exchange sites and lower pH below 8.0.' },
        { amendment: 'Well-Rotted Cow Dung / Compost', quantity: '4.0 tonnes / acre', purpose: 'To build depleted biological organic carbon above 0.75%.' },
        { amendment: 'Soil Microbial Inoculant (PSB + Azotobacter)', quantity: '2 kg / acre mixed with compost', purpose: 'To solubilize fixed phosphorus in alkaline soil.' }
      ]
    }
  };

  // Load from localStorage & initialize
  const loadSample = (targetId: string) => {
    setNotFound(false);
    const cleanId = targetId.trim().toUpperCase();

    if (cleanId === DEFAULT_DEMO_SAMPLE_ID) {
      setActiveRequest(demoSample);
      return;
    }

    try {
      const stored = localStorage.getItem('bhumimitra_samples');
      const list: SampleRequest[] = stored ? JSON.parse(stored) : [];
      setRecentList(list);

      const found = list.find((s) => s.id.toUpperCase() === cleanId);
      if (found) {
        setActiveRequest(found);
      } else {
        // Fall back to demo or mark not found
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  };

  useEffect(() => {
    if (initialSampleId) {
      setInputSampleId(initialSampleId);
      loadSample(initialSampleId);
    } else {
      loadSample(DEFAULT_DEMO_SAMPLE_ID);
    }
  }, [initialSampleId]);

  // Simulate Next Stage for Presentation
  const handleSimulateNextStage = () => {
    if (!activeRequest) return;

    const stages: SampleStatus[] = ['Requested', 'Picked up', 'In lab', 'Report ready'];
    const currentIdx = stages.indexOf(activeRequest.status);
    const nextIdx = (currentIdx + 1) % stages.length;
    const nextStatus = stages[nextIdx];

    const updated: SampleRequest = {
      ...activeRequest,
      status: nextStatus,
      statusHistory: [
        ...activeRequest.statusHistory,
        {
          status: nextStatus,
          timestamp: 'Just now',
          note: `Simulated stage transition to ${nextStatus}.`
        }
      ]
    };

    setActiveRequest(updated);

    // Also update in localStorage if present
    try {
      const stored = localStorage.getItem('bhumimitra_samples');
      if (stored) {
        const list: SampleRequest[] = JSON.parse(stored);
        const idx = list.findIndex((s) => s.id === updated.id);
        if (idx !== -1) {
          list[idx] = updated;
          localStorage.setItem('bhumimitra_samples', JSON.stringify(list));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const stages: { status: SampleStatus; label: string; icon: any }[] = [
    { status: 'Requested', label: t.trackSample.statusRequested, icon: Clock },
    { status: 'Picked up', label: t.trackSample.statusPicked, icon: CheckCircle2 },
    { status: 'In lab', label: t.trackSample.statusInLab, icon: FlaskConical },
    { status: 'Report ready', label: t.trackSample.statusReady, icon: FileText },
  ];

  const currentStageIndex = activeRequest ? stages.findIndex((s) => s.status === activeRequest.status) : 0;

  return (
    <section id="track-sample" className="py-12 sm:py-18 bg-[#faf8f5] border-b border-[#e7dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ede9fe] text-[#5b21b6] text-xs font-bold uppercase tracking-wider mb-3 border border-[#ddd6fe]">
            <Search className="w-3.5 h-3.5" />
            <span>Sample Lifecycle Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight mb-3">
            {t.trackSample.title}
          </h2>
          <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
            {t.trackSample.subtitle}
          </p>
        </div>

        {/* Search & Lookup Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputSampleId}
                onChange={(e) => setInputSampleId(e.target.value)}
                placeholder={t.trackSample.placeholder}
                className="w-full pl-4 pr-10 py-3.5 text-sm sm:text-base rounded-xl border border-[#dfd6c0] bg-white font-mono uppercase tracking-wider focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none shadow-xs"
              />
            </div>
            <button
              type="button"
              onClick={() => loadSample(inputSampleId)}
              className="px-6 py-3.5 rounded-xl bg-[#1b4332] text-white text-sm font-bold hover:bg-[#2d6a4f] transition-all flex items-center gap-2 shrink-0 shadow-xs"
            >
              <Search className="w-4 h-4" />
              <span>{t.trackSample.trackBtn}</span>
            </button>
          </div>

          {/* Quick Demo & Recent Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#78350f] font-semibold">{t.trackSample.quickDemo}</span>
            <button
              type="button"
              onClick={() => {
                setInputSampleId(DEFAULT_DEMO_SAMPLE_ID);
                loadSample(DEFAULT_DEMO_SAMPLE_ID);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#fef3c7] text-[#92400e] border border-[#fde68a] font-mono font-bold hover:bg-[#fde68a] transition-all"
            >
              {DEFAULT_DEMO_SAMPLE_ID} (Ready Report)
            </button>
          </div>

          {notFound && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Sample ID not found in local demo records. Try clicking the demo sample ID above.</span>
            </div>
          )}
        </div>

        {activeRequest && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Timeline Progress Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e7dec8] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0e9dc] pb-4 mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-[#1b4332] font-mono">
                      {activeRequest.id}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e8f5e9] text-[#1b4332]">
                      {activeRequest.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#57534e] mt-1">
                    Farmer: <strong>{activeRequest.farmerName}</strong> • {activeRequest.village}, {activeRequest.district} • Crop: {activeRequest.crop}
                  </p>
                </div>

                {/* Presentation Tool: Advance Status Simulator */}
                <button
                  type="button"
                  onClick={handleSimulateNextStage}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#78350f] text-white text-xs font-bold hover:bg-[#92400e] shadow-xs transition-all active:scale-[0.98] shrink-0"
                  title="Simulate status progression for live demo"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.trackSample.simulateNextBtn}</span>
                </button>
              </div>

              {/* Visual 4-Stage Timeline Stepper */}
              <div className="relative">
                {/* Horizontal progress track */}
                <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-[#ede6d6] -z-0">
                  <div
                    className="h-full bg-[#2d6a4f] transition-all duration-500"
                    style={{
                      width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-2 relative z-10">
                  {stages.map((stg, idx) => {
                    const isCompleted = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    const IconComponent = stg.icon;

                    return (
                      <div key={stg.status} className="flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shrink-0 ${
                            isCompleted
                              ? 'bg-[#1b4332] text-white shadow-sm ring-4 ring-[#d8f3dc]'
                              : 'bg-[#ede6d6] text-[#78716c]'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span
                            className={`text-xs sm:text-sm font-bold block ${
                              isCurrent ? 'text-[#1b4332]' : isCompleted ? 'text-[#374151]' : 'text-[#9ca3af]'
                            }`}
                          >
                            {stg.label}
                          </span>
                          <span className="text-[10px] text-[#78716c] block">
                            {idx === 0
                              ? 'Booked'
                              : idx === 1
                              ? 'Field Pickup'
                              : idx === 2
                              ? 'Wet Chemistry'
                              : 'Card Issued'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* When Status is "Report ready" -> Render Full Soil Health Card */}
            {activeRequest.status === 'Report ready' && activeRequest.reportData && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#a3cfbb] shadow-sm space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                {/* Official Card Top Header */}
                <div className="border-b border-[#e7dec8] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] text-xs font-bold border border-[#fde68a] mb-2">
                      {t.trackSample.demoReportTag}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#1b4332] tracking-tight">
                      Soil Health Card (SHC) Diagnostic Report
                    </h3>
                    <p className="text-xs text-[#57534e] mt-1">
                      Tested at: <strong>Kisan Vigyan Soil Research Lab (Demo)</strong> • Sample ID: <span className="font-mono font-bold text-[#1b4332]">{activeRequest.reportData.sampleId}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#dfd6c0] bg-[#faf8f5] text-xs font-bold text-[#1b4332] hover:bg-[#ede6d6] transition-colors self-start sm:self-center"
                  >
                    <Printer className="w-4 h-4 text-[#78350f]" />
                    <span>Print Report Card</span>
                  </button>
                </div>

                {/* Farmer & Field Metadata Block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#faf8f5] p-4 rounded-xl border border-[#ede3cf] text-xs">
                  <div>
                    <span className="text-[10px] text-[#78350f] uppercase font-bold block">Farmer Name</span>
                    <span className="font-bold text-[#1c1917]">{activeRequest.reportData.farmerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#78350f] uppercase font-bold block">Location</span>
                    <span className="font-bold text-[#1c1917]">{activeRequest.reportData.villageDistrict}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#78350f] uppercase font-bold block">Soil Class</span>
                    <span className="font-bold text-[#1c1917]">{activeRequest.reportData.soilTexture}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#78350f] uppercase font-bold block">Date of Test</span>
                    <span className="font-bold text-[#1c1917]">{activeRequest.reportData.testedOn}</span>
                  </div>
                </div>

                {/* Parameters Table */}
                <div>
                  <h4 className="text-sm font-bold text-[#1b4332] uppercase tracking-wide mb-3">
                    Soil Chemical & Physical Parameters
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-[#e7dec8]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f4efe6] text-[#1b4332] font-bold uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-3">Parameter Tested</th>
                          <th className="py-2.5 px-3">Measured Value</th>
                          <th className="py-2.5 px-3">Ideal Benchmark</th>
                          <th className="py-2.5 px-3">Rating</th>
                          <th className="py-2.5 px-3">Agronomic Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0e9dc]">
                        {activeRequest.reportData.parameters.map((param, i) => (
                          <tr key={i} className="hover:bg-[#faf8f5]">
                            <td className="py-2.5 px-3 font-semibold text-[#1c1917]">{param.name}</td>
                            <td className="py-2.5 px-3 font-mono font-bold text-[#1b4332]">
                              {param.value} {param.unit}
                            </td>
                            <td className="py-2.5 px-3 text-[#57534e]">{param.benchmark}</td>
                            <td className="py-2.5 px-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  param.rating === 'Optimal'
                                    ? 'bg-green-100 text-green-800'
                                    : param.rating === 'Medium'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {param.rating}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-medium text-[#44403c]">{param.indicator}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Fertilizer Dosage Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-[#faf8f5] p-5 rounded-xl border border-[#ede3cf]">
                    <h4 className="text-sm font-bold text-[#1b4332] uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
                      <span>Recommended Chemical Dosages</span>
                    </h4>
                    <div className="space-y-2.5">
                      {activeRequest.reportData.fertilizerRecommendations.map((rec, i) => (
                        <div key={i} className="p-3 bg-white rounded-lg border border-[#e7dec8] text-xs">
                          <div className="flex items-center justify-between font-bold text-[#1b4332]">
                            <span>{rec.product} ({rec.nutrient})</span>
                            <span className="text-[11px] text-[#78350f] font-mono">{rec.dosage}</span>
                          </div>
                          <p className="text-[11px] text-[#57534e] mt-1">
                            Application Timing: {rec.timing}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Soil Amendments (Gypsum, Organic, etc.) */}
                  <div className="bg-[#f0fdf4] p-5 rounded-xl border border-[#bbf7d0]">
                    <h4 className="text-sm font-bold text-[#14532d] uppercase tracking-wide mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                      <span>Soil Amendments & Land Reclamation</span>
                    </h4>
                    <div className="space-y-2.5">
                      {activeRequest.reportData.soilAmendments.map((amend, i) => (
                        <div key={i} className="p-3 bg-white rounded-lg border border-[#86efac] text-xs">
                          <div className="flex items-center justify-between font-bold text-[#14532d]">
                            <span>{amend.amendment}</span>
                            <span className="text-[11px] text-[#15803d] font-bold">{amend.quantity}</span>
                          </div>
                          <p className="text-[11px] text-[#374151] mt-1">
                            {amend.purpose}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-[#78350f] bg-[#fffbeb] p-3 rounded-xl border border-[#fde68a] text-center">
                  ⚠️ This Soil Health Card is a simulated demonstration for academic presentations. Values are calibrated according to standard Indian Soil Testing protocols (ICAR / DAC&FW).
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
