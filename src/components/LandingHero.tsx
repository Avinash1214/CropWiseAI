import React from 'react';
import { ArrowRight, Sparkles, Sprout, FlaskConical, BarChart3, FileText, CheckCircle2, ShieldCheck, Cpu, Database, Leaf } from 'lucide-react';
import { CropFeatureInput } from '../types/index';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface LandingHeroProps {
  onStartCropPrediction: () => void;
  onExploreFertilizers: () => void;
  onLaunchPlantDoctor: () => void;
  onLoadPreset: (presetValues: CropFeatureInput, cropName?: string) => void;
  onViewArchitecture: () => void;
  lang?: Language;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartCropPrediction,
  onExploreFertilizers,
  onLaunchPlantDoctor,
  onLoadPreset,
  onViewArchitecture,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];

  const quickDemoChips = [
    {
      label: lang === 'hi' ? '🌾 खरीफ धान (चावल)' : lang === 'ur' ? '🌾 خریف چاول (دھان)' : '🌾 Kharif Rice (Monsoon)',
      sub: 'Rain 236mm • N 80',
      data: { nitrogen: 80, phosphorus: 48, potassium: 40, temperature: 24, humidity: 82, ph: 6.4, rainfall: 236 },
      crop: 'rice'
    },
    {
      label: lang === 'hi' ? '🌱 रबी चना (छोला)' : lang === 'ur' ? '🌱 ربی چنا (خشک زمیں)' : '🌱 Rabi Chickpea (Dryland)',
      sub: 'Temp 18.8°C • P 68',
      data: { nitrogen: 40, phosphorus: 68, potassium: 80, temperature: 18.8, humidity: 17, ph: 7.3, rainfall: 80 },
      crop: 'chickpea'
    },
    {
      label: lang === 'hi' ? '☁️ विदर्भ कपास (काली मिट्टी)' : lang === 'ur' ? '☁️ کپاس (کالی زمین)' : '☁️ Vidarbha Cotton (Black Soil)',
      sub: 'N 118 • Vertisols',
      data: { nitrogen: 118, phosphorus: 46, potassium: 20, temperature: 24, humidity: 80, ph: 6.8, rainfall: 80 },
      crop: 'cotton'
    },
    {
      label: lang === 'hi' ? '☕ कूर्ग पहाड़ी कॉफी' : lang === 'ur' ? '☕ کورگ کافی (پہاڑی جنگل)' : '☕ Coorg Coffee (Hill Forest)',
      sub: 'Humus • Rain 158mm',
      data: { nitrogen: 101, phosphorus: 29, potassium: 30, temperature: 25.5, humidity: 59, ph: 6.8, rainfall: 158 },
      crop: 'coffee'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Showcase Section with AgriTech Farmland Imagery */}
      <section className="relative overflow-hidden rounded-3xl bg-[#14532D] text-white p-8 sm:p-12 lg:p-16 border border-emerald-800/60 shadow-2xl">
        {/* Background Farmland Photography with AgriTech Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 filter saturate-150 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1800&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2312] via-[#14532D]/85 to-[#14532D]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e15_1px,transparent_1px),linear-gradient(to_bottom,#22c55e15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>
              {lang === 'hi' ? 'परिशुद्ध कृषि एआई/एमएल • उत्पादन के लिए तैयार' :
               lang === 'ur' ? 'جدید زرعی ٹیکنالوجی و اے آئی • کسانوں کے لیے تیار' :
               'Precision AI/ML In Agriculture • Production Ready'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === 'hi' ? (
              <>पारदर्शी सांख्यिकीय मॉडल द्वारा <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-teal-300 to-amber-300">परिशुद्ध एवं लाभकारी खेती</span></>
            ) : lang === 'ur' ? (
              <>شفاف سائنسی ماڈل کے ساتھ <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-teal-300 to-amber-300">جدید اور منافع بخش زراعت</span></>
            ) : (
              <>Precision Agriculture via <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-teal-300 to-amber-300">Statistical Machine Learning</span></>
            )}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
            {lang === 'hi' ? (
              <>अंधाधुंध खाद के छिड़काव और फसल नुकसान से बचें। <strong>क्रॉपवाइज़ एआई</strong> वास्तविक गौसियन नेव बेयस क्लासिफायर, सटीक पोषण संतुलन और एआई प्लांट डॉक्टर को एकीकृत करता है।</>
            ) : lang === 'ur' ? (
              <>بے دریغ کھاد کے ضیاع اور فصل کے نقصان سے بچیں۔ <strong>کراپ وائز اے آئی</strong> حقیقی مشین لرننگ ماڈل، سائنسی کھاد کے فارمولوں اور پودوں کے امراض کے ماہر ڈاکٹر کو یکجا کرتا ہے۔</>
            ) : (
              <>Stop blind fertilizer application and crop failure. <strong>CropWise AI</strong> combines genuine Gaussian Naive Bayes classification with stoichiometric nutrient balancing and AI plant disease diagnostics.</>
            )}
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartCropPrediction}
              className="px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-gray-950 font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer text-sm"
            >
              <Sprout className="w-4 h-4 text-emerald-950 shrink-0" />
              <span>{t.launchRecommender}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <button
              onClick={onLaunchPlantDoctor}
              className="px-6 py-3.5 bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold rounded-2xl border border-emerald-400/30 transition-all flex items-center gap-2 cursor-pointer text-sm"
            >
              <Leaf className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{t.navDoctor}</span>
            </button>

            <button
              onClick={onExploreFertilizers}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer text-sm"
            >
              <FlaskConical className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.exploreFertilizer}</span>
            </button>
          </div>

          {/* Instant Preset Tester Strip */}
          <div className="pt-6 border-t border-emerald-800/60 max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80 mb-3">
              ⚡ {lang === 'hi' ? 'त्वरित जांच: वास्तविक कृषि परिस्थिति पर क्लिक करें' : lang === 'ur' ? 'فوری جانچ: آزمائشی زرعی ڈیٹا پر کلک کریں' : 'Instant Evaluation: Click a real agro-climatic profile to test right now'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left rtl:text-right">
              {quickDemoChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => onLoadPreset(chip.data, chip.crop)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-emerald-400/50 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300">{chip.label}</p>
                  <p className="text-[10px] text-emerald-200/70 mt-0.5 ltr-num">{chip.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Metric Numbers */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4 shrink-0" />
            <span>{lang === 'hi' ? 'बेंचमार्क संदर्भ सेट' : lang === 'ur' ? 'بینچ مارک حوالہ سیٹ' : 'Benchmark Reference Set'}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 ltr-num">2,200</p>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'hi' ? 'गौसियन प्रोफाइल में १०० संदर्भ प्रति फसल' : lang === 'ur' ? 'گاسین پروفائلز میں ۱۰۰ نمونے فی فصل' : '100 reference instances / crop in Gaussian profiles'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Sprout className="w-4 h-4 shrink-0" />
            <span>{lang === 'hi' ? 'समर्थित फसलें' : lang === 'ur' ? 'شامل فصلیں' : 'Crops Supported'}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 ltr-num">22 Classes</p>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'hi' ? 'अनाज, दालें, फल और नकदी फसलें' : lang === 'ur' ? 'اناج، دالیں، پھل اور تجارتی فصلیں' : 'Cereals, pulses, fruits, and commercial cash crops'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4 shrink-0" />
            <span>{lang === 'hi' ? 'जांचे गए कारक' : lang === 'ur' ? 'حیاتیاتی عوامل' : 'Biometric Parameters'}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 ltr-num">7 Dimensions</p>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'hi' ? 'N, P, K, pH, तापमान, आर्द्रता व वर्षा' : lang === 'ur' ? 'نائٹروجن، فاسفورس، پوٹاشیم، پی ایچ، درجہ حرارت، نمی و بارش' : 'N, P, K, pH, Temperature, Humidity & Rainfall'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{lang === 'hi' ? 'सांख्यिकीय सत्यनिष्ठा' : lang === 'ur' ? 'سائنسی شفافیت' : 'Model Transparency'}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 ltr-num">GNB Profile ML</p>
          <p className="text-xs text-gray-500 mt-1">
            {lang === 'hi' ? 'सापेक्ष संभावना स्कोर • पारदर्शी स्टोइकोमेट्री' : lang === 'ur' ? 'تناسب امکانات • شفاف زرعی حساب' : 'Softmax likelihood scores • Stoichiometric estimates'}
          </p>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {lang === 'hi' ? 'व्यापक परिशुद्ध कृषि सुइट' : lang === 'ur' ? 'جامع جدید زرعی خصوصیات' : 'Comprehensive Precision Feature Suite'}
            </h3>
            <p className="text-xs text-gray-500">
              {lang === 'hi' ? 'फसल, खाद और रोग प्रबंधन के सभी समाधान एक ही मंच पर उपलब्ध हैं।' :
               lang === 'ur' ? 'فصل، کھاد اور بیماریوں کے علاج کا مکمل مربوط نظام۔' :
               'Every deliverable for precision crop, fertilizer, and pathology advisory is fully operational.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">
              {lang === 'hi' ? '२२-फसलीय मशीन लर्निंग अनुशंसा' : lang === 'ur' ? '۲۲ فصلی مشین لرننگ سفارش' : '22-Class ML Recommender'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'hi' ? 'धान, मक्का, चना, राजमा, कपास, कॉफी, अंगूर, सेब और अन्य फसलों की प्रतिशत संभावना के साथ सटीक रैंकिंग।' :
               lang === 'ur' ? 'چاول، مکئی، چنا، راجما، کپاس، کافی، انگور اور سیب کے لیے ترجیحی بنیادوں پر درست رہنمائی۔' :
               'Predicts Rice, Maize, Chickpea, Kidney Beans, Cotton, Coffee, Grapes, Apples, and more with ranked alternatives and percentage probabilities.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-700" />
            </div>
            <h4 className="text-base font-bold text-gray-900">
              {lang === 'hi' ? 'एआई प्लांट डॉक्टर (रोग निदान)' : lang === 'ur' ? 'اے آئی پلانٹ ڈاکٹر (پتوں کا معائنہ)' : 'AI Plant Doctor (Vision)'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'hi' ? 'पत्ती की फोटो अपलोड करें और तुरंत रोग की पहचान, जैविक नुस्खे एवं कीटनाशक दवा की संतुलित मात्रा प्राप्त करें।' :
               lang === 'ur' ? 'پودے کے پتے کی تصویر اپ لوڈ کر کے بیماری کی فوری تشخیص، قدرتی علاج اور اسپرے کی رہنمائی لیں۔' :
               'Upload crop leaf photos for instant pathology diagnostics, visual lesion analysis, and organic & chemical remediation prescriptions.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">
              {lang === 'hi' ? 'पोषक तत्व व संतुलित खाद सलाह' : lang === 'ur' ? 'متوازن غذائیت اور کھاد کا مشورہ' : 'Deficiency & INM Guidance'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'hi' ? 'नाइट्रोजन, फास्फोरस व पोटाश की सटीक कमी की पहचान और चार चरणों में खाद देने की वैज्ञानिक समय-सारिणी।' :
               lang === 'ur' ? 'زمین میں این پی کے کی کمی کا تعین اور مرحلہ وار کھاد ڈالنے کا مکمل شیڈول۔' :
               'Detects precise N-P-K gaps, explains the physiological reason for each nutrient, and provides stage-by-stage split application schedules.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">
              {lang === 'hi' ? 'बहु-अक्षीय रडार विजुअलाइजर' : lang === 'ur' ? 'کثیر جہتی ریڈار چارٹ' : 'Multi-Axis Radar Visualizer'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'hi' ? 'मिट्टी के ७ मापदंडों का वास्तविक समय में ग्राफिकल मकड़ी-जाल (रडार) दृश्य।' :
               lang === 'ur' ? 'مٹی اور موسم کے ۷ عوامل کا گرافک تقابلی جائزہ۔' :
               'Interactive 7-variable spider chart visualizing soil compatibility scores and N-P-K deficit/surplus comparative balance bars.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">
              {lang === 'hi' ? 'प्रिंट योग्य लैब रिपोर्ट' : lang === 'ur' ? 'پرنٹ کے قابل زرعی رپورٹ' : 'Exportable Lab Report'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'hi' ? 'पीडीएफ या प्रिंट के लिए तैयार संपूर्ण कृषि कार्ड जिसमें मिट्टी के मान, फसल व खाद का पूरा विवरण है।' :
               lang === 'ur' ? 'پی ڈی ایف اور پرنٹ کے لیے تیار جامع رپورٹ کارڈ۔' :
               'Clean PDF/print-ready agronomic card with attribution, timestamp, soil parameters, confidence explanation, and disclaimer.'}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-xs space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-gray-900">
              {lang === 'hi' ? 'त्रैभाषिक सुलभता (English • हिन्दी • اردو)' :
               lang === 'ur' ? 'تین زبانوں میں دستیابی (English • हिन्दी • اردو)' :
               'Trilingual Accessibility (EN • HI • UR)'}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {lang === 'hi' ? 'अंग्रेजी, सरल किसान-अनुकूल हिन्दी और पूर्ण RTL समर्थन वाली उर्दू में संपूर्ण इंटरफ़ेस उपलब्ध।' :
               lang === 'ur' ? 'انگریزی، ہندی اور مکمل دائیں سے بائیں (RTL) اردو زبان میں کسان دوست انٹرفیس۔' :
               'Full native support for English, Hindi (हिन्दी), and Urdu (اردو) with seamless right-to-left (RTL) typography for agricultural accessibility.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
