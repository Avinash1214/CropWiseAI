import {
  CropFeatureInput,
  FertilizerRecommendationResult,
  NutrientStatus,
  FertilizerAdviceItem
} from '../../src/types/index';
import { CROP_DATASET_PROFILES } from './cropModel';

interface CropAgronomicTarget {
  name: string;
  optimalN: [number, number]; // [min, max] kg/ha
  optimalP: [number, number];
  optimalK: [number, number];
  optimalPh: [number, number];
  nitroRole: string;
  phosRole: string;
  potasRole: string;
}

/**
 * Reference agronomic nutrient targets for target yield benchmarks based on standard
 * agricultural extension guidelines and educational crop profiles.
 *
 * NOTE ON UNITS & METHODOLOGY:
 * - Soil inputs and crop target values are expressed in nominal kg/ha equivalents.
 * - Commercial fertilizers:
 *     * Neem-Coated Urea: 46% N (elemental nitrogen).
 *     * Single Super Phosphate (SSP): 16% P2O5 equivalent (commercial grade).
 *     * Muriate of Potash (MOP): 60% K2O equivalent (commercial grade).
 * - Elemental vs Oxide: In commercial practice, phosphorus and potassium recommendations
 *   are traditionally expressed in oxide equivalents (P2O5 and K2O). The engine computes
 *   the stoichiometric deficit directly against these product grades. It does not assume
 *   synthetic soil recovery factors (which vary from 15-30% for P and 50-70% for K).
 * - Consequently, all dosages are classified as ILLUSTRATIVE ESTIMATES. Real field applications
 *   must be calibrated by local certified soil-testing laboratories and regional extension services.
 */
