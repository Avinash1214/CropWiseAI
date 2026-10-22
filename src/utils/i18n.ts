export type Language = 'en' | 'hi' | 'ur';

export interface CropTranslation {
  name: string;
  category: string;
  season: string;
  desc: string;
}

export interface Translations {
  appName: string;
  tagline: string;
  proBadge: string;
  navHome: string;
  navCrop: string;
  navFertilizer: string;
  navDoctor: string;
  navDiagnostics: string;
  navReport: string;
  navAbout: string;

  // Header & Presets
  demoPresets: string;
  loadScenario: string;
  modelOnline: string;

  // Buttons & Actions
  launchRecommender: string;
  exploreFertilizer: string;
  viewMathArchitecture: string;
  predictCropBtn: string;
  calculating: string;
  resetToStandard: string;
  quickFill: string;
  exportReportBtn: string;
  generateFertilizerFor: string;
  changeReadingsBtn: string;
  inspectRadarBtn: string;
  backToDashboard: string;
  printPdfBtn: string;

  // Input Section
  soilParametersTitle: string;
  soilParametersSub: string;
  modelInputFormBadge: string;
  section1Title: string;
  section1Sub: string;
  section2Title: string;
  section2Sub: string;

  // Input Labels & Units
  nitrogenLabel: string;
  phosphorusLabel: string;
  potassiumLabel: string;
  tempLabel: string;
  humidityLabel: string;
  phLabel: string;
  rainfallLabel: string;
  kgPerHa: string;
  celsius: string;
  percent: string;
  mmPerYear: string;

  // Ranges & Guidance
  low: string;
  high: string;
  neutral: string;
  acidic: string;
  alkaline: string;
  cool: string;
  hot: string;
  dry: string;
  humid: string;
  gnbEvaluationNotice: string;

  // Crop Results
  optimalMatchBadge: string;
  cropCategorySuffix: string;
  seasonSuffix: string;
  botanicalTaxon: string;
  softmaxConfidence: string;
  posteriorLabel: string;
  growingCycle: string;
  waterNeeds: string;
  preferredSoil: string;
  keyDiseases: string;
  viableAlternatives: string;
  alternativesSub: string;
  rankPrefix: string;
  suitabilityHigh: string;
  suitabilityModerate: string;
  suitabilityMarginal: string;
  analyzeFertilizerForAlt: string;
  evaluatedRecommendation: string;

  // Fertilizer Page
  fertilizerAdvisorTitle: string;
  fertilizerAdvisorSub: string;
  targetCropLabel: string;
  recalculateBtn: string;
  soilReactionDiagnosis: string;
  cropOptimalPh: string;
  noAmendmentNeeded: string;
  recommendedAmendment: string;
  prescribedDosage: string;
  allPrescriptionsTab: string;
  chemicalTab: string;
  organicTab: string;
  timelineTab: string;
  mineralDoseSchedule: string;
  exactDosesSub: string;
  dosePerHa: string;
  dosePerAcre: string;
  agronomicRationale: string;
  applicationMethod: string;
  precautionTitle: string;
  organicAlternativesTitle: string;
  organicSub: string;
  biologicalAction: string;
  inmTimelineTitle: string;
  sustainabilityScore: string;
  stage1Title: string;
  stage2Title: string;
  stage3Title: string;
  stage4Title: string;

  // Plant Doctor (AI)
  plantDoctorTitle: string;
  plantDoctorSub: string;
  uploadLeafPhoto: string;
  uploadLeafPhotoSub: string;
  dragDropPrompt: string;
  orClickToBrowse: string;
  chooseFileBtn: string;
  trySamplePhotos: string;
  sampleRiceBlast: string;
  sampleWheatRust: string;
  sampleTomatoBlight: string;
  sampleCottonCurl: string;
  sampleHealthyLeaf: string;
  analyzingImage: string;
  analyzingImageSub: string;
  diagnosisResultTitle: string;
  detectedCondition: string;
  pathogenCause: string;
  severityLabel: string;
  urgencyLabel: string;
  symptomsObserved: string;
  organicRemediesTitle: string;
  chemicalRemediesTitle: string;
  preventiveMeasuresTitle: string;
  newScanBtn: string;
  severityHealthy: string;
  severityMild: string;
  severityModerate: string;
  severitySevere: string;
  urgencyLow: string;
  urgencyMedium: string;
  urgencyHigh: string;
  urgencyCritical: string;
  plantDoctorDisclaimer: string;

  // Radar & Report
  radarTitle: string;
  radarSub: string;
  soilRadarPlaceholder: string;
  reportRef: string;
  dateIssued: string;
  domainLabel: string;
  reportTelemetryTitle: string;
  reportCropTitle: string;
  reportFertilizerTitle: string;
  reportSignatoryTitle: string;
  reportDisclaimer: string;

  // Fertilizer Transparency
  illustrativeEstimateBadge: string;
  illustrativeEstimateDesc: string;
  soilTestingLabRequired: string;

  // Farming Assistant (Chatbot)
  assistantTitle: string;
  assistantSub: string;
  assistantBadge: string;
  assistantWelcome: string;
  askAssistantPlaceholder: string;
  quickPrompt1: string;
  quickPrompt2: string;
  quickPrompt3: string;
  quickPrompt4: string;
  clearChat: string;
  typingIndicator: string;
  sendBtn: string;

  // Common & Errors
  inputError: string;
  predictionFailed: string;
  footerRights: string;
  footerBenchmarkNotice: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'CropWise AI',
    tagline: 'Smart Crop & Fertilizer Recommendation Platform',
    proBadge: 'v1.0 Pro',
    navHome: 'Overview',
    navCrop: 'Crop Recommender',
    navFertilizer: 'Fertilizer Advisory',
    navDoctor: 'AI Plant Doctor',
    navDiagnostics: 'Soil & Climate Radar',
    navReport: 'Diagnostic Report',
    navAbout: 'About & ML Math',

    demoPresets: 'Demo Presets',
    loadScenario: 'Load Verified Field Scenario',
    modelOnline: 'GNB ML Online (22 Crops)',

    launchRecommender: 'Launch Crop Recommender',
    exploreFertilizer: 'Explore Fertilizer Advisory',
    viewMathArchitecture: 'View ML Math & Architecture',
    predictCropBtn: 'Predict Suitable Crop',
    calculating: 'Processing Multiclass GNB Model...',
    resetToStandard: 'Reset to Standard',
    quickFill: 'Load Sample Data',
    exportReportBtn: 'Export Diagnostic Report',
    generateFertilizerFor: 'Generate Fertilizer Plan for',
    changeReadingsBtn: 'Change Soil Readings',
    inspectRadarBtn: 'Inspect Soil Radar',
    backToDashboard: 'Back to Dashboard',
    printPdfBtn: 'Print / Save as PDF',

    soilParametersTitle: 'Soil Chemical & Agro-Climatic Parameters',
    soilParametersSub: 'Input measured soil test report values and seasonal agro-climatic conditions.',
    modelInputFormBadge: 'Model Input Form',
    section1Title: 'Section 1: Soil Macronutrients (kg / hectare)',
    section1Sub: 'Available Soil NPK Values',
    section2Title: 'Section 2: Soil pH & Meteorological Conditions',
    section2Sub: 'Atmospheric & Chemical Metrics',

    nitrogenLabel: 'Nitrogen (N)',
    phosphorusLabel: 'Phosphorus (P)',
    potassiumLabel: 'Potassium (K)',
    tempLabel: 'Temperature',
    humidityLabel: 'Relative Humidity',
    phLabel: 'Soil pH',
    rainfallLabel: 'Annual Rainfall',
    kgPerHa: 'kg/ha',
    celsius: '°C',
    percent: '%',
    mmPerYear: 'mm',

    low: 'Low',
    high: 'High',
    neutral: 'Neutral: 7.0',
    acidic: 'Acidic',
    alkaline: 'Alkaline',
    cool: 'Cool',
    hot: 'Hot',
    dry: 'Dry',
    humid: 'Humid',
    gnbEvaluationNotice: 'Parameters are evaluated against continuous Gaussian probability distributions for all 22 crop classes.',

