import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'relative px-6 py-3 rounded-full font-semibold transition-all duration-200 focus:outline-none overflow-hidden';

  const variants = {
    primary: `
      bg-[#FF6B35]
      text-white
      hover:bg-[#E55A2B]
      hover:-translate-y-0.5
      shadow-md
      hover:shadow-lg hover:shadow-[#FF6B35]/20
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-md
    `,
    secondary: `
      bg-white
      border border-[#E5E5E3]
      text-[#1A1A1A]
      hover:bg-[#F7F7F5]
      hover:border-[#D4D4D2]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    ghost: `
      bg-transparent
      text-[#666666]
      hover:text-[#1A1A1A]
      hover:bg-[#F7F7F5]
      disabled:opacity-50 disabled:cursor-not-allowed
    `
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : children}
    </button>
  );
}
