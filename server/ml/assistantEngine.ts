import { GoogleGenAI } from '@google/genai';
import { CropFeatureInput } from '../../src/types/index.js';

export type SupportedLanguage = 'en' | 'hi' | 'ur';

export interface ChatHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantChatContext {
  soilInput?: CropFeatureInput;
  cropResult?: {
    recommendedCrop: string;
    cropName: string;
    botanicalName?: string;
    category?: string;
    confidencePercentage: number;
    alternatives?: { name: string; percentage: number; suitability: string }[];
  } | null;
  fertilizerResult?: {
    soilPhAnalysis?: {
      currentPh: number;
      optimalRange: [number, number];
      phCategory: string;
      amendmentNeeded: string | null;
      amendmentDose: string | null;
    };
    nutrientBreakdown?: {
      nutrient: string;
      symbol: string;
      currentLevel: number;
      targetOptimal: number;
      gap: number;
      status: string;
      biologicalRole: string;
    }[];
    chemicalFertilizers?: {
      fertilizerName: string;
      recommendedDoseKgPerHa: number;
      recommendedDoseKgPerAcre: number;
      applicationStage: string;
      method: string;
      whySuggested: string;
    }[];
  } | null;
  plantDiagnosis?: {
    condition: string;
    conditionLocalName: string;
    cropName: string;
    severity: string;
    symptoms: string[];
    summary: string;
  } | null;
}

export interface AssistantChatRequest {
  messages: ChatHistoryMessage[];
  language?: SupportedLanguage;
  context?: AssistantChatContext;
}

export interface AssistantChatResponse {
  reply: string;
  isAiGenerated: boolean;
  language: SupportedLanguage;
}

/**
 * Intelligent localized fallback responses when GEMINI_API_KEY is not set or network fails.
 * Grounded directly in the actual telemetry and model calculations.
 */
