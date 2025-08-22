
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && text && (
        <div className="absolute right-0 bottom-full mb-3 sm:mb-2 w-56 sm:w-48 p-3 sm:p-2 bg-aurora-card border border-aurora-border text-aurora-text-primary text-sm sm:text-xs rounded-lg sm:rounded-md shadow-aurora-glow z-50 backdrop-blur-lg whitespace-normal">
          {text.split('\n').map((line, index) => (
            <div key={index} className="leading-relaxed">
              {index === 1 ? (
                <span className="font-bold">{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
          <div className="absolute right-4 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-aurora-card"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;