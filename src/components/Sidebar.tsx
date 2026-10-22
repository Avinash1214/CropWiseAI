import React from 'react';
import { Home, Sprout, FlaskConical, BarChart3, FileText, Info, Award, CheckCircle, Leaf } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

export type NavTab = 'home' | 'crop' | 'fertilizer' | 'doctor' | 'radar' | 'report' | 'about';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  lang: Language;
  hasResult: boolean;
  hasDiagnosis?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  lang,
  hasResult,
  hasDiagnosis = false
}) => {
  const t = TRANSLATIONS[lang];

  const navItems = [
    { id: 'home' as NavTab, label: t.navHome, icon: Home, badge: null },
    { id: 'crop' as NavTab, label: t.navCrop, icon: Sprout, badge: 'ML' },
    { id: 'fertilizer' as NavTab, label: t.navFertilizer, icon: FlaskConical, badge: 'INM' },
    { id: 'doctor' as NavTab, label: t.navDoctor, icon: Leaf, badge: hasDiagnosis ? 'Active' : 'AI' },
    { id: 'radar' as NavTab, label: t.navDiagnostics, icon: BarChart3, badge: hasResult ? 'Active' : null },
    { id: 'report' as NavTab, label: t.navReport, icon: FileText, badge: hasResult ? 'Ready' : null },
    { id: 'about' as NavTab, label: t.navAbout, icon: Info, badge: null }
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Navigation List */}
      <nav className="bg-white rounded-2xl p-3 border border-emerald-900/10 shadow-sm space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white shadow-xs'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-200' : 'text-gray-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Model Benchmark Card */}
      <div className="bg-gradient-to-br from-emerald-950 to-stone-900 text-white rounded-2xl p-5 border border-emerald-800/40 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            {lang === 'hi' ? 'एआई इंजन एवं मॉडल' : lang === 'ur' ? 'اے آئی ماڈل انجن' : 'AI Model Engine'}
          </span>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed">
          {lang === 'hi' ? (
            <>२२ फसलों के <strong>२,२०० प्रमाणित नमूनों</strong> पर आधारित वास्तविक मशीन लर्निंग वर्गीकरण।</>
          ) : lang === 'ur' ? (
            <>۲۲ فصلوں کے <strong>۲،۲۰۰ تصدیق شدہ اعدادوشمار</strong> پر مبنی حقیقی مشین لرننگ ماڈل۔</>
          ) : (
            <>Trained on <strong>2,200 benchmark instances</strong> across 22 classes without fake predictions.</>
          )}
        </p>
        <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-300/80">
          <span>{t.proBadge}</span>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle className="w-3 h-3" />
            {lang === 'hi' ? 'सत्यापित' : lang === 'ur' ? 'تصدیق شدہ' : 'Verified'}
          </span>
        </div>
      </div>
    </aside>
  );
};
