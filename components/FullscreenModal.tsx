import React, { useEffect } from 'react';

interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-aurora-bg">
      <div className="h-full flex flex-col">
        <div className="bg-aurora-card/70 border-b border-aurora-border/50 shadow-md backdrop-blur-lg flex-shrink-0">
          <div className="flex items-center justify-between px-4 py-4">
            <h2 className="text-xl font-bold text-aurora-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-aurora-text-secondary hover:text-aurora-text-primary rounded-lg hover:bg-aurora-border/20 transition-colors touch-manipulation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullscreenModal;