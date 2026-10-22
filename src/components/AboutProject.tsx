import React from 'react';
import { Cpu, Database, FlaskConical, ShieldCheck, CheckCircle } from 'lucide-react';
import { Language } from '../utils/i18n';

interface AboutProjectProps {
  lang?: Language;
}

export const AboutProject: React.FC<AboutProjectProps> = ({ lang = 'en' }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-8 rounded-3xl border border-emerald-800 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
          <span>{lang === 'hi' ? 'परिशुद्ध कृषि एआई/एमएल प्रोजेक्ट' : lang === 'ur' ? 'زرعی اے آئی اور مشین لرننگ پروجیکٹ' : 'Precision Agriculture AI/ML Project'}</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          {lang === 'hi' ? 'सिस्टम आर्किटेक्चर एवं तकनीकी पारदर्शिता' :
           lang === 'ur' ? 'ماڈل کی تکنیکی ساخت اور سائنسی تفصیل' :
           'Project Architecture & Technical Transparency'}
        </h2>
        <p className="text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
          {lang === 'hi' ? (
            <><strong>क्रॉपवाइज़ एआई (CropWise AI)</strong> के पीछे काम करने वाले गणितीय सूत्र, गौसियन संभाव्यता वितरण और सांख्यिकीय डेटासेट की पूर्ण पारदर्शिता।</>
          ) : lang === 'ur' ? (
            <><strong>کراپ وائز اے آئی (CropWise AI)</strong> کے پس پردہ سائنسی مساوات، گاسین نیو بیز ماڈل اور کھاد کے فارمولوں کی مکمل وضاحت۔</>
          ) : (
            <>Complete algorithmic transparency, mathematical formulas, dataset provenance, and architectural guidelines behind <strong>CropWise AI</strong>.</>
          )}
        </p>
      </div>

      {/* 1. Academic Ethics & Non-Fabrication Guarantee */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <h3>{lang === 'hi' ? 'प्रणालीगत सत्यनिष्ठा एवं वास्तविक एमएल मॉडल' : lang === 'ur' ? 'سائنسی دیانت اور حقیقی مشین لرننگ' : 'System Integrity & Genuine ML Implementation'}</h3>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {lang === 'hi' ? (
            <>मूल सिद्धांत: <strong>फसल की भविष्यवाणी करने या खाद की खुराक तय करने के लिए किसी भ्रामक जनरेटिव एआई का उपयोग नहीं किया गया है।</strong> फसल अनुशंसा निरंतर गौसियन नेव बेयस (Gaussian Naive Bayes) क्लासिफायर द्वारा संचालित होती है, जबकि खाद सलाहकार पोषक तत्व संतुलन (INM) के वैज्ञानिक नियमों पर आधारित है।</>
          ) : lang === 'ur' ? (
            <>بنیادی اصول: <strong>فصل کے انتخاب اور کھاد کے تعین کے لیے کسی غیر مستند چیٹ بوٹ پر انحصار نہیں کیا گیا ہے۔</strong> یہ نظام مستند گاسین نیو بیز ماڈل اور روایتی زرعی سائنس کے مطابق کام کرتا ہے۔</>
          ) : (
            <>By foundational design: <strong>No generative AI hallucinations are used to fabricate crop predictions or invent fertilizer advice.</strong> The crop prediction system executes a continuous Gaussian Naive Bayes classifier fitted against empirical statistical parameters, while the fertilizer advisor evaluates stoichiometric agronomic balances.</>
          )}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">{lang === 'hi' ? 'स्वतंत्र एमएल व खाद मॉड्यूल' : lang === 'ur' ? 'علیحدہ ماڈلز' : 'Separate ML & Fertilizer Modules'}</strong>
              <p className="text-gray-500 text-[11px] mt-0.5">{lang === 'hi' ? 'फसल चयन और खाद गणना के इंजन पूरी तरह स्वतंत्र हैं।' : lang === 'ur' ? 'فصل کے چناؤ اور کھاد کی مقدار کے الگ الگ سائنسی طریقے ہیں۔' : 'Crop prediction model is cleanly decoupled from the agronomic fertilizer engine.'}</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">{lang === 'hi' ? 'कैलिब्रेटेड सॉफ्टमैक्स प्रायिकता' : lang === 'ur' ? 'شفاف امکانات' : 'Calibrated Softmax Probabilities'}</strong>
              <p className="text-gray-500 text-[11px] mt-0.5">{lang === 'hi' ? 'सभी २२ फसलों की संभावनाओं का योग १००% होता है।' : lang === 'ur' ? 'تمام ۲۲ فصلوں کے امکانی تناسب کا مجموعہ ۱۰۰ فیصد ہوتا ہے۔' : 'Probabilities sum to 100% with clear explanations of confidence interpretation.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Machine Learning Algorithm & Mathematical Formulation */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
          <Cpu className="w-5 h-5 text-emerald-600 shrink-0" />
          <h3>{lang === 'hi' ? 'मशीन लर्निंग मॉडल: गौसियन नेव बेयस (GNB)' : lang === 'ur' ? 'مشین لرننگ ماڈل: گاسین نیو بیز' : 'Machine Learning Architecture: Gaussian Naive Bayes'}</h3>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          {lang === 'hi' ? 'फसल अनुशंसा इंजन ७ कृषि-जलवायु मापदंडों पर २२ फसलों के सांख्यिकीय वितरण की गणना करता है:' :
           lang === 'ur' ? 'یہ ماڈل ۷ بنیادی عوامل کی بنیاد پر ۲۲ فصلوں کے امکانی توازن کا حساب لگاتا ہے:' :
           'The crop recommendation engine models the probability distribution of each of the 22 agricultural crop classes using continuous Gaussian likelihoods over 7 agro-climatic features:'}
        </p>

        {/* Formula Display Box */}
        <div className="p-4 rounded-xl bg-gray-950 text-emerald-300 font-mono text-xs space-y-3 overflow-x-auto shadow-inner math-formula" dir="ltr">
          <p className="text-gray-400 text-[11px]">// 1. Continuous Gaussian Density per Feature:</p>
          <p>P(x_i | C_k) = (1 / √(2π σ_k,i²)) * exp(-(x_i - μ_k,i)² / (2σ_k,i²))</p>

          <p className="text-gray-400 text-[11px] mt-2">// 2. Total Log-Likelihood Formulation (Uniform Prior P(C_k) = 1/22):</p>
          <p>ln P(C_k | X) = ln P(C_k) + ∑ [ -0.5*ln(2π σ_k,i²) - (x_i - μ_k,i)² / (2σ_k,i²) ]</p>

          <p className="text-gray-400 text-[11px] mt-2">// 3. Softmax Likelihood Normalization with Log-Sum-Exp (LSE):</p>
          <p>P(y = C_k | X) = exp(ln P(C_k|X) - max(LL)) / ∑ exp(ln P(C_j|X) - max(LL))</p>
        </div>

        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong>{lang === 'hi' ? 'मॉडल स्कोर व्याख्या:' : lang === 'ur' ? 'ماڈل اسکور کی وضاحت:' : 'Model Score Semantics:'}</strong>{' '}
          {lang === 'hi'
            ? 'सॉफ्टमैक्स द्वारा प्राप्त प्रतिशत २२ बेंचमार्क फसल प्रोफाइल के बीच सापेक्ष संभावना (relative likelihood) दर्शाता है। यह वास्तविक खेत में निरपेक्ष कैलिब्रेटेड प्रायिकता नहीं है।'
            : lang === 'ur'
            ? 'سافٹ میکس فیصد ۲۲ بینچ مارک فصلوں کے مابین تقابلی امکان کو ظاہر کرتا ہے، یہ کسی بھی غیر محدود کھیت کا حتمی سائنسی امکان نہیں ہے۔'
            : 'The softmax percentage reflects normalized relative likelihood across the 22 benchmark profiles, distinguishing model score ranking from empirically calibrated field confidence.'}
        </div>
      </div>

      {/* 3. The Dataset Provenance */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
          <Database className="w-5 h-5 text-emerald-600 shrink-0" />
          <h3>{lang === 'hi' ? 'फसल अनुशंसा बेंचमार्क डेटासेट' : lang === 'ur' ? 'تربیتی بینچ مارک ڈیٹا سیٹ' : 'Crop Recommendation Dataset Benchmark'}</h3>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {lang === 'hi' ? (
            <>मॉडल के सांख्यिकीय मापदंड मानक <strong>फसल अनुशंसा बेंचमार्क डेटासेट (२,२०० संदर्भ रिकॉर्ड्स, २२ फसल वर्ग)</strong> से प्राप्त किए गए हैं। <em>ध्यान दें: मूल रॉ सीएसवी फ़ाइल ऐप बंडल में शामिल नहीं है; मॉडल पूर्व-गणनाकृत गौसियन सांख्यिकीय प्रोफाइलों का मूल्यांकन करता है।</em></>
          ) : lang === 'ur' ? (
            <>ماڈل کے حسابی معیارات معروف <strong>کراپ ریکمنڈیشن تعلیمی بینچ مارک ڈیٹا سیٹ (۲،۲۰۰ حوالہ جاتی ریکارڈز، ۲۲ فصلیں)</strong> سے اخذ کیے گئے ہیں۔ <em>نوٹ: اصل خام فائل پروجیکٹ میں شامل نہیں ہے؛ ماڈل پہلے سے محفوظ شماریاتی پروفائلز پر عمل کرتا ہے۔</em></>
          ) : (
            <>Statistical parameters are derived from the standardized <strong>educational Crop Recommendation Benchmark Dataset</strong> (2,200 reference records, 22 crop classes, 100 samples per class). <em>Note: The raw CSV dataset is not bundled in the project; the engine computes likelihoods using precomputed Gaussian statistical profiles.</em></>
          )}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">{lang === 'hi' ? 'कुल संदर्भ पंक्तियाँ' : lang === 'ur' ? 'کل ریکارڈز' : 'Reference Records'}</span>
            <strong className="text-gray-900 text-sm ltr-num">2,200 Rows</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">{lang === 'hi' ? 'फसल वर्ग' : lang === 'ur' ? 'فصلیں' : 'Crop Classes'}</span>
            <strong className="text-gray-900 text-sm ltr-num">22 Classes</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">{lang === 'hi' ? 'प्रति वर्ग नमूने' : lang === 'ur' ? 'فی فصل نمونے' : 'Samples / Class'}</span>
            <strong className="text-gray-900 text-sm ltr-num">100 (Balanced)</strong>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">{lang === 'hi' ? 'मूल्यांकित कारक' : lang === 'ur' ? 'پیمائش شدہ عوامل' : 'Attributes'}</span>
            <strong className="text-gray-900 text-sm ltr-num">7 Features</strong>
          </div>
        </div>
      </div>

      {/* 4. Fertilizer Stoichiometry Engine */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
          <FlaskConical className="w-5 h-5 text-emerald-600 shrink-0" />
          <h3>{lang === 'hi' ? 'उर्वरक स्टोइकोमेट्री एवं पोषक तत्व सूत्र (सांकेतिक अनुमान)' : lang === 'ur' ? 'کھاد کا سائنسی فارمولا (علامتی تخمینہ)' : 'Fertilizer Recommendation & Stoichiometry (Illustrative Estimates)'}</h3>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          {lang === 'hi' ? 'रासायनिक उर्वरकों की गणना मानक वाणिज्यिक उर्वरक सांद्रता के आधार पर सांकेतिक खुराक के रूप में की जाती है:' :
           lang === 'ur' ? 'کیمیائی کھادوں کی مقدار تجارتی گریڈ کے تناسب سے علامتی طور پر معلوم کی جاتی ہے:' :
           'Chemical fertilizer requirements are calculated as illustrative stoichiometric estimates based on standard commercial grades:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <strong className="text-gray-900 block">{lang === 'hi' ? 'नाइट्रोजन (यूरिया) सूत्र:' : lang === 'ur' ? 'نائٹروجن (یوریا) فارمولا:' : 'Nitrogen (N) Formula:'}</strong>
            <p className="font-mono text-emerald-800 font-bold ltr-num">Urea = (Target_N - Soil_N) / 0.46</p>
            <p className="text-[11px] text-gray-500">{lang === 'hi' ? 'यूरिया में ४६% तात्विक नाइट्रोजन (N) होता है।' : lang === 'ur' ? 'یوریا میں ۴۶ فیصد نائٹروجن ہوتی ہے۔' : 'Neem-coated urea supplies 46% elemental nitrogen.'}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <strong className="text-gray-900 block">{lang === 'hi' ? 'फास्फोरस (एसएसपी) सूत्र:' : lang === 'ur' ? 'فاسفورس (ایس ایس پی) فارمولا:' : 'Phosphorus (P) Formula:'}</strong>
            <p className="font-mono text-emerald-800 font-bold ltr-num">SSP = (Target_P - Soil_P) / 0.16</p>
            <p className="text-[11px] text-gray-500">{lang === 'hi' ? 'एसएसपी में १६% P2O5 समतुल्य होता है।' : lang === 'ur' ? 'سنگل سپر فاسفیٹ میں ۱۶ فیصد P2O5 ہوتا ہے۔' : 'Single Super Phosphate delivers 16% P2O5 equivalent.'}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <strong className="text-gray-900 block">{lang === 'hi' ? 'पोटाश (एमओपी) सूत्र:' : lang === 'ur' ? 'پوٹاشیم (ایم او پی) فارمولا:' : 'Potassium (K) Formula:'}</strong>
            <p className="font-mono text-emerald-800 font-bold ltr-num">MOP = (Target_K - Soil_K) / 0.60</p>
            <p className="text-[11px] text-gray-500">{lang === 'hi' ? 'म्यूरेट ऑफ पोटाश में ६०% K2O समतुल्य होता है।' : lang === 'ur' ? 'میوریٹ آف پوٹاش میں ۶۰ فیصد K2O ہوتا ہے۔' : 'Muriate of Potash provides 60% K2O equivalent.'}</p>
          </div>
        </div>

        {/* Agronomic Disclaimer & Limitations */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
          <strong className="block font-bold">
            {lang === 'hi' ? '⚠️ कार्यप्रणाली एवं सीमाएं (Methodology & Limitations):' :
             lang === 'ur' ? '⚠️ سائنسی طریقہ کار اور حدود (Methodology & Limitations):' :
             '⚠️ Agronomic Methodology & Limitations:'}
          </strong>
          <ul className="list-disc pl-4 rtl:pr-4 rtl:pl-0 space-y-1 text-[11px] text-emerald-900">
            <li>
              {lang === 'hi'
                ? 'ऋणात्मक अंतर सुरक्षा: यदि वर्तमान मिट्टी में पोषक तत्व फसल की आवश्यकता से अधिक हैं, तो रासायनिक खाद की मात्रा शून्य रखी जाती है।'
                : lang === 'ur'
                ? 'منفی خسارے کا تحفظ: اگر زمین میں پہلے سے وافر اجزاء موجود ہوں تو غیر ضروری کیمیائی کھاد تجویز نہیں کی جاتی۔'
                : 'Negative-deficit protection: If measured soil nutrients exceed crop targets, recommended dosage is clamped to zero to prevent toxic accumulation.'}
            </li>
            <li>
              {lang === 'hi'
                ? 'इकाई आधार: मिट्टी परीक्षण मान और लक्ष्य मान सांकेतिक kg/ha में हैं। यह गणना काल्पनिक मृदा पुनर्प्राप्ति कारक (recovery efficiency) नहीं जोड़ती।'
                : lang === 'ur'
                ? 'پیمائش کی بنیاد: مٹی اور فصل کے اجزاء کلوگرام فی ہیکٹر میں ہیں۔ یہ حساب مٹی کی جذباتی شرح کا فرضی اضافہ نہیں کرتا۔'
                : 'Unit basis: Model inputs and target benchmarks are evaluated in nominal kg/ha equivalents without assuming synthetic nutrient recovery fractions.'}
            </li>
            <li>
              {lang === 'hi'
                ? 'खेत में वास्तविक अनुप्रयोग से पूर्व अधिकृत स्थानीय मृदा परीक्षण प्रयोगशाला और कृषि वैज्ञानिक की सलाह लेना अनिवार्य है।'
                : lang === 'ur'
                ? 'کھیت میں حتمی استعمال سے پہلے سرکاری زرعی لیبارٹری اور مقامی ماہر زراعت سے رہنمائی لینا لازمی ہے۔'
                : 'Local soil testing requirement: Field application must be calibrated against certified local laboratory soil-test interpretations (e.g. Olsen/Bray for P, NH4OAc for K) and regional extension guidance.'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
