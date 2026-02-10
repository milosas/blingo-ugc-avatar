import { useState, useRef, useEffect, useCallback } from 'react';
import { INDUSTRIES } from '../../constants/industries';

interface IndustrySelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

export function IndustrySelect({ value, onChange, label, placeholder }: IndustrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = search
    ? INDUSTRIES.filter(i => i.toLowerCase().includes(search.toLowerCase()))
    : [...INDUSTRIES];

  const handleSelect = useCallback((industry: string) => {
    onChange(industry);
    setSearch('');
    setIsOpen(false);
    setHighlightIndex(-1);
  }, [onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex(prev => Math.min(prev + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightIndex >= 0 && highlightIndex < filtered.length) {
          handleSelect(filtered[highlightIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightIndex(-1);
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
        setHighlightIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
        {label}
      </label>
      <div
        className={`relative border rounded-xl transition-colors ${
          isOpen ? 'border-[#FF6B35] ring-1 ring-[#FF6B35]/20' : 'border-[#E5E5E3] hover:border-[#D4D4D2]'
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? search : value}
          placeholder={placeholder || 'Pasirinkite sritį...'}
          onChange={(e) => {
            setSearch(e.target.value);
            setHighlightIndex(-1);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 pr-10 rounded-xl bg-white text-[#1A1A1A] placeholder-[#999] text-sm outline-none"
        />
        <svg
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-1 bg-white border border-[#E5E5E3] rounded-xl shadow-lg max-h-60 overflow-y-auto"
        >
          {filtered.map((industry, idx) => (
            <li
              key={industry}
              onClick={() => handleSelect(industry)}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                idx === highlightIndex
                  ? 'bg-[#FFF0EB] text-[#FF6B35]'
                  : industry === value
                    ? 'bg-[#F7F7F5] text-[#1A1A1A] font-medium'
                    : 'text-[#1A1A1A] hover:bg-[#F7F7F5]'
              }`}
            >
              {industry}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filtered.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-[#E5E5E3] rounded-xl shadow-lg p-4 text-sm text-[#999] text-center">
          Nerasta
        </div>
      )}
    </div>
  );
}
