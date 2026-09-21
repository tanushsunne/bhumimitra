import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Info,
  CheckSquare,
  Square,
  Sprout,
  ShieldAlert,
  Calendar,
  Layers,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { Language, DiagnosticResult, SoilQuestionnaire } from '../types';
import { translations } from '../translations';
import { presetSoils, PresetSoil } from '../data/presetSoils';

interface Props {
  language: Language;
  onNavigateToSendSample: (prefillData?: { crop?: string; location?: string }) => void;
}

export const DiagnoseSection: React.FC<Props> = ({
  language,
  onNavigateToSendSample,
}) => {
  const t = translations[language];

  // Upload/Image State
  const [selectedImage, setSelectedImage] = useState<string | null>(presetSoils[0].imageDataUri);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(presetSoils[0].id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Questionnaire State
  const [soilColor, setSoilColor] = useState<string>(presetSoils[0].suggestedAnswers.soilColor);
  const [texture, setTexture] = useState<string>(presetSoils[0].suggestedAnswers.texture);
  const [waterBehavior, setWaterBehavior] = useState<string>(presetSoils[0].suggestedAnswers.waterBehavior);
  const [cropYieldTrend, setCropYieldTrend] = useState<string>(presetSoils[0].suggestedAnswers.cropYieldTrend);
  const [visibleSigns, setVisibleSigns] = useState<string[]>(presetSoils[0].suggestedAnswers.visibleSigns);
  const [cropGrown, setCropGrown] = useState<string>(presetSoils[0].suggestedAnswers.cropGrown);
  const [location, setLocation] = useState<string>(presetSoils[0].suggestedAnswers.location);
  const [phEc, setPhEc] = useState<string>(presetSoils[0].suggestedAnswers.phEc);

  // Diagnostic Execution State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  // Action checklist toggle state
  const [checkedActions, setCheckedActions] = useState<Record<number, boolean>>({});

  // Handle Preset selection
  const handleSelectPreset = (preset: PresetSoil) => {
    setSelectedPresetId(preset.id);
    setSelectedImage(preset.imageDataUri);
    setSoilColor(preset.suggestedAnswers.soilColor);
    setTexture(preset.suggestedAnswers.texture);
    setWaterBehavior(preset.suggestedAnswers.waterBehavior);
    setCropYieldTrend(preset.suggestedAnswers.cropYieldTrend);
    setVisibleSigns(preset.suggestedAnswers.visibleSigns);
    setCropGrown(preset.suggestedAnswers.cropGrown);
    setLocation(preset.suggestedAnswers.location);
    setPhEc(preset.suggestedAnswers.phEc);
    setDiagnosticResult(null);
    setError(null);
  };

  // Handle Custom File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setSelectedPresetId('custom');
      setDiagnosticResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  // Toggle multi-select signs
  const toggleVisibleSign = (signId: string) => {
    setVisibleSigns((prev) =>
      prev.includes(signId) ? prev.filter((s) => s !== signId) : [...prev, signId]
    );
  };

  // Trigger Diagnosis via Backend API
  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    const answersPayload: SoilQuestionnaire = {
      soilColor,
      texture,
      waterBehavior,
      cropYieldTrend,
      visibleSigns,
      cropGrown: cropGrown || "Indian Crops",
      location: location || "India",
      phEc: phEc || "Not measured",
    };

    try {
      const response = await fetch('/api/analyze-soil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          answers: answersPayload,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        setDiagnosticResult(result.data);
        setCheckedActions({});
      } else {
        throw new Error('Could not parse diagnostic output.');
      }
    } catch (err: any) {
      console.error('Diagnosis request error:', err);
      setError('We encountered a temporary connection issue. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // Score visual gauge helpers
  const getScoreColor = (score: number) => {
    if (score >= 70) return { stroke: '#15803d', bg: '#dcfce7', text: '#15803d', label: 'Good' };
    if (score >= 45) return { stroke: '#b45309', bg: '#fef3c7', text: '#b45309', label: 'Moderate' };
    return { stroke: '#b91c1c', bg: '#fee2e2', text: '#b91c1c', label: 'Poor / Degraded' };
  };

  const toggleActionChecked = (idx: number) => {
    setCheckedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section id="diagnose" className="py-12 sm:py-18 bg-[#faf8f5] border-b border-[#e7dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8f5e9] text-[#1b4332] text-xs font-bold uppercase tracking-wider mb-3 border border-[#c7e2d2]">
            <Sparkles className="w-3.5 h-3.5 text-[#2d6a4f]" />
            <span>AI Field Diagnostics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight mb-3">
            {t.diagnose.title}
          </h2>
          <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
            {t.diagnose.subtitle}
          </p>
        </div>

        {/* Two-Column Diagnostic Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image & Questionnaire (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: Soil Photo */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#1b4332] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1b4332] text-white text-xs flex items-center justify-center font-bold">1</span>
                  {t.diagnose.step1Title}
                </h3>
                <span className="text-xs text-[#78350f] font-medium">Field Sample</span>
              </div>
              <p className="text-xs text-[#57534e] mb-4">
                {t.diagnose.step1Hint}
              </p>

              {/* Preset Sample Soils Buttons (Instant 1-Click presentation testing!) */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#44403c] block mb-2">
                  {t.diagnose.orUsePresets}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {presetSoils.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2 rounded-xl text-left border text-xs transition-all flex flex-col justify-between h-20 ${
                        selectedPresetId === preset.id
                          ? 'border-[#2d6a4f] bg-[#e8f5e9] text-[#1b4332] font-bold shadow-xs ring-2 ring-[#2d6a4f]/20'
                          : 'border-[#e7dec8] bg-[#fdfbf7] text-[#44403c] hover:bg-[#ede6d6]'
                      }`}
                    >
                      <span className="line-clamp-2 leading-tight">{preset.name}</span>
                      <span className="text-[10px] text-[#78350f] font-semibold mt-1">Tap to test</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Preview & Custom Upload Bar */}
              <div className="relative rounded-xl overflow-hidden border border-[#dfd6c0] bg-[#1c1917] aspect-video max-h-64 sm:max-h-72 flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Field soil sample preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 text-[#a8a29e]">
                    <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No image selected</p>
                  </div>
                )}

                {/* Overlaid change / upload button */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 text-[#1b4332] text-xs font-bold shadow-md hover:bg-white transition-all backdrop-blur-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Field Photo</span>
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 2: Field Indicator Questionnaire */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs space-y-6">
              <div className="border-b border-[#f0e9dc] pb-3">
                <h3 className="text-base sm:text-lg font-bold text-[#1b4332] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1b4332] text-white text-xs flex items-center justify-center font-bold">2</span>
                  {t.diagnose.step2Title}
                </h3>
                <p className="text-xs text-[#57534e] mt-0.5">
                  {t.diagnose.step2Subtitle}
                </p>
              </div>

              {/* 1. Soil Colour */}
              <div>
                <label className="block text-xs font-bold text-[#1b4332] mb-2 uppercase tracking-wide">
                  {t.diagnose.labels.soilColor}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.diagnose.options.colors.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSoilColor(opt.label)}
                      className={`p-3 rounded-xl text-left text-xs transition-all border ${
                        soilColor === opt.label
                          ? 'border-[#2d6a4f] bg-[#e8f5e9] text-[#1b4332] font-bold shadow-xs'
                          : 'border-[#e7dec8] bg-[#fdfbf7] text-[#44403c] hover:bg-[#f4efe6]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Texture & Feel */}
              <div>
                <label className="block text-xs font-bold text-[#1b4332] mb-2 uppercase tracking-wide">
                  {t.diagnose.labels.texture}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {t.diagnose.options.textures.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTexture(opt.label)}
                      className={`p-3 rounded-xl text-left text-xs transition-all border ${
                        texture === opt.label
                          ? 'border-[#2d6a4f] bg-[#e8f5e9] text-[#1b4332] font-bold shadow-xs'
                          : 'border-[#e7dec8] bg-[#fdfbf7] text-[#44403c] hover:bg-[#f4efe6]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Water Drainage Behavior */}
              <div>
                <label className="block text-xs font-bold text-[#1b4332] mb-2 uppercase tracking-wide">
                  {t.diagnose.labels.waterBehavior}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.diagnose.options.water.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setWaterBehavior(opt.label)}
                      className={`p-3 rounded-xl text-left text-xs transition-all border ${
                        waterBehavior === opt.label
                          ? 'border-[#2d6a4f] bg-[#e8f5e9] text-[#1b4332] font-bold shadow-xs'
                          : 'border-[#e7dec8] bg-[#fdfbf7] text-[#44403c] hover:bg-[#f4efe6]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Crop Yield Trend */}
              <div>
                <label className="block text-xs font-bold text-[#1b4332] mb-2 uppercase tracking-wide">
                  {t.diagnose.labels.cropYieldTrend}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {t.diagnose.options.yields.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCropYieldTrend(opt.label)}
                      className={`p-3 rounded-xl text-left text-xs transition-all border ${
                        cropYieldTrend === opt.label
                          ? 'border-[#2d6a4f] bg-[#e8f5e9] text-[#1b4332] font-bold shadow-xs'
                          : 'border-[#e7dec8] bg-[#fdfbf7] text-[#44403c] hover:bg-[#f4efe6]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Visible Signs (Multi-select) */}
              <div>
                <label className="block text-xs font-bold text-[#1b4332] mb-2 uppercase tracking-wide">
                  {t.diagnose.labels.visibleSigns}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.diagnose.options.signs.map((opt) => {
                    const isChecked = visibleSigns.includes(opt.label);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleVisibleSign(opt.label)}
                        className={`p-3 rounded-xl text-left text-xs transition-all border flex items-center gap-2.5 ${
                          isChecked
                            ? 'border-[#2d6a4f] bg-[#e8f5e9] text-[#1b4332] font-bold shadow-xs'
                            : 'border-[#e7dec8] bg-[#fdfbf7] text-[#44403c] hover:bg-[#f4efe6]'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-[#9ca3af] shrink-0" />
                        )}
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Crop, Location & Optional pH */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#f0e9dc]">
                <div>
                  <label className="block text-xs font-bold text-[#1b4332] mb-1.5">
                    {t.diagnose.labels.cropGrown}
                  </label>
                  <input
                    type="text"
                    value={cropGrown}
                    onChange={(e) => setCropGrown(e.target.value)}
                    placeholder={t.diagnose.labels.cropPlaceholder}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b4332] mb-1.5">
                    {t.diagnose.labels.location}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.diagnose.labels.locationPlaceholder}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1b4332] mb-1.5">
                    {t.diagnose.labels.phEc}
                  </label>
                  <input
                    type="text"
                    value={phEc}
                    onChange={(e) => setPhEc(e.target.value)}
                    placeholder={t.diagnose.labels.phEcPlaceholder}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Trigger Button */}
              <div className="pt-2">
                <button
                  id="btn-analyze-soil"
                  type="button"
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-[#1b4332] text-white text-base font-bold shadow-md hover:bg-[#2d6a4f] active:scale-[0.99] disabled:opacity-75 transition-all flex items-center justify-center gap-2.5 focus:ring-4 focus:ring-[#95d5b2]"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin text-[#95d5b2]" />
                      <span>{t.diagnose.analyzingBtn}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-[#95d5b2]" />
                      <span>{t.diagnose.analyzeBtn}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: AI Report Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f0e9dc] pb-3 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d6a4f]">
                    Diagnostic Outcome
                  </span>
                  <h3 className="text-lg font-bold text-[#1b4332]">
                    {t.diagnose.reportTitle}
                  </h3>
                </div>
                {diagnosticResult && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e8f5e9] text-[#1b4332]">
                    Active Report
                  </span>
                )}
              </div>

              {/* Mandatory Disclaimer */}
              <div className="mb-4 bg-[#fffbeb] p-3 rounded-xl border border-[#fef08a] flex items-start gap-2 text-xs text-[#92400e]">
                <Info className="w-4 h-4 shrink-0 text-[#b45309] mt-0.5" />
                <span className="leading-snug font-medium">
                  {t.diagnose.disclaimer}
                </span>
              </div>

              {/* Report Body */}
              {diagnosticResult ? (
                <div className="space-y-5 animate-in fade-in duration-300">
                  {/* Gauge & Level */}
                  <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#ede3cf] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#78350f] uppercase tracking-wide block mb-1">
                        {t.diagnose.fertilityScore}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-[#1b4332]">
                          {diagnosticResult.fertility_score}
                        </span>
                        <span className="text-xs text-[#57534e]">/ 100</span>
                      </div>
                      <span
                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          diagnosticResult.fertility_level === 'Good'
                            ? 'bg-green-100 text-green-800'
                            : diagnosticResult.fertility_level === 'Moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        Status: {diagnosticResult.fertility_level}
                      </span>
                    </div>

                    {/* Circular SVG Gauge */}
                    <div className="relative w-20 h-20 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#e5e7eb]"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          strokeDasharray={`${diagnosticResult.fertility_score}, 100`}
                          stroke={getScoreColor(diagnosticResult.fertility_score).stroke}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#1c1917]">
                        {diagnosticResult.fertility_score}%
                      </div>
                    </div>
                  </div>

                  {/* Likely Degradation Types Chips */}
                  <div>
                    <span className="text-xs font-bold text-[#1b4332] uppercase tracking-wide block mb-2">
                      {t.diagnose.degradationTypes}
                    </span>
                    <div className="space-y-2">
                      {diagnosticResult.likely_degradation_types.map((deg, i) => (
                        <div
                          key={i}
                          className="p-3 bg-red-50/70 border border-red-200 rounded-xl text-xs"
                        >
                          <div className="flex items-center justify-between font-bold text-[#991b1b] mb-1">
                            <span>{deg.type}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 uppercase tracking-tight">
                              {deg.confidence} Risk
                            </span>
                          </div>
                          <p className="text-[#7f1d1d] text-[11px] leading-relaxed">
                            {deg.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prioritized Recommended Actions Checklist */}
                  <div>
                    <span className="text-xs font-bold text-[#1b4332] uppercase tracking-wide block mb-2">
                      {t.diagnose.recommendedActions}
                    </span>
                    <div className="space-y-2">
                      {diagnosticResult.recommended_conservation_actions.map((act, i) => {
                        const isDone = !!checkedActions[i];
                        return (
                          <div
                            key={i}
                            onClick={() => toggleActionChecked(i)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                              isDone
                                ? 'bg-green-50/70 border-green-200 text-green-900'
                                : 'bg-[#faf8f5] border-[#ede3cf] text-[#292524] hover:bg-[#f5efe6]'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
                              ) : (
                                <Square className="w-4 h-4 text-[#a8a29e]" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between font-bold">
                                <span>{act.action}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#dfd6c0] text-[#78350f]">
                                  Priority {act.priority}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#57534e] mt-1 leading-snug">
                                {act.description}
                              </p>
                              <span className="inline-block text-[10px] text-[#2d6a4f] font-semibold mt-1">
                                🗓 Timeline: {act.timeline}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Suggested Resilient Crops */}
                  {diagnosticResult.suggested_crops?.length > 0 && (
                    <div className="bg-[#f0fdf4] p-3 rounded-xl border border-[#bbf7d0]">
                      <span className="text-xs font-bold text-[#166534] block mb-1.5">
                        🌱 {t.diagnose.suggestedCrops}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {diagnosticResult.suggested_crops.map((crop, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-white border border-[#86efac] text-[#14532d] text-xs font-semibold rounded-lg"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary Notes */}
                  {diagnosticResult.summary_notes && (
                    <p className="text-xs text-[#57534e] italic bg-[#faf8f5] p-3 rounded-xl border border-[#ede3cf]">
                      "{diagnosticResult.summary_notes}"
                    </p>
                  )}

                  {/* CTA to Send a Sample */}
                  <div className="pt-2">
                    <button
                      id="btn-report-send-sample"
                      type="button"
                      onClick={() =>
                        onNavigateToSendSample({
                          crop: cropGrown,
                          location: location,
                        })
                      }
                      className="w-full py-3.5 px-4 rounded-xl bg-[#78350f] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#92400e] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      <span>{t.diagnose.sendSampleCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty state waiting for diagnosis */
                <div className="text-center py-12 px-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#f4efe6] flex items-center justify-center mx-auto mb-3 text-[#78350f]">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1b4332] mb-1">
                    No Assessment Run Yet
                  </h4>
                  <p className="text-xs text-[#78716c] max-w-xs mx-auto leading-relaxed mb-4">
                    Review your soil photo and responses on the left, then click <strong>"Analyze Soil Health"</strong> to generate your instant report.
                  </p>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d6a4f] hover:underline"
                  >
                    <span>Run quick assessment now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
