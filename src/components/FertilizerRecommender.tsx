import React, { useState, useEffect } from 'react';
import { FertilizerRecommendationResult, CropFeatureInput } from '../types/index';
import { Language, TRANSLATIONS, getLocalizedCrop } from '../utils/i18n';
import { AlertCircle, CheckCircle2, ShieldCheck, Leaf, FlaskConical, Calendar, Info, RefreshCw } from 'lucide-react';

interface FertilizerRecommenderProps {
  selectedCrop: string;
  soilInput: CropFeatureInput;
  onSoilChange?: (newInput: CropFeatureInput) => void;
  lang?: Language;
}

export const FertilizerRecommender: React.FC<FertilizerRecommenderProps> = ({
  selectedCrop: initialCrop,
  soilInput: initialSoil,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];
  const [currentCrop, setCurrentCrop] = useState<string>(initialCrop || 'rice');
  const [soil, setSoil] = useState<CropFeatureInput>(initialSoil);
  const [fertResult, setFertResult] = useState<FertilizerRecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'chemical' | 'organic' | 'timeline'>('all');

  const availableCropKeys = [
    'rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans',
    'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango',
    'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya',
    'coconut', 'cotton', 'jute', 'coffee'
  ];

  const fetchFertilizerAdvice = async (cropKey: string, soilData: CropFeatureInput) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/recommend-fertilizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: cropKey, soilInput: soilData })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch fertilizer recommendations.');
      }

      const data: FertilizerRecommendationResult = await response.json();
      setFertResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error formulating fertilizer recommendation.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCrop) {
      setCurrentCrop(initialCrop);
    }
    if (initialSoil) {
      setSoil(initialSoil);
    }
    fetchFertilizerAdvice(initialCrop || 'rice', initialSoil);
  }, [initialCrop, initialSoil]);

  const handleRecalculate = () => {
    fetchFertilizerAdvice(currentCrop, soil);
  };

  const locCurrentCrop = getLocalizedCrop(currentCrop, lang);

  return (
    <div className="space-y-6">
      {/* Header & Crop Switcher */}
      <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{t.fertilizerAdvisorTitle}</span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {t.fertilizerAdvisorSub}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs font-semibold text-gray-700">{t.targetCropLabel}</label>
          <select
            value={currentCrop}
            onChange={(e) => {
              setCurrentCrop(e.target.value);
              fetchFertilizerAdvice(e.target.value, soil);
            }}
            className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2 focus:outline-hidden cursor-pointer"
          >
            {availableCropKeys.map(k => {
              const cLoc = getLocalizedCrop(k, lang);
              return (
                <option key={k} value={k}>
                  {cLoc.name}
                </option>
              );
            })}
          </select>
          <button
            onClick={handleRecalculate}
            disabled={loading}
            className="p-2 text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            title={t.recalculateBtn}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Illustrative Stoichiometric Estimate Banner */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-900">{t.illustrativeEstimateBadge}</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-200/70 text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
              {lang === 'hi' ? 'प्रयोगशाला कैलिब्रेशन आवश्यक' : lang === 'ur' ? 'لیب تصدیق درکار' : 'Lab Verification Required'}
            </span>
          </div>
          <p className="text-[11px] text-amber-900/90 leading-relaxed">
            {t.illustrativeEstimateDesc}
          </p>
        </div>
      </div>

      {fertResult && (
        <>
          {/* Soil pH Condition & Lime / Gypsum Card */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  {t.soilReactionDiagnosis}
                </span>
                <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="ltr-num">pH: {fertResult.soilPhAnalysis.currentPh}</span> —{' '}
                  <span>
                    {fertResult.soilPhAnalysis.currentPh < 6.0
                      ? t.acidic
                      : fertResult.soilPhAnalysis.currentPh > 7.5
                      ? t.alkaline
                      : t.neutral}
                  </span>
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t.cropOptimalPh}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 ltr-num">
                  {fertResult.soilPhAnalysis.optimalRange.join(' - ')} pH
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {fertResult.soilPhAnalysis.explanation}
            </p>

            {fertResult.soilPhAnalysis.amendmentNeeded ? (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{t.recommendedAmendment} {fertResult.soilPhAnalysis.amendmentNeeded}</span>
                </div>
                <p className="text-xs text-amber-800 font-mono ltr-num">
                  {t.prescribedDosage} {fertResult.soilPhAnalysis.amendmentDose}
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.noAmendmentNeeded}</span>
              </div>
            )}
          </div>

          {/* Navigation Tabs for Fertilizer Plans */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.allPrescriptionsTab}
            </button>
            <button
              onClick={() => setActiveTab('chemical')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'chemical'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.chemicalTab}
            </button>
            <button
              onClick={() => setActiveTab('organic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'organic'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.organicTab}
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.timelineTab}
            </button>
          </div>

          {/* Section: Chemical Fertilizers */}
          {(activeTab === 'all' || activeTab === 'chemical') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{t.mineralDoseSchedule}</span>
                </h4>
                <span className="text-[11px] text-gray-400">{t.exactDosesSub}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fertResult.chemicalFertilizers.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {item.nutrientTargeted}
                        </span>
                        <h5 className="text-base font-bold text-gray-900 mt-1">{item.fertilizerName}</h5>
                        <p className="text-xs font-mono text-gray-500 ltr-num">{item.fertilizerFormula}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-700 rounded-lg">
                        {item.applicationStage}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-3 bg-emerald-950/5 rounded-xl text-xs">
                      <div>
                        <span className="text-[10px] text-gray-500 block">{t.dosePerHa}</span>
                        <strong className="text-emerald-900 text-sm font-bold font-mono ltr-num">
                          {item.recommendedDoseKgPerHa} {t.kgPerHa}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">{t.dosePerAcre}</span>
                        <strong className="text-emerald-900 text-sm font-bold font-mono ltr-num">
                          {item.recommendedDoseKgPerAcre} {lang === 'hi' ? 'किग्रा/एकड़' : lang === 'ur' ? 'کلو/ایکڑ' : 'kg/acre'}
                        </strong>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-gray-800">{t.agronomicRationale} </strong>
                        <span className="text-gray-600">{item.whySuggested}</span>
                      </div>
                      <div>
                        <strong className="text-gray-800">{t.applicationMethod} </strong>
                        <span className="text-gray-600">{item.method}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-[11px]">
                        <strong>{t.precautionTitle} </strong>
                        {item.precaution}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Organic Alternatives */}
          {(activeTab === 'all' || activeTab === 'organic') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.organicAlternativesTitle}</span>
                </h4>
                <span className="text-[11px] text-gray-400">{t.organicSub}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fertResult.organicAlternatives.map((org) => (
                  <div
                    key={org.id}
                    className="bg-white rounded-2xl p-5 border border-emerald-900/10 shadow-sm space-y-3 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {org.nutrientTargeted}
                        </span>
                        <h5 className="text-base font-bold text-gray-900 mt-1">{org.fertilizerName}</h5>
                        <p className="text-xs font-mono text-gray-500 ltr-num">{org.fertilizerFormula}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                        {lang === 'hi' ? 'जैव-उर्वरक' : lang === 'ur' ? 'نامیاتی کھاد' : 'Bio-agent'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-3 bg-emerald-950/5 rounded-xl text-xs">
                      <div>
                        <span className="text-[10px] text-gray-500 block">{t.dosePerHa}</span>
                        <strong className="text-emerald-900 text-sm font-bold font-mono ltr-num">
                          {org.recommendedDoseKgPerHa} {t.kgPerHa}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block">{t.dosePerAcre}</span>
                        <strong className="text-emerald-900 text-sm font-bold font-mono ltr-num">
                          {org.recommendedDoseKgPerAcre} {lang === 'hi' ? 'किग्रा/एकड़' : lang === 'ur' ? 'کلو/ایکڑ' : 'kg/acre'}
                        </strong>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-gray-800">{t.biologicalAction} </strong>
                        <span className="text-gray-600">{org.whySuggested}</span>
                      </div>
                      <div>
                        <strong className="text-gray-800">{t.applicationMethod} </strong>
                        <span className="text-gray-600">{org.method}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Timeline */}
          {(activeTab === 'all' || activeTab === 'timeline') && (
            <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{t.inmTimelineTitle}</span>
                </h4>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {t.sustainabilityScore} <strong className="ltr-num">{fertResult.sustainabilityScore}/100</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
                    <span>{t.stage1Title}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-snug">{fertResult.integratedNutrientPlan.basalApplication}</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
                    <span>{t.stage2Title}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-snug">{fertResult.integratedNutrientPlan.firstTopDressing}</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">3</span>
                    <span>{t.stage3Title}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-snug">{fertResult.integratedNutrientPlan.secondTopDressing}</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">4</span>
                    <span>{t.stage4Title}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-snug">{fertResult.integratedNutrientPlan.foliarSpray || (lang === 'hi' ? 'केवल सामान्य पानी का छिड़काव' : lang === 'ur' ? 'معمول کا پانی اسپرے' : 'Standard water spray only')}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200/70 text-[11px] text-gray-500">
                <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span>{fertResult.disclaimer}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