function generateOfflineResponse(
  userQuery: string,
  lang: SupportedLanguage,
  ctx?: AssistantChatContext
): string {
  const q = userQuery.toLowerCase();

  // 1. Crop recommendation explanation
  if (q.includes('crop') || q.includes('recommend') || q.includes('फसल') || q.includes('پیش گوئی') || q.includes('سفارش') || q.includes('چناؤ')) {
    if (ctx?.cropResult) {
      const crop = ctx.cropResult;
      const altNames = crop.alternatives?.map(a => `${a.name} (${a.percentage}%)`).join(', ') || '';
      if (lang === 'hi') {
        return `आपके दर्ज किए गए मृदा व जलवायु आंकड़ों के आधार पर हमारे गौसियन नेव बेयस (GNB) मॉडल ने **${crop.cropName}** (${crop.confidencePercentage}% सापेक्ष संभावना) की अनुशंसा की है।\n\n- **मुख्य कारण**: वर्तमान नाइट्रोजन (${ctx.soilInput?.nitrogen ?? 'N/A'} kg/ha), फास्फोरस (${ctx.soilInput?.phosphorus ?? 'N/A'} kg/ha), पोटाश (${ctx.soilInput?.potassium ?? 'N/A'} kg/ha) और वार्षिक वर्षा (${ctx.soilInput?.rainfall ?? 'N/A'} mm) इस फसल के आदर्श विकास चक्र से सबसे निकटता से मेल खाते हैं।\n- **वैकल्पिक फसलें**: ${altNames || 'कोई अन्य विकल्प नहीं'}.\n\n*(सूचना: लाइव जेनेरिक चैट हेतु GEMINI_API_KEY सेट करें।)*`;
      }
      if (lang === 'ur') {
        return `آپ کی فراہم کردہ مٹی اور موسمی پیمائش کے مطابق ماڈل نے **${crop.cropName}** (${crop.confidencePercentage}% امکانی شرح) کو سب سے موزوں قرار دیا ہے۔\n\n- **بنیادی وجہ**: موجودہ نائٹروجن (${ctx.soilInput?.nitrogen ?? 'N/A'} kg/ha)، فاسفورس (${ctx.soilInput?.phosphorus ?? 'N/A'} kg/ha)، پوٹاش (${ctx.soilInput?.potassium ?? 'N/A'} kg/ha) اور بارش (${ctx.soilInput?.rainfall ?? 'N/A'} mm) اس فصل کی حیاتیاتی ضروریات سے بہترین مماثلت رکھتے ہیں۔\n- **متبادل فصلیں**: ${altNames || 'کوئی متبادل نہیں'}.\n\n*(نوٹ: مکمل انٹرایکٹو چیٹ کے لیے GEMINI_API_KEY درکار ہے۔)*`;
      }
      return `Based on your submitted soil and meteorological readings, our Gaussian Naive Bayes model recommends **${crop.cropName}** with a normalized likelihood score of **${crop.confidencePercentage}%**.\n\n- **Agronomic Match**: Your current N (${ctx.soilInput?.nitrogen ?? 'N/A'} kg/ha), P (${ctx.soilInput?.phosphorus ?? 'N/A'} kg/ha), K (${ctx.soilInput?.potassium ?? 'N/A'} kg/ha), and annual rainfall (${ctx.soilInput?.rainfall ?? 'N/A'} mm) align closest to the Gaussian distribution profile of this crop.\n- **Viable Alternatives**: ${altNames || 'None evaluated'}.\n\n*(Note: Running offline agronomic advisor. Configure GEMINI_API_KEY for dynamic generative AI conversations.)*`;
    }
  }

  // 2. Soil pH explanation
  if (q.includes('ph') || q.includes('acid') || q.includes('alkali') || q.includes('पीएच') || q.includes('تیزابیت') || q.includes('کھاری')) {
    const ph = ctx?.soilInput?.ph ?? 6.4;
    if (lang === 'hi') {
      return `**मृदा पीएच (Soil pH)** मिट्टी की अम्लता या क्षारीयता का सूचकांक है (माप: ० से १४):\n\n- **वर्तमान रीडिंग**: **${ph} pH** (${ph < 6.0 ? 'अम्लीय' : ph > 7.5 ? 'क्षारीय' : 'तटस्थ / सर्वोत्तम'})\n- **६.० से ७.५**: अधिकांश फसलों के लिए पोषक तत्व अवशोषण हेतु आदर्श।\n- **< ६.० (अम्लीय)**: फास्फोरस मिट्टी में फिक्स हो जाता है। सुधार के लिए कृषि चूना (Agricultural Lime) अनुशंसित है।\n- **> ७.५ (क्षारीय)**: सूक्ष्म पोषक तत्व (जिंक/लोहा) उपलब्ध नहीं हो पाते। सुधार के लिए जिप्सम (Gypsum) उपयोगी है।`;
    }
    if (lang === 'ur') {
      return `**مٹی کا پی ایچ (Soil pH)** مٹی میں تیزابیت یا الکلائن اثر کی پیمائش کرتا ہے:\n\n- **موجودہ ریڈنگ**: **${ph} pH** (${ph < 6.0 ? 'تیزابی' : ph > 7.5 ? 'کھاری / الکلائن' : 'متوازن / مثالی'})\n- **۶.۰ تا ۷.۵**: تمام ضروری اجزاء کی دستیابی کے لیے بہترین دائرہ کار۔\n- **تیزابی مٹی (< 6.0)**: فاسفورس بند ہو جاتی ہے۔ زرعی چونا (Lime) استعمال کریں۔\n- **کھاری مٹی (> 7.5)**: زنک اور لوہے کی کمی ہوتی ہے۔ زرعی جپسم کا استعمال مفید ہے۔`;
    }
    return `**Soil pH** measures the acidity or alkalinity of the soil rhizosphere on a scale of 0 to 14:\n\n- **Your current reading**: **${ph} pH** (${ph < 6.0 ? 'Acidic' : ph > 7.5 ? 'Alkaline' : 'Neutral & Optimal'})\n- **6.0 to 7.5 Range**: Ideal for root cation exchange and maximum uptake of N, P, and K.\n- **Acidic Soils (< 6.0)**: High aluminum/iron fix available phosphorus into insoluble compounds; Agricultural Lime is recommended.\n- **Alkaline Soils (> 7.5)**: Micronutrients like Zinc and Iron become immobilized; Agricultural Gypsum (calcium sulfate) is recommended.`;
  }

  // 3. Leaf yellowing / symptoms
  if (q.includes('yellow') || q.includes('chlorosis') || q.includes('leaves') || q.includes('पीली') || q.includes('पत्ता') || q.includes('پتے') || q.includes('زرد')) {
    if (lang === 'hi') {
      return `पत्तियों का पीला पड़ना (**क्लोरोसिस / Chlorosis**) मुख्य रूप से निम्न कारणों से होता है:\n\n1. **नाइट्रोजन की कमी**: पुरानी (निचली) पत्तियां पहले समान रूप से पीली पड़ती हैं। यूरिया का संतुलित छिड़काव करें।\n2. **जलभराव (Waterlogging)**: अत्यधिक पानी से जड़ें ऑक्सीजन नहीं ले पातीं, जिससे पत्तियां मुरझाकर पीली हो जाती हैं।\n3. **आयरन या जिंक की कमी**: नई ऊपरी पत्तियां पीली होती हैं जबकि नसें हरी रहती हैं। कीलेटेड जिंक या फेरस सल्फेट का पर्णीय छिड़काव करें।\n4. **रोग या फफूंद**: यदि पत्ती पर पीले गोल धब्बे या छल्ले हैं, तो एआई प्लांट डॉक्टर टैब में फोटो अपलोड करके सटीक जांच करें!`;
    }
    if (lang === 'ur') {
      return `پودوں کے پتوں کا زرد ہونا درج ذیل زرعی اسباب سے ہو سکتا ہے:\n\n۱. **نائٹروجن کی کمی**: نچلے پرانے پتے پہلے زرد ہوتے ہیں اور پودے کا قد رک جاتا ہے۔ یوریا کی متوازن خوراک دیں۔\n۲. **پانی کا کھڑا رہنا**: ضرورت سے زیادہ پانی سے جڑوں کو آکسیجن نہیں ملتی، جس سے پتے پیلے ہو جاتے ہیں۔\n۳. **زنک یا لوہے کی کمی**: نئی اوپر والی پتیاں پیلی اور رگیں سبز رہتی ہیں۔ زنک یا فیرس کا اسپرے کریں۔\n۴. **پھپھوندی یا بیماری**: اگر پتوں پر گول دھبے ہیں تو **اے آئی پلانٹ ڈاکٹر** میں تصویر اپ لوڈ کر کے درست تشخیص حاصل کریں!`;
    }
    return `Plant leaves turning yellow (**Chlorosis**) is typically caused by four primary agronomic factors:\n\n1. **Nitrogen Deficiency**: Older, lower leaves yellow first uniformly from tip to base, while new shoots stay pale green. Remedied with balanced urea or compost.\n2. **Root Suffocation / Waterlogging**: Saturated soil prevents root respiration and nutrient uptake.\n3. **Micronutrient Fixation (Iron/Zinc)**: Interveinal chlorosis (yellow tissue between dark green leaf veins) indicates iron or zinc deficiency, common in high pH soils.\n4. **Fungal or Viral Pathology**: If yellowing occurs in mosaic rings or circular halos, upload a leaf photo to the **AI Plant Doctor** tab for visual pathology screening!`;
  }

  // 4. Fertilizer calculations explanation
  if (q.includes('fertilizer') || q.includes('urea') || q.includes('ssp') || q.includes('mop') || q.includes('खाद') || q.includes('यूरिया') || q.includes('کھاد')) {
    if (lang === 'hi') {
      return `**क्रॉपवाइज़ एआई में खाद की गणना विधि**:\n\n- **पोषक तत्व अंतर (Gap)**: फसल की आदर्श आवश्यकता माइनस वर्तमान मिट्टी मान। (ऋणात्मक अंतर होने पर शून्य मानकर अधिक खाद से बचाव किया जाता है)।\n- **यूरिया (४६% N)**: \`यूरिया मात्रा = N कमी / ०.४६\`\n- **एसएसपी (Single Super Phosphate, १६% P2O5)**: \`एसएसपी मात्रा = P कमी / ०.१६\`\n- **एमओपी (Muriate of Potash, ६۰% K2O)**: \`एमओपी मात्रा = K कमी / ०.६۰\`\n\n⚠️ **महत्वपूर्ण सूचना**: यह एक **सांकेतिक स्टोइकोमेट्रिक अनुमान** है। वास्तविक खेत में खाद डालने से पहले अधिकृत प्रयोगशाला की मृदा जांच रिपोर्ट और स्थानीय कृषि प्रसार अधिकारी से परामर्श अवश्य लें।`;
    }
    if (lang === 'ur') {
      return `**کھاد کی حسابی مقدار کا سائنسی طریقہ کار**:\n\n- **خالص کمی (Gap)**: مطلوبہ ضرورت منفی مٹی میں موجود مقدار۔ (اگر زمین میں ضرورت سے زیادہ ہو تو مزید کھاد تجویز نہیں کی جاتی)۔\n- **یوریا (۴۶ فیصد نائٹروجن)**: \`یوریا = N کمی / ۰.۴۶\`\n- **سنگل سپر فاسفیٹ (۱۶ فیصد P2O5)**: \`SSP = P کمی / ۰.۱۶\`\n- **میوریٹ آف پوٹاش (۶۰ فیصد K2O)**: \`MOP = K کمی / ۰.۶۰\`\n\n⚠️ **ضروری انتباہ**: یہ نتائج **علامتی تخمینہ** ہیں۔ کھیت میں کھاد کے حتمی استعمال سے پہلے لیبارٹری کے تجزیے اور مقامی زرعی ماہر سے رہنمائی لیں۔`;
    }
    return `**How CropWise AI Calculates Fertilizer Requirements**:\n\n- **Nutrient Deficit (Gap)**: Crop Target minus Measured Soil Level. If current soil nutrient exceeds target, deficit is clamped to zero (negative-deficit protection to prevent over-fertilization).\n- **Neem-Coated Urea (46% N)**: \`Dose = N_Gap / 0.46\`\n- **Single Super Phosphate (16% P2O5)**: \`Dose = P_Gap / 0.16\`\n- **Muriate of Potash (60% K2O)**: \`Dose = K_Gap / 0.60\`\n\n⚠️ **Agronomic Note**: Dosages are **illustrative stoichiometric estimates**. Commercial recommendations require local laboratory calibration (e.g. Olsen/Bray extraction for P) and local agricultural extension guidance.`;
  }

  // General welcome & guidance
  if (lang === 'hi') {
    return `नमस्ते! मैं आपका **क्रॉपवाइज़ कृषि सहायक** हूँ। मैं आपके वर्तमान मिट्टी परीक्षण मानों, अनुशंसित फसल (${ctx?.cropResult?.cropName || 'फसल'}) और खाद की खुराक के बारे में किसी भी प्रश्न का उत्तर दे सकता हूँ।\n\nआप मुझसे पूछ सकते हैं:\n- "मेरी फसल अनुशंसा का विवरण समझाएं"\n- "मिट्टी का पीएच क्या दर्शाता है?"\n- "पत्तियां पीली क्यों पड़ रही हैं?"\n- "खाद की मात्रा कैसे तय की गई?"\n\n*(सूचना: विस्तृत संवादात्मक एआई हेतु GEMINI_API_KEY कॉन्फ़िगर करें।)*`;
  }
  if (lang === 'ur') {
    return `خوش آمدید! میں آپ کا **کراپ وائز زرعی مشیر** ہوں۔ میں آپ کے درج کردہ مٹی کے نمونے، تجویز کردہ فصل (${ctx?.cropResult?.cropName || 'فصل'}) اور کھاد کے حسابات کے متعلق ہر سوال کا جواب دے سکتا ہوں۔\n\nآپ بلا جھجھک پوچھ سکتے ہیں:\n- "میری فصل کے انتخاب کی وجہ بتائیں"\n- "مٹی کے پی ایچ کی کیا اہمیت ہے؟"\n- "پودوں کے پتے کیوں زرد ہوتے ہیں؟"\n- "کھاد کی خوراک کیسے نکالی گئی؟"\n\n*(نوٹ: مکمل جنریٹو ماڈل کے لیے GEMINI_API_KEY درکار ہے۔)*`;
  }
  return `Hello! I am your **CropWise Farming Assistant**. I am grounded directly in your active soil telemetry, ML recommendation (${ctx?.cropResult?.cropName || 'Active Crop'}), and fertilizer calculations.\n\nFeel free to ask me:\n- *"Explain my crop recommendation"*\n- *"What does my soil pH mean?"*\n- *"Why are my plant leaves turning yellow?"*\n- *"How is the fertilizer dosage calculated?"*\n\n*(Note: Running offline agronomic advisor. Configure GEMINI_API_KEY for dynamic generative AI conversations.)*`;
}

