import React from 'react';
import { CropRecommendationResult, FertilizerRecommendationResult, CropFeatureInput } from '../types/index';
import { Language, TRANSLATIONS, getLocalizedCrop } from '../utils/i18n';
import { Printer, ArrowLeft, Award } from 'lucide-react';
import { CropWiseLogo } from './CropWiseLogo';

interface PrintableReportProps {
  cropResult: CropRecommendationResult | null;
  fertilizerResult: FertilizerRecommendationResult | null;
  soilInput: CropFeatureInput;
  onBack: () => void;
  lang?: Language;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  cropResult,
  fertilizerResult,
  soilInput,
  onBack,
  lang = 'en'
}) => {
  const t = TRANSLATIONS[lang];

  const handlePrint = () => {
    window.print();
  };

  const reportId = `CW-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : lang === 'ur' ? 'ur-PK' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const locCrop = cropResult ? getLocalizedCrop(cropResult.recommendedCrop, lang) : null;

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-xs print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-emerald-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t.backToDashboard}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printPdfBtn}</span>
          </button>
        </div>
      </div>

      {/* The Printable Document */}
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-lg max-w-4xl mx-auto space-y-8 print:shadow-none print:border-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-emerald-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CropWiseLogo size={48} />
            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-900">
                {lang === 'hi' ? 'क्रॉपवाइज़ एआई कृषि नैदानिक रिपोर्ट' :
                 lang === 'ur' ? 'کراپ وائز اے آئی زرعی تشخیصی رپورٹ' :
                 'CropWise AI Agronomic Diagnostic Report'}
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right rtl:sm:text-left text-xs text-gray-500 space-y-0.5">
            <p><strong className="text-gray-800">{t.reportRef}</strong> <span className="ltr-num">{reportId}</span></p>
            <p><strong className="text-gray-800">{t.dateIssued}</strong> {dateStr}</p>
            <p><strong className="text-gray-800">{t.domainLabel}</strong></p>
          </div>
        </div>

        {/* Section 1: Laboratory Soil Sample Reading */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-gray-100 pb-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
            <span>{t.reportTelemetryTitle}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold block">{t.nitrogenLabel}</span>
              <strong className="text-base text-gray-900 font-mono ltr-num">{soilInput.nitrogen}</strong>
              <span className="text-[10px] text-gray-400 block ltr-num">{t.kgPerHa}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold block">{t.phosphorusLabel}</span>
              <strong className="text-base text-gray-900 font-mono ltr-num">{soilInput.phosphorus}</strong>
              <span className="text-[10px] text-gray-400 block ltr-num">{t.kgPerHa}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold block">{t.potassiumLabel}</span>
              <strong className="text-base text-gray-900 font-mono ltr-num">{soilInput.potassium}</strong>
              <span className="text-[10px] text-gray-400 block ltr-num">{t.kgPerHa}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold block">{t.phLabel}</span>
              <strong className="text-base text-gray-900 font-mono ltr-num">{soilInput.ph}</strong>
              <span className="text-[10px] text-gray-400 block">pH</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold block">{t.tempLabel}</span>
              <strong className="text-base text-gray-900 font-mono ltr-num">{soilInput.temperature}</strong>
              <span className="text-[10px] text-gray-400 block ltr-num">{t.celsius}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold block">{t.humidityLabel}</span>
              <strong className="text-base text-gray-900 font-mono ltr-num">{soilInput.humidity}</strong>
              <span className="text-[10px] text-gray-400 block ltr-num">{t.percent}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] text-gray-500 font-bold block">{t.rainfallLabel}</span>
              <strong className="text-base text-gray-900 font-mono ltr-num">{soilInput.rainfall}</strong>
              <span className="text-[10px] text-gray-400 block ltr-num">{t.mmPerYear}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Machine Learning Prediction Result */}
        {cropResult && locCrop && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-gray-100 pb-1.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t.reportCropTitle}</span>
            </h2>

            <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {t.optimalMatchBadge}
                </span>
                <h3 className="text-2xl font-black text-emerald-950 mt-1">{locCrop.name}</h3>
                <p className="text-xs text-emerald-800 italic font-serif botanical-name">
                  {t.botanicalTaxon}: {cropResult.botanicalName} ({locCrop.category} • {locCrop.season})
                </p>
                <p className="text-xs text-gray-600 mt-2 max-w-xl">
                  {locCrop.desc}
                </p>
              </div>

              <div className="shrink-0 text-center bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs min-w-[140px]">
                <span className="text-3xl font-black text-emerald-800 font-mono ltr-num">
                  {cropResult.confidencePercentage}%
                </span>
                <span className="text-[10px] block font-bold text-gray-500 uppercase mt-0.5">{t.posteriorLabel}</span>
                <span className="text-[9px] text-gray-400 block">{t.softmaxConfidence}</span>
              </div>
            </div>

            {/* Alternatives */}
            {cropResult.alternatives && cropResult.alternatives.length > 0 && (
              <div className="text-xs space-y-1">
                <span className="font-semibold text-gray-700">{t.viableAlternatives}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {cropResult.alternatives.map((alt, idx) => {
                    const altL = getLocalizedCrop(alt.crop, lang);
                    return (
                      <div key={alt.crop} className="p-2.5 rounded-lg border border-gray-100 bg-gray-50 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-bold">{t.rankPrefix}{idx + 2}</span>
                          <strong className="text-gray-800">{altL.name}</strong>
                        </div>
                        <span className="font-mono font-bold text-emerald-800 ltr-num">{alt.percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section 3: Fertilizer Prescription */}
        {fertilizerResult && (
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-gray-100 pb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>{t.reportFertilizerTitle}</span>
            </h2>

            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              <strong>{t.illustrativeEstimateBadge}</strong> — {t.soilTestingLabRequired}
            </div>

            {/* pH diagnosis */}
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
              <strong className="text-gray-900">{t.soilReactionDiagnosis}: </strong>
              <span className="text-gray-700">
                {soilInput.ph < 6.0 ? t.acidic : soilInput.ph > 7.5 ? t.alkaline : t.neutral} (<span className="ltr-num">{soilInput.ph} pH</span>).{' '}
              </span>
              {fertilizerResult.soilPhAnalysis.amendmentNeeded ? (
                <span className="text-amber-800 font-medium">
                  {t.recommendedAmendment} {fertilizerResult.soilPhAnalysis.amendmentNeeded} ({fertilizerResult.soilPhAnalysis.amendmentDose}).
                </span>
              ) : (
                <span className="text-emerald-800 font-medium">{t.noAmendmentNeeded}</span>
              )}
            </div>

            {/* Chemical & Organic Fertilizers Table */}
            <table className="w-full text-left rtl:text-right border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">{lang === 'hi' ? 'लक्षित तत्व' : lang === 'ur' ? 'غذائی جزو' : 'Target Nutrient'}</th>
                  <th className="py-2.5 px-3">{lang === 'hi' ? 'उर्वरक का नाम' : lang === 'ur' ? 'کھاد کا نام' : 'Fertilizer Product'}</th>
                  <th className="py-2.5 px-3">{t.dosePerHa}</th>
                  <th className="py-2.5 px-3">{t.dosePerAcre}</th>
                  <th className="py-2.5 px-3">{lang === 'hi' ? 'अवस्था' : lang === 'ur' ? 'مرحلہ' : 'Stage'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {fertilizerResult.chemicalFertilizers.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-3 font-semibold">{f.nutrientTargeted}</td>
                    <td className="py-2.5 px-3 font-medium">{f.fertilizerName}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-800 ltr-num">{f.recommendedDoseKgPerHa} {t.kgPerHa}</td>
                    <td className="py-2.5 px-3 font-mono text-gray-600 ltr-num">{f.recommendedDoseKgPerAcre} kg/acre</td>
                    <td className="py-2.5 px-3 text-gray-500">{f.applicationStage}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* INM Schedule */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 text-xs space-y-2">
              <strong className="text-gray-900 block font-bold">{t.inmTimelineTitle}:</strong>
              <ul className="list-disc pl-4 rtl:pr-4 rtl:pl-0 space-y-1 text-gray-600">
                <li><strong>{t.stage1Title}: </strong>{fertilizerResult.integratedNutrientPlan.basalApplication}</li>
                <li><strong>{t.stage2Title}: </strong>{fertilizerResult.integratedNutrientPlan.firstTopDressing}</li>
                <li><strong>{t.stage3Title}: </strong>{fertilizerResult.integratedNutrientPlan.secondTopDressing}</li>
              </ul>
            </div>
          </div>
        )}

        {/* Technical Validation & Signatures */}
        <div className="pt-6 border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-1 max-w-md text-[11px]">
            <p className="font-bold text-gray-700">
              {lang === 'hi' ? 'वैज्ञानिक एवं कृषि सत्यनिष्ठा घोषणा:' :
               lang === 'ur' ? 'سائنسی اور زرعی دیانت داری کا اعلان:' :
               'Engineering & Agronomic Integrity Declaration:'}
            </p>
            <p>{t.reportDisclaimer}</p>
          </div>

          <div className="text-left sm:text-right rtl:sm:text-left space-y-4">
            <div className="w-40 border-b border-gray-400"></div>
            <p className="font-semibold text-gray-800">{t.reportSignatoryTitle}</p>
            <p className="text-[10px] text-gray-400">CropWise AI Verified System</p>
          </div>
        </div>
      </div>
    </div>
  );
};
