import React from 'react';
import { FeatureAlignment, NutrientStatus } from '../types/index';
import { Language } from '../utils/i18n';

interface SoilRadarChartProps {
  alignments: FeatureAlignment[];
  cropName: string;
  nutrientBreakdown?: NutrientStatus[];
  lang?: Language;
}

export const SoilRadarChart: React.FC<SoilRadarChartProps> = ({
  alignments,
  cropName,
  nutrientBreakdown,
  lang = 'en'
}) => {
  // Radar geometry
  const size = 340;
  const center = size / 2;
  const radius = 115;
  const totalAxes = alignments.length;

  const getCoordinates = (index: number, valuePct: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (valuePct / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  const userPolygonPoints = alignments.map((item, idx) => {
    const coords = getCoordinates(idx, Math.max(15, Math.min(100, item.score)));
    return `${coords.x},${coords.y}`;
  }).join(' ');

  const idealPolygonPoints = alignments.map((_, idx) => {
    const coords = getCoordinates(idx, 90);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const getLocalizedFeatureLabel = (label: string): string => {
    if (lang === 'hi') {
      if (label.includes('Nitrogen')) return 'नाइट्रोजन (N)';
      if (label.includes('Phosphorus')) return 'फास्फोरस (P)';
      if (label.includes('Potassium')) return 'पोटेशियम (K)';
      if (label.includes('Temperature')) return 'तापमान (°C)';
      if (label.includes('Humidity')) return 'आर्द्रता (%)';
      if (label.includes('pH')) return 'मृदा pH';
      if (label.includes('Rainfall')) return 'वर्षा (मिमी)';
    } else if (lang === 'ur') {
      if (label.includes('Nitrogen')) return 'نائٹروجن (N)';
      if (label.includes('Phosphorus')) return 'فاسفورس (P)';
      if (label.includes('Potassium')) return 'پوٹاشیم (K)';
      if (label.includes('Temperature')) return 'درجہ حرارت (°C)';
      if (label.includes('Humidity')) return 'نمی (%)';
      if (label.includes('pH')) return 'پی ایچ (pH)';
      if (label.includes('Rainfall')) return 'بارش (ملی میٹر)';
    }
    return label;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {lang === 'hi' ? 'मृदा एवं कृषि-जलवायु बहु-अक्षीय रडार' :
               lang === 'ur' ? 'مٹی اور موسمی عوامل کا کثیر جہتی ریڈار' :
               'Soil & Agro-Climatic Multi-Axis Radar'}
            </span>
          </h3>
          <p className="text-xs text-gray-500">
            {lang === 'hi' ? (
              <>आपकी मिट्टी के परीक्षण मान और <strong className="text-emerald-800">{cropName}</strong> की आदर्श आवश्यकताओं का तुलनात्मक विश्लेषण।</>
            ) : lang === 'ur' ? (
              <>مٹی کے تجزیے اور <strong className="text-emerald-800">{cropName}</strong> کی مثالی ضروریات کا براہ راست موازنہ۔</>
            ) : (
              <>Real-time biometric comparison between your soil inputs and <strong className="text-emerald-800">{cropName}</strong> optimal physiological requirements.</>
            )}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
            <span className="text-gray-700">
              {lang === 'hi' ? 'आपकी मिट्टी' : lang === 'ur' ? 'آپ کی مٹی' : 'Your Soil Profile'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-sm bg-amber-400 border border-amber-600 inline-block"></span>
            <span className="text-gray-500">
              {lang === 'hi' ? 'आदर्श मानक (१००%)' : lang === 'ur' ? 'مثالی معیار (100%)' : 'Ideal Benchmark (100%)'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar SVG */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative">
            <svg width={size} height={size} className="overflow-visible">
              {/* Concentric rings */}
              {gridLevels.map((lvl, lIdx) => {
                const ringPoints = alignments.map((_, idx) => {
                  const coords = getCoordinates(idx, lvl * 100);
                  return `${coords.x},${coords.y}`;
                }).join(' ');

                return (
                  <polygon
                    key={lIdx}
                    points={ringPoints}
                    fill={lIdx === 3 ? '#f0fdf4' : 'transparent'}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    strokeDasharray={lIdx < 3 ? '2,2' : undefined}
                  />
                );
              })}

              {/* Axis lines */}
              {alignments.map((_, idx) => {
                const outer = getCoordinates(idx, 100);
                return (
                  <line
                    key={idx}
                    x1={center}
                    y1={center}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Ideal benchmark polygon */}
              <polygon
                points={idealPolygonPoints}
                fill="none"
                stroke="#d97706"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* User soil polygon */}
              <polygon
                points={userPolygonPoints}
                fill="rgba(16, 185, 129, 0.25)"
                stroke="#059669"
                strokeWidth="2.5"
                className="transition-all duration-500"
              />

              {/* Data points */}
              {alignments.map((item, idx) => {
                const coords = getCoordinates(idx, Math.max(15, Math.min(100, item.score)));
                const labelCoords = getCoordinates(idx, 126);

                return (
                  <g key={idx}>
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="4.5"
                      fill="#047857"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={labelCoords.x}
                      y={labelCoords.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[10px] font-semibold fill-gray-700"
                    >
                      {item.label.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Feature Breakdown Table / Meters */}
        <div className="lg:col-span-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {lang === 'hi' ? 'पोषक तत्व व जलवायु अनुकूलता स्तर' :
             lang === 'ur' ? 'غذائی اجزاء اور موسمی مطابقت کا جائزہ' :
             'Biometric Alignment Breakdown'}
          </h4>
          <div className="space-y-2.5">
            {alignments.map((feat) => {
              const statusColor =
                feat.status === 'Optimal'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : feat.status.includes('Deficient') || feat.status.includes('Low')
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-blue-50 text-blue-700 border-blue-200';

              const localizedStatus =
                lang === 'hi'
                  ? feat.status === 'Optimal' ? 'अनुकूल' : feat.status.includes('Low') ? 'कम' : 'अधिक'
                  : lang === 'ur'
                  ? feat.status === 'Optimal' ? 'بہترین' : feat.status.includes('Low') ? 'کم' : 'زیادہ'
                  : feat.status;

              return (
                <div key={feat.feature} className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-gray-800">{getLocalizedFeatureLabel(feat.label)}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-600 ltr-num">
                        {feat.userValue} {feat.unit}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
                        {localizedStatus}
                      </span>
                    </div>
                  </div>
                  {/* Visual Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        feat.score >= 80 ? 'bg-emerald-500' : feat.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${feat.score}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span className="ltr-num">Target: {feat.optimalMean} {feat.unit}</span>
                    <span className="ltr-num">Fit: {feat.score}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary N-P-K Deficit / Surplus Bar Chart */}
      {nutrientBreakdown && nutrientBreakdown.length > 0 && (
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {lang === 'hi' ? 'मुख्य पोषक तत्व संतुलन (एन-पी-के अंतराल विश्लेषण किग्रा/हे.)' :
               lang === 'ur' ? 'بنیادی غذائی توازن (این پی کے تجزیہ کلو/ہیکٹر)' :
               'Macronutrient Balance (N - P - K Gap Analysis in kg/ha)'}
            </h4>
            <span className="text-[11px] text-gray-400">
              {lang === 'hi' ? 'लक्षित बनाम वर्तमान भंडार' : lang === 'ur' ? 'ہدف بمقابلہ موجودہ ذخیرہ' : 'Target vs Current Soil Reserves'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {nutrientBreakdown.map((item) => {
              const isDeficit = item.gap > 0;
              const isSurplus = item.gap < -5;

              return (
                <div
                  key={item.symbol}
                  className={`p-3.5 rounded-xl border ${
                    item.status === 'Deficient'
                      ? 'border-red-200 bg-red-50/40'
                      : item.status === 'Slightly Low'
                      ? 'border-amber-200 bg-amber-50/40'
                      : 'border-emerald-200 bg-emerald-50/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-md bg-gray-900 text-white flex items-center justify-center font-bold text-xs ltr-num">
                        {item.symbol}
                      </span>
                      <span className="font-semibold text-sm text-gray-800">
                        {lang === 'hi' ? (item.symbol === 'N' ? 'नाइट्रोजन' : item.symbol === 'P' ? 'फास्फोरस' : 'पोटेशियम') :
                         lang === 'ur' ? (item.symbol === 'N' ? 'نائٹروجن' : item.symbol === 'P' ? 'فاسفورس' : 'پوٹاشیم') :
                         item.nutrient}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>{lang === 'hi' ? 'वर्तमान स्तर:' : lang === 'ur' ? 'موجودہ مقدار:' : 'Soil Reading:'}</span>
                      <strong className="text-gray-900 ltr-num">{item.currentLevel} kg/ha</strong>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{lang === 'hi' ? 'लक्षित स्तर:' : lang === 'ur' ? 'مطلوبہ ہدف:' : 'Target Optimal:'}</span>
                      <span className="text-emerald-700 font-medium ltr-num">{item.targetOptimal} kg/ha</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-200/60 font-semibold">
                      <span>{lang === 'hi' ? 'शुद्ध अंतर:' : lang === 'ur' ? 'خالص فرق:' : 'Net Gap:'}</span>
                      <span className={`ltr-num ${isDeficit ? 'text-amber-700' : isSurplus ? 'text-blue-700' : 'text-emerald-700'}`}>
                        {isDeficit ? `-${item.gap} kg/ha` : isSurplus ? `+${Math.abs(item.gap)} kg/ha` : '0 (Balanced)'}
                      </span>
                    </div>
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
