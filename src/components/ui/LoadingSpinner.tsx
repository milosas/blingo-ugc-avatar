interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-2',
};

export function LoadingSpinner({
  size = 'md',
  color = '#FF6B35',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div
      className={`rounded-full animate-spin ${sizeClasses[size]} ${className}`}
      style={{
        borderColor: color,
        borderTopColor: 'transparent',
      }}
    />
  );
}
