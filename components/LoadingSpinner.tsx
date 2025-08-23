import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  text 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6 border-2';
      case 'lg':
        return 'w-12 h-12 border-4';
      default:
        return 'w-8 h-8 border-3';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} role="status" aria-label="Loading">
      <div className={`${getSizeClasses()} border-aurora-border/30 border-t-aurora-accent-green rounded-full animate-spin`} />
      {text && (
        <p className="mt-3 text-sm text-aurora-text-secondary animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;