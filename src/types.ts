export type Language = 'en' | 'hi' | 'mr';

export interface SoilQuestionnaire {
  soilColor: string;
  texture: string;
  waterBehavior: string;
  cropYieldTrend: string;
  visibleSigns: string[];
  cropGrown: string;
  location: string;
  landSize?: string;
  phEc?: string;
}

export interface DegradationFinding {
  type: string;
  confidence: 'High' | 'Medium' | 'Low';
  reason: string;
}

export interface ConservationAction {
  priority: number;
  action: string;
  practice_name: string;
  description: string;
  timeline: string;
}

export interface DiagnosticResult {
  fertility_score: number;
  fertility_level: 'Poor' | 'Moderate' | 'Good';
  likely_degradation_types: DegradationFinding[];
  key_observations: string[];
  recommended_conservation_actions: ConservationAction[];
  suggested_crops: string[];
  lab_test_recommended: boolean;
  summary_notes: string;
  timestamp?: string;
  is_simulated_ai?: boolean;
}

export type SampleStatus = 'Requested' | 'Picked up' | 'In lab' | 'Report ready';

export interface SampleRequest {
  id: string;
  farmerName: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  landSize: string;
  crop: string;
  pickupDate: string;
  testsWanted: string[];
  createdAt: string;
  status: SampleStatus;
  statusHistory: Array<{ status: SampleStatus; timestamp: string; note: string }>;
  reportData?: MockSoilReport;
}

export interface MockSoilReport {
  sampleId: string;
  farmerName: string;
  villageDistrict: string;
  soilTexture: string;
  testedOn: string;
  parameters: Array<{
    name: string;
    unit: string;
    value: number;
    benchmark: string;
    rating: 'Low' | 'Medium' | 'High' | 'Optimal' | 'Critical';
    indicator: string;
  }>;
  fertilizerRecommendations: Array<{
    nutrient: string;
    product: string;
    dosage: string;
    timing: string;
  }>;
  soilAmendments: Array<{
    amendment: string;
    quantity: string;
    purpose: string;
  }>;
}

export interface DegradationCardData {
  id: string;
  title: string;
  tag: string;
  cause: string;
  effect: string;
  indicator: string;
  affectedRegions: string;
  sourceNotice: string;
  iconName: string;
}

export interface ConservationPractice {
  id: string;
  name: string;
  category: 'erosion' | 'salinity' | 'waterlogging' | 'acidity' | 'fertility';
  categoryLabel: string;
  description: string;
  benefits: string[];
  bestFor: string;
  implementationCost: 'Low' | 'Medium' | 'High';
  effort: 'Simple' | 'Moderate' | 'Technical';
}

export interface PartnerLab {
  id: string;
  name: string;
  location: string;
  accreditation: string;
  turnaroundDays: string;
  testsOffered: string[];
  verifiedDemoBadge: boolean;
}