export const CROP_AGRONOMIC_TARGETS: Record<string, CropAgronomicTarget> = {
  rice: {
    name: 'Rice (Paddy)',
    optimalN: [80, 120],
    optimalP: [40, 60],
    optimalK: [40, 60],
    optimalPh: [5.5, 7.0],
    nitroRole: 'Essential for vegetative tillering, vigorous foliage growth, and panicle initiation.',
    phosRole: 'Stimulates robust seedling root establishment, early tillering, and uniform grain filling.',
    potasRole: 'Strengthens stem against lodging in flooded paddies and confers blast disease resistance.'
  },
  maize: {
    name: 'Maize (Corn)',
    optimalN: [80, 120],
    optimalP: [40, 60],
    optimalK: [25, 45],
    optimalPh: [6.0, 7.2],
    nitroRole: 'Drives rapid vegetative biomass, dark green leaf canopy, and cob development.',
    phosRole: 'Vital for deep anchorage roots and early tassel/silk development.',
    potasRole: 'Ensures strong stalk integrity, drought tolerance, and full cob grain setting.'
  },
  chickpea: {
    name: 'Chickpea (Gram)',
    optimalN: [20, 35], // Legume fixes its own N
    optimalP: [50, 70],
    optimalK: [60, 80],
    optimalPh: [6.5, 8.0],
    nitroRole: 'Requires only a small starter dose; excess nitrogen inhibits natural Rhizobium nodulation.',
    phosRole: 'Crucial for root nodule bacteria proliferation and pod seed formation.',
    potasRole: 'Enhances winter frost tolerance and cellular moisture retention during rabi season.'
  },
  kidneybeans: {
    name: 'Kidney Beans (Rajma)',
    optimalN: [30, 45],
    optimalP: [60, 80],
    optimalK: [20, 35],
    optimalPh: [5.5, 6.5],
    nitroRole: 'Unlike most pulses, kidney beans fix less symbiotic N, requiring moderate soil nitrogen.',
    phosRole: 'Promotes rapid flowering flush and plump bean pod elongation.',
    potasRole: 'Improves membrane stability and protects against fungal bean rust.'
  },
  pigeonpeas: {
    name: 'Pigeonpeas (Arhar / Toor)',
    optimalN: [20, 30],
    optimalP: [50, 70],
    optimalK: [20, 35],
    optimalPh: [6.0, 7.5],
    nitroRole: 'Starter dose needed during early slow-growth vegetative stage.',
    phosRole: 'Encourages deep taproot penetration into subsoil for drought extraction.',
    potasRole: 'Prevents premature flower drop during protracted flowering cycles.'
  },
  mothbeans: {
    name: 'Moth Beans',
    optimalN: [15, 25],
    optimalP: [35, 50],
    optimalK: [15, 30],
    optimalPh: [6.5, 8.2],
    nitroRole: 'Low requirement; high natural nitrogen fixation in arid sands.',
    phosRole: 'Essential for fast nodulation before dry topsoil moisture depletes.',
    potasRole: 'Improves osmotic regulation under severe water stress.'
  },
  mungbean: {
    name: 'Mung Bean (Moong)',
    optimalN: [15, 25],
    optimalP: [40, 55],
    optimalK: [15, 30],
    optimalPh: [6.2, 7.5],
    nitroRole: 'Starter nitrogen helps rapid 15-day initial vegetative establishment.',
    phosRole: 'Accelerates synchronous pod maturation within short 60-day window.',
    potasRole: 'Protects foliage from moisture loss during hot zaid/summer winds.'
  },
  blackgram: {
    name: 'Black Gram (Urad)',
    optimalN: [25, 40],
    optimalP: [50, 70],
    optimalK: [20, 35],
    optimalPh: [6.5, 7.8],
    nitroRole: 'Supports dense leafy canopy and protein accumulation in developing seeds.',
    phosRole: 'Maximizes root nodulation and energy transfer during pod setting.',
    potasRole: 'Helps maintain water balance in heavy black clay soils.'
  },
  lentil: {
    name: 'Lentil (Masoor)',
    optimalN: [20, 30],
    optimalP: [50, 70],
    optimalK: [20, 35],
    optimalPh: [6.0, 7.5],
    nitroRole: 'Starter N aids seedling vigour during cool rabi sowing.',
    phosRole: 'Critical for deep root extension and early flowering initiation.',
    potasRole: 'Improves cold endurance and protects against collar rot.'
  },
  pomegranate: {
    name: 'Pomegranate',
    optimalN: [25, 40],
    optimalP: [20, 35],
    optimalK: [35, 55],
    optimalPh: [6.5, 7.8],
    nitroRole: 'Stimulates new seasonal flushes and healthy vegetative shoot growth.',
    phosRole: 'Strengthens root architecture and boosts flowering intensity.',
    potasRole: 'Critical for rind thickness, preventing fruit cracking, and deep aril color.'
  },
  banana: {
    name: 'Banana',
    optimalN: [120, 180],
    optimalP: [60, 90],
    optimalK: [180, 260],
    optimalPh: [6.0, 7.5],
    nitroRole: 'Heavy consumer; fuels rapid production of broad functional leaves every week.',
    phosRole: 'Necessary for continuous healthy root sucker generation.',
    potasRole: 'Highest potassium consumer; essential for large bunch weight and sweet fruit pulp.'
  },
  mango: {
    name: 'Mango',
    optimalN: [30, 50],
    optimalP: [25, 40],
    optimalK: [30, 50],
    optimalPh: [6.0, 7.5],
    nitroRole: 'Maintains healthy post-harvest vegetative flush without triggering off-season growth.',
    phosRole: 'Promotes deep feeder roots and carbohydrate reserves for bloom.',
    potasRole: 'Regulates fruit size, skin color, and post-harvest shelf life.'
  },
  grapes: {
    name: 'Grapes',
    optimalN: [30, 50],
    optimalP: [80, 120],
    optimalK: [160, 220],
    optimalPh: [6.0, 7.5],
    nitroRole: 'Provides balanced canopy cover for shading bunches without excessive vigor.',
    phosRole: 'Supports extensive lateral fine roots and cluster differentiation.',
    potasRole: 'Vital for sugar accumulation (Brix degrees), bunch uniformity, and cane maturity.'
  },
  watermelon: {
    name: 'Watermelon',
    optimalN: [80, 110],
    optimalP: [40, 60],
    optimalK: [60, 90],
    optimalPh: [6.0, 7.2],
    nitroRole: 'Promotes rapid vine coverage over hot sandy soil surface.',
    phosRole: 'Aids early crown set and deep tap root development.',
    potasRole: 'Enhances fruit sweetness, flesh crispness, and rind strength during transit.'
  },
  muskmelon: {
    name: 'Muskmelon',
    optimalN: [80, 110],
    optimalP: [40, 60],
    optimalK: [60, 90],
    optimalPh: [6.2, 7.2],
    nitroRole: 'Drives vine growth and early leaf surface area.',
    phosRole: 'Ensures rapid fruitlet set and uniform fruit size.',
    potasRole: 'Directly impacts sugar synthesis and aromatic fragrance.'
  },
  apple: {
    name: 'Apple',
    optimalN: [30, 50],
    optimalP: [80, 120],
    optimalK: [160, 220],
    optimalPh: [5.8, 6.8],
    nitroRole: 'Maintains healthy spur growth and annual bearing balance.',
    phosRole: 'Enhances spring root activity and cell division in nascent fruitlets.',
    potasRole: 'Regulates fruit color development, crispness, and cold hardiness.'
  },
  orange: {
    name: 'Orange / Citrus',
    optimalN: [30, 50],
    optimalP: [20, 35],
    optimalK: [25, 45],
    optimalPh: [6.0, 7.5],
    nitroRole: 'Essential for seasonal flush initiation and leaf retention.',
    phosRole: 'Prevents hollow centers and thick, spongy rinds in fruit.',
    potasRole: 'Improves juice recovery, vitamin C content, and rind finish.'
  },
  papaya: {
    name: 'Papaya',
    optimalN: [60, 90],
    optimalP: [60, 90],
    optimalK: [60, 90],
    optimalPh: [6.2, 7.2],
    nitroRole: 'Supports fast continuous vegetative apex growth and trunk thickening.',
    phosRole: 'Promotes steady year-round flowering and strong root system.',
    potasRole: 'Key to high sugar concentration, firm texture, and latex prevention.'
  },
  coconut: {
    name: 'Coconut',
    optimalN: [30, 50],
    optimalP: [20, 35],
    optimalK: [50, 80],
    optimalPh: [5.5, 7.2],
    nitroRole: 'Maintains green crown of 30-35 leaves required for monthly nut bunches.',
    phosRole: 'Stimulates root bole health and inflorescence primordia.',
    potasRole: 'Crucial for copra kernel thickness, nut yield, and drought resistance.'
  },
  cotton: {
    name: 'Cotton',
    optimalN: [100, 130],
    optimalP: [45, 65],
    optimalK: [30, 50],
    optimalPh: [6.2, 7.8],
    nitroRole: 'Drives sympodial (fruiting) branch count; critical in first 60 days.',
    phosRole: 'Aids deep root penetration through dense vertisols and promotes early squaring.',
    potasRole: 'Controls stomatal aperture, prevents leaf reddening, and enhances fiber micronaire.'
  },
  jute: {
    name: 'Jute',
    optimalN: [70, 90],
    optimalP: [40, 55],
    optimalK: [40, 60],
    optimalPh: [6.2, 7.4],
    nitroRole: 'Primary driver of tall, unbranched stem height and bast fiber yield.',
    phosRole: 'Encourages early seedling vigor during wet pre-monsoon showers.',
    potasRole: 'Enhances fiber tensile strength and minimizes stem rot infections.'
  },
  coffee: {
    name: 'Coffee',
    optimalN: [90, 120],
    optimalP: [30, 45],
    optimalK: [40, 65],
    optimalPh: [6.0, 7.0],
    nitroRole: 'Sustains continuous vegetative nodes for next season\'s berry clusters.',
    phosRole: 'Promotes strong root network under shade tree competition.',
    potasRole: 'Essential for bean density, mucilage development, and uniform berry ripening.'
  }
};

