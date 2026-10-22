import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  Sprout,
  AlertCircle
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';
import {
  CropFeatureInput,
  CropRecommendationResult,
  FertilizerRecommendationResult,
  PlantDiagnosisResult,
  ChatMessage
} from '../types/index';

interface FarmingAssistantProps {
  lang: Language;
  soilInput?: CropFeatureInput;
  cropResult?: CropRecommendationResult | null;
  fertilizerResult?: FertilizerRecommendationResult | null;
  plantDiagnosis?: PlantDiagnosisResult | null;
}

export const FarmingAssistant: React.FC<FarmingAssistantProps> = ({
  lang,
  soilInput,
  cropResult,
  fertilizerResult,
  plantDiagnosis
}) => {
  const t = TRANSLATIONS[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or re-localize welcome message when empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          role: 'assistant',
          content: t.assistantWelcome,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [t.assistantWelcome, messages.length]);

  // Scroll to bottom when messages change or typing
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      // Build lightweight state snapshot for grounded context
      const chatContext = {
        soilInput,
        cropResult: cropResult
          ? {
              recommendedCrop: cropResult.recommendedCrop,
              cropName: cropResult.cropName,
              botanicalName: cropResult.botanicalName,
              category: cropResult.category,
              confidencePercentage: cropResult.confidencePercentage,
              alternatives: cropResult.alternatives.map(a => ({
                name: a.name,
                percentage: a.percentage,
                suitability: a.suitability
              }))
            }
          : null,
        fertilizerResult: fertilizerResult
          ? {
              soilPhAnalysis: fertilizerResult.soilPhAnalysis,
              nutrientBreakdown: fertilizerResult.nutrientBreakdown,
              chemicalFertilizers: fertilizerResult.chemicalFertilizers
            }
          : null,
        plantDiagnosis: plantDiagnosis
          ? {
              condition: plantDiagnosis.condition,
              conditionLocalName: plantDiagnosis.conditionLocalName,
              cropName: plantDiagnosis.cropName,
              severity: plantDiagnosis.severity,
              symptoms: plantDiagnosis.symptoms,
              summary: plantDiagnosis.summary
            }
          : null
      };

      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          language: lang,
          context: chatContext
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to connect to farming assistant');
      }

      const data = await res.json();
      const assistantReply: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantReply]);
    } catch (err: any) {
      console.error('Assistant error:', err);
      setErrorMsg(err.message || 'Error communicating with assistant');
      // Append fallback notice
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            lang === 'hi'
              ? 'क्षमा करें, सहायक से संपर्क करने में समस्या हुई। कृपया पुनः प्रयास करें।'
              : lang === 'ur'
              ? 'معذرت، رابطہ قائم کرنے میں مسئلہ ہوا۔ براہ کرم دوبارہ کوشش کریں۔'
              : 'I apologize, but I encountered an issue connecting. Please try asking again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: t.assistantWelcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMsg(null);
  };

  const quickPrompts = [
    t.quickPrompt1,
    t.quickPrompt2,
    t.quickPrompt3,
    t.quickPrompt4
  ];

  return (
    <>
      {/* Floating Trigger Button in Bottom Right */}
      <div className="fixed bottom-5 right-5 z-40 print:hidden flex flex-col items-end gap-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#14532D] hover:bg-[#166534] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-emerald-500/40 cursor-pointer"
            aria-label={t.assistantTitle}
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-emerald-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            </div>
            <span className="text-xs font-bold tracking-wide hidden sm:inline">
              {t.assistantBadge}
            </span>
          </button>
        )}
      </div>

      {/* Slide-out / Popover Assistant Drawer */}
      {isOpen && (
        <div
          className="fixed inset-x-3 bottom-3 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-96 sm:max-w-md h-[560px] max-h-[85vh] z-50 flex flex-col bg-white rounded-3xl shadow-2xl border border-emerald-900/15 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 print:hidden"
          dir={lang === 'ur' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="bg-[#14532D] text-white p-4 flex items-center justify-between border-b border-emerald-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4 text-emerald-200" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight flex items-center gap-1.5">
                  <span>{t.assistantTitle}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono border border-emerald-400/30">
                    AI
                  </span>
                </h3>
                <p className="text-[10px] text-emerald-200/80 leading-none mt-0.5">
                  {t.assistantSub}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                title={t.clearChat}
                aria-label={t.clearChat}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Ribbon */}
          {cropResult && (
            <div className="bg-[#F7F8F0] px-3.5 py-1.5 border-b border-emerald-900/10 flex items-center justify-between text-[11px] text-emerald-900 shrink-0">
              <div className="flex items-center gap-1.5 truncate">
                <Sprout className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="font-semibold truncate">
                  {cropResult.cropName}:{' '}
                  <strong className="text-emerald-800 ltr-num">
                    {cropResult.confidencePercentage}%
                  </strong>
                </span>
              </div>
              <span className="text-[10px] text-gray-500 shrink-0 ltr-num">
                pH {soilInput?.ph ?? 6.4}
              </span>
            </div>
          )}

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50 text-xs">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                      isUser
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#14532D] text-emerald-200 border border-emerald-500/30'
                    }`}
                  >
                    {isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 shadow-xs space-y-1 ${
                      isUser
                        ? 'bg-emerald-700 text-white rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none'
                        : 'bg-white text-gray-800 border border-gray-200/90 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none'
                    }`}
                  >
                    <div className="leading-relaxed whitespace-pre-wrap break-words text-[11.5px]">
                      {m.content}
                    </div>
                    <div
                      className={`text-[9px] font-mono ${
                        isUser ? 'text-emerald-200/80 text-right' : 'text-gray-400 text-right rtl:text-left'
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-[#14532D] text-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 animate-spin" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-3 border border-gray-200 shadow-xs flex items-center gap-2 text-gray-500 text-[11px]">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                  </span>
                  <span>{t.typingIndicator}</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="bg-white border-t border-gray-100 px-3 py-2 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  disabled={loading}
                  className="shrink-0 text-[10.5px] font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box & Send Button */}
          <div className="p-3 bg-white border-t border-gray-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.askAssistantPlaceholder}
                disabled={loading}
                className="flex-1 text-xs bg-gray-50 focus:bg-white border border-gray-300 focus:border-emerald-700 rounded-xl px-3 py-2.5 outline-hidden transition-all text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="p-2.5 bg-[#14532D] hover:bg-[#166534] disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
                aria-label={t.sendBtn}
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