    optimalMatchBadge: 'Optimal Match',
    cropCategorySuffix: 'Crop',
    seasonSuffix: 'Season',
    botanicalTaxon: 'Botanical taxon',
    softmaxConfidence: 'Softmax Confidence',
    posteriorLabel: 'Posterior',
    growingCycle: 'Growing Cycle',
    waterNeeds: 'Water Needs',
    preferredSoil: 'Preferred Soil',
    keyDiseases: 'Key Diseases',
    viableAlternatives: 'Viable Crop Alternatives (Secondary Model Ranking)',
    alternativesSub: 'Ranked according to posterior probability distribution under your current soil/weather envelope.',
    rankPrefix: 'Rank #',
    suitabilityHigh: 'High Suitability',
    suitabilityModerate: 'Moderate Suitability',
    suitabilityMarginal: 'Marginal Suitability',
    analyzeFertilizerForAlt: 'Analyze Fertilizer for',
    evaluatedRecommendation: 'Evaluated Agro-Climatic Recommendation',

    fertilizerAdvisorTitle: 'Precision Fertilizer & Integrated Nutrient Management (INM)',
    fertilizerAdvisorSub: 'Formulated using stoichiometric nutrient-gap calculations grounded in agronomic guidelines.',
    targetCropLabel: 'Target Crop:',
    recalculateBtn: 'Recalculate with current values',
    soilReactionDiagnosis: 'Soil Reaction Diagnosis',
    cropOptimalPh: 'Crop Optimal:',
    noAmendmentNeeded: 'No chemical pH amendment required. Your soil is in the optimal sweet spot for root nutrient absorption.',
    recommendedAmendment: 'Recommended Soil Amendment:',
    prescribedDosage: 'Prescribed Dosage:',
    allPrescriptionsTab: 'All Prescriptions',
    chemicalTab: 'Mineral (Chemical) Fertilizers',
    organicTab: 'Biofertilizers & Organic Options',
    timelineTab: 'Application Timeline (INM)',
    mineralDoseSchedule: 'Mineral & Chemical Fertilizer Dosage Schedule',
    exactDosesSub: 'Exact stoichiometric doses',
    dosePerHa: 'Dose per Hectare:',
    dosePerAcre: 'Dose per Acre:',
    agronomicRationale: 'Agronomic Rationale:',
    applicationMethod: 'Application Method:',
    precautionTitle: 'Precaution:',
    organicAlternativesTitle: 'Sustainable Biofertilizer & Organic Alternatives',
    organicSub: 'Zero chemical footprint options',
    biologicalAction: 'Biological Action:',
    inmTimelineTitle: 'Integrated Nutrient Management (INM) Application Timeline',
    sustainabilityScore: 'Sustainability Score:',
    stage1Title: 'Stage 1: Basal Sowing',
    stage2Title: 'Stage 2: Active Tillering',
    stage3Title: 'Stage 3: Pre-Flowering',
    stage4Title: 'Stage 4: Foliar Booster',

    plantDoctorTitle: 'AI Plant Doctor & Crop Disease Specialist',
    plantDoctorSub: 'Upload or take a photo of any crop leaf to identify diseases, nutrient deficiencies, and receive instant organic and chemical remedy plans.',
    uploadLeafPhoto: 'Crop Leaf Diagnostic Scanner',
    uploadLeafPhotoSub: 'Drag & drop an image, upload from device, or use camera',
    dragDropPrompt: 'Drag and drop your crop photo here, or',
    orClickToBrowse: 'click to browse files',
    chooseFileBtn: 'Choose Image File',
    trySamplePhotos: 'Or quickly test with a verified field sample:',
    sampleRiceBlast: '🌾 Rice Leaf Blast',
    sampleWheatRust: '🌾 Wheat Rust',
    sampleTomatoBlight: '🍅 Tomato Early Blight',
    sampleCottonCurl: '☁️ Cotton Leaf Curl',
    sampleHealthyLeaf: '🍃 Healthy Crop Leaf',
    analyzingImage: 'AI Multimodal Vision Diagnosis in progress...',
    analyzingImageSub: 'Scanning leaf lesions, chlorosis patterns, and fungal morphology',
    diagnosisResultTitle: 'Clinical Agronomic Diagnosis Report',
    detectedCondition: 'Identified Condition / Disease',
    pathogenCause: 'Causal Organism / Pathogen',
    severityLabel: 'Disease Severity',
    urgencyLabel: 'Action Urgency',
    symptomsObserved: 'Symptoms & Visual Manifestations',
    organicRemediesTitle: 'Eco-Friendly & Organic Treatments',
    chemicalRemediesTitle: 'Targeted Chemical Fungicide / Pesticide Prescriptions',
    preventiveMeasuresTitle: 'Preventive Measures & Field Hygiene',
    newScanBtn: 'Scan Another Plant Leaf',
    severityHealthy: 'Healthy Tissue',
    severityMild: 'Mild Infection',
    severityModerate: 'Moderate Outbreak',
    severitySevere: 'Severe Infestation',
    urgencyLow: 'Low',
    urgencyMedium: 'Medium',
    urgencyHigh: 'High',
    urgencyCritical: 'Critical',
    plantDoctorDisclaimer: 'AI Plant Doctor provides decision support. Confirm severe infestations with your local agricultural extension service before large-scale aerial spraying.',

    radarTitle: 'Multi-Axis Biometric Radar Diagnostics',
    radarSub: '7-variable radar chart evaluating soil chemistry, temperature, humidity, and rainfall against crop ideal thresholds.',
    soilRadarPlaceholder: 'Please submit a soil reading in the Crop Recommender tab to render the real-time radar chart.',
    reportRef: 'Report Ref:',
    dateIssued: 'Date Issued:',
    domainLabel: 'Domain: Precision AI/ML in Agriculture',
    reportTelemetryTitle: '1. Field Soil & Climate Telemetry Ingestion',
    reportCropTitle: '2. Multiclass Machine Learning Crop Recommendation',
    reportFertilizerTitle: '3. Stoichiometric Nutrient Prescription & Soil Remediation',
    reportSignatoryTitle: 'CropWise AI Technical Lead',
    reportDisclaimer: 'Calculated using a Gaussian Naive Bayes-style statistical profile model and stoichiometric nutrient balancing. Outputs are illustrative estimates; field applications require certified local soil-test laboratory interpretation.',

    // Fertilizer Transparency
    illustrativeEstimateBadge: 'Illustrative Stoichiometric Estimate',
    illustrativeEstimateDesc: 'Dosages are derived from nominal target deficits and standard fertilizer grades (Urea 46% N, SSP 16% P2O5, MOP 60% K2O). Real field applications require certified local soil-test laboratory analysis and extension guidance.',
    soilTestingLabRequired: 'Notice: Field application requires certified soil-testing laboratory calibration.',

    // Farming Assistant (Chatbot)
    assistantTitle: 'CropWise Farming Assistant',
    assistantSub: 'Agronomic AI Advisory & Guidance',
    assistantBadge: 'Ask Farming Assistant',
    assistantWelcome: 'Hello! I am your CropWise Farming Assistant. Ask me anything about your current soil readings, crop suitability, fertilizer dosages, or plant leaf symptoms!',
    askAssistantPlaceholder: 'Ask about soil nutrients, crop choice, or plant symptoms...',
    quickPrompt1: 'Explain my crop recommendation',
    quickPrompt2: 'What does soil pH mean?',
    quickPrompt3: 'My plant leaves are turning yellow',
    quickPrompt4: 'How is fertilizer dosage calculated?',
    clearChat: 'Clear Chat',
    typingIndicator: 'Agronomist is analyzing telemetry and formulating guidance...',
    sendBtn: 'Send',

