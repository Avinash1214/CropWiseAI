export interface CropFeatureInput {
  nitrogen: number;      // N in kg/ha (0 - 140)
  phosphorus: number;    // P in kg/ha (5 - 145)
  potassium: number;     // K in kg/ha (5 - 205)
  temperature: number;   // °C (8 - 45)
  humidity: number;      // % (14 - 100)
  ph: number;            // pH (3.5 - 9.9)
  rainfall: number;      // mm (20 - 300)
}

export interface ValidationIssue {
  field: keyof CropFeatureInput;
  message: string;
  severity: 'error' | 'warning';
}

export interface CropAlternative {
  crop: string;
  name: string;
  probability: number; // 0 to 1
  percentage: number;  // 0 to 100
  matchReason: string;
  suitability: 'High' | 'Moderate' | 'Marginal';
}

export interface FeatureAlignment {
  feature: keyof CropFeatureInput;
  label: string;
  userValue: number;
  optimalMean: number;
  optimalRange: [number, number];
  unit: string;
  status: 'Optimal' | 'Slightly Low' | 'Slightly High' | 'Severely Deficient' | 'Excessive';
  score: number; // 0-100
}

export interface CropRecommendationResult {
  recommendedCrop: string;
  cropName: string;
  botanicalName: string;
  category: 'Cereal' | 'Pulse' | 'Fruit' | 'Commercial' | 'Plantation';
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Perennial' | 'All Season';
  confidence: number; // 0 to 1
  confidencePercentage: number;
  confidenceInterpretation: string;
  alternatives: CropAlternative[];
  featureAlignments: FeatureAlignment[];
  modelDetails: {
    algorithm: string;
    dataset: string;
    sampleCount: number;
    classesCount: number;
    logLikelihood: number;
  };
  cropProfile: {
    durationDays: string;
    waterRequirement: string;
    soilType: string;
    economicValue: string;
    commonDiseases: string[];
    companionCrops: string[];
  };
}

export interface NutrientStatus {
  nutrient: 'Nitrogen' | 'Phosphorus' | 'Potassium';
  symbol: 'N' | 'P' | 'K';
  currentLevel: number;
  targetOptimal: number;
  range: [number, number];
  unit: string;
  gap: number; // target - current (positive means deficiency)
  status: 'Deficient' | 'Slightly Low' | 'Optimal' | 'High' | 'Excessive';
  urgency: 'Low' | 'Medium' | 'High';
  biologicalRole: string;
}

export interface FertilizerAdviceItem {
  id: string;
  nutrientTargeted: string;
  fertilizerName: string;
  fertilizerFormula: string;
  recommendedDoseKgPerHa: number;
  recommendedDoseKgPerAcre: number;
  applicationStage: 'Basal (At Sowing)' | 'Top Dressing (Vegetative)' | 'Panicle/Flowering' | 'Post-Harvest';
  method: string;
  whySuggested: string;
  precaution: string;
  isOrganicAlternative?: boolean;
}

export interface FertilizerRecommendationResult {
  crop: string;
  cropName: string;
  soilPhAnalysis: {
    currentPh: number;
    optimalRange: [number, number];
    phCategory: 'Strongly Acidic' | 'Moderately Acidic' | 'Neutral (Ideal)' | 'Moderately Alkaline' | 'Saline/Alkaline';
    amendmentNeeded: string | null;
    amendmentDose: string | null;
    explanation: string;
  };
  nutrientBreakdown: NutrientStatus[];
  chemicalFertilizers: FertilizerAdviceItem[];
  organicAlternatives: FertilizerAdviceItem[];
  integratedNutrientPlan: {
    basalApplication: string;
    firstTopDressing: string;
    secondTopDressing: string;
    foliarSpray: string | null;
  };
  sustainabilityScore: number; // 0 - 100
  isIllustrativeEstimate?: boolean;
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface PlantDiagnosisResult {
  condition: string;
  conditionLocalName: string;
  pathogenOrCause: string;
  cropName: string;
  confidencePercentage: number;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  symptoms: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventiveMeasures: string[];
  summary: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}
