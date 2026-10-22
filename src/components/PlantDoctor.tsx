import React, { useState, useRef, useEffect } from 'react';
import { PlantDiagnosisResult } from '../types/index';
import { Language, TRANSLATIONS } from '../utils/i18n';
import {
  UploadCloud,
  FileImage,
  AlertTriangle,
  CheckCircle,
  Leaf,
  FlaskConical,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

interface PlantDoctorProps {
  lang: Language;
  onDiagnosisComplete?: (result: PlantDiagnosisResult) => void;
  savedDiagnosis?: PlantDiagnosisResult | null;
  savedImage?: string | null;
  onSaveState?: (diagnosis: PlantDiagnosisResult | null, image: string | null, sampleKey: string | null) => void;
}

export const PlantDoctor: React.FC<PlantDoctorProps> = ({
  lang,
  onDiagnosisComplete,
  savedDiagnosis = null,
  savedImage = null,
  onSaveState
}) => {
  const t = TRANSLATIONS[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(savedImage);
  const [activeSampleKey, setActiveSampleKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<PlantDiagnosisResult | null>(savedDiagnosis);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Field test samples with SVG/CSS generated realistic leaf disease representations
  const samples = [
    {
      id: 'rice_blast',
      label: t.sampleRiceBlast,
      crop: 'Rice',
      disease: 'Blast',
      color: 'from-amber-700 to-emerald-800'
    },
    {
      id: 'wheat_rust',
      label: t.sampleWheatRust,
      crop: 'Wheat',
      disease: 'Rust',
      color: 'from-amber-600 to-orange-800'
    },
    {
      id: 'tomato_blight',
      label: t.sampleTomatoBlight,
      crop: 'Tomato',
      disease: 'Blight',
      color: 'from-red-800 to-stone-800'
    },
    {
      id: 'cotton_curl',
      label: t.sampleCottonCurl,
      crop: 'Cotton',
      disease: 'Leaf Curl',
      color: 'from-emerald-800 to-lime-900'
    },
    {
      id: 'healthy_leaf',
      label: t.sampleHealthyLeaf,
      crop: 'Healthy',
      disease: 'Vigorous',
      color: 'from-emerald-600 to-teal-700'
    }
  ];

  // If language changes while a diagnosis is active, re-request localized diagnosis without losing image
  useEffect(() => {
    if (diagnosis && (activeSampleKey || imagePreview)) {
      analyzeImage(imagePreview || '', activeSampleKey || undefined, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const analyzeImage = async (imgData: string, sampleKey?: string, showSpinner = true) => {
    if (showSpinner) setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/diagnose-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imgData,
          language: lang,
          sampleHint: sampleKey
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Diagnostic evaluation failed.');
      }

      const result: PlantDiagnosisResult = await response.json();
      setDiagnosis(result);
      if (onDiagnosisComplete) onDiagnosisComplete(result);
      if (onSaveState) onSaveState(result, imgData, sampleKey || null);
    } catch (err: any) {
      console.error('Error diagnosing plant leaf:', err);
      setErrorMsg(err.message || 'Unable to complete AI plant diagnosis. Please try another image.');
    } finally {
      if (showSpinner) setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setActiveSampleKey(null);
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setActiveSampleKey(null);
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSampleClick = (sampleId: string) => {
    setActiveSampleKey(sampleId);

    // Create a small identifiable data placeholder URL for the selected sample
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 300, 300);
      if (sampleId === 'rice_blast') {
        grad.addColorStop(0, '#2d5a27');
        grad.addColorStop(1, '#6b4f24');
      } else if (sampleId === 'wheat_rust') {
        grad.addColorStop(0, '#a35200');
        grad.addColorStop(1, '#5c3a00');
      } else if (sampleId === 'tomato_blight') {
        grad.addColorStop(0, '#591616');
        grad.addColorStop(1, '#2c3328');
      } else if (sampleId === 'cotton_curl') {
        grad.addColorStop(0, '#204d33');
        grad.addColorStop(1, '#1b3320');
      } else {
        grad.addColorStop(0, '#10b981');
        grad.addColorStop(1, '#064e3b');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 300, 300);

      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(sampleId.replace('_', ' ').toUpperCase(), 150, 150);
      ctx.font = '14px sans-serif';
      ctx.fillText('CropWise Verified Specimen', 150, 180);
    }
    const sampleImg = canvas.toDataURL('image/jpeg');
    setImagePreview(sampleImg);
    analyzeImage(sampleImg, sampleId);
  };

  const handleResetScan = () => {
    setImagePreview(null);
    setDiagnosis(null);
    setActiveSampleKey(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onSaveState) onSaveState(null, null, null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/50 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Multimodal Agronomic Vision • Gemini AI</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t.plantDoctorTitle}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
          {t.plantDoctorSub}
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Scanner & Photo Upload Section */}
      {!diagnosis && !loading && (
        <div className="space-y-6">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed transition-all text-center space-y-4 shadow-sm cursor-pointer ${
              isDragOver
                ? 'border-emerald-600 bg-emerald-50/50 scale-[1.01]'
                : 'border-emerald-900/20 hover:border-emerald-600/50 bg-white'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
              <UploadCloud className="w-8 h-8 text-emerald-700" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                {t.uploadLeafPhoto}
              </h3>
              <p className="text-xs text-gray-500">
                {t.dragDropPrompt}{' '}
                <span className="text-emerald-700 font-bold underline cursor-pointer">
                  {t.orClickToBrowse}
                </span>
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <FileImage className="w-4 h-4" />
                <span>{t.chooseFileBtn}</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-400">
              Supported formats: JPEG, PNG, WebP • Max file size: 20MB
            </p>
          </div>

          {/* Quick Click Field Sample Presets */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.trySamplePhotos}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {samples.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSampleClick(s.id)}
                  className={`p-3 rounded-xl border text-left transition-all shadow-2xs group cursor-pointer bg-gradient-to-br ${
                    activeSampleKey === s.id
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                      : 'border-gray-200 hover:border-emerald-400 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg">🍃</span>
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-emerald-700">
                      Test
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">{s.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{s.crop} • {s.disease}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="bg-white rounded-3xl p-12 border border-emerald-900/10 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-4 border-emerald-200 border-t-emerald-700 animate-spin flex items-center justify-center">
            <Leaf className="w-6 h-6 text-emerald-700 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-900">{t.analyzingImage}</h3>
            <p className="text-xs text-gray-500">{t.analyzingImageSub}</p>
          </div>
        </div>
      )}

      {/* Diagnostic Clinical Results Card */}
      {diagnosis && !loading && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-md overflow-hidden">
            {/* Top Diagnosis Header Strip */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    diagnosis.severity === 'Healthy'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                      : diagnosis.severity === 'Mild'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-400/40'
                      : diagnosis.severity === 'Moderate'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-red-500/20 text-red-300 border-red-400/40'
                  }`}>
                    {diagnosis.severity === 'Healthy' ? t.severityHealthy :
                     diagnosis.severity === 'Mild' ? t.severityMild :
                     diagnosis.severity === 'Moderate' ? t.severityModerate :
                     t.severitySevere}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 text-emerald-100 border border-white/10">
                    {diagnosis.cropName}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 text-emerald-100 border border-white/10">
                    {t.urgencyLabel}: {diagnosis.urgency}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {diagnosis.conditionLocalName}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/90 font-serif italic">
                  Pathogen / Causative Agent: {diagnosis.pathogenOrCause}
                </p>
                <p className="text-xs text-emerald-100/90 max-w-2xl leading-relaxed pt-1">
                  {diagnosis.summary}
                </p>
              </div>

              {/* Confidence Gauge & Image Preview */}
              <div className="flex items-center gap-4 shrink-0">
                {imagePreview && (
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md shrink-0 bg-stone-900">
                    <img
                      src={imagePreview}
                      alt="Diagnosed crop leaf"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-center min-w-[120px]">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
                    {diagnosis.confidencePercentage}%
                  </span>
                  <span className="text-[10px] block font-bold uppercase tracking-wider text-emerald-200 mt-0.5">
                    Model Confidence
                  </span>
                  <span className="text-[9px] text-emerald-300/70 block">AI Pathology</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Details Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Section 1: Visual Symptoms */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{t.symptomsObserved}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {diagnosis.symptoms.map((sym, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Organic & Biological Treatments */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>{t.organicRemediesTitle}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {diagnosis.organicRemedies.map((org, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/70 text-xs text-emerald-950 flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{org}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Chemical Prescriptions */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-emerald-700" />
                  <span>{t.chemicalRemediesTitle}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {diagnosis.chemicalRemedies.map((chem, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-900 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                        Rx
                      </span>
                      <span className="leading-relaxed">{chem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Preventive Measures */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>{t.preventiveMeasuresTitle}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {diagnosis.preventiveMeasures.map((prev, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700 flex items-start gap-2.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                      <span className="leading-snug">{prev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Disclaimer */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-2 text-[11px] text-gray-500 max-w-xl">
                  <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>{t.plantDoctorDisclaimer}</span>
                </div>

                <button
                  onClick={handleResetScan}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.newScanBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
