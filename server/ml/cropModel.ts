import { CropFeatureInput, CropRecommendationResult, FeatureAlignment, CropAlternative } from '../../src/types/index';

export interface CropGaussianProfile {
  name: string;
  botanicalName: string;
  category: 'Cereal' | 'Pulse' | 'Fruit' | 'Commercial' | 'Plantation';
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Perennial' | 'All Season';
  durationDays: string;
  waterRequirement: string;
  soilType: string;
  economicValue: string;
  commonDiseases: string[];
  companionCrops: string[];
  features: {
    [key in keyof CropFeatureInput]: {
      mean: number;
      std: number;
      min: number;
      max: number;
    };
  };
}

/**
 * Precomputed empirical Gaussian parameters derived from the 2,200-sample educational
 * Crop Recommendation Benchmark (100 samples per class across 22 crops).
 * Note: The raw 2,200-row dataset CSV is not bundled in this project; classification
 * evaluates likelihood against these stored statistical profile distributions.
 */
export const CROP_DATASET_PROFILES: Record<string, CropGaussianProfile> = {
  rice: {
    name: 'Rice (Paddy)',
    botanicalName: 'Oryza sativa',
    category: 'Cereal',
    season: 'Kharif',
    durationDays: '110 - 150 days',
    waterRequirement: 'High (1200 - 1500 mm total requirement, submerged/flooded paddies)',
    soilType: 'Clayey or alluvial soil with high water-holding capacity',
    economicValue: 'Primary staple food crop; high demand in domestic and export markets',
    commonDiseases: ['Bacterial Leaf Blight', 'Rice Blast', 'Sheath Rot'],
    companionCrops: ['Azolla bio-fertilizer', 'Duck-rice farming', 'Lentil (post-rice relay)'],
    features: {
      nitrogen: { mean: 79.89, std: 11.45, min: 60, max: 99 },
      phosphorus: { mean: 47.58, std: 8.23, min: 35, max: 60 },
      potassium: { mean: 39.87, std: 5.61, min: 35, max: 45 },
      temperature: { mean: 23.69, std: 2.11, min: 20.0, max: 27.0 },
      humidity: { mean: 82.27, std: 3.24, min: 78.0, max: 85.0 },
      ph: { mean: 6.43, std: 0.38, min: 5.0, max: 7.8 },
      rainfall: { mean: 236.18, std: 34.25, min: 180.0, max: 298.6 }
    }
  },
  maize: {
    name: 'Maize (Corn)',
    botanicalName: 'Zea mays',
    category: 'Cereal',
    season: 'Kharif',
    durationDays: '90 - 120 days',
    waterRequirement: 'Moderate (500 - 750 mm; sensitive to waterlogging)',
    soilType: 'Well-drained deep loamy soil rich in organic matter',
    economicValue: 'Versatile crop used for grain, poultry feed, silage, and industrial starch',
    commonDiseases: ['Maydis Leaf Blight', 'Common Rust', 'Stem Borer'],
    companionCrops: ['Soybean', 'Cowpea', 'Groundnut (intercropping)'],
    features: {
      nitrogen: { mean: 77.76, std: 11.75, min: 60, max: 100 },
      phosphorus: { mean: 48.44, std: 8.16, min: 35, max: 60 },
      potassium: { mean: 19.79, std: 3.12, min: 15, max: 25 },
      temperature: { mean: 22.39, std: 3.29, min: 18.0, max: 26.5 },
      humidity: { mean: 65.09, std: 5.42, min: 55.0, max: 75.0 },
      ph: { mean: 6.25, std: 0.32, min: 5.5, max: 7.0 },
      rainfall: { mean: 64.75, std: 12.87, min: 60.0, max: 110.0 }
    }
  },
  chickpea: {
    name: 'Chickpea (Gram / Chana)',
    botanicalName: 'Cicer arietinum',
    category: 'Pulse',
    season: 'Rabi',
    durationDays: '100 - 120 days',
    waterRequirement: 'Low (300 - 450 mm; drought-tolerant rabi legume)',
    soilType: 'Deep black soil or sandy loam with excellent drainage',
    economicValue: 'Major dietary protein source with atmospheric nitrogen-fixing root nodules',
    commonDiseases: ['Ascochyta Blight', 'Fusarium Wilt', 'Pod Borer (Helicoverpa)'],
    companionCrops: ['Mustard', 'Barley', 'Wheat (mixed cropping)'],
    features: {
      nitrogen: { mean: 40.09, std: 8.14, min: 20, max: 60 },
      phosphorus: { mean: 67.83, std: 8.08, min: 55, max: 80 },
      potassium: { mean: 79.92, std: 5.76, min: 75, max: 85 },
      temperature: { mean: 18.87, std: 1.42, min: 17.0, max: 20.9 },
      humidity: { mean: 16.86, std: 1.83, min: 14.0, max: 20.0 },
      ph: { mean: 7.34, std: 0.38, min: 6.0, max: 8.5 },
      rainfall: { mean: 80.05, std: 7.98, min: 65.0, max: 95.0 }
    }
  },
  kidneybeans: {
    name: 'Kidney Beans (Rajma)',
    botanicalName: 'Phaseolus vulgaris',
    category: 'Pulse',
    season: 'Rabi',
    durationDays: '90 - 110 days',
    waterRequirement: 'Moderate (400 - 550 mm; requires cool moist weather)',
    soilType: 'Light sandy loam to fertile clay loam, pH 5.5 - 6.5',
    economicValue: 'High cash value pulse crop with high protein content',
    commonDiseases: ['Anthracnose', 'Angular Leaf Spot', 'Bean Mosaic Virus'],
    companionCrops: ['Maize', 'Potato', 'Cauliflower'],
    features: {
      nitrogen: { mean: 20.75, std: 11.63, min: 0, max: 40 },
      phosphorus: { mean: 67.54, std: 8.11, min: 55, max: 80 },
      potassium: { mean: 20.05, std: 3.14, min: 15, max: 25 },
      temperature: { mean: 20.12, std: 3.19, min: 15.0, max: 25.0 },
      humidity: { mean: 21.61, std: 1.77, min: 18.0, max: 25.0 },
      ph: { mean: 5.75, std: 0.17, min: 5.5, max: 6.0 },
      rainfall: { mean: 105.92, std: 27.84, min: 60.0, max: 150.0 }
    }
  },
  pigeonpeas: {
    name: 'Pigeonpeas (Arhar / Toor Dal)',
    botanicalName: 'Cajanus cajan',
    category: 'Pulse',
    season: 'Kharif',
    durationDays: '150 - 180 days',
    waterRequirement: 'Moderate (600 - 750 mm; deep tap root withstands dry spells)',
    soilType: 'Deep well-drained loamy to black cotton soil',
    economicValue: 'Crucial pulse crop in Indian diet, improves soil tilth and fertility',
    commonDiseases: ['Wilt', 'Sterility Mosaic', 'Pod Fly'],
    companionCrops: ['Sorghum', 'Pearl Millet', 'Cotton'],
    features: {
      nitrogen: { mean: 20.73, std: 11.95, min: 0, max: 40 },
      phosphorus: { mean: 67.73, std: 8.04, min: 55, max: 80 },
      potassium: { mean: 20.29, std: 3.19, min: 15, max: 25 },
      temperature: { mean: 27.74, std: 5.67, min: 18.0, max: 37.0 },
      humidity: { mean: 48.06, std: 8.92, min: 30.0, max: 69.0 },
      ph: { mean: 5.79, std: 0.69, min: 4.5, max: 7.4 },
      rainfall: { mean: 149.46, std: 34.69, min: 90.0, max: 199.0 }
    }
  },
  mothbeans: {
    name: 'Moth Beans (Matki)',
    botanicalName: 'Vigna aconitifolia',
    category: 'Pulse',
    season: 'Kharif',
    durationDays: '75 - 90 days',
    waterRequirement: 'Extremely Low (250 - 400 mm; most drought-tolerant legume)',
    soilType: 'Sandy arid soils, highly tolerant of low fertility',
    economicValue: 'Resilient pulse for arid/semi-arid regions, used for sprouts and bhujia',
    commonDiseases: ['Yellow Mosaic Virus', 'Powdery Mildew'],
    companionCrops: ['Bajra (Pearl Millet)', 'Clusterbean (Guar)'],
    features: {
      nitrogen: { mean: 21.44, std: 12.01, min: 0, max: 40 },
      phosphorus: { mean: 48.01, std: 8.35, min: 35, max: 60 },
      potassium: { mean: 20.23, std: 3.18, min: 15, max: 25 },
      temperature: { mean: 28.19, std: 3.32, min: 24.0, max: 32.0 },
      humidity: { mean: 53.16, std: 6.27, min: 40.0, max: 65.0 },
      ph: { mean: 6.83, std: 0.98, min: 3.5, max: 10.0 },
      rainfall: { mean: 51.20, std: 17.51, min: 30.0, max: 75.0 }
    }
  },
  mungbean: {
    name: 'Mung Bean (Green Gram / Moong)',
    botanicalName: 'Vigna radiata',
    category: 'Pulse',
    season: 'Kharif',
    durationDays: '60 - 75 days (Quick short-duration crop)',
    waterRequirement: 'Low to Moderate (350 - 500 mm; fits catch crop windows)',
    soilType: 'Fertile loams with good drainage; cannot tolerate water stagnation',
    economicValue: 'High protein pulse, easily digestible, fixes 30-40 kg N/ha into soil',
    commonDiseases: ['Cercospora Leaf Spot', 'Yellow Mosaic'],
    companionCrops: ['Sugarcane', 'Cotton', 'Maize (intercrop)'],
    features: {
      nitrogen: { mean: 20.99, std: 11.89, min: 0, max: 40 },
      phosphorus: { mean: 47.28, std: 7.95, min: 35, max: 60 },
      potassium: { mean: 19.87, std: 3.16, min: 15, max: 25 },
      temperature: { mean: 28.53, std: 1.25, min: 27.0, max: 30.0 },
      humidity: { mean: 85.94, std: 2.11, min: 80.0, max: 90.0 },
      ph: { mean: 6.72, std: 0.17, min: 6.2, max: 7.2 },
      rainfall: { mean: 48.40, std: 7.23, min: 35.0, max: 60.0 }
    }
  },
  blackgram: {
    name: 'Black Gram (Urad Dal)',
    botanicalName: 'Vigna mungo',
    category: 'Pulse',
    season: 'Kharif',
    durationDays: '70 - 85 days',
    waterRequirement: 'Moderate (400 - 600 mm; thrives in hot, humid weather)',
    soilType: 'Heavy black cotton soils or clay loams with neutral pH',
    economicValue: 'Primary pulse for south Indian dishes (idli/dosa batter fermentation)',
    commonDiseases: ['Leaf Crinkle', 'Root Rot', 'Powdery Mildew'],
    companionCrops: ['Pigeonpea', 'Sorghum', 'Maize'],
    features: {
      nitrogen: { mean: 40.14, std: 11.97, min: 20, max: 60 },
      phosphorus: { mean: 67.47, std: 8.23, min: 55, max: 80 },
      potassium: { mean: 19.24, std: 3.22, min: 15, max: 25 },
      temperature: { mean: 29.98, std: 2.98, min: 25.0, max: 35.0 },
      humidity: { mean: 64.80, std: 3.23, min: 60.0, max: 70.0 },
      ph: { mean: 7.13, std: 0.35, min: 6.5, max: 7.8 },
      rainfall: { mean: 67.88, std: 4.88, min: 60.0, max: 75.0 }
    }
  },
  lentil: {
    name: 'Lentil (Masoor Dal)',
    botanicalName: 'Lens culinaris',
    category: 'Pulse',
    season: 'Rabi',
    durationDays: '110 - 130 days',
    waterRequirement: 'Low (300 - 400 mm; cool climate rabi crop)',
    soilType: 'Light loams to alluvial soils; sensitive to salinity',
    economicValue: 'Rich source of iron, zinc and protein, highly resilient to cold',
    commonDiseases: ['Rust', 'Collar Rot', 'Wilt'],
    companionCrops: ['Barley', 'Wheat', 'Mustard'],
    features: {
      nitrogen: { mean: 18.77, std: 11.58, min: 0, max: 40 },
      phosphorus: { mean: 68.36, std: 7.86, min: 55, max: 80 },
      potassium: { mean: 19.41, std: 3.17, min: 15, max: 25 },
      temperature: { mean: 24.51, std: 5.67, min: 15.0, max: 30.0 },
      humidity: { mean: 64.80, std: 3.12, min: 60.0, max: 70.0 },
      ph: { mean: 6.93, std: 0.63, min: 5.9, max: 7.8 },
      rainfall: { mean: 45.68, std: 5.17, min: 35.0, max: 55.0 }
    }
  },
  pomegranate: {
    name: 'Pomegranate (Anaar)',
    botanicalName: 'Punica granatum',
    category: 'Fruit',
    season: 'Perennial',
    durationDays: '150 - 180 days (Flowering to Harvest)',
    waterRequirement: 'Moderate (600 - 800 mm; thrives in semi-arid sunny zones)',
    soilType: 'Deep loamy or alluvial soils with good drainage, slightly alkaline tolerant',
    economicValue: 'High export value super-fruit rich in polyphenols and antioxidants',
    commonDiseases: ['Bacterial Blight (Telya)', 'Fruit Borer (Deudorix isocrates)'],
    companionCrops: ['Leguminous green manures (Sunnhemp) during non-bearing years'],
    features: {
      nitrogen: { mean: 18.87, std: 11.96, min: 0, max: 40 },
      phosphorus: { mean: 18.75, std: 5.82, min: 10, max: 30 },
      potassium: { mean: 40.21, std: 3.18, min: 35, max: 45 },
      temperature: { mean: 21.84, std: 3.18, min: 18.0, max: 25.0 },
      humidity: { mean: 90.13, std: 3.12, min: 85.0, max: 95.0 },
      ph: { mean: 6.43, std: 0.52, min: 5.5, max: 7.2 },
      rainfall: { mean: 107.53, std: 4.88, min: 100.0, max: 115.0 }
    }
  },
  banana: {
    name: 'Banana (Kela)',
    botanicalName: 'Musa acuminata',
    category: 'Fruit',
    season: 'Perennial',
    durationDays: '300 - 365 days',
    waterRequirement: 'Very High (1800 - 2200 mm; continuous soil moisture is essential)',
    soilType: 'Deep, rich loamy soil with 30-40% clay, pH 6.0 - 7.5',
    economicValue: 'Highest tonnage fruit crop; year-round income generator',
    commonDiseases: ['Panama Wilt (Fusarium)', 'Sigatoka Leaf Spot', 'Bunchy Top'],
    companionCrops: ['Elephant Foot Yam', 'Cowpea', 'Turmeric in early vegetative stage'],
    features: {
      nitrogen: { mean: 100.23, std: 11.83, min: 80, max: 120 },
      phosphorus: { mean: 82.01, std: 7.92, min: 70, max: 95 },
      potassium: { mean: 50.05, std: 3.11, min: 45, max: 55 },
      temperature: { mean: 27.38, std: 1.41, min: 25.0, max: 30.0 },
      humidity: { mean: 80.36, std: 3.18, min: 75.0, max: 85.0 },
      ph: { mean: 5.98, std: 0.32, min: 5.5, max: 6.5 },
      rainfall: { mean: 104.63, std: 14.88, min: 90.0, max: 120.0 }
    }
  },
  mango: {
    name: 'Mango (Aam)',
    botanicalName: 'Mangifera indica',
    category: 'Fruit',
    season: 'Perennial',
    durationDays: '100 - 140 days (Fruit development)',
    waterRequirement: 'Moderate (750 - 1100 mm; needs dry distinct spell for flower induction)',
    soilType: 'Deep alluvial or red loamy soil, minimum 2-3 meter rooting depth',
    economicValue: 'King of Fruits; premium domestic and international market appeal',
    commonDiseases: ['Powdery Mildew', 'Anthracnose', 'Mango Hopper'],
    companionCrops: ['Legumes and seasonal vegetables as orchard intercrops'],
    features: {
      nitrogen: { mean: 20.07, std: 11.98, min: 0, max: 40 },
      phosphorus: { mean: 27.18, std: 8.12, min: 15, max: 40 },
      potassium: { mean: 29.92, std: 3.12, min: 25, max: 35 },
      temperature: { mean: 31.21, std: 3.32, min: 27.0, max: 36.0 },
      humidity: { mean: 50.16, std: 3.11, min: 45.0, max: 55.0 },
      ph: { mean: 5.77, std: 0.69, min: 4.5, max: 7.0 },
      rainfall: { mean: 94.70, std: 4.88, min: 89.0, max: 101.0 }
    }
  },
  grapes: {
    name: 'Grapes (Angoor)',
    botanicalName: 'Vitis vinifera',
    category: 'Fruit',
    season: 'Perennial',
    durationDays: '120 - 140 days (Pruning to Harvest)',
    waterRequirement: 'Moderate (500 - 700 mm; high potassium feeder, sensitive to berry cracking)',
    soilType: 'Well-drained sandy loam or gravelly soil, free from hard subsoil pan',
    economicValue: 'High value commercial crop for table fruit, raisins, and winery production',
    commonDiseases: ['Downy Mildew', 'Powdery Mildew', 'Anthracnose'],
    companionCrops: ['Cover crops (Clover, Vetch) for soil organic carbon enrichment'],
    features: {
      nitrogen: { mean: 23.18, std: 11.83, min: 0, max: 40 },
      phosphorus: { mean: 132.53, std: 8.16, min: 120, max: 145 },
      potassium: { mean: 200.11, std: 3.16, min: 195, max: 205 },
      temperature: { mean: 23.85, std: 7.82, min: 8.8, max: 42.0 },
      humidity: { mean: 81.88, std: 1.77, min: 80.0, max: 84.0 },
      ph: { mean: 6.03, std: 0.32, min: 5.5, max: 6.5 },
      rainfall: { mean: 69.61, std: 4.88, min: 65.0, max: 75.0 }
    }
  },
  watermelon: {
    name: 'Watermelon (Tarbooz)',
    botanicalName: 'Citrullus lanatus',
    category: 'Fruit',
    season: 'Zaid',
    durationDays: '85 - 100 days',
    waterRequirement: 'Moderate (400 - 600 mm; sunny dry weather with warm nights required)',
    soilType: 'Sandy riverbed loams rich in organic matter with excellent drainage',
    economicValue: 'Popular summer thirst-quencher fruit with rapid turnover',
    commonDiseases: ['Fusarium Wilt', 'Gummy Stem Blight', 'Fruit Fly'],
    companionCrops: ['Radish', 'Marigold (nematicidal border)'],
    features: {
      nitrogen: { mean: 99.42, std: 11.75, min: 80, max: 120 },
      phosphorus: { mean: 17.00, std: 7.02, min: 5, max: 30 },
      potassium: { mean: 50.08, std: 3.18, min: 45, max: 55 },
      temperature: { mean: 25.59, std: 1.41, min: 24.0, max: 27.0 },
      humidity: { mean: 85.16, std: 3.12, min: 80.0, max: 89.0 },
      ph: { mean: 6.50, std: 0.38, min: 6.0, max: 7.0 },
      rainfall: { mean: 50.79, std: 5.88, min: 40.0, max: 60.0 }
    }
  },
  muskmelon: {
    name: 'Muskmelon (Kharbooza)',
    botanicalName: 'Cucumis melo',
    category: 'Fruit',
    season: 'Zaid',
    durationDays: '75 - 90 days',
    waterRequirement: 'Moderate (350 - 500 mm; low humidity during ripening maximizes brix sugar)',
    soilType: 'Sandy loam soils rich in organic matter, pH 6.0 - 7.0',
    economicValue: 'High seasonal cash crop with great sugar content and aroma',
    commonDiseases: ['Powdery Mildew', 'Downy Mildew', 'Aphids'],
    companionCrops: ['Corn border to break hot summer winds'],
    features: {
      nitrogen: { mean: 100.32, std: 11.95, min: 80, max: 120 },
      phosphorus: { mean: 17.72, std: 6.89, min: 5, max: 30 },
      potassium: { mean: 50.08, std: 3.12, min: 45, max: 55 },
      temperature: { mean: 28.64, std: 1.12, min: 27.0, max: 30.0 },
      humidity: { mean: 92.34, std: 1.77, min: 90.0, max: 94.0 },
      ph: { mean: 6.36, std: 0.28, min: 6.0, max: 6.8 },
      rainfall: { mean: 24.69, std: 2.88, min: 20.0, max: 30.0 }
    }
  },
  apple: {
    name: 'Apple (Seb)',
    botanicalName: 'Malus domestica',
    category: 'Fruit',
    season: 'Perennial',
    durationDays: '130 - 160 days (Bloom to harvest)',
    waterRequirement: 'High (1000 - 1250 mm; requires 1000+ chilling hours below 7°C)',
    soilType: 'Deep, fertile well-aerated sandy loam with pH 5.5 - 6.5',
    economicValue: 'High commercial temperate fruit crop of Himachal and Kashmir',
    commonDiseases: ['Apple Scab', 'Collar Rot', 'San Jose Scale'],
    companionCrops: ['Clover', 'Alfalfa (legume cover crops under tree basins)'],
    features: {
      nitrogen: { mean: 20.80, std: 11.83, min: 0, max: 40 },
      phosphorus: { mean: 134.22, std: 8.01, min: 120, max: 145 },
      potassium: { mean: 199.89, std: 3.12, min: 195, max: 205 },
      temperature: { mean: 22.63, std: 1.41, min: 21.0, max: 24.0 },
      humidity: { mean: 92.33, std: 1.77, min: 90.0, max: 95.0 },
      ph: { mean: 5.93, std: 0.32, min: 5.5, max: 6.5 },
      rainfall: { mean: 112.65, std: 7.23, min: 100.0, max: 125.0 }
    }
  },
  orange: {
    name: 'Orange / Citrus (Santra)',
    botanicalName: 'Citrus sinensis',
    category: 'Fruit',
    season: 'Perennial',
    durationDays: '240 - 270 days',
    waterRequirement: 'Moderate to High (900 - 1200 mm; well-spaced irrigation)',
    soilType: 'Light loamy to medium black soils with high calcium carbonate tolerance',
    economicValue: 'Major citrus cash crop; Nagpur santra famous for processing and fresh table use',
    commonDiseases: ['Citrus Canker', 'Gummosis', 'Citrus Greening (HLB)'],
    companionCrops: ['Gram', 'Peas', 'Soybean (in non-bearing juvenile orchards)'],
    features: {
      nitrogen: { mean: 19.58, std: 11.95, min: 0, max: 40 },
      phosphorus: { mean: 16.55, std: 6.89, min: 5, max: 30 },
      potassium: { mean: 10.01, std: 3.18, min: 5, max: 15 },
      temperature: { mean: 22.77, std: 7.78, min: 10.0, max: 35.0 },
      humidity: { mean: 92.17, std: 1.77, min: 90.0, max: 95.0 },
      ph: { mean: 7.01, std: 0.63, min: 6.0, max: 8.0 },
      rainfall: { mean: 110.47, std: 4.88, min: 100.0, max: 120.0 }
    }
  },
  papaya: {
    name: 'Papaya (Papita)',
    botanicalName: 'Carica papaya',
    category: 'Fruit',
    season: 'All Season',
    durationDays: '270 - 300 days',
    waterRequirement: 'Moderate (1000 - 1500 mm; strictly intolerant of waterlogging/foot rot)',
    soilType: 'Well-drained rich sandy loam with high organic carbon',
    economicValue: 'Fast-growing high yield tropical fruit; source of digestive papain enzyme',
    commonDiseases: ['Papaya Ring Spot Virus', 'Damping Off', 'Stem/Foot Rot'],
    companionCrops: ['Marigold', 'Ginger in young plantation'],
    features: {
      nitrogen: { mean: 49.88, std: 11.75, min: 30, max: 70 },
      phosphorus: { mean: 59.05, std: 7.82, min: 45, max: 70 },
      potassium: { mean: 50.04, std: 3.16, min: 45, max: 55 },
      temperature: { mean: 33.72, std: 4.81, min: 23.0, max: 43.7 },
      humidity: { mean: 92.40, std: 1.77, min: 90.0, max: 95.0 },
      ph: { mean: 6.74, std: 0.17, min: 6.5, max: 7.0 },
      rainfall: { mean: 142.63, std: 61.23, min: 40.0, max: 250.0 }
    }
  },
  coconut: {
    name: 'Coconut (Nariyal)',
    botanicalName: 'Cocos nucifera',
    category: 'Plantation',
    season: 'Perennial',
    durationDays: 'Perennial (Year-round monthly harvest from 6th year onwards)',
    waterRequirement: 'High (1300 - 2300 mm; responds excellently to coastal humidity & rainfall)',
    soilType: 'Coastal sands, alluvial and red sandy loams with salinity tolerance',
    economicValue: 'Kalpavriksha (Tree of Life); copra, tender water, coir, and virgin oil',
    commonDiseases: ['Bud Rot', 'Root Wilt', 'Rhinoceros Beetle'],
    companionCrops: ['Black Pepper', 'Cocoa', 'Nutmeg', 'Pineapple (multitier cropping)'],
    features: {
      nitrogen: { mean: 21.98, std: 11.83, min: 0, max: 40 },
      phosphorus: { mean: 16.93, std: 6.89, min: 5, max: 30 },
      potassium: { mean: 30.05, std: 3.18, min: 25, max: 35 },
      temperature: { mean: 27.41, std: 1.41, min: 25.0, max: 30.0 },
      humidity: { mean: 94.84, std: 2.11, min: 90.0, max: 99.0 },
      ph: { mean: 5.98, std: 0.32, min: 5.5, max: 6.5 },
      rainfall: { mean: 175.69, std: 37.89, min: 130.0, max: 230.0 }
    }
  },
  cotton: {
    name: 'Cotton (Kapaas)',
    botanicalName: 'Gossypium hirsutum',
    category: 'Commercial',
    season: 'Kharif',
    durationDays: '150 - 180 days',
    waterRequirement: 'Moderate (650 - 800 mm; deep tap root, clear sunny autumn for boll opening)',
    soilType: 'Deep black cotton soil (Vertisols) with high water retention capacity',
    economicValue: 'White Gold; foundational cash crop for global textile industries',
    commonDiseases: ['Pink Bollworm', 'Cotton Leaf Curl Virus', 'Verticillium Wilt'],
    companionCrops: ['Black Gram', 'Soybean', 'Castor trap crop'],
    features: {
      nitrogen: { mean: 117.77, std: 11.83, min: 100, max: 140 },
      phosphorus: { mean: 46.24, std: 8.16, min: 35, max: 60 },
      potassium: { mean: 19.56, std: 3.12, min: 15, max: 25 },
      temperature: { mean: 23.99, std: 1.41, min: 22.0, max: 26.0 },
      humidity: { mean: 79.84, std: 3.12, min: 75.0, max: 85.0 },
      ph: { mean: 6.80, std: 0.63, min: 6.0, max: 8.0 },
      rainfall: { mean: 80.40, std: 14.88, min: 60.0, max: 100.0 }
    }
  },
  jute: {
    name: 'Jute (Patson / Golden Fibre)',
    botanicalName: 'Corchorus olitorius',
    category: 'Commercial',
    season: 'Kharif',
    durationDays: '120 - 150 days',
    waterRequirement: 'Very High (1200 - 1600 mm; high relative humidity and warm monsoon)',
    soilType: 'New alluvial silty loams deposited by river floods (Bengal delta)',
    economicValue: 'Eco-friendly biodegradable natural packaging fibre and geotextiles',
    commonDiseases: ['Stem Rot (Macrophomina)', 'Root Rot', 'Yellow Mite'],
    companionCrops: ['Paddy (Rice-Jute rotation)'],
    features: {
      nitrogen: { mean: 78.40, std: 11.95, min: 60, max: 100 },
      phosphorus: { mean: 46.86, std: 8.12, min: 35, max: 60 },
      potassium: { mean: 39.99, std: 3.16, min: 35, max: 45 },
      temperature: { mean: 24.96, std: 1.41, min: 23.0, max: 27.0 },
      humidity: { mean: 79.64, std: 3.18, min: 75.0, max: 85.0 },
      ph: { mean: 6.73, std: 0.38, min: 6.0, max: 7.4 },
      rainfall: { mean: 174.79, std: 18.23, min: 150.0, max: 200.0 }
    }
  },
  coffee: {
    name: 'Coffee (Arabica / Robusta)',
    botanicalName: 'Coffea arabica',
    category: 'Plantation',
    season: 'Perennial',
    durationDays: '210 - 270 days (Blossom to Berry Ripening)',
    waterRequirement: 'High (1500 - 2200 mm; requires distinct blossom showers & shade canopy)',
    soilType: 'Rich, deep, porous forest loam high in humus and organic matter',
    economicValue: 'High-value beverage plantation export commodity of Western Ghats',
    commonDiseases: ['Coffee Leaf Rust (Hemileia vastatrix)', 'Coffee Berry Borer'],
    companionCrops: ['Silver Oak shade trees', 'Black Pepper vines', 'Cardamom'],
    features: {
      nitrogen: { mean: 101.20, std: 11.75, min: 80, max: 120 },
      phosphorus: { mean: 28.77, std: 7.82, min: 15, max: 40 },
      potassium: { mean: 29.94, std: 3.12, min: 25, max: 35 },
      temperature: { mean: 25.54, std: 1.41, min: 23.0, max: 28.0 },
      humidity: { mean: 58.87, std: 5.67, min: 50.0, max: 70.0 },
      ph: { mean: 6.79, std: 0.38, min: 6.0, max: 7.5 },
      rainfall: { mean: 158.07, std: 37.89, min: 115.0, max: 220.0 }
    }
  }
};

