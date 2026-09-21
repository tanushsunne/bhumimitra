import { PartnerLab } from '../types';

export const partnerLabs: PartnerLab[] = [
  {
    id: "lab_pune",
    name: "Kisan Vigyan Soil Research Lab",
    location: "Pune, Maharashtra",
    accreditation: "NABL Accredited & ICAR Soil Network Certified",
    turnaroundDays: "3–4 Business Days",
    testsOffered: ["Full N-P-K Spectrum", "Organic Carbon %", "pH & Electrical Conductivity", "Micronutrients (Zn, Fe, Cu, Mn, B)"],
    verifiedDemoBadge: true
  },
  {
    id: "lab_nagpur",
    name: "Krishi Mitra Analytical Center",
    location: "Nagpur, Maharashtra",
    accreditation: "Government Approved Soil Testing Laboratory (GLP)",
    turnaroundDays: "2–3 Business Days",
    testsOffered: ["Black Soil Heavy Clay Analysis", "Available Nitrogen & Phosphorus", "Salinity & Sodicity ESP Rating", "Heavy Metal Screen"],
    verifiedDemoBadge: true
  },
  {
    id: "lab_hyderabad",
    name: "Bharat Soil & Agro-Diagnostics Hub",
    location: "Hyderabad, Telangana",
    accreditation: "ISO/IEC 17025:2017 Certified Agri-Testing Facility",
    turnaroundDays: "3–5 Business Days",
    testsOffered: ["Red Soil Laterite Fertility Matrix", "Secondary Nutrients (Sulphur, Calcium, Magnesium)", "Soil Health Card (SHC) Issuance", "Crop Suitability Advisory"],
    verifiedDemoBadge: true
  }
];
