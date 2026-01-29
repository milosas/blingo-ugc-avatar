import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type Language } from '../../i18n/translations';

// SVG Flag components
function FlagLT() {
  return (
    <svg viewBox="0 0 5 3" className="w-6 h-4 rounded-sm shadow-sm">
      <rect width="5" height="1" fill="#FDB913" />
      <rect width="5" height="1" y="1" fill="#006A44" />
      <rect width="5" height="1" y="2" fill="#C1272D" />
    </svg>
  );
}

function FlagLV() {
  return (
    <svg viewBox="0 0 10 5" className="w-6 h-4 rounded-sm shadow-sm">
      <rect width="10" height="5" fill="#9E3039" />
      <rect width="10" height="1" y="2" fill="#FFFFFF" />
    </svg>
  );
}

function FlagEE() {
  return (
    <svg viewBox="0 0 33 21" className="w-6 h-4 rounded-sm shadow-sm">
      <rect width="33" height="7" fill="#0072CE" />
      <rect width="33" height="7" y="7" fill="#000000" />
      <rect width="33" height="7" y="14" fill="#FFFFFF" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg viewBox="0 0 60 30" className="w-6 h-4 rounded-sm shadow-sm">
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
    </svg>
  );
}

const FLAGS: Record<Language, () => JSX.Element> = {
  lt: FlagLT,
  lv: FlagLV,
  ee: FlagEE,
  en: FlagEN
};

const LANGUAGE_NAMES: Record<Language, string> = {
  lt: 'LT',
  lv: 'LV',
  ee: 'EE',
  en: 'EN'
};

const LANGUAGES: Language[] = ['lt', 'lv', 'ee', 'en'];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const CurrentFlag = FLAGS[language];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700">{LANGUAGE_NAMES[language]}</span>
        <CurrentFlag />
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[100px]">
          {LANGUAGES.map((lang) => {
            const Flag = FLAGS[lang];
            return (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                  language === lang ? 'bg-indigo-50' : ''
                }`}
              >
                <span className={`text-sm font-semibold ${language === lang ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {LANGUAGE_NAMES[lang]}
                </span>
                <Flag />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