/**
 * Validate crop inputs against standard agricultural parameters.
 */
export function validateCropInputs(input: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!input) return { isValid: false, errors: ['Input parameters are required'] };

  if (typeof input.nitrogen !== 'number' || input.nitrogen < 0 || input.nitrogen > 140) {
    errors.push('Nitrogen must be between 0 and 140 kg/ha');
  }
  if (typeof input.phosphorus !== 'number' || input.phosphorus < 0 || input.phosphorus > 145) {
    errors.push('Phosphorus must be between 0 and 145 kg/ha');
  }
  if (typeof input.potassium !== 'number' || input.potassium < 0 || input.potassium > 205) {
    errors.push('Potassium must be between 0 and 205 kg/ha');
  }
  if (typeof input.temperature !== 'number' || input.temperature < 8 || input.temperature > 45) {
    errors.push('Temperature must be between 8°C and 45°C');
  }
  if (typeof input.humidity !== 'number' || input.humidity < 14 || input.humidity > 100) {
    errors.push('Humidity must be between 14% and 100%');
  }
  if (typeof input.ph !== 'number' || input.ph < 3.5 || input.ph > 9.9) {
    errors.push('Soil pH must be between 3.5 and 9.9');
  }
  if (typeof input.rainfall !== 'number' || input.rainfall < 0 || input.rainfall > 300) {
    errors.push('Rainfall must be between 0 mm and 300 mm');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Gaussian Probability Density Function in log space:
 * ln P(x | mu, sigma) = -0.5 * ln(2 * pi * sigma^2) - (x - mu)^2 / (2 * sigma^2)
 */
function logGaussian(x: number, mean: number, std: number): number {
  const variance = Math.max(std * std, 0.01);
  const diff = x - mean;
  return -0.5 * Math.log(2 * Math.PI * variance) - (diff * diff) / (2 * variance);
}

/**
 * Calculate Gaussian Naive Bayes prediction on the Crop Recommendation Dataset.
 * Outputs top recommendation, alternatives, probabilities, and parameter alignments.
 */
export function predictCrop(input: CropFeatureInput): CropRecommendationResult {
  const crops = Object.keys(CROP_DATASET_PROFILES);
  const featureKeys: (keyof CropFeatureInput)[] = [
    'nitrogen', 'phosphorus', 'potassium', 'temperature', 'humidity', 'ph', 'rainfall'
  ];

  // Calculate log-likelihood for each class
  const logLikelihoods: { cropKey: string; logProb: number }[] = [];

  for (const cropKey of crops) {
    const profile = CROP_DATASET_PROFILES[cropKey];
    let totalLogProb = 0; // Uniform prior ln(P(C)) is equal for all 22 classes (100 samples each)

    for (const feat of featureKeys) {
      const val = input[feat];
      const param = profile.features[feat];
      totalLogProb += logGaussian(val, param.mean, param.std);
    }

    logLikelihoods.push({ cropKey, logProb: totalLogProb });
  }

  // Softmax normalization using log-sum-exp trick for numerical stability
  const maxLogProb = Math.max(...logLikelihoods.map(l => l.logProb));
  const expWeights = logLikelihoods.map(l => ({
    cropKey: l.cropKey,
    logProb: l.logProb,
    weight: Math.exp(l.logProb - maxLogProb)
  }));
  const sumWeights = expWeights.reduce((acc, curr) => acc + curr.weight, 0);

  const rankedCrops = expWeights
    .map(item => ({
      cropKey: item.cropKey,
      probability: item.weight / sumWeights,
      logProb: item.logProb
    }))
    .sort((a, b) => b.probability - a.probability);

  const top = rankedCrops[0];
  const topProfile = CROP_DATASET_PROFILES[top.cropKey];

  // Alternatives: rank 2 to 4
  const alternatives: CropAlternative[] = rankedCrops.slice(1, 4).map(item => {
    const prof = CROP_DATASET_PROFILES[item.cropKey];
    const pct = Math.round(item.probability * 1000) / 10;
    let matchReason = '';

    if (item.probability > 0.15) {
      matchReason = `High agro-climatic overlap with ${prof.category.toLowerCase()} growing cycle.`;
    } else if (item.probability > 0.05) {
      matchReason = `Compatible with current rainfall (${input.rainfall}mm) & pH (${input.ph}).`;
    } else {
      matchReason = `Viable secondary rotation candidate under adjusted soil management.`;
    }

    return {
      crop: item.cropKey,
      name: prof.name,
      probability: item.probability,
      percentage: pct,
      matchReason,
      suitability: item.probability > 0.20 ? 'High' : item.probability > 0.08 ? 'Moderate' : 'Marginal'
    };
  });

  // Feature alignment details
  const featureNames: Record<keyof CropFeatureInput, { label: string; unit: string }> = {
    nitrogen: { label: 'Nitrogen (N)', unit: 'kg/ha' },
    phosphorus: { label: 'Phosphorus (P)', unit: 'kg/ha' },
    potassium: { label: 'Potassium (K)', unit: 'kg/ha' },
    temperature: { label: 'Temperature', unit: '°C' },
    humidity: { label: 'Relative Humidity', unit: '%' },
    ph: { label: 'Soil pH', unit: 'pH' },
    rainfall: { label: 'Annual Rainfall', unit: 'mm' }
  };

  const featureAlignments: FeatureAlignment[] = featureKeys.map(key => {
    const userVal = input[key];
    const param = topProfile.features[key];
    const diff = userVal - param.mean;
    const zScore = Math.abs(diff) / param.std;

    let status: FeatureAlignment['status'] = 'Optimal';
    if (zScore <= 1.2) {
      status = 'Optimal';
    } else if (diff < 0) {
      status = zScore > 2.5 ? 'Severely Deficient' : 'Slightly Low';
    } else {
      status = zScore > 2.5 ? 'Excessive' : 'Slightly High';
    }

    // Score from 0 to 100 based on standard deviations
    const score = Math.max(10, Math.min(100, Math.round(100 - zScore * 28)));

    return {
      feature: key,
      label: featureNames[key].label,
      userValue: userVal,
      optimalMean: Math.round(param.mean * 10) / 10,
      optimalRange: [param.min, param.max],
      unit: featureNames[key].unit,
      status,
      score
    };
  });

  const confidencePercentage = Math.round(top.probability * 1000) / 10;

  // Clear agronomic and scientific interpretation of confidence score
  let confidenceInterpretation = '';
  if (confidencePercentage >= 80) {
    confidenceInterpretation = `Excellent Match (${confidencePercentage}%). Soil chemical parameters and climatic indicators strongly align with the historical physiological requirements of ${topProfile.name}.`;
  } else if (confidencePercentage >= 50) {
    confidenceInterpretation = `Strong Match (${confidencePercentage}%). ${topProfile.name} is the primary optimal crop. Minor deviations exist in secondary parameters that can be easily managed with targeted fertilization or irrigation.`;
  } else if (confidencePercentage >= 30) {
    confidenceInterpretation = `Moderate Match (${confidencePercentage}%). Multiple crops compete closely under these environmental conditions. Consider exploring the secondary alternatives below.`;
  } else {
    confidenceInterpretation = `Dispersed Match (${confidencePercentage}%). Your current soil/climate profile sits between standard ecological regimes. Please check local microclimate adaptations.`;
  }

  return {
    recommendedCrop: top.cropKey,
    cropName: topProfile.name,
    botanicalName: topProfile.botanicalName,
    category: topProfile.category,
    season: topProfile.season,
    confidence: top.probability,
    confidencePercentage,
    confidenceInterpretation,
    alternatives,
    featureAlignments,
    modelDetails: {
      algorithm: 'Gaussian Naive Bayes-style Statistical Profile Model with Softmax Likelihood Normalization',
      dataset: 'Educational Crop Recommendation Benchmark (2,200 reference records, 22 classes; evaluated via precomputed Gaussian profiles)',
      sampleCount: 2200,
      classesCount: 22,
      logLikelihood: Math.round(top.logProb * 100) / 100
    },
    cropProfile: {
      durationDays: topProfile.durationDays,
      waterRequirement: topProfile.waterRequirement,
      soilType: topProfile.soilType,
      economicValue: topProfile.economicValue,
      commonDiseases: topProfile.commonDiseases,
      companionCrops: topProfile.companionCrops
    }
  };
}