    inputError: 'Input Error:',
    predictionFailed: 'Failed to analyze crop suitability.',
    footerRights: 'CropWise AI — Precision Crop & Fertilizer Recommendation Platform.',
    footerBenchmarkNotice: '22 Benchmark Crops • Gaussian Naive Bayes ML • Transparent Statistics'
  },
  hi: {
    appName: 'क्रॉपवाइज़ एआई (CropWise AI)',
    tagline: 'स्मार्ट फसल एवं उर्वरक अनुशंसा प्रणाली',
    proBadge: 'संस्करण १.०',
    navHome: 'होम / अवलोकन',
    navCrop: 'फसल अनुशंसा',
    navFertilizer: 'खाद एवं पोषण सलाह',
    navDoctor: 'एआई प्लांट डॉक्टर',
    navDiagnostics: 'मृदा व मौसम रडार',
    navReport: 'कृषि रिपोर्ट',
    navAbout: 'मॉडल व गणितीय विवरण',

    demoPresets: 'नमूना परिदृश्य (डेमो)',
    loadScenario: 'सत्यापित कृषि परिस्थिति लोड करें',
    modelOnline: 'जीएनबी मॉडल सक्रिय (२२ फसलें)',

    launchRecommender: 'फसल अनुशंसा प्रारंभ करें',
    exploreFertilizer: 'खाद एवं उर्वरक सलाह देखें',
    viewMathArchitecture: 'मशीन लर्निंग मॉडल व गणित देखें',
    predictCropBtn: 'उपयुक्त फसल की पहचान करें',
    calculating: 'मशीन लर्निंग मॉडल गणना कर रहा है...',
    resetToStandard: 'मानक मान पर रीसेट करें',
    quickFill: 'नमूना डेटा लोड करें',
    exportReportBtn: 'कृषि रिपोर्ट डाउनलोड करें',
    generateFertilizerFor: 'इसके लिए खाद योजना बनाएं:',
    changeReadingsBtn: 'मिट्टी के मान बदलें',
    inspectRadarBtn: 'मृदा रडार देखें',
    backToDashboard: 'मुख्य पृष्ठ पर लौटें',
    printPdfBtn: 'प्रिंट / पीडीएफ सेव करें',

    soilParametersTitle: 'मृदा रसायन एवं कृषि-जलवायु कारक',
    soilParametersSub: 'प्रयोगशाला मृदा परीक्षण मान और अपने क्षेत्र के मौसमी आंकड़े दर्ज करें।',
    modelInputFormBadge: 'मॉडल इनपुट फॉर्म',
    section1Title: 'भाग १: मिट्टी के मुख्य पोषक तत्व (किग्रा / हेक्टेयर)',
    section1Sub: 'उपलब्ध एन-पी-के (NPK) मान',
    section2Title: 'भाग २: मिट्टी का पीएच एवं मौसमी परिस्थितियां',
    section2Sub: 'तापमान, आर्द्रता और वर्षा के माप',

    nitrogenLabel: 'नाइट्रोजन (N)',
    phosphorusLabel: 'फास्फोरस (P)',
    potassiumLabel: 'पोटेशियम (K)',
    tempLabel: 'तापमान (°C)',
    humidityLabel: 'हवा में नमी (आर्द्रता %)',
    phLabel: 'मिट्टी का पीएच (pH)',
    rainfallLabel: 'वार्षिक वर्षा (मिमी)',
    kgPerHa: 'किग्रा/हे.',
    celsius: '°C',
    percent: '%',
    mmPerYear: 'मिमी',

    low: 'कम',
    high: 'अधिक',
    neutral: 'उदासीन (संतुलित): ७.०',
    acidic: 'अम्लीय (तेज़ाबी)',
    alkaline: 'क्षारीय',
    cool: 'ठंडा मौसम',
    hot: 'गर्म मौसम',
    dry: 'शुष्क (सूखा)',
    humid: 'नम / आर्द्र',
    gnbEvaluationNotice: 'सभी इनपुट २२ फसलों के गौसियन संभाव्यता मॉडल के आधार पर जाँचे जाते हैं।',

    optimalMatchBadge: 'सर्वोत्तम फसल चयन',
    cropCategorySuffix: 'फसल वर्ग',
    seasonSuffix: 'मौसम',
    botanicalTaxon: 'वानस्पतिक नाम',
    softmaxConfidence: 'मॉडल विश्वास स्तर (सॉफ्टमैक्स)',
    posteriorLabel: 'संभाव्यता',
    growingCycle: 'पकने की अवधि',
    waterNeeds: 'पानी की आवश्यकता',
    preferredSoil: 'अनुकूल मिट्टी',
    keyDiseases: 'प्रमुख रोग',
    viableAlternatives: 'अन्य उपयुक्त वैकल्पिक फसलें (रैंकिंग अनुसार)',
    alternativesSub: 'वर्तमान मिट्टी और मौसम के अनुसार अगली सर्वोत्तम फसलें।',
    rankPrefix: 'रैंक #',
    suitabilityHigh: 'उच्च अनुकूलता',
    suitabilityModerate: 'मध्यम अनुकूलता',
    suitabilityMarginal: 'सामान्य अनुकूलता',
    analyzeFertilizerForAlt: 'इसके लिए खाद गणना करें:',
    evaluatedRecommendation: 'मूल्यांकित कृषि-जलवायु अनुशंसा',

    fertilizerAdvisorTitle: 'सटीक उर्वरक एवं एकीकृत पोषण प्रबंधन (INM)',
    fertilizerAdvisorSub: 'मिट्टी में पोषक तत्वों की कमी और फसल की आवश्यकता के आधार पर गणना।',
    targetCropLabel: 'लक्षित फसल:',
    recalculateBtn: 'वर्तमान मानों के साथ पुनः गणना करें',
    soilReactionDiagnosis: 'मिट्टी की प्रकृति (पीएच विश्लेषण)',
    cropOptimalPh: 'फसल के लिए उपयुक्त पीएच:',
    noAmendmentNeeded: 'किसी रासायनिक सुधारक की आवश्यकता नहीं है। आपकी मिट्टी पोषक तत्वों के अवशोषण के लिए सर्वोत्तम अवस्था में है।',
    recommendedAmendment: 'सुझाई गई मिट्टी सुधार सामग्री:',
    prescribedDosage: 'निर्धारित मात्रा:',
    allPrescriptionsTab: 'संपूर्ण खाद विवरण',
    chemicalTab: 'रासायनिक उर्वरक (यूरिया/डीएसपी/एमओपी)',
    organicTab: 'जैविक खाद एवं बायोफर्टिलाइजर',
    timelineTab: 'खाद देने की समय सारिणी (INM)',
    mineralDoseSchedule: 'रासायनिक उर्वरक खुराक एवं समय सारिणी',
    exactDosesSub: 'सटीक संतुलित मात्रा',
    dosePerHa: 'प्रति हेक्टेयर खुराक:',
    dosePerAcre: 'प्रति एकड़ खुराक:',
    agronomicRationale: 'कृषि वैज्ञानिक कारण:',
    applicationMethod: 'डालने का तरीका:',
    precautionTitle: 'सावधानी:',
    organicAlternativesTitle: 'पर्यावरण-अनुकूल जैविक एवं जैव-उर्वरक विकल्प',
    organicSub: 'रसायन-मुक्त टिकाऊ विकल्प',
    biologicalAction: 'जैविक कार्यप्रणाली:',
    inmTimelineTitle: 'एकीकृत पोषण प्रबंधन (INM) समय-सारिणी',
    sustainabilityScore: 'पर्यावरण अनुकूलता स्कोर:',
    stage1Title: 'चरण १: बुवाई के समय (आधार खुराक)',
    stage2Title: 'चरण २: कल्ले फूटते समय (पहली टॉप ड्रेसिंग)',
    stage3Title: 'चरण ३: फूल आने से पहले (दूसरी टॉप ड्रेसिंग)',
    stage4Title: 'चरण ४: पत्तियों पर छिड़काव (फोलियर स्प्रे)',

    plantDoctorTitle: 'एआई प्लांट डॉक्टर (फसल रोग विशेषज्ञ)',
    plantDoctorSub: 'फसल या पत्ती की फोटो अपलोड करें और तुरंत रोग की पहचान, जैविक उपचार एवं कीटनाशक की सही खुराक प्राप्त करें।',
    uploadLeafPhoto: 'पौध पत्ती रोग स्कैनर',
    uploadLeafPhotoSub: 'फोटो खींचें, फाइल अपलोड करें या नमूना फोटो चुनें',
    dragDropPrompt: 'यहाँ पत्ती की फोटो खींचकर लाएं, या',
    orClickToBrowse: 'फाइल चुनने के लिए क्लिक करें',
    chooseFileBtn: 'गैलरी / कैमरे से फोटो चुनें',
    trySamplePhotos: 'या जांच के लिए नमूना फोटो पर क्लिक करें:',
    sampleRiceBlast: '🌾 धान का झुलसा रोग (Rice Blast)',
    sampleWheatRust: '🌾 गेहूं का रतुआ रोग (Wheat Rust)',
    sampleTomatoBlight: '🍅 टमाटर का अगेती झुलसा (Blight)',
    sampleCottonCurl: '☁️ कपास का पत्ता मरोड़ (Leaf Curl)',
    sampleHealthyLeaf: '🍃 पूरी तरह स्वस्थ पत्ती',
    analyzingImage: 'एआई मल्टीमॉडल विजन रोग की जांच कर रहा है...',
    analyzingImageSub: 'पत्ती के धब्बों, फफूंद व पोषक तत्वों के लक्षणों का विश्लेषण',
    diagnosisResultTitle: 'पौध स्वास्थ्य नैदानिक रिपोर्ट',
    detectedCondition: 'पहचाना गया रोग / स्थिति',
    pathogenCause: 'कारक रोगाणु / फफूंद',
    severityLabel: 'रोग की गंभीरता',
    urgencyLabel: 'उपचार की तत्परता',
    symptomsObserved: 'दिखाई देने वाले लक्षण',
    organicRemediesTitle: 'जैविक एवं प्राकृतिक उपचार',
    chemicalRemediesTitle: 'अनुशंसित रासायनिक फफूंदनाशी / कीटनाशक',
    preventiveMeasuresTitle: 'रोकथाम एवं खेत की स्वच्छता के उपाय',
    newScanBtn: 'अन्य पौधे की पत्ती स्कैन करें',
    severityHealthy: 'स्वस्थ पौधा',
    severityMild: 'हल्का संक्रमण',
    severityModerate: 'मध्यम प्रकोप',
    severitySevere: 'गंभीर रोग प्रकोप',
    urgencyLow: 'सामान्य',
    urgencyMedium: 'मध्यम',
    urgencyHigh: 'शीघ्र आवश्यक',
    urgencyCritical: 'अत्यंत गंभीर (तुरंत कदम उठाएं)',
    plantDoctorDisclaimer: 'एआई प्लांट डॉक्टर किसानों की सहायता के लिए है। बड़े पैमाने पर दवा छिड़कने से पहले नजदीकी कृषि विज्ञान केंद्र के विशेषज्ञ से सलाह लें।',

    radarTitle: 'बहु-अक्षीय मृदा व जलवायु रडार',
    radarSub: 'मिट्टी और मौसम के ७ मापदंडों का फसल की आदर्श सीमाओं के साथ तुलनात्मक चित्र।',
    soilRadarPlaceholder: 'रडार चार्ट देखने के लिए फसल अनुशंसा टैब में मिट्टी के मान दर्ज करें।',
    reportRef: 'रिपोर्ट संदर्भ संख्या:',
    dateIssued: 'जारी करने की तिथि:',
    domainLabel: 'क्षेत्र: परिशुद्ध कृषि एआई प्रणाली',
    reportTelemetryTitle: '१. खेत की मिट्टी व जलवायु के आंकड़े',
    reportCropTitle: '२. मशीन लर्निंग फसल अनुशंसा परिणाम',
    reportFertilizerTitle: '३. संतुलित उर्वरक व मृदा सुधार नुस्खा',
    reportSignatoryTitle: 'तकनीकी प्रमुख, क्रॉपवाइज़ एआई',
    reportDisclaimer: 'यह परिणाम गौसियन नेव बेयस सांख्यिकीय प्रोफाइल मॉडल और स्टोइकोमेट्रिक पोषक संतुलन पर आधारित है। गणनाएं सांकेतिक अनुमान हैं; वास्तविक खेत में प्रयोग से पूर्व प्रयोगशाला मृदा परीक्षण आवश्यक है।',

    // Fertilizer Transparency
    illustrativeEstimateBadge: 'सांकेतिक स्टोइकोमेट्रिक अनुमान',
    illustrativeEstimateDesc: 'यह मात्रा मानक उर्वरक ग्रेड (यूरिया ४६% N, एसएसपी १६% P2O5, एमओपी ६०% K2O) के आधार पर लक्षित कमी से निकाली गई है। खेत में प्रयोग से पहले प्रमाणित मृदा प्रयोगशाला परीक्षण व प्रसार अधिकारी की सलाह आवश्यक है।',
    soilTestingLabRequired: 'सूचना: खेत में प्रयोग से पहले अधिकृत मृदा परीक्षण प्रयोगशाला की सिफारिश आवश्यक है।',

    // Farming Assistant (Chatbot)
    assistantTitle: 'क्रॉपवाइज़ कृषि सहायक',
    assistantSub: 'एआई कृषि परामर्श एवं सहायता',
    assistantBadge: 'कृषि सहायक से पूछें',
    assistantWelcome: 'नमस्ते! मैं आपका क्रॉपवाइज़ कृषि सहायक हूँ। अपनी मिट्टी की वर्तमान रीडिंग, अनुशंसित फसल, खाद की मात्रा या पत्तियों के रोगों के बारे में कोई भी प्रश्न पूछें!',
    askAssistantPlaceholder: 'मिट्टी के तत्वों, फसल चयन या पत्ती के लक्षणों के बारे में पूछें...',
    quickPrompt1: 'मेरी फसल अनुशंसा का विवरण समझाएं',
    quickPrompt2: 'मिट्टी के पीएच (pH) का क्या अर्थ है?',
    quickPrompt3: 'मेरी फसल की पत्तियां पीली पड़ रही हैं',
    quickPrompt4: 'खाद की खुराक की गणना कैसे की जाती है?',
    clearChat: 'बातचीत मिटाएं',
    typingIndicator: 'कृषि सहायक आंकड़ों का विश्लेषण कर रहा है...',
    sendBtn: 'भेजें',

    inputError: 'इनपुट त्रुटि:',
    predictionFailed: 'फसल उपयुक्तता की गणना नहीं हो सकी।',
    footerRights: 'क्रॉपवाइज़ एआई — सटीक फसल व उर्वरक अनुशंसा प्रणाली।',
    footerBenchmarkNotice: '२२ बेंचमार्क फसलें • गौसियन नेव बेयस एमएल • पारदर्शी सांख्यिकी'
  },
  ur: {
    appName: 'کراپ وائز اے آئی (CropWise AI)',
    tagline: 'اسمارٹ فصل اور کھاد کی جامع سفارشی نظام',
    proBadge: 'ورژن ۱.۰ پرو',
    navHome: 'مرکزی صفحہ / جائزہ',
    navCrop: 'فصل کی سفارش',
    navFertilizer: 'کھاد اور غذائیت کا مشورہ',
    navDoctor: 'اے آئی پلانٹ ڈاکٹر',
    navDiagnostics: 'مٹی اور موسم کا ریڈار',
    navReport: 'زرعی رپورٹ',
    navAbout: 'ماڈل اور سائنسی تفصیل',

    demoPresets: 'نمونہ ڈیٹا (ڈیمو)',
    loadScenario: 'تصدیق شدہ زرعی ڈیٹا لوڈ کریں',
    modelOnline: 'جی این بی ماڈل فعال (۲۲ فصلیں)',

    launchRecommender: 'فصل کی سفارش شروع کریں',
    exploreFertilizer: 'کھاد کے نظام کا جائزہ لیں',
    viewMathArchitecture: 'ماڈل کی ریاضی اور ساخت دیکھیں',
    predictCropBtn: 'موزوں فصل کی نشاندہی کریں',
    calculating: 'مشین لرننگ ماڈل حساب لگا رہا ہے...',
    resetToStandard: 'معیاری اقدار پر بحال کریں',
    quickFill: 'نمونہ ڈیٹا لوڈ کریں',
    exportReportBtn: 'زرعی رپورٹ حاصل کریں',
    generateFertilizerFor: 'اس فصل کے لیے کھاد کا منصوبہ بنائیں:',
    changeReadingsBtn: 'مٹی کی ریڈنگز تبدیل کریں',
    inspectRadarBtn: 'مٹی کا ریڈار دیکھیں',
    backToDashboard: 'ڈیش بورڈ پر واپس جائیں',
    printPdfBtn: 'پرنٹ / پی ڈی ایف محفوظ کریں',

    soilParametersTitle: 'مٹی کے کیمیائی اور زرعی موسمی عوامل',
    soilParametersSub: 'لیبارٹری ٹیسٹ کی ریڈنگز اور مقامی موسمی ڈیٹا درج کریں۔',
    modelInputFormBadge: 'ماڈل ان پٹ فارم',
    section1Title: 'حصہ ۱: مٹی کے بنیادی غذائی اجزاء (کلوگرام فی ہیکٹر)',
    section1Sub: 'دستیاب این پی کے (NPK) کی مقدار',
    section2Title: 'حصہ ۲: مٹی کی پی ایچ اور موسمی حالات',
    section2Sub: 'درجہ حرارت، ہوا میں نمی اور سالانہ بارش',

    nitrogenLabel: 'نائٹروجن (N)',
    phosphorusLabel: 'فاسفورس (P)',
    potassiumLabel: 'پوٹاشیم (K)',
    tempLabel: 'درجہ حرارت (°C)',
    humidityLabel: 'ہوا میں نمی (تناسب %)',
    phLabel: 'مٹی کی پی ایچ (pH)',
    rainfallLabel: 'سالانہ بارش (ملی میٹر)',
    kgPerHa: 'کلو/ہیکٹر',
    celsius: '°C',
    percent: '%',
    mmPerYear: 'ملی میٹر',

    low: 'کم',
    high: 'زیادہ',
    neutral: 'معتدل: ۷.۰',
    acidic: 'تیزابی',
    alkaline: 'الکلائن (کھاری)',
    cool: 'سرد موسم',
    hot: 'گرم موسم',
    dry: 'خشک',
    humid: 'نم / مرطوب',
    gnbEvaluationNotice: 'تمام ان پٹس کو ۲۲ فصلوں کے معروضی گاسین ماڈل کے ذریعے پرکھا جاتا ہے۔',

    optimalMatchBadge: 'بہترین موزوں فصل',
    cropCategorySuffix: 'فصل کی قسم',
    seasonSuffix: 'موسم',
    botanicalTaxon: 'نباتاتی (سائنسی) نام',
    softmaxConfidence: 'ماڈل کا اعتماد (سافٹ میکس)',
    posteriorLabel: 'امکاناتی تناسب',
    growingCycle: 'فصل کی مدت',
    waterNeeds: 'پانی کی ضرورت',
    preferredSoil: 'موزوں زمین',
    keyDiseases: 'اہم بیماریاں',
    viableAlternatives: 'دیگر متبادل فصلیں (درجہ بندی کے مطابق)',
    alternativesSub: 'موجودہ مٹی اور آب و ہوا کے تحت اگلے بہترین متبادل۔',
    rankPrefix: 'درجہ نمبر #',
    suitabilityHigh: 'بہترین موزونیت',
    suitabilityModerate: 'درمیانی موزونیت',
    suitabilityMarginal: 'معمولی موزونیت',
    analyzeFertilizerForAlt: 'کھاد کی مقدار معلوم کریں:',
    evaluatedRecommendation: 'تجزیہ شدہ زرعی موسمی سفارش',

    fertilizerAdvisorTitle: 'جامع کھاد اور مربوط غذائی انتظام (INM)',
    fertilizerAdvisorSub: 'مٹی کی کمی اور فصل کی طلب کے مطابق خالص سائنسی بنیاد پر حساب۔',
    targetCropLabel: 'منتخب فصل:',
    recalculateBtn: 'موجودہ اقدار کے ساتھ دوبارہ حساب لگائیں',
    soilReactionDiagnosis: 'مٹی کی کیمیائی کیفیت (پی ایچ تشخیص)',
    cropOptimalPh: 'فصل کے لیے بہترین پی ایچ:',
    noAmendmentNeeded: 'کسی کیمیائی سدھار کی ضرورت نہیں ہے۔ آپ کی مٹی جڑوں کی نشوونما کے لیے مثالی حالت میں ہے۔',
    recommendedAmendment: 'تجویز کردہ مٹی سدھار دوا:',
    prescribedDosage: 'مقررہ مقدار:',
    allPrescriptionsTab: 'تمام تجاویز',
    chemicalTab: 'کیمیائی کھادیں (یوریا/ایس ایس پی/ایم او پی)',
    organicTab: 'نامیاتی اور حیاتیاتی کھادیں',
    timelineTab: 'کھاد ڈالنے کا نظام الاوقات (INM)',
    mineralDoseSchedule: 'کیمیائی کھادوں کا شیڈول اور مناسب مقدار',
    exactDosesSub: 'متوازن غذائی تناسب',
    dosePerHa: 'خوراک فی ہیکٹر:',
    dosePerAcre: 'خوراک فی ایکڑ:',
    agronomicRationale: 'زرعی سائنسی وجہ:',
    applicationMethod: 'استعمال کا طریقہ:',
    precautionTitle: 'ضروری احتیاط:',
    organicAlternativesTitle: 'ماحول دوست اور نامیاتی متبادل کھادیں',
    organicSub: 'کیمیکل سے پاک پائیدار زرعی حل',
    biologicalAction: 'حیاتیاتی طریقہ کار:',
    inmTimelineTitle: 'مربوط غذائی انتظام (INM) کا شیڈول',
    sustainabilityScore: 'پائیداری کا اسکور:',
    stage1Title: 'مرحلہ ۱: بوائی کے وقت (بنیادی خوراک)',
    stage2Title: 'مرحلہ ۲: شگوفے نکلتے وقت (پہلی کھاد)',
    stage3Title: 'مرحلہ ۳: پھول آنے سے قبل (دوسری کھاد)',
    stage4Title: 'مرحلہ ۴: پتوں پر اسپرے (فولیئر اسپرے)',

    plantDoctorTitle: 'اے آئی پلانٹ ڈاکٹر (پودوں کے امراض کا ماہر)',
    plantDoctorSub: 'کسی بھی فصل کے پتے کی تصویر اپ لوڈ کریں اور بیماری کی بروقت تشخیص، نامیاتی تدابیر اور مناسب اسپرے کی معلومات حاصل کریں۔',
    uploadLeafPhoto: 'پودے کے پتے کا تشخیصی اسکینر',
    uploadLeafPhotoSub: 'تصویر کھینچیں، ڈیوائس سے اپ لوڈ کریں یا نمونہ تصویر منتخب کریں',
    dragDropPrompt: 'تصویر یہاں لا کر چھوڑیں، یا',
    orClickToBrowse: 'فائل تلاش کرنے کے لیے کلک کریں',
    chooseFileBtn: 'گیلری یا کیمرے سے تصویر منتخب کریں',
    trySamplePhotos: 'یا تصدیق کے لیے کھیت کا نمونہ منتخب کریں:',
    sampleRiceBlast: '🌾 چاول کا بلاسٹ روگ (Rice Blast)',
    sampleWheatRust: '🌾 گندم کی کنگی کا مرض (Wheat Rust)',
    sampleTomatoBlight: '🍅 ٹماٹر کا اگیتا جھلساؤ (Blight)',
    sampleCottonCurl: '☁️ کپاس کا پتہ مروڑ وائرس (Leaf Curl)',
    sampleHealthyLeaf: '🍃 بالکل صحت مند پتا',
    analyzingImage: 'اے آئی ماڈل تصویر کا معائنہ کر رہا ہے...',
    analyzingImageSub: 'پتے کے دھبوں، فنگس اور غذائی کمی کا باریک بینی سے جائزہ',
    diagnosisResultTitle: 'پودے کی طبی تشخیصی رپورٹ',
    detectedCondition: 'تشخیص شدہ مرض / کیفیت',
    pathogenCause: 'بیماری کا اصل سبب / پیتھوجین',
    severityLabel: 'مرض کی شدت',
    urgencyLabel: 'کارروائی کی ضرورت',
    symptomsObserved: 'نمایاں علامات',
    organicRemediesTitle: 'قدرتی اور نامیاتی علاج',
    chemicalRemediesTitle: 'موزوں کیمیائی اسپرے اور فنگس کش ادویات',
    preventiveMeasuresTitle: 'حفاظتی تدابیر اور کھیت کی صفائی',
    newScanBtn: 'کسی دوسرے پتے کا معائنہ کریں',
    severityHealthy: 'صحت مند پودا',
    severityMild: 'ہلکا انفیکشن',
    severityModerate: 'درمیانہ حملہ',
    severitySevere: 'شدید وبائی کیفیت',
    urgencyLow: 'معمولی',
    urgencyMedium: 'درمیانی',
    urgencyHigh: 'فوری توجہ درکار',
    urgencyCritical: 'انتہائی سنگین (فوری حفاظتی اقدام کریں)',
    plantDoctorDisclaimer: 'اے آئی پلانٹ ڈاکٹر کسانوں کی فوری رہنمائی کے لیے ہے۔ بڑے پیمانے پر اسپرے سے قبل قریبی محکمہ زراعت کے ماہر سے تصدیق کر لیں۔',

    radarTitle: 'مٹی اور موسمی عوامل کا کثیر جہتی ریڈار',
    radarSub: 'مٹی اور موسم کے ۷ عوامل کا فصل کے مطلوبہ معیار کے ساتھ گرافک موازنہ۔',
    soilRadarPlaceholder: 'ریڈار چارٹ دیکھنے کے لیے فصل کی سفارش کے ٹیب میں مٹی کا ڈیٹا درج کریں۔',
    reportRef: 'رپورٹ ریفرنس نمبر:',
    dateIssued: 'جاری ہونے کی تاریخ:',
    domainLabel: 'شعبہ: جدید زرعی ٹیکنالوجی و اے آئی',
    reportTelemetryTitle: '۱. مٹی اور موسمی ڈیٹا کا اندراج',
    reportCropTitle: '۲. مشین لرننگ ماڈل کی سفارشی فصل',
    reportFertilizerTitle: '۳. متوازن کھاد اور زمین کی اصلاح کا نسخہ',
    reportSignatoryTitle: 'ٹیکنیکل ہیڈ، کراپ وائز اے آئی',
    reportDisclaimer: 'یہ حسابات گاسین نیو بیز ماڈل اور سائنسی کھاد کے فارمولوں کے مطابق تیار کیے گئے ہیں۔ یہ نتائج علامتی تخمینہ ہیں؛ کھیت میں حتمی استعمال سے قبل مٹی کی تصدیق شدہ لیب رپورٹ لازمی ہے۔',

    // Fertilizer Transparency
    illustrativeEstimateBadge: 'علامتی زرعی تخمینہ',
    illustrativeEstimateDesc: 'یہ مقدار معیاری کھادوں (یوریا ۴۶ فیصد N، سنگل سپر فاسفیٹ ۱۶ فیصد P2O5، میوریٹ آف پوٹاش ۶۰ فیصد K2O) کے مطابق مٹی میں غذائی کمی سے نکالی گئی ہے۔ حتمی استعمال سے پہلے لیبارٹری ٹیسٹ لازمی ہے۔',
    soilTestingLabRequired: 'اہم اطلاع: کھیت میں استعمال سے قبل مٹی کے لیبارٹری ٹیسٹ کی تصدیق لازمی ہے۔',

    // Farming Assistant (Chatbot)
    assistantTitle: 'کراپ وائز زرعی معاون',
    assistantSub: 'اے آئی زرعی مشاورتی رہنمائی',
    assistantBadge: 'زرعی معاون سے پوچھیں',
    assistantWelcome: 'خوش آمدید! میں آپ کا کراپ وائز زرعی مشیر ہوں۔ مٹی کے موجودہ اجزاء، سفارشی فصل، کھاد کے شیڈول یا پودوں کے امراض کے بارے میں کوئی بھی سوال پوچھیں!',
    askAssistantPlaceholder: 'مٹی، فصل کے انتخاب یا بیماریوں کے بارے میں سوال کریں...',
    quickPrompt1: 'میری فصل کی سفارش کی وضاحت کریں',
    quickPrompt2: 'مٹی کے پی ایچ کی کیا اہمیت ہے؟',
    quickPrompt3: 'میرے پودے کے پتے پیلے ہو رہے ہیں',
    quickPrompt4: 'کھاد کی مقدار کا حساب کیسے لگایا جاتا ہے؟',
    clearChat: 'گفتگو صاف کریں',
    typingIndicator: 'زرعی ماہر ڈیٹا کا تجزیہ کر رہا ہے...',
    sendBtn: 'ارسال کریں',

    inputError: 'ڈیٹا کی خرابی:',
    predictionFailed: 'فصل کی موزونیت کا اندازہ نہیں لگایا جا سکا۔',
    footerRights: 'کراپ وائز اے آئی — فصل اور کھاد کی جدید سفارشی ٹیکنالوجی۔',
    footerBenchmarkNotice: '۲۲ بینچ مارک فصلیں • گاسین نیو بیز ماڈل • سائنسی شفافیت'
  }
};

