import React, { useState, useEffect } from 'react';
import {
  CropFeatureInput,
  CropRecommendationResult,
  FertilizerRecommendationResult,
  PlantDiagnosisResult
} from './types/index';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { LandingHero } from './components/LandingHero';
import { CropRecommender } from './components/CropRecommender';
import { CropResultView } from './components/CropResultView';
import { FertilizerRecommender } from './components/FertilizerRecommender';
import { PlantDoctor } from './components/PlantDoctor';
import { SoilRadarChart } from './components/SoilRadarChart';
import { PrintableReport } from './components/PrintableReport';
import { AboutProject } from './components/AboutProject';
import { FarmingAssistant } from './components/FarmingAssistant';
import { Language, TRANSLATIONS } from './utils/i18n';
import { ArrowLeft, Sprout, BarChart3, FlaskConical, Leaf } from 'lucide-react';

const INITIAL_SOIL: CropFeatureInput = {
  nitrogen: 80,
  phosphorus: 48,
  potassium: 40,
  temperature: 24.0,
  humidity: 82.0,
  ph: 6.4,
  rainfall: 220.0
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Agronomic Inputs & Results state (preserved across language changes!)
  const [soilInput, setSoilInput] = useState<CropFeatureInput>(INITIAL_SOIL);
  const [cropResult, setCropResult] = useState<CropRecommendationResult | null>(null);
  const [fertilizerResult, setFertilizerResult] = useState<FertilizerRecommendationResult | null>(null);
  const [targetCrop, setTargetCrop] = useState<string>('rice');

  // AI Plant Doctor state (preserved across language changes & navigation!)
  const [plantDiagnosis, setPlantDiagnosis] = useState<PlantDiagnosisResult | null>(null);
  const [plantImage, setPlantImage] = useState<string | null>(null);
  const [activeSampleKey, setActiveSampleKey] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang];

  // Update HTML tag language and RTL direction whenever language changes
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ur' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Auto-fetch initial demo prediction on load so all charts and reports are pre-populated and functional
  useEffect(() => {
    async function loadInitial() {
      try {
        const cropRes = await fetch('/api/recommend-crop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(INITIAL_SOIL)
        });
        if (cropRes.ok) {
          const cData: CropRecommendationResult = await cropRes.json();
          setCropResult(cData);
          setTargetCrop(cData.recommendedCrop);

          const fertRes = await fetch('/api/recommend-fertilizer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ crop: cData.recommendedCrop, soilInput: INITIAL_SOIL })
          });
          if (fertRes.ok) {
            const fData: FertilizerRecommendationResult = await fertRes.json();
            setFertilizerResult(fData);
          }
        }
      } catch (e) {
        console.error('Failed to pre-populate initial demo prediction:', e);
      }
    }
    loadInitial();
  }, []);

  const handleRecommendationReceived = async (result: CropRecommendationResult, input: CropFeatureInput) => {
    setCropResult(result);
    setSoilInput(input);
    setTargetCrop(result.recommendedCrop);

    // Also fetch initial fertilizer recommendation for this crop
    try {
      const fertRes = await fetch('/api/recommend-fertilizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: result.recommendedCrop, soilInput: input })
      });
      if (fertRes.ok) {
        const fData: FertilizerRecommendationResult = await fertRes.json();
        setFertilizerResult(fData);
      }
    } catch (err) {
      console.error('Error fetching fertilizer plan:', err);
    }
  };

  const handlePresetSelect = async (presetValues: CropFeatureInput, cropName?: string) => {
    setSoilInput(presetValues);
    setActiveTab('crop');
    setMobileMenuOpen(false);

    try {
      const cropRes = await fetch('/api/recommend-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(presetValues)
      });
      if (cropRes.ok) {
        const cData: CropRecommendationResult = await cropRes.json();
        setCropResult(cData);
        const resolvedCrop = cropName || cData.recommendedCrop;
        setTargetCrop(resolvedCrop);

        const fertRes = await fetch('/api/recommend-fertilizer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ crop: resolvedCrop, soilInput: presetValues })
        });
        if (fertRes.ok) {
          const fData: FertilizerRecommendationResult = await fertRes.json();
          setFertilizerResult(fData);
        }
      }
    } catch (err) {
      console.error('Error running preset:', err);
    }
  };

  const handleRequestFertilizer = (crop: string, input: CropFeatureInput) => {
    setTargetCrop(crop);
    setSoilInput(input);
    setActiveTab('fertilizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAlternative = (altCropKey: string) => {
    setTargetCrop(altCropKey);
    setActiveTab('fertilizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-gray-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onSelectPreset={handlePresetSelect}
      />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop & Mobile Drawer Sidebar */}
          <div className={`lg:block ${mobileMenuOpen ? 'block' : 'hidden'} print:hidden`}>
            <Sidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              lang={currentLang}
              hasResult={cropResult !== null}
              hasDiagnosis={plantDiagnosis !== null}
            />
          </div>

          {/* Primary View Area */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* View 1: Home / Landing Showcase */}
            {activeTab === 'home' && (
              <LandingHero
                onStartCropPrediction={() => {
                  setActiveTab('crop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreFertilizers={() => {
                  setActiveTab('fertilizer');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onLaunchPlantDoctor={() => {
                  setActiveTab('doctor');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onLoadPreset={handlePresetSelect}
                onViewArchitecture={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                lang={currentLang}
              />
            )}

            {/* View 2: Crop Recommender Form & Results */}
            {activeTab === 'crop' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                    <Sprout className="w-6 h-6 text-emerald-700 shrink-0" />
                    <span>{t.navCrop}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {currentLang === 'hi'
                      ? '२२ फसलों के ऐतिहासिक सांख्यिकीय वितरण पर आधारित गौसियन नेव बेयस क्लासिफायर।'
                      : currentLang === 'ur'
                      ? '۲۲ فصلوں کے سائنسی اعدادوشمار پر مبنی گاسین نیو بیز ماڈل کے ذریعے درست سفارش۔'
                      : 'Continuous Gaussian Naive Bayes classifier trained on 2,200 agricultural benchmark instances.'}
                  </p>
                </div>

                <CropRecommender
                  initialValues={soilInput}
                  onRecommendationReceived={handleRecommendationReceived}
                  lang={currentLang}
                />

                {cropResult && (
                  <div className="space-y-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">
                        {t.evaluatedRecommendation}
                      </h3>
                      <button
                        onClick={() => setActiveTab('radar')}
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>{t.inspectRadarBtn}</span>
                      </button>
                    </div>

                    <CropResultView
                      result={cropResult}
                      input={soilInput}
                      onRequestFertilizer={handleRequestFertilizer}
                      onOpenReport={() => setActiveTab('report')}
                      onSelectAlternative={handleSelectAlternative}
                      lang={currentLang}
                    />

                    {/* Integrated Radar Snippet right below crop result */}
                    <SoilRadarChart
                      alignments={cropResult.featureAlignments}
                      cropName={cropResult.cropName}
                      nutrientBreakdown={fertilizerResult?.nutrientBreakdown}
                      lang={currentLang}
                    />
                  </div>
                )}
              </div>
            )}

            {/* View 3: Fertilizer Advisory */}
            {activeTab === 'fertilizer' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                    <FlaskConical className="w-6 h-6 text-emerald-700 shrink-0" />
                    <span>{t.navFertilizer}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {currentLang === 'hi'
                      ? 'स्टोइकोमेट्रिक पोषक तत्व कमी की गणना, मृदा पीएच सुधार (चूना/जिप्सम) और एकीकृत पोषण प्रबंधन (INM)।'
                      : currentLang === 'ur'
                      ? 'مٹی میں این پی کے کے خالص فرق کا سائنسی حساب، پی ایچ سدھار اور مربوط زرعی غذائی انتظام (INM)۔'
                      : 'Stoichiometric nutrient-deficit calculations, pH soil reaction diagnosis, and Integrated Nutrient Management (INM).'}
                  </p>
                </div>

                <FertilizerRecommender
                  selectedCrop={targetCrop}
                  soilInput={soilInput}
                  onSoilChange={setSoilInput}
                  lang={currentLang}
                />
              </div>
            )}

            {/* View 4: AI Plant Doctor (Leaf Image Scanner) */}
            {activeTab === 'doctor' && (
              <PlantDoctor
                lang={currentLang}
                savedDiagnosis={plantDiagnosis}
                savedImage={plantImage}
                onSaveState={(diag, img, sampleKey) => {
                  setPlantDiagnosis(diag);
                  setPlantImage(img);
                  setActiveSampleKey(sampleKey);
                }}
              />
            )}

            {/* View 5: Radar Charts & Diagnostics */}
            {activeTab === 'radar' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-emerald-700 shrink-0" />
                      <span>{t.radarTitle}</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {t.radarSub}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('crop')}
                    className="self-start sm:self-auto text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                    <span>{t.changeReadingsBtn}</span>
                  </button>
                </div>

                {cropResult ? (
                  <SoilRadarChart
                    alignments={cropResult.featureAlignments}
                    cropName={cropResult.cropName}
                    nutrientBreakdown={fertilizerResult?.nutrientBreakdown}
                    lang={currentLang}
                  />
                ) : (
                  <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500 text-xs">
                    {t.soilRadarPlaceholder}
                  </div>
                )}
              </div>
            )}

            {/* View 6: Printable Agronomic Report */}
            {activeTab === 'report' && (
              <PrintableReport
                cropResult={cropResult}
                fertilizerResult={fertilizerResult}
                soilInput={soilInput}
                onBack={() => setActiveTab('crop')}
                lang={currentLang}
              />
            )}

            {/* View 7: About the Project & ML Architecture */}
            {activeTab === 'about' && <AboutProject lang={currentLang} />}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-emerald-950/10 bg-white/70 py-6 px-4 text-center text-xs text-gray-500 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong>{t.appName}</strong> — {t.tagline}.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>{t.footerBenchmarkNotice}</span>
          </div>
        </div>
      </footer>

      {/* Floating CropWise Farming Assistant */}
      <FarmingAssistant
        lang={currentLang}
        soilInput={soilInput}
        cropResult={cropResult}
        fertilizerResult={fertilizerResult}
        plantDiagnosis={plantDiagnosis}
      />
    </div>
  );
}