/**
 * Generate validated fertilizer advice based on crop selection and soil analysis.
 */
export function recommendFertilizer(cropKey: string, input: CropFeatureInput): FertilizerRecommendationResult {
  const normalizedKey = cropKey.toLowerCase().replace(/[^a-z]/g, '');
  const target = CROP_AGRONOMIC_TARGETS[normalizedKey] || CROP_AGRONOMIC_TARGETS['rice'];
  const profile = CROP_DATASET_PROFILES[normalizedKey] || CROP_DATASET_PROFILES['rice'];

  // 1. Analyze N, P, K status
  const nMid = (target.optimalN[0] + target.optimalN[1]) / 2;
  const pMid = (target.optimalP[0] + target.optimalP[1]) / 2;
  const kMid = (target.optimalK[0] + target.optimalK[1]) / 2;

  const nGap = Math.round((nMid - input.nitrogen) * 10) / 10;
  const pGap = Math.round((pMid - input.phosphorus) * 10) / 10;
  const kGap = Math.round((kMid - input.potassium) * 10) / 10;

  const getStatus = (val: number, range: [number, number]): NutrientStatus['status'] => {
    if (val < range[0] * 0.75) return 'Deficient';
    if (val < range[0]) return 'Slightly Low';
    if (val <= range[1]) return 'Optimal';
    if (val <= range[1] * 1.3) return 'High';
    return 'Excessive';
  };

  const getUrgency = (status: NutrientStatus['status']): NutrientStatus['urgency'] => {
    if (status === 'Deficient') return 'High';
    if (status === 'Slightly Low') return 'Medium';
    return 'Low';
  };

  const nutrientBreakdown: NutrientStatus[] = [
    {
      nutrient: 'Nitrogen',
      symbol: 'N',
      currentLevel: input.nitrogen,
      targetOptimal: nMid,
      range: target.optimalN,
      unit: 'kg/ha',
      gap: nGap,
      status: getStatus(input.nitrogen, target.optimalN),
      urgency: getUrgency(getStatus(input.nitrogen, target.optimalN)),
      biologicalRole: target.nitroRole
    },
    {
      nutrient: 'Phosphorus',
      symbol: 'P',
      currentLevel: input.phosphorus,
      targetOptimal: pMid,
      range: target.optimalP,
      unit: 'kg/ha',
      gap: pGap,
      status: getStatus(input.phosphorus, target.optimalP),
      urgency: getUrgency(getStatus(input.phosphorus, target.optimalP)),
      biologicalRole: target.phosRole
    },
    {
      nutrient: 'Potassium',
      symbol: 'K',
      currentLevel: input.potassium,
      targetOptimal: kMid,
      range: target.optimalK,
      unit: 'kg/ha',
      gap: kGap,
      status: getStatus(input.potassium, target.optimalK),
      urgency: getUrgency(getStatus(input.potassium, target.optimalK)),
      biologicalRole: target.potasRole
    }
  ];

  // 2. pH Soil Analysis
  let phCategory: FertilizerRecommendationResult['soilPhAnalysis']['phCategory'] = 'Neutral (Ideal)';
  let amendmentNeeded: string | null = null;
  let amendmentDose: string | null = null;
  let phExplanation = '';

  if (input.ph < 5.5) {
    phCategory = 'Strongly Acidic';
    amendmentNeeded = 'Agricultural Lime (Calcium Carbonate - CaCO3) or Dolomite';
    amendmentDose = '1.5 - 2.5 tonnes/hectare (broadcast 3 weeks prior to sowing)';
    phExplanation = `Low pH (${input.ph}) creates aluminum/iron toxicity and severely fixes phosphorus into insoluble forms. Liming restores microbial activity and nutrient bioavailability.`;
  } else if (input.ph < target.optimalPh[0]) {
    phCategory = 'Moderately Acidic';
    amendmentNeeded = 'Agricultural Lime or Farm Yard Manure (FYM) buffer';
    amendmentDose = '0.8 - 1.2 tonnes/hectare';
    phExplanation = `Soil pH (${input.ph}) is slightly below the preferred range (${target.optimalPh.join(' - ')}). Organic compost buffering is recommended.`;
  } else if (input.ph > 8.0) {
    phCategory = 'Saline/Alkaline';
    amendmentNeeded = 'Agricultural Gypsum (Calcium Sulfate - CaSO4·2H2O)';
    amendmentDose = '2.0 - 3.5 tonnes/hectare with adequate drainage flushing';
    phExplanation = `High pH (${input.ph}) leads to sodium dispersion, micronutrient fixation (Zinc, Iron), and poor aeration. Gypsum calcium replaces exchangeable sodium.`;
  } else if (input.ph > target.optimalPh[1]) {
    phCategory = 'Moderately Alkaline';
    amendmentNeeded = 'Elemental Sulfur or Well-decomposed Organic Compost';
    amendmentDose = '250 - 500 kg/ha elemental sulfur or 5 tonnes/ha compost';
    phExplanation = `Soil pH (${input.ph}) is mildly high. Organic acids generated during compost decomposition will naturally lower soil rhizosphere pH.`;
  } else {
    phCategory = 'Neutral (Ideal)';
    amendmentNeeded = null;
    amendmentDose = null;
    phExplanation = `Soil pH (${input.ph}) is in the ideal agronomic range (${target.optimalPh.join(' - ')}). Nutrient availability and root cation exchange are optimal.`;
  }

  // 3. Formulate Chemical Fertilizer Prescriptions
  const chemicalFertilizers: FertilizerAdviceItem[] = [];
  const organicAlternatives: FertilizerAdviceItem[] = [];

  // Nitrogen deficit handling
  if (nGap > 5) {
    // Urea is 46% N
    const ureaDose = Math.round((nGap / 0.46) * 10) / 10;
    chemicalFertilizers.push({
      id: 'fert-n-urea',
      nutrientTargeted: 'Nitrogen (N)',
      fertilizerName: 'Neem-Coated Urea (46-0-0)',
      fertilizerFormula: 'CO(NH2)2 (46% N)',
      recommendedDoseKgPerHa: ureaDose,
      recommendedDoseKgPerAcre: Math.round((ureaDose / 2.471) * 10) / 10,
      applicationStage: 'Top Dressing (Vegetative)',
      method: 'Split into 2 doses (50% basal + 50% at active tillering/branching)',
      whySuggested: `Soil has a ${nGap} kg/ha Nitrogen deficit for ${target.name}. Urea supplies concentrated nitrogen for leaf expansion and chlorophyll.`,
      precaution: 'Never apply urea on standing water or water-stressed soil to avoid volatilization and burning.'
    });

    organicAlternatives.push({
      id: 'org-n-manure',
      nutrientTargeted: 'Nitrogen (N)',
      fertilizerName: 'Well-Rotted Farm Yard Manure (FYM) & Neem Cake',
      fertilizerFormula: 'Organic Carbon + 1.2% N + 3.5% Neem triterpenes',
      recommendedDoseKgPerHa: 2500,
      recommendedDoseKgPerAcre: 1000,
      applicationStage: 'Basal (At Sowing)',
      method: 'Incorporate into plow layer 15-20 days before sowing',
      whySuggested: 'Enhances soil organic carbon, moisture retention, and inhibits nitrifying bacteria to ensure sustained nitrogen release.',
      precaution: 'Must be fully decomposed to avoid attracting white grubs and root rots.',
      isOrganicAlternative: true
    });
  }

  // Phosphorus deficit handling
  if (pGap > 5) {
    // DAP (18% N, 46% P2O5) or SSP (16% P2O5 + 11% Sulphur)
    const sspDose = Math.round((pGap / 0.16) * 10) / 10;
    const dapDose = Math.round((pGap / 0.46) * 10) / 10;

    chemicalFertilizers.push({
      id: 'fert-p-ssp',
      nutrientTargeted: 'Phosphorus (P) & Sulphur',
      fertilizerName: 'Single Super Phosphate (SSP) [or DAP]',
      fertilizerFormula: 'Ca(H2PO4)2 (16% P2O5, 11% S, 19% Ca)',
      recommendedDoseKgPerHa: sspDose,
      recommendedDoseKgPerAcre: Math.round((sspDose / 2.471) * 10) / 10,
      applicationStage: 'Basal (At Sowing)',
      method: 'Place 4-5 cm below seed depth during furrow opening',
      whySuggested: `Soil has a ${pGap} kg/ha Phosphorus gap. SSP provides water-soluble phosphate plus essential calcium and sulfur for root vigor.`,
      precaution: 'Phosphorus is immobile in soil; do not broadcast on surface.'
    });

    organicAlternatives.push({
      id: 'org-p-psb',
      nutrientTargeted: 'Phosphorus (P)',
      fertilizerName: 'Phosphate Solubilizing Bacteria (PSB) + Vermicompost',
      fertilizerFormula: 'Pseudomonas striata / Bacillus megaterium culture',
      recommendedDoseKgPerHa: 500,
      recommendedDoseKgPerAcre: 200,
      applicationStage: 'Basal (At Sowing)',
      method: 'Mix 2 kg PSB culture with 500 kg moist vermicompost and broadcast',
      whySuggested: 'Organic acids secreted by PSB mobilize insoluble native tricalcium and iron phosphates in the soil matrix.',
      precaution: 'Store bio-fertilizer packet away from direct heat and chemical pesticides.',
      isOrganicAlternative: true
    });
  }

  // Potassium deficit handling
  if (kGap > 5) {
    // MOP is 60% K2O
    const mopDose = Math.round((kGap / 0.60) * 10) / 10;
    chemicalFertilizers.push({
      id: 'fert-k-mop',
      nutrientTargeted: 'Potassium (K)',
      fertilizerName: 'Muriate of Potash (MOP)',
      fertilizerFormula: 'KCl (60% K2O)',
      recommendedDoseKgPerHa: mopDose,
      recommendedDoseKgPerAcre: Math.round((mopDose / 2.471) * 10) / 10,
      applicationStage: 'Basal (At Sowing)',
      method: 'Soil application at final land preparation (or split in sandy soils)',
      whySuggested: `Potassium deficit of ${kGap} kg/ha detected. MOP optimizes enzyme activation, water regulation, and pest/disease immunity.`,
      precaution: 'Avoid excess chloride build-up in saline soils or chloride-sensitive crops (like grapes/tobacco).'
    });

    organicAlternatives.push({
      id: 'org-k-ash',
      nutrientTargeted: 'Potassium (K)',
      fertilizerName: 'Biomass Wood Ash & Potash Mobilizing Bio-culture (KMB)',
      fertilizerFormula: 'Natural silicate minerals & Frateuria aurantia culture',
      recommendedDoseKgPerHa: 200,
      recommendedDoseKgPerAcre: 80,
      applicationStage: 'Basal (At Sowing)',
      method: 'Incorporate evenly into seed beds during field preparation',
      whySuggested: 'KMB bacteria solubilize locked potassium from soil mica and feldspars sustainably.',
      precaution: 'Do not mix ash with ammonium fertilizers as alkaline reaction releases ammonia gas.',
      isOrganicAlternative: true
    });
  }

  // If balanced, give maintenance guidance
  if (chemicalFertilizers.length === 0) {
    chemicalFertilizers.push({
      id: 'fert-balanced-maintenance',
      nutrientTargeted: 'Balanced Maintenance (N-P-K)',
      fertilizerName: 'Complex Fertilizer (19:19:19 Foliar or 10:26:26 Basal)',
      fertilizerFormula: 'Balanced NPK Formulation',
      recommendedDoseKgPerHa: 40,
      recommendedDoseKgPerAcre: 16,
      applicationStage: 'Top Dressing (Vegetative)',
      method: 'Light maintenance dose or 1% foliar spray during vegetative growth',
      whySuggested: `Soil nutrient levels are currently in a healthy range for ${target.name}. A light maintenance application replenishes crop extraction without chemical overload.`,
      precaution: 'Do not over-fertilize to prevent luxury consumption and groundwater runoff.'
    });

    organicAlternatives.push({
      id: 'org-maintenance-vermi',
      nutrientTargeted: 'Soil Health & Micro-flora',
      fertilizerName: 'Enriched Vermicompost with Trichoderma',
      fertilizerFormula: 'Earthworm castings rich in humic & fulvic acids',
      recommendedDoseKgPerHa: 1000,
      recommendedDoseKgPerAcre: 400,
      applicationStage: 'Basal (At Sowing)',
      method: 'Apply as soil conditioning top layer',
      whySuggested: 'Maintains soil biodiversity, beneficial fungi, and micronutrient balance naturally.',
      precaution: 'Keep soil moist for beneficial microbes to thrive.',
      isOrganicAlternative: true
    });
  }

  // Integrated plan
  const integratedNutrientPlan = {
    basalApplication: `Apply 100% of SSP/DAP (${pGap > 5 ? 'for Phosphorus' : 'maintenance'}) and 50% MOP + 2 tonnes/ha organic FYM during final harrowing.`,
    firstTopDressing: `Apply 50% of recommended Urea at 20-25 days after germination/transplanting during active tillering/shoot extension.`,
    secondTopDressing: `Apply remaining 50% Urea + remaining MOP at 45-55 days (panicle / squaring / flowering initiation) during moist soil conditions.`,
    foliarSpray: 'Foliar spray with 0.5% Zinc Sulfate + 0.2% Boron at pre-flowering stage if micronutrient leaf deficiency appears.'
  };

  // Sustainability score (higher when soil is closer to balanced, rewarded for organic buffer)
  const deficiencyCount = [nGap > 15, pGap > 15, kGap > 15].filter(Boolean).length;
  const sustainabilityScore = Math.max(55, Math.min(95, 90 - deficiencyCount * 12 + (input.ph >= 6.0 && input.ph <= 7.5 ? 8 : -6)));

  return {
    crop: cropKey,
    cropName: target.name,
    soilPhAnalysis: {
      currentPh: input.ph,
      optimalRange: target.optimalPh,
      phCategory,
      amendmentNeeded,
      amendmentDose,
      explanation: phExplanation
    },
    nutrientBreakdown,
    chemicalFertilizers,
    organicAlternatives,
    integratedNutrientPlan,
    sustainabilityScore,
    isIllustrativeEstimate: true,
    disclaimer: 'Fertilizer dosages are illustrative stoichiometric estimates based on educational crop nutrient targets. Actual field application rates must be determined via certified local soil-testing laboratory analysis and regional agricultural extension recommendations.'
  };
}
