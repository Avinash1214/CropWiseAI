import React from 'react';
import { CropWiseLogo } from './CropWiseLogo';
import { Language, TRANSLATIONS } from '../utils/i18n';
import { Menu, X, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { CropFeatureInput } from '../types/index';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onSelectPreset: (presetValues: CropFeatureInput, cropName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  mobileMenuOpen,
  onToggleMobileMenu,
  onSelectPreset
}) => {
  const t = TRANSLATIONS[currentLang];

  const presets = [
    {
      key: 'rice',
      label: currentLang === 'hi' ? '🌾 मानसूनी धान (चावल)' : currentLang === 'ur' ? '🌾 خریف چاول (دھان)' : '🌾 Monsoon Rice (Paddy)',
      values: { nitrogen: 80, phosphorus: 48, potassium: 40, temperature: 24, humidity: 82, ph: 6.4, rainfall: 236 },
      crop: 'rice'
    },
    {
      key: 'chickpea',
      label: currentLang === 'hi' ? '🌱 रबी चना (छोला)' : currentLang === 'ur' ? '🌱 ربی چنا (چھولے)' : '🌱 Rabi Chickpea (Chana)',
      values: { nitrogen: 40, phosphorus: 68, potassium: 80, temperature: 18.8, humidity: 17, ph: 7.3, rainfall: 80 },
      crop: 'chickpea'
    },
    {
      key: 'cotton',
      label: currentLang === 'hi' ? '☁️ विदर्भ कपास (काली मिट्टी)' : currentLang === 'ur' ? '☁️ کپاس (کالی زمین)' : '☁️ Vidarbha Cotton',
      values: { nitrogen: 118, phosphorus: 46, potassium: 20, temperature: 24, humidity: 80, ph: 6.8, rainfall: 80 },
      crop: 'cotton'
    },
    {
      key: 'coffee',
      label: currentLang === 'hi' ? '☕ कूर्ग पहाड़ी कॉफी' : currentLang === 'ur' ? '☕ کورگ پہاڑی کافی' : '☕ Coorg Hill Coffee',
      values: { nitrogen: 101, phosphorus: 29, potassium: 30, temperature: 25.5, humidity: 59, ph: 6.8, rainfall: 158 },
      crop: 'coffee'
    },
    {
      key: 'grapes',
      label: currentLang === 'hi' ? '🍇 नासिक अंगूर (पोटाश बहुल)' : currentLang === 'ur' ? '🍇 انگور (زیادہ پوٹاش)' : '🍇 Table Grapes (Nashik)',
      values: { nitrogen: 23, phosphorus: 133, potassium: 200, temperature: 24, humidity: 82, ph: 6.0, rainfall: 70 },
      crop: 'grapes'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 -ml-2 rounded-xl text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <CropWiseLogo size={36} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-gray-900">
                  CropWise <span className="text-emerald-700">AI</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {t.proBadge}
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-gray-500 font-medium -mt-0.5">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Demo Preset Dropdown */}
          <div className="relative group hidden md:block">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.demoPresets}</span>
              <ChevronDown className="w-3 h-3 text-emerald-700" />
            </button>
            <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 hidden group-hover:block transition-all z-50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 py-1 block">
                {t.loadScenario}
              </span>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPreset(p.values, p.crop)}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg transition-colors font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Model Status Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.modelOnline}</span>
          </div>

          {/* Language Selector: English, हिन्दी (Hindi), اردو (Urdu) */}
          <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-emerald-800 ml-1 mr-0.5 shrink-0 hidden sm:inline" />

            {/* English */}
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-900 hover:bg-white/60'
              }`}
              title="English (Default)"
            >
              English
            </button>

            {/* हिन्दी (Hindi) */}
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'hi'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-900 hover:bg-white/60'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिन्दी (Hindi)
            </button>

            {/* اردو (Urdu) */}
            <button
              onClick={() => onLanguageChange('ur')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentLang === 'ur'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-emerald-900 hover:bg-white/60'
              }`}
              title="اردو (Urdu)"
            >
              اردو (Urdu)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