/**
 * Handle incoming assistant chat request
 */
export async function handleAssistantChat(request: AssistantChatRequest): Promise<AssistantChatResponse> {
  const { messages, language = 'en', context } = request;
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || '';

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Return grounded offline response
    const reply = generateOfflineResponse(lastUserMessage, language, context);
    return {
      reply,
      isAiGenerated: false,
      language
    };
  }

  try {
    const ai = new GoogleGenAI();

    // Construct grounded context description
    const contextSummary = `
CURRENT AGRI-TELEMETRY & ACTIVE APPLICATION STATE:
- Soil Macronutrients: N=${context?.soilInput?.nitrogen ?? 'N/A'} kg/ha, P=${context?.soilInput?.phosphorus ?? 'N/A'} kg/ha, K=${context?.soilInput?.potassium ?? 'N/A'} kg/ha
- Meteorological Conditions: Temperature=${context?.soilInput?.temperature ?? 'N/A'}°C, Humidity=${context?.soilInput?.humidity ?? 'N/A'}%, Soil pH=${context?.soilInput?.ph ?? 'N/A'}, Annual Rainfall=${context?.soilInput?.rainfall ?? 'N/A'} mm
- Current Crop Recommendation: ${context?.cropResult ? `${context.cropResult.cropName} (${context.cropResult.confidencePercentage}% relative likelihood score)` : 'None calculated yet'}
- Alternatives: ${context?.cropResult?.alternatives?.map(a => `${a.name} (${a.percentage}%)`).join(', ') || 'None'}
- Fertilizer Advice: ${context?.fertilizerResult?.chemicalFertilizers?.map(f => `${f.fertilizerName}: ${f.recommendedDoseKgPerHa} kg/ha`).join('; ') || 'Balanced soil / None needed'}
- Soil pH Reaction: ${context?.fertilizerResult?.soilPhAnalysis ? `${context.fertilizerResult.soilPhAnalysis.phCategory} (current: ${context.fertilizerResult.soilPhAnalysis.currentPh}, optimal: ${context.fertilizerResult.soilPhAnalysis.optimalRange?.join('-')})` : 'Neutral'}
- Active Plant Leaf Diagnosis: ${context?.plantDiagnosis ? `${context.plantDiagnosis.condition} (${context.plantDiagnosis.severity} severity on ${context.plantDiagnosis.cropName})` : 'No leaf scanned'}
`;

    const langInstruction =
      language === 'hi'
        ? 'You must respond in natural, friendly, farmer-accessible Hindi using Devanagari script. Keep botanical and chemical terms understandable.'
        : language === 'ur'
        ? 'You must respond in natural, friendly, farmer-accessible Urdu using Arabic/Urdu script. Keep technical agricultural terms clear.'
        : 'Respond in clear, professional, accessible English suitable for agricultural extension.';

    const systemInstruction = `You are the CropWise Farming Assistant, a senior agronomy and precision agriculture expert built into the CropWise AI platform.
You assist farmers, agricultural extension workers, and hackathon evaluators with practical agronomic guidance.

CRITICAL INTEGRITY & SCIENTIFIC RULES:
1. Ground your answers strictly in the CURRENT AGRI-TELEMETRY & ACTIVE APPLICATION STATE provided above.
2. Explain crop recommendations using the ACTUAL Gaussian Naive Bayes model output from the active state. Do not invent different crops or arbitrary accuracy numbers.
3. The model outputs normalized relative likelihood scores across the 22 benchmark crops; do not claim it is an unconstrained empirical field probability.
4. When discussing fertilizer dosages, emphasize that they are illustrative stoichiometric estimates (Urea 46% N, SSP 16% P2O5, MOP 60% K2O). Remind users that real field application requires official local soil testing laboratory analysis (Olsen/Bray for P) and extension officer consultation.
5. Negative deficit protection: If soil nutrient levels already exceed crop targets, explain that zero additional chemical fertilizer is recommended to prevent luxury consumption and chemical runoff.
6. When answering about plant leaf diseases, describe observable foliar symptoms (chlorosis, necrosis, lesions) and cultural hygiene, but clarify that leaf image scanning is decision support and severe outbreaks require physical extension confirmation. Never claim to diagnose exact soil NPK levels from a leaf photo alone.
7. Language requirement: ${langInstruction}
8. Keep your response concise, structured with bullet points where appropriate, and warm.`;

    // Format chat contents for Gemini generateContent
    const historyFormatted = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: `SYSTEM CONTEXT & GUIDELINES:\n${systemInstruction}\n\n${contextSummary}\n\nPlease respond to the user query.` }
          ]
        },
        ...historyFormatted
      ]
    });

    const reply = response.text || generateOfflineResponse(lastUserMessage, language, context);

    return {
      reply,
      isAiGenerated: true,
      language
    };
  } catch (error: any) {
    console.warn('Gemini Assistant API call failed, falling back to offline agronomic response:', error?.message);
    const reply = generateOfflineResponse(lastUserMessage, language, context);
    return {
      reply,
      isAiGenerated: false,
      language
    };
  }
}
