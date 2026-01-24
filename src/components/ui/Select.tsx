import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

interface SelectProps<T> {
  value: T | null;
  onChange: (value: T) => void;
  options: readonly T[];
  getLabel: (option: T) => string;
  placeholder?: string;
  label?: string;
}

export function Select<T>({
  value,
  onChange,
  options,
  getLabel,
  placeholder = 'Pasirinkite...',
  label
}: SelectProps<T>) {
  // Convert null to undefined for Headless UI compatibility
  const headlessValue = value === null ? undefined : value;
  const handleChange = (newValue: T | undefined) => {
    onChange(newValue as T);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Listbox value={headlessValue} onChange={handleChange}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-left shadow-sm hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
              {value ? getLabel(value) : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {options.map((option, index) => (
              <ListboxOption
                key={index}
                value={option}
                className="relative cursor-pointer select-none py-3 pl-4 pr-9 text-gray-900 data-[focus]:bg-blue-50 data-[selected]:bg-blue-100"
              >
                {getLabel(option)}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
