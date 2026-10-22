import React, { useState } from 'react';
import { CropFeatureInput, CropRecommendationResult } from '../types/index';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { Sparkles, RotateCcw, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CropRecommenderProps {
  initialValues?: CropFeatureInput;
  onRecommendationReceived: (result: CropRecommendationResult, input: CropFeatureInput) => void;
  lang: Language;
}

const DEFAULT_INPUTS: CropFeatureInput = {
  nitrogen: 80,
  phosphorus: 48,
  potassium: 40,
  temperature: 24.0,
  humidity: 82.0,
  ph: 6.4,
  rainfall: 220.0
};

export const CropRecommender: React.FC<CropRecommenderProps> = ({
  initialValues = DEFAULT_INPUTS,
  onRecommendationReceived,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [inputs, setInputs] = useState<CropFeatureInput>(initialValues);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const presets = [
    {
      id: 'rice',
      label: lang === 'hi' ? 'धान (चावल)' : lang === 'ur' ? 'چاول (دھان)' : 'Monsoon Rice',
      desc: lang === 'hi' ? 'अधिक वर्षा व N' : lang === 'ur' ? 'زیادہ بارش و N' : 'High Rain & N',
      icon: '🌾',
      values: { nitrogen: 80, phosphorus: 48, potassium: 40, temperature: 24, humidity: 82, ph: 6.4, rainfall: 236 }
    },
    {
      id: 'chickpea',
      label: lang === 'hi' ? 'रबी चना' : lang === 'ur' ? 'ربی چنا' : 'Rabi Chickpea',
      desc: lang === 'hi' ? 'कम वर्षा व P' : lang === 'ur' ? 'کم بارش و P' : 'Cool & Dry Rabi',
      icon: '🌱',
      values: { nitrogen: 40, phosphorus: 68, potassium: 80, temperature: 18.8, humidity: 17, ph: 7.3, rainfall: 80 }
    },
    {
      id: 'cotton',
      label: lang === 'hi' ? 'कपास (सफेद सोना)' : lang === 'ur' ? 'کپاس (سفید سونا)' : 'Cotton',
      desc: lang === 'hi' ? 'काली मिट्टी' : lang === 'ur' ? 'کالی زمین' : 'Black Soil & N',
      icon: '☁️',
      values: { nitrogen: 118, phosphorus: 46, potassium: 20, temperature: 24, humidity: 80, ph: 6.8, rainfall: 80 }
    },
    {
      id: 'coffee',
      label: lang === 'hi' ? 'पहाड़ी कॉफी' : lang === 'ur' ? 'پہاڑی کافی' : 'Hill Coffee',
      desc: lang === 'hi' ? 'छाया व नमी' : lang === 'ur' ? 'سایہ و زرخیز' : 'Hill Forest Flora',
      icon: '☕',
      values: { nitrogen: 101, phosphorus: 29, potassium: 30, temperature: 25.5, humidity: 59, ph: 6.8, rainfall: 158 }
    },
    {
      id: 'grapes',
      label: lang === 'hi' ? 'नासिक अंगूर' : lang === 'ur' ? 'انگور' : 'Table Grapes',
      desc: lang === 'hi' ? 'अधिक पोटाश (K)' : lang === 'ur' ? 'زیادہ پوٹاش (K)' : 'High Potassium (K)',
      icon: '🍇',
      values: { nitrogen: 23, phosphorus: 133, potassium: 200, temperature: 23.8, humidity: 82, ph: 6.0, rainfall: 70 }
    },
    {
      id: 'maize',
      label: lang === 'hi' ? 'मक्का (भुट्टा)' : lang === 'ur' ? 'مکئی' : 'Maize',
      desc: lang === 'hi' ? 'संतुलित दोमट' : lang === 'ur' ? 'متوازن زمین' : 'Balanced Loam',
      icon: '🌽',
      values: { nitrogen: 78, phosphorus: 48, potassium: 20, temperature: 22.4, humidity: 65, ph: 6.3, rainfall: 65 }
    }
  ];

  const handleInputChange = (field: keyof CropFeatureInput, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value
    }));
    setServerError(null);
  };

  const applyPreset = (presetVals: CropFeatureInput) => {
    setInputs({ ...presetVals });
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    try {
      const response = await fetch('/api/recommend-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.details?.join(', ') || data.error || t.predictionFailed);
      }

      const result: CropRecommendationResult = await response.json();

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10b981', '#059669', '#34d399', '#f59e0b']
        });
      } catch {
        // no-op if confetti blocked
      }

      onRecommendationReceived(result, inputs);
    } catch (err: any) {
      setServerError(err.message || t.predictionFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Demo Presets Banner */}
      <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-600 text-white text-xs">⚡</span>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{t.demoPresets}</h4>
              <p className="text-xs text-gray-500">{t.loadScenario}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => applyPreset(DEFAULT_INPUTS)}
            className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-semibold self-start sm:self-auto transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetToStandard}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {presets.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p.values)}
              className="p-2.5 bg-white hover:bg-emerald-50 rounded-xl border border-emerald-900/10 hover:border-emerald-600/30 text-left transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">{p.icon}</span>
                <span className="text-[10px] text-gray-400 group-hover:text-emerald-700 font-mono">
                  {lang === 'ur' ? 'منتخب' : lang === 'hi' ? 'चुनें' : 'Select'}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight">{p.label}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm space-y-8">
        <div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                🌾 {t.soilParametersTitle}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.soilParametersSub}
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              {t.modelInputFormBadge}
            </span>
          </div>
        </div>

        {/* Server Error Banner */}
        {serverError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">{t.inputError} </strong>
              <p className="mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        {/* Section 1: Soil Macronutrients (N - P - K) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              {t.section1Title}
            </span>
            <span className="text-[11px] text-gray-400">{t.section1Sub}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nitrogen Input */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px]">N</span>
                  {t.nitrogenLabel}
                </label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    min={0}
                    max={140}
                    step={1}
                    value={inputs.nitrogen}
                    onChange={e => handleInputChange('nitrogen', parseFloat(e.target.value))}
                    className="w-16 text-right font-mono text-xs font-bold text-gray-800 focus:outline-hidden ltr-num"
                  />
                  <span className="text-[10px] text-gray-400 ltr-num">{t.kgPerHa}</span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={140}
                step={1}
                value={inputs.nitrogen}
                onChange={e => handleInputChange('nitrogen', parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer slider-track"
              />

              <div className="flex justify-between text-[10px] text-gray-400">
                <span className="ltr-num">0 ({t.low})</span>
                <span className="font-medium text-emerald-800 ltr-num">0–140</span>
                <span className="ltr-num">140 ({t.high})</span>
              </div>
            </div>

            {/* Phosphorus Input */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-amber-600 text-white flex items-center justify-center font-bold text-[11px]">P</span>
                  {t.phosphorusLabel}
                </label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    min={0}
                    max={145}
                    step={1}
                    value={inputs.phosphorus}
                    onChange={e => handleInputChange('phosphorus', parseFloat(e.target.value))}
                    className="w-16 text-right font-mono text-xs font-bold text-gray-800 focus:outline-hidden ltr-num"
                  />
                  <span className="text-[10px] text-gray-400 ltr-num">{t.kgPerHa}</span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={145}
                step={1}
                value={inputs.phosphorus}
                onChange={e => handleInputChange('phosphorus', parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer slider-track"
              />

              <div className="flex justify-between text-[10px] text-gray-400">
                <span className="ltr-num">0 ({t.low})</span>
                <span className="font-medium text-amber-800 ltr-num">0–145</span>
                <span className="ltr-num">145 ({t.high})</span>
              </div>
            </div>

            {/* Potassium Input */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-purple-600 text-white flex items-center justify-center font-bold text-[11px]">K</span>
                  {t.potassiumLabel}
                </label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    min={0}
                    max={205}
                    step={1}
                    value={inputs.potassium}
                    onChange={e => handleInputChange('potassium', parseFloat(e.target.value))}
                    className="w-16 text-right font-mono text-xs font-bold text-gray-800 focus:outline-hidden ltr-num"
                  />
                  <span className="text-[10px] text-gray-400 ltr-num">{t.kgPerHa}</span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={205}
                step={1}
                value={inputs.potassium}
                onChange={e => handleInputChange('potassium', parseFloat(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer slider-track"
              />

              <div className="flex justify-between text-[10px] text-gray-400">
                <span className="ltr-num">0 ({t.low})</span>
                <span className="font-medium text-purple-800 ltr-num">0–205</span>
                <span className="ltr-num">205 ({t.high})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Soil pH & Agro-Climatic Parameters */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              {t.section2Title}
            </span>
            <span className="text-[11px] text-gray-400">{t.section2Sub}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Soil pH */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800">{t.phLabel}</label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    min={3.5}
                    max={9.9}
                    step={0.1}
                    value={inputs.ph}
                    onChange={e => handleInputChange('ph', parseFloat(e.target.value))}
                    className="w-14 text-right font-mono text-xs font-bold text-gray-800 focus:outline-hidden ltr-num"
                  />
                  <span className="text-[10px] text-gray-400 ltr-num">pH</span>
                </div>
              </div>

              <input
                type="range"
                min={3.5}
                max={9.9}
                step={0.1}
                value={inputs.ph}
                onChange={e => handleInputChange('ph', parseFloat(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer slider-track"
              />

              <div className="flex justify-between text-[10px] text-gray-400">
                <span className="ltr-num">3.5 ({t.acidic})</span>
                <span className="font-medium text-teal-800 ltr-num">{t.neutral}</span>
                <span className="ltr-num">9.9 ({t.alkaline})</span>
              </div>
            </div>

            {/* Temperature */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800">{t.tempLabel}</label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    min={8}
                    max={45}
                    step={0.5}
                    value={inputs.temperature}
                    onChange={e => handleInputChange('temperature', parseFloat(e.target.value))}
                    className="w-14 text-right font-mono text-xs font-bold text-gray-800 focus:outline-hidden ltr-num"
                  />
                  <span className="text-[10px] text-gray-400 ltr-num">{t.celsius}</span>
                </div>
              </div>

              <input
                type="range"
                min={8}
                max={45}
                step={0.5}
                value={inputs.temperature}
                onChange={e => handleInputChange('temperature', parseFloat(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer slider-track"
              />

              <div className="flex justify-between text-[10px] text-gray-400">
                <span className="ltr-num">8°C ({t.cool})</span>
                <span className="font-medium text-orange-800 ltr-num">8–45°C</span>
                <span className="ltr-num">45°C ({t.hot})</span>
              </div>
            </div>

            {/* Relative Humidity */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800">{t.humidityLabel}</label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    min={14}
                    max={100}
                    step={1}
                    value={inputs.humidity}
                    onChange={e => handleInputChange('humidity', parseFloat(e.target.value))}
                    className="w-14 text-right font-mono text-xs font-bold text-gray-800 focus:outline-hidden ltr-num"
                  />
                  <span className="text-[10px] text-gray-400 ltr-num">{t.percent}</span>
                </div>
              </div>

              <input
                type="range"
                min={14}
                max={100}
                step={1}
                value={inputs.humidity}
                onChange={e => handleInputChange('humidity', parseFloat(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer slider-track"
              />

              <div className="flex justify-between text-[10px] text-gray-400">
                <span className="ltr-num">14% ({t.dry})</span>
                <span className="font-medium text-cyan-800 ltr-num">14–100%</span>
                <span className="ltr-num">100% ({t.humid})</span>
              </div>
            </div>

            {/* Rainfall */}
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/60 space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-800">{t.rainfallLabel}</label>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    min={0}
                    max={300}
                    step={1}
                    value={inputs.rainfall}
                    onChange={e => handleInputChange('rainfall', parseFloat(e.target.value))}
                    className="w-16 text-right font-mono text-xs font-bold text-gray-800 focus:outline-hidden ltr-num"
                  />
                  <span className="text-[10px] text-gray-400 ltr-num">{t.mmPerYear}</span>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={300}
                step={1}
                value={inputs.rainfall}
                onChange={e => handleInputChange('rainfall', parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer slider-track"
              />

              <div className="flex justify-between text-[10px] text-gray-400">
                <span className="ltr-num">0 mm ({t.low})</span>
                <span className="font-medium text-blue-800 ltr-num">0–300 mm</span>
                <span className="ltr-num">300 mm ({t.high})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button & Technical Notice */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.gnbEvaluationNotice}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>{t.calculating}</span>
              </>
            ) : (
              <>
                <span>{t.predictCropBtn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
