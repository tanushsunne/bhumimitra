import React, { useState, useEffect } from 'react';
import {
  PackageCheck,
  Calendar,
  Phone,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  ArrowRight,
  FlaskConical,
  Sparkles,
  Building2,
  Check,
  Layers
} from 'lucide-react';
import { Language, SampleRequest, MockSoilReport } from '../types';
import { translations } from '../translations';
import { partnerLabs } from '../data/labsData';

interface Props {
  language: Language;
  prefillData?: { crop?: string; location?: string };
  onNavigateToTrack: (sampleId: string) => void;
}

export const SendSampleSection: React.FC<Props> = ({
  language,
  prefillData,
  onNavigateToTrack,
}) => {
  const t = translations[language];

  // Form State
  const [farmerName, setFarmerName] = useState('Ramesh Patil');
  const [phone, setPhone] = useState('9823014567');
  const [village, setVillage] = useState('Sangvi');
  const [district, setDistrict] = useState('Jalna');
  const [state, setState] = useState('Maharashtra');
  const [landSize, setLandSize] = useState('4.5');
  const [crop, setCrop] = useState('Cotton & Soybean');
  const [pickupDate, setPickupDate] = useState('2026-09-25');
  const [testsWanted, setTestsWanted] = useState<string[]>([
    'pH & Electrical Conductivity',
    'Organic Carbon (OC %)',
    'Primary Nutrients (N-P-K)',
    'Micronutrients (Zn, Fe, Cu, Mn, B)',
  ]);

  // Submission State
  const [submittedRequest, setSubmittedRequest] = useState<SampleRequest | null>(null);
  const [copied, setCopied] = useState(false);

  // Apply prefilled data if passed from diagnosis
  useEffect(() => {
    if (prefillData?.crop) setCrop(prefillData.crop);
    if (prefillData?.location) {
      const parts = prefillData.location.split(',');
      if (parts.length > 1) {
        setState(parts[0].trim());
        setDistrict(parts[1].trim());
      } else {
        setDistrict(prefillData.location);
      }
    }
  }, [prefillData]);

  const availableTests = [
    { id: 'ph_ec', label: 'Soil Reaction (pH) & Salinity (EC)' },
    { id: 'oc', label: 'Organic Carbon (OC %) & Soil Biology' },
    { id: 'npk', label: 'Available Primary Nutrients (N - P - K)' },
    { id: 'salinity', label: 'Sodicity (Exchangeable Sodium ESP)' },
    { id: 'micronutrients', label: 'Micronutrients Package (Zinc, Iron, Boron, Copper)' },
  ];

  const toggleTest = (testLabel: string) => {
    setTestsWanted((prev) =>
      prev.includes(testLabel) ? prev.filter((item) => item !== testLabel) : [...prev, testLabel]
    );
  };

  const generateMockReport = (sampleId: string, name: string, locationStr: string): MockSoilReport => {
    return {
      sampleId,
      farmerName: name,
      villageDistrict: locationStr,
      soilTexture: 'Clay Loam (Medium Black)',
      testedOn: '2026-09-24',
      parameters: [
        { name: 'Soil pH', unit: 'pH scale', value: 8.2, benchmark: '6.5 – 7.5', rating: 'High', indicator: 'Moderately Alkaline' },
        { name: 'Electrical Conductivity (EC)', unit: 'dS/m', value: 1.45, benchmark: '< 1.0', rating: 'Medium', indicator: 'Slight Salinity' },
        { name: 'Organic Carbon (OC)', unit: '%', value: 0.42, benchmark: '> 0.75%', rating: 'Low', indicator: 'Severely Depleted' },
        { name: 'Available Nitrogen (N)', unit: 'kg/ha', value: 185, benchmark: '280 – 560', rating: 'Low', indicator: 'Critical Deficit' },
        { name: 'Available Phosphorus (P)', unit: 'kg/ha', value: 14.2, benchmark: '23 – 56', rating: 'Medium', indicator: 'Moderate' },
        { name: 'Available Potassium (K)', unit: 'kg/ha', value: 340, benchmark: '145 – 340', rating: 'Optimal', indicator: 'Sufficient' },
        { name: 'Available Zinc (Zn)', unit: 'ppm', value: 0.48, benchmark: '> 0.60', rating: 'Low', indicator: 'Zinc Deficient' },
        { name: 'Available Iron (Fe)', unit: 'ppm', value: 4.1, benchmark: '> 4.5', rating: 'Medium', indicator: 'Borderline' },
      ],
      fertilizerRecommendations: [
        { nutrient: 'Nitrogen (N)', product: 'Urea', dosage: '110 kg/acre (split into 3 equal top-dressings)', timing: 'At sowing, 30 DAS, and 60 DAS' },
        { nutrient: 'Phosphorus (P)', product: 'Single Super Phosphate (SSP)', dosage: '75 kg/acre (basal dose)', timing: 'At time of field preparation' },
        { nutrient: 'Potassium (K)', product: 'Muriate of Potash (MOP)', dosage: '25 kg/acre (basal dose)', timing: 'At sowing' },
        { nutrient: 'Zinc Micronutrient', product: 'Zinc Sulphate (ZnSO4 21%)', dosage: '10 kg/acre soil application', timing: 'Once every 2 years' },
      ],
      soilAmendments: [
        { amendment: 'Agricultural Gypsum', quantity: '1.5 tonnes / acre', purpose: 'To displace sodium ions and buffer alkaline pH downward toward neutral.' },
        { amendment: 'Enriched Vermicompost', quantity: '2.5 tonnes / acre', purpose: 'To raise soil organic carbon from 0.42% to sustainable >0.75% threshold.' },
        { amendment: 'Green Manuring (Dhaincha)', quantity: 'Incorporate 45-day biomass', purpose: 'To add biological nitrogen and improve soil crumb aeration.' },
      ]
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate Sample ID: BM-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `BM-2026-${randomSuffix}`;

    const nowStr = new Date().toISOString();
    const newRequest: SampleRequest = {
      id: newId,
      farmerName,
      phone,
      village,
      district,
      state,
      landSize,
      crop,
      pickupDate,
      testsWanted,
      createdAt: nowStr,
      status: 'Requested',
      statusHistory: [
        {
          status: 'Requested',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: 'Sample collection request registered on BhumiMitra portal.'
        }
      ],
      reportData: generateMockReport(newId, farmerName, `${village}, ${district}, ${state}`)
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('bhumimitra_samples');
      const list: SampleRequest[] = existing ? JSON.parse(existing) : [];
      list.unshift(newRequest);
      localStorage.setItem('bhumimitra_samples', JSON.stringify(list));
    } catch (err) {
      console.error('Failed saving sample to localStorage:', err);
    }

    setSubmittedRequest(newRequest);
  };

  const handleCopyId = () => {
    if (!submittedRequest) return;
    navigator.clipboard.writeText(submittedRequest.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="send-sample" className="py-12 sm:py-18 bg-[#fdfbf7] border-b border-[#e7dec8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fef3c7] text-[#92400e] text-xs font-bold uppercase tracking-wider mb-3 border border-[#fde68a]">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Simulated Doorstep Service</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1b4332] tracking-tight mb-3">
            {t.sendSample.title}
          </h2>
          <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
            {t.sendSample.subtitle}
          </p>
        </div>

        {/* 4-Step Process Visual Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {t.sendSample.steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-5 border border-[#e7dec8] shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#1b4332] text-white flex items-center justify-center font-bold text-sm mb-3 shadow-xs">
                  {step.num}
                </div>
                <h4 className="text-base font-bold text-[#1b4332] mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-[#57534e] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form & Partner Labs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e7dec8] shadow-xs">
              <div className="flex items-center justify-between border-b border-[#f0e9dc] pb-4 mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1b4332]">
                    {t.sendSample.formTitle}
                  </h3>
                  <span className="text-xs text-[#78350f]">
                    Doorstep pickup partner will bring sterilized soil sample kit
                  </span>
                </div>
              </div>

              {submittedRequest ? (
                /* Post-Submission Success Card */
                <div className="p-6 bg-[#f0fdf4] border border-[#bbf7d0] rounded-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-[#dcfce7] flex items-center justify-center mx-auto text-[#15803d]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#14532d]">
                      {t.sendSample.bookingSuccess}
                    </h4>
                    <p className="text-xs text-[#166534] mt-1">
                      Our simulated pickup executive will visit {submittedRequest.village}, {submittedRequest.district} on {submittedRequest.pickupDate}.
                    </p>
                  </div>

                  {/* Sample ID Box */}
                  <div className="bg-white p-4 rounded-xl border border-[#86efac] max-w-sm mx-auto shadow-xs">
                    <span className="text-xs text-[#57534e] block mb-1 font-medium">
                      {t.sendSample.yourSampleId}
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-black text-[#1b4332] tracking-wider">
                        {submittedRequest.id}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyId}
                        className="p-1.5 rounded-lg hover:bg-[#f4efe6] text-[#78350f]"
                        title="Copy tracking ID"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigateToTrack(submittedRequest.id)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1b4332] text-white text-sm font-bold shadow hover:bg-[#2d6a4f] transition-all"
                    >
                      <span>{t.sendSample.trackNowBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedRequest(null)}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#dfd6c0] bg-white text-[#44403c] text-xs font-semibold hover:bg-[#faf8f5]"
                    >
                      Book Another Sample
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Booking Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.village} *
                      </label>
                      <input
                        type="text"
                        required
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.district} *
                      </label>
                      <input
                        type="text"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.state} *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.landSize}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={landSize}
                        onChange={(e) => setLandSize(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.crop}
                      </label>
                      <input
                        type="text"
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b4332] mb-1">
                        {t.sendSample.pickupDate}
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#dfd6c0] bg-[#faf8f5] focus:bg-white focus:ring-2 focus:ring-[#2d6a4f] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tests Wanted Checklist */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[#1b4332] mb-2 uppercase tracking-wide">
                      {t.sendSample.testsWanted}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableTests.map((item) => {
                        const isChecked = testsWanted.includes(item.label);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleTest(item.label)}
                            className={`p-2.5 rounded-xl text-left text-xs transition-all border flex items-center gap-2 ${
                              isChecked
                                ? 'border-[#2d6a4f] bg-[#e8f5e9] text-[#1b4332] font-semibold'
                                : 'border-[#e7dec8] bg-[#fdfbf7] text-[#44403c] hover:bg-[#f4efe6]'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                isChecked
                                  ? 'bg-[#1b4332] border-[#1b4332] text-white'
                                  : 'border-[#a8a29e] bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </span>
                            <span className="leading-tight">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      id="btn-submit-sample"
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-[#1b4332] text-white text-base font-bold shadow-md hover:bg-[#2d6a4f] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                    >
                      <PackageCheck className="w-5 h-5 text-[#95d5b2]" />
                      <span>{t.sendSample.submitBtn}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Partner Labs Section (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs">
              <div className="border-b border-[#f0e9dc] pb-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309]">
                  Accredited Testing Network
                </span>
                <h3 className="text-lg font-bold text-[#1b4332]">
                  {t.sendSample.partnerLabsTitle}
                </h3>
                <p className="text-xs text-[#78350f] mt-0.5 font-medium">
                  {t.sendSample.partnerLabsNote}
                </p>
              </div>

              <div className="space-y-3">
                {partnerLabs.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-4 rounded-xl border border-[#ede3cf] bg-[#faf8f5] hover:border-[#2d6a4f] transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2d6a4f] shrink-0" />
                        <h4 className="text-sm font-bold text-[#1b4332] leading-tight">
                          {lab.name}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#92400e] shrink-0">
                        Demo Placeholder
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#57534e]">
                      <MapPin className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>{lab.location}</span>
                      <span className="mx-1">•</span>
                      <span>Turnaround: {lab.turnaroundDays}</span>
                    </div>

                    <div className="text-[11px] text-[#166534] bg-[#f0fdf4] px-2.5 py-1 rounded-lg border border-[#bbf7d0]">
                      ✓ {lab.accreditation}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-[#fcf9f2] rounded-xl border border-[#ede3cf] text-[11px] text-[#57534e] leading-relaxed">
                ℹ️ In real-world deployment, BhumiMitra links directly to district-level Krishi Vigyan Kendras (KVK) and State Agriculture Department testing labs under the national Soil Health Card scheme.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