/**
 * 22 Crop Names & Metadata translated into English, Hindi, and Urdu
 */
export const CROP_LOCALIZATION: Record<string, Record<Language, CropTranslation>> = {
  rice: {
    en: { name: 'Rice (Paddy)', category: 'Cereal', season: 'Kharif', desc: 'Primary staple cereal; requires flooded standing water and warm monsoon temperatures.' },
    hi: { name: 'चावल (धान / Paddy)', category: 'अनाज', season: 'खरीफ', desc: 'प्रमुख खाद्यान्न फसल; पर्याप्त पानी, उच्च आर्द्रता और गर्म मानसूनी मौसम की आवश्यकता होती है।' },
    ur: { name: 'چاول (دھان / Paddy)', category: 'اناج', season: 'خریف', desc: 'اہم غذائی فصل؛ زیادہ پانی، نمی اور گرم مرطوب موسم میں خوب پھلتی پھولتی ہے۔' }
  },
  maize: {
    en: { name: 'Maize (Corn)', category: 'Cereal', season: 'Kharif', desc: 'Fast-growing high-yield cereal crop; requires well-drained loams and balanced fertility.' },
    hi: { name: 'मक्का (भुट्टा / Maize)', category: 'अनाज', season: 'खरीफ', desc: 'शीघ्र पकने वाला बहुउपयोगी खाद्यान्न; जल निकासी वाली दोमट मिट्टी और संतुलित पोषण चाहिए।' },
    ur: { name: 'مکئی (بھٹا / Maize)', category: 'اناج', season: 'خریف', desc: 'تیزی سے بڑھنے والا کارآمد اناج؛ اچھی نکاسی والی زرخیز زمین میں بہترین پیداوار دیتا ہے۔' }
  },
  chickpea: {
    en: { name: 'Chickpea (Chana)', category: 'Pulse', season: 'Rabi', desc: 'Drought-hardy rabi pulse; enriches soil through atmospheric nitrogen fixation.' },
    hi: { name: 'चना (छोला / Chickpea)', category: 'दाल', season: 'रबी', desc: 'कम पानी में होने वाली दलहनी फसल; जड़ों की ग्रंथियों से मिट्टी में नाइट्रोजन बढ़ाती है।' },
    ur: { name: 'چنا (چھولے / Chickpea)', category: 'دال', season: 'ربی', desc: 'کم پانی اور خشک موسم میں پیدا ہونے والی دال؛ زمین کو زرخیز بناتی ہے۔' }
  },
  kidneybeans: {
    en: { name: 'Kidney Beans (Rajma)', category: 'Pulse', season: 'Rabi', desc: 'High-value protein pulse; prefers cool sub-humid climate and fertile loamy soil.' },
    hi: { name: 'राजमा (Kidney Beans)', category: 'दाल', season: 'रबी', desc: 'उच्च प्रोटीन वाली दलहन; ठंडी जलवायु, पर्याप्त नमी और उपजाऊ दोमट मिट्टी में अच्छी पैदावार देती है।' },
    ur: { name: 'راجما (Kidney Beans)', category: 'دال', season: 'ربی', desc: 'قیمتی اور مقوی دال؛ خنک موسم اور زرخیز زمین میں بہترین نشوونما پاتی ہے۔' }
  },
  pigeonpeas: {
    en: { name: 'Pigeonpeas (Arhar / Toor)', category: 'Pulse', season: 'Kharif', desc: 'Deep-rooted hardy pulse; tolerates dry spells and restores subsoil structure.' },
    hi: { name: 'अरहर (तूर दाल / Pigeonpeas)', category: 'दाल', season: 'खरीफ', desc: 'गहरी जड़ों वाली दलहनी फसल; सूखे को सहने में सक्षम और मिट्टी की उर्वरता बढ़ाती है।' },
    ur: { name: 'ارہر (تور دال / Pigeonpeas)', category: 'دال', season: 'خریف', desc: 'گہری جڑوں والی پائیدار دال؛ خشک سالی برداشت کرنے کی بھرپور صلاحیت رکھتی ہے۔' }
  },
  mothbeans: {
    en: { name: 'Moth Beans (Matki)', category: 'Pulse', season: 'Kharif', desc: 'Exceptionally drought-resilient arid pulse crop of dry sandy soils.' },
    hi: { name: 'मोठ (मटकी / Moth Beans)', category: 'दाल', season: 'खरीफ', desc: 'अत्यधिक सूखा-सहिष्णु दलहन; रेतीली और कम वर्षा वाले क्षेत्रों के लिए आदर्श फसल।' },
    ur: { name: 'موٹھ (مٹکی / Moth Beans)', category: 'دال', season: 'خریف', desc: 'کم بارش اور ریتیلی زمینوں میں پیدا ہونے والی سخت جان روایتی دال۔' }
  },
  mungbean: {
    en: { name: 'Mung Bean (Green Gram)', category: 'Pulse', season: 'Kharif', desc: 'Short-duration pulse crop; highly suitable for crop rotation and catch cropping.' },
    hi: { name: 'मूंग (Green Gram)', category: 'दाल', season: 'खरीफ', desc: 'कम समय (६०-७० दिन) में पकने वाली दलहन; फसल चक्र और भूमि सुधार के लिए अत्यंत उपयोगी।' },
    ur: { name: 'مونگ (Green Gram)', category: 'دال', season: 'خریف', desc: 'کم مدت میں پکنے والی غذائیت بخش دال؛ زمین کی زرخیزی بڑھانے کے لیے لاجواب۔' }
  },
  blackgram: {
    en: { name: 'Black Gram (Urad)', category: 'Pulse', season: 'Kharif', desc: 'Dense foliage nitrogen-fixing pulse; thrives in warm humid climates and clay soils.' },
    hi: { name: 'उड़द (Black Gram)', category: 'दाल', season: 'खरीफ', desc: 'प्रमुख पौष्टिक दलहनी फसल; गर्म-आर्द्र मौसम और भारी दोमट या काली मिट्टी में उपयुक्त।' },
    ur: { name: 'ماش (ماش / اڑد دال)', category: 'دال', season: 'خریف', desc: 'غذائیت سے بھرپور دال؛ گرم اور نم آب و ہوا میں تیزی سے پروان چڑھتی ہے۔' }
  },
  lentil: {
    en: { name: 'Lentil (Masoor)', category: 'Pulse', season: 'Rabi', desc: 'Cool-season rabi pulse; requires minimal moisture and performs well on residual soil water.' },
    hi: { name: 'मसूर (Lentil)', category: 'दाल', season: 'रबी', desc: 'सर्दियों की प्रमुख दलहनी फसल; कम पानी और धान के बाद बची नमी में भी अच्छी उपज देती है।' },
    ur: { name: 'مسور (Lentil)', category: 'دال', season: 'ربی', desc: 'سردیوں کی معروف دال؛ معمولی نمی میں بھی شاندار فصل فراہم کرتی ہے۔' }
  },
  pomegranate: {
    en: { name: 'Pomegranate (Anaar)', category: 'Fruit', season: 'Perennial', desc: 'Drought-tolerant high-value horticulture crop; requires dry ripening season and well-drained soil.' },
    hi: { name: 'अनार (Pomegranate)', category: 'फल', season: 'सदाबहार', desc: 'उच्च मुनाफा देने वाला बागवानी फल; शुष्क वातावरण और अच्छे जल निकास वाली भूमि में उत्तम।' },
    ur: { name: 'انار (Pomegranate)', category: 'پھل', season: 'سدا بہار', desc: 'قیمتی پھل؛ خشک گرمیوں اور نکاسی والی مٹی میں میٹھے اور شاندار دانے بناتا ہے۔' }
  },
  banana: {
    en: { name: 'Banana (Kela)', category: 'Fruit', season: 'Perennial', desc: 'High potassium and moisture-loving perennial fruit; sensitive to frost and water deficit.' },
    hi: { name: 'केला (Banana)', category: 'फल', season: 'सदाबहार', desc: 'अधिक पोटाश व नियमित सिंचाई चाहने वाला फल; पाले के प्रति संवेदनशील और भारी उत्पादक।' },
    ur: { name: 'کیلا (Banana)', category: 'پھل', season: 'سدا بہار', desc: 'زیادہ پانی اور پوٹاش کی طلب رکھنے والا پھل؛ زرخیز مٹی میں بہترین پھل لاتا ہے۔' }
  },
  mango: {
    en: { name: 'Mango (Aam)', category: 'Fruit', season: 'Perennial', desc: 'King of fruits; requires deep alluvial soils, distinct dry spell for flowering, and warm summers.' },
    hi: { name: 'आम (Mango)', category: 'फल', season: 'सदाबहार', desc: 'फलों का राजा; गहरी दोमट मिट्टी, फूल आने के समय सूखा मौसम और गर्म ग्रीष्म काल की आवश्यकता।' },
    ur: { name: 'آم (Mango)', category: 'پھل', season: 'سدا بہار', desc: 'پھلوں کا بادشاہ؛ گہری زرخیز زمین اور گرم موسم میں شاندار لذت پیدا کرتا ہے۔' }
  },
  grapes: {
    en: { name: 'Table Grapes (Angoor)', category: 'Fruit', season: 'Perennial', desc: 'High-value vine crop demanding copious potassium, high sunlight, and low rain during harvest.' },
    hi: { name: 'अंगूर (Grapes)', category: 'फल', season: 'सदाबहार', desc: 'अधिक पोटाश और तेज धूप की मांग करने वाली बेलदार फसल; तुड़ाई के समय वर्षा हानिकारक होती है।' },
    ur: { name: 'انگور (Grapes)', category: 'پھل', season: 'سدا بہار', desc: 'انتہائی منافع بخش باغبانی؛ زیادہ پوٹاش، دھوپ اور پکنے کے دنوں میں خشک موسم درکار ہوتا ہے۔' }
  },
  watermelon: {
    en: { name: 'Watermelon (Tarbooz)', category: 'Fruit', season: 'Zaid', desc: 'Warm-season cucurbit; demands sandy loam soils, bright sunshine, and dry harvest conditions.' },
    hi: { name: 'तरबूज (Watermelon)', category: 'फल', season: 'जायद', desc: 'गर्मी की मुख्य बेल वाली फसल; रेतीली दोमट मिट्टी, तेज धूप और सूखे मौसम में मीठा फल देती है।' },
    ur: { name: 'تربوز (Watermelon)', category: 'پھل', season: 'زاید', desc: 'گرمیوں کا رس دار پھل؛ ریتلی زمین اور بھرپور دھوپ میں تیزی سے تیار ہوتا ہے۔' }
  },
  muskmelon: {
    en: { name: 'Muskmelon (Kharbooja)', category: 'Fruit', season: 'Zaid', desc: 'Sweet aromatic melon; sensitive to frost and water stagnation, thrives in warm dry air.' },
    hi: { name: 'खरबूजा (Muskmelon)', category: 'फल', season: 'जायद', desc: 'सुगंधित व मीठा ग्रीष्मकालीन फल; उच्च तापमान और अच्छी जल निकास वाली हल्की दोमट में श्रेष्ठ।' },
    ur: { name: 'خربوزہ (Muskmelon)', category: 'پھل', season: 'زاید', desc: 'خوشبودار اور میٹھا پھل؛ گرم خشک موسم اور نکاسی والی مٹی میں اعلیٰ کوالٹی دیتا ہے۔' }
  },
  apple: {
    en: { name: 'Apple (Seb)', category: 'Fruit', season: 'Perennial', desc: 'Temperate deciduous fruit; requires substantial winter chilling hours and loamy hillside soils.' },
    hi: { name: 'सेब (Apple)', category: 'फल', season: 'सदाबहार', desc: 'शीतोष्ण पहाड़ी फल; सर्दियों में पर्याप्त चिलिंग (ठंड) घंटे और ढलानी दोमट मिट्टी की मांग।' },
    ur: { name: 'سیب (Apple)', category: 'پھل', season: 'سدا بہار', desc: 'پہاڑی اور سرد علاقوں کا لذیذ پھل؛ مناسب سردی اور ڈھلوان والی زمین میں بہترین نتائج دیتا ہے۔' }
  },
  orange: {
    en: { name: 'Orange / Citrus (Santra)', category: 'Fruit', season: 'Perennial', desc: 'Citrus fruit requiring well-aerated light soils, moderate humidity, and balanced micro-nutrients.' },
    hi: { name: 'संतरा / नारंगी (Orange)', category: 'फल', season: 'सदाबहार', desc: 'लोकप्रिय खट्टे फल; हल्की हवादार दोमट मिट्टी, संतुलित सूक्ष्म पोषक और मध्यम आर्द्रता की जरूरत।' },
    ur: { name: 'مالٹا / کینو (Orange)', category: 'پھل', season: 'سدا بہار', desc: 'خوش ذائقہ ترش پھل؛ ہوادار ہلکی زمین اور متوازن کھاد میں بھرپور پھل لاتا ہے۔' }
  },
  papaya: {
    en: { name: 'Papaya (Papita)', category: 'Fruit', season: 'Perennial', desc: 'Quick-fruiting tropical horticulture crop; highly sensitive to waterlogging and strong winds.' },
    hi: { name: 'पपीता (Papaya)', category: 'फल', season: 'सदाबहार', desc: 'जल्दी फल देने वाला उष्णकटिबंधीय फल; जलभराव के प्रति अत्यंत संवेदनशील, ऊंची क्यारी आवश्यक।' },
    ur: { name: 'پپیتا (Papaya)', category: 'پھل', season: 'سدا بہار', desc: 'تیزی سے پھل دینے والا درخت؛ کھڑے پانی کو بالکل برداشت نہیں کرتا، نکاسی لازمی ہے۔' }
  },
  coconut: {
    en: { name: 'Coconut (Nariyal)', category: 'Plantation', season: 'Perennial', desc: 'Coastal plantation palm; thrives in humid coastal climates, sandy soils, and high rainfall.' },
    hi: { name: 'नारियल (Coconut)', category: 'बागवानी', season: 'सदाबहार', desc: 'तटीय क्षेत्रों का कल्पवृक्ष; उच्च आर्द्रता, रेतीली या जलोढ़ मिट्टी और भरपूर वर्षा में फलता है।' },
    ur: { name: 'ناریل (Coconut)', category: 'باغاتی', season: 'سدا بہار', desc: 'ساحلی علاقوں کا سدا بہار درخت؛ نم ہوا، ریتلی زمین اور معتدل گرمی کا دلدادہ۔' }
  },
  cotton: {
    en: { name: 'Cotton (Kapas)', category: 'Commercial', season: 'Kharif', desc: 'Major commercial fiber crop; thrives in deep black vertisol soils and warm weather.' },
    hi: { name: 'कपास (सफेद सोना / Cotton)', category: 'व्यावसायिक', season: 'खरीफ', desc: 'प्रमुख नकदी रेशा फसल; गहरी काली मिट्टी (रेगुर) और गर्म जलवायु में शानदार पैदावार देती है।' },
    ur: { name: 'کپاس (سفید سونا / Cotton)', category: 'تجارتی', season: 'خریف', desc: 'اہم تجارتی ریشہ دار فصل؛ کالی گہری زمین اور گرم مرطوب موسم میں شاندار اگاؤ کرتی ہے۔' }
  },
  jute: {
    en: { name: 'Jute (Patson)', category: 'Commercial', season: 'Kharif', desc: 'Golden fiber crop; requires heavy monsoon rainfall, high humidity, and fertile alluvial silt.' },
    hi: { name: 'जूट (पटसन / Golden Fiber)', category: 'व्यावसायिक', season: 'खरीफ', desc: 'सुनहरा रेशा; भारी वर्षा, अत्यधिक आर्द्रता और नदियों की नई जलोढ़ मिट्टी में पनपती है।' },
    ur: { name: 'پٹ سن (سنہری ریشہ / Jute)', category: 'تجارتی', season: 'خریف', desc: 'سنہری ریشے کی فصل؛ وافر بارش، دریا کی لائی ہوئی نئی مٹی اور نمی میں پروان چڑھتی ہے۔' }
  },
  coffee: {
    en: { name: 'Coffee (Kafi)', category: 'Plantation', season: 'Perennial', desc: 'High-altitude shade plantation; requires organic-rich forest soils and gentle rains.' },
    hi: { name: 'कॉफी (कह्वा / Coffee)', category: 'बागवानी', season: 'सदाबहार', desc: 'पहाड़ी छायादार बागवानी फसल; जीवांश से भरपूर वन मृदा और रुक-रुक कर होने वाली बौछारों की मांग।' },
    ur: { name: 'کافی (قہوہ / Coffee)', category: 'باغاتی', season: 'سدا بہار', desc: 'پہاڑی علاقوں کی سایہ دار نقد آور فصل؛ زرخیز مٹی اور ہلکی بارشوں میں اعلیٰ معیار کی کافی پیدا ہوتی ہے۔' }
  }
};

/**
 * Helper to get localized crop display name
 */
export function getLocalizedCrop(cropKey: string, lang: Language): CropTranslation {
  const normalizedKey = cropKey.toLowerCase().replace(/[^a-z]/g, '');
  const entry = CROP_LOCALIZATION[normalizedKey] || CROP_LOCALIZATION[cropKey];
  if (entry && entry[lang]) {
    return entry[lang];
  }
  return {
    name: cropKey,
    category: 'Cereal',
    season: 'Kharif',
    desc: 'Empirically evaluated agronomic profile.'
  };
}
