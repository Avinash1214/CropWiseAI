import React from 'react';
import { CropRecommendationResult, CropFeatureInput } from '../types/index';
import { Language, TRANSLATIONS, getLocalizedCrop } from '../utils/i18n';
import { Award, Droplets, Calendar, ShieldAlert, Sparkles, Layers, ArrowRight, Printer } from 'lucide-react';

interface CropResultViewProps {
  result: CropRecommendationResult;
  input: CropFeatureInput;
  onRequestFertilizer: (crop: string, input: CropFeatureInput) => void;
  onOpenReport: () => void;
  onSelectAlternative?: (altCropKey: string) => void;
  lang?: Language;
}

export const CropResultView: React.FC<CropResultViewProps> = ({
  result,
  input,
  onRequestFertilizer,
  onOpenReport,
  onSelectAlternative,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];
  const locCrop = getLocalizedCrop(result.recommendedCrop, lang);

  // Generate localized explanation based on selected language
  const localizedInterpretation =
    lang === 'hi'
      ? `वर्तमान मिट्टी के पोषक तत्वों (N: ${input.nitrogen}, P: ${input.phosphorus}, K: ${input.potassium} किग्रा/हे.) और मौसम (वर्षा: ${input.rainfall} मिमी, तापमान: ${input.temperature}°C) के आधार पर ${locCrop.name} की बुवाई सर्वाधिक लाभकारी और सुरक्षित विकल्प है।`
      : lang === 'ur'
      ? `موجودہ مٹی کے تجزیے (نائٹروجن: ${input.nitrogen}، فاسفورس: ${input.phosphorus}، پوٹاشیم: ${input.potassium} کلو/ہیکٹر) اور آب و ہوا (بارش: ${input.rainfall} ملی میٹر، درجہ حرارت: ${input.temperature}°C) کے تحت ${locCrop.name} کی کاشت سب سے زیادہ موزوں اور منافع بخش ہے۔`
      : result.confidenceInterpretation;

  return (
    <div className="space-y-6">
      {/* Top Winner Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50">
        {/* Subtle background plant vein art */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center rtl:right-auto rtl:left-0">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full scale-150">
            <path d="M10,90 Q50,50 90,10 Q50,30 10,90 Z" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                {t.optimalMatchBadge}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 text-emerald-100 border border-white/10">
                {locCrop.category} {t.cropCategorySuffix}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 text-emerald-100 border border-white/10">
                {locCrop.season} {t.seasonSuffix}
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                {locCrop.name}
              </h2>
              <p className="text-emerald-200/90 italic font-serif text-sm mt-0.5 botanical-name">
                {t.botanicalTaxon}: {result.botanicalName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {localizedInterpretation}
            </p>
          </div>

          {/* Radial Confidence Gauge */}
          <div className="shrink-0 flex flex-col items-center bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 min-w-[170px] text-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-emerald-950/40"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray={`${result.confidencePercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white ltr-num">{result.confidencePercentage}%</span>
                <span className="text-[9px] font-bold tracking-wider text-emerald-200 uppercase">{t.posteriorLabel}</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 mt-2">{t.softmaxConfidence}</span>
            <span className="text-[9px] text-emerald-300/70">Gaussian Naive Bayes</span>
          </div>
        </div>

        {/* Quick Specs Ribbon */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/40 text-xs">
          <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-600/30">
            <div className="flex items-center gap-1.5 text-emerald-300 mb-1">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold text-[11px]">{t.growingCycle}</span>
            </div>
            <p className="text-white font-medium ltr-num">{result.cropProfile.durationDays}</p>
          </div>

          <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-600/30">
            <div className="flex items-center gap-1.5 text-emerald-300 mb-1">
              <Droplets className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold text-[11px]">{t.waterNeeds}</span>
            </div>
            <p className="text-white font-medium truncate" title={result.cropProfile.waterRequirement}>
              {result.cropProfile.waterRequirement.split('(')[0]}
            </p>
          </div>

          <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-600/30">
            <div className="flex items-center gap-1.5 text-emerald-300 mb-1">
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold text-[11px]">{t.preferredSoil}</span>
            </div>
            <p className="text-white font-medium truncate" title={result.cropProfile.soilType}>
              {result.cropProfile.soilType.split(',')[0]}
            </p>
          </div>

          <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-600/30">
            <div className="flex items-center gap-1.5 text-emerald-300 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold text-[11px]">{t.keyDiseases}</span>
            </div>
            <p className="text-white font-medium truncate" title={result.cropProfile.commonDiseases.join(', ')}>
              {result.cropProfile.commonDiseases[0] || 'None reported'}
            </p>
          </div>
        </div>

        {/* Action Buttons in Hero */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-emerald-700/30">
          <button
            onClick={() => onRequestFertilizer(result.recommendedCrop, input)}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{t.generateFertilizerFor} {locCrop.name.split('(')[0]}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            onClick={onOpenReport}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.exportReportBtn}</span>
          </button>
        </div>
      </div>

      {/* Alternatives Section */}
      {result.alternatives && result.alternatives.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                {t.viableAlternatives}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.alternativesSub}
              </p>
            </div>
            <span className="text-[11px] font-mono text-gray-400">
              {lang === 'hi' ? 'कुल २२ जांची गईं' : lang === 'ur' ? 'کل ۲۲ کا جائزہ' : 'Total 22 Evaluated'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.alternatives.map((alt, idx) => {
              const altLoc = getLocalizedCrop(alt.crop, lang);
              const suitabilityLabel =
                alt.suitability === 'High'
                  ? t.suitabilityHigh
                  : alt.suitability === 'Moderate'
                  ? t.suitabilityModerate
                  : t.suitabilityMarginal;

              return (
                <div
                  key={alt.crop}
                  className="p-4 rounded-xl border border-gray-200/80 bg-gray-50/50 hover:bg-white hover:border-emerald-500/50 transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-400 uppercase">
                        {t.rankPrefix}{idx + 2}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alt.suitability === 'High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : alt.suitability === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {suitabilityLabel}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 mt-1">{altLoc.name}</h4>
                    <p className="text-xs text-gray-600 leading-snug">{altLoc.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-500">{t.posteriorLabel}</span>
                      <span className="text-emerald-700 font-mono ltr-num">{alt.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, alt.percentage * 2)}%` }}
                      />
                    </div>

                    {onSelectAlternative && (
                      <button
                        onClick={() => onSelectAlternative(alt.crop)}
                        className="w-full mt-3 py-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-bold bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                      >
                        {t.analyzeFertilizerForAlt} {altLoc.name.split('(')[0]}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
