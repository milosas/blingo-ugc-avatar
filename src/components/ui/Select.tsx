import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

interface SelectProps<T> {
  value: T | null;
  onChange: (value: T) => void;
  options: readonly T[];
  getLabel: (option: T) => string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function Select<T>({
  value,
  onChange,
  options,
  getLabel,
  placeholder = 'Pasirinkite...',
  label,
  required
}: SelectProps<T>) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
          {label} {required && <span className="text-[#FF6B35]">*</span>}
        </label>
      )}
      <Listbox value={value ?? undefined} onChange={(val) => val && onChange(val)}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-white border border-[#E5E5E3] py-3 pl-4 pr-10 text-left hover:border-[#D4D4D2] focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10 transition-all">
            <span className={value ? 'text-[#1A1A1A]' : 'text-[#999999]'}>
              {value ? getLabel(value) : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-[#999999]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white border border-[#E5E5E3] py-1 shadow-lg focus:outline-none">
            {options.map((option, index) => (
              <ListboxOption
                key={index}
                value={option}
                className="relative cursor-pointer select-none py-3 pl-4 pr-9 text-[#666666] data-[focus]:bg-[#FFF0EB] data-[focus]:text-[#FF6B35] data-[selected]:bg-[#FFF0EB] data-[selected]:text-[#FF6B35] transition-colors"
              >
                {({ selected }) => (
                  <>
                    <span className={selected ? 'font-medium' : ''}>{getLabel(option)}</span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-5 w-5 text-[#FF6B35]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
