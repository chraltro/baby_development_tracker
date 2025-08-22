import React, { useState, useEffect } from 'react';

interface DateSliderProps {
  dob: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
  isExpanded: boolean;
}

const DateSlider: React.FC<DateSliderProps> = ({ dob, onDateSelect, onClose, isExpanded }) => {
  const [selectedDays, setSelectedDays] = useState<number>(0);
  
  const birthDate = new Date(dob);
  const today = new Date();
  const maxDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate months for milestone markers
  const totalMonths = Math.ceil(maxDays / 30.44);
  const monthMarkers = Array.from({ length: totalMonths + 1 }, (_, i) => i);

  useEffect(() => {
    // Default to today
    setSelectedDays(maxDays);
  }, [maxDays]);

  const getSelectedDate = (days: number) => {
    const selectedDate = new Date(birthDate);
    selectedDate.setDate(selectedDate.getDate() + days);
    return selectedDate;
  };

  const getAgeText = (days: number) => {
    if (days === 0) return 'Birth day';
    if (days === maxDays) return 'Today';
    if (days === maxDays - 1) return 'Yesterday';
    
    const months = Math.floor(days / 30.44);
    const remainingDays = days - (months * 30.44);
    
    if (remainingDays < 3) {
      return months === 0 ? `${Math.round(days)} days old` : `${months} months old`;
    } else if (remainingDays > 27) {
      return `${months + 1} months old`;
    } else {
      return months === 0 ? `${Math.round(days)} days old` : `${months}+ months old`;
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDays(parseInt(e.target.value));
  };

  const handleDateConfirm = () => {
    const selectedDate = getSelectedDate(selectedDays);
    onDateSelect(selectedDate.toISOString().split('T')[0]);
    onClose();
  };

  const jumpToMonth = (month: number) => {
    const monthDays = Math.min(Math.round(month * 30.44), maxDays);
    setSelectedDays(monthDays);
  };

  const jumpToQuickDate = (daysFromToday: number) => {
    setSelectedDays(Math.max(0, maxDays + daysFromToday));
  };

  return (
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[600px] mt-4 pt-4' : 'max-h-0'}`}>
      <div className="bg-aurora-card/80 backdrop-blur-xl border border-aurora-border rounded-xl sm:rounded-lg shadow-lg p-5 sm:p-4">
        <div className="flex justify-between items-center mb-5 sm:mb-4">
          <h3 className="text-base sm:text-sm font-semibold text-aurora-text-primary">When did this happen?</h3>
          <button 
            onClick={onClose}
            data-no-aurora
            className="text-aurora-text-secondary hover:text-aurora-text-primary transition-colors touch-manipulation p-1"
          >
            <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Date Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-2 gap-3 mb-5 sm:mb-4">
          <button 
            onClick={() => jumpToQuickDate(0)}
            data-no-aurora
            className="px-4 py-2.5 sm:px-3 sm:py-1.5 text-sm bg-aurora-border/30 hover:bg-aurora-border/50 active:bg-aurora-border/60 rounded-full text-aurora-text-primary transition-colors touch-manipulation min-h-[40px] sm:min-h-0"
          >
            Today
          </button>
          <button 
            onClick={() => jumpToQuickDate(-1)}
            data-no-aurora
            className="px-4 py-2.5 sm:px-3 sm:py-1.5 text-sm bg-aurora-border/30 hover:bg-aurora-border/50 active:bg-aurora-border/60 rounded-full text-aurora-text-primary transition-colors touch-manipulation min-h-[40px] sm:min-h-0"
          >
            Yesterday
          </button>
          <button 
            onClick={() => jumpToQuickDate(-7)}
            data-no-aurora
            className="px-4 py-2.5 sm:px-3 sm:py-1.5 text-sm bg-aurora-border/30 hover:bg-aurora-border/50 active:bg-aurora-border/60 rounded-full text-aurora-text-primary transition-colors touch-manipulation min-h-[40px] sm:min-h-0"
          >
            Last Week
          </button>
          <button 
            onClick={() => jumpToQuickDate(-30)}
            data-no-aurora
            className="px-4 py-2.5 sm:px-3 sm:py-1.5 text-sm bg-aurora-border/30 hover:bg-aurora-border/50 active:bg-aurora-border/60 rounded-full text-aurora-text-primary transition-colors touch-manipulation min-h-[40px] sm:min-h-0"
          >
            Last Month
          </button>
        </div>

        {/* Selected Date Display */}
        <div className="text-center mb-5 sm:mb-4">
          <div className="text-xl sm:text-lg font-bold text-aurora-text-primary mb-2 sm:mb-1">
            {getAgeText(selectedDays)}
          </div>
          <div className="text-sm sm:text-xs text-aurora-text-secondary">
            {getSelectedDate(selectedDays).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Month Milestone Markers */}
        <div className="mb-5 sm:mb-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {monthMarkers.slice(0, Math.min(monthMarkers.length, 25)).map(month => (
              <button
                key={month}
                onClick={() => jumpToMonth(month)}
                data-no-aurora
                className={`px-3 py-2 sm:px-2 sm:py-1 text-sm sm:text-xs rounded-full transition-all touch-manipulation min-h-[36px] sm:min-h-0 ${
                  Math.abs(selectedDays - (month * 30.44)) < 15
                    ? 'bg-aurora-accent-green/20 text-aurora-accent-green border border-aurora-accent-green/30'
                    : 'bg-aurora-border/20 text-aurora-text-secondary hover:bg-aurora-border/40 active:bg-aurora-border/50'
                }`}
              >
                {month}m
              </button>
            ))}
          </div>
        </div>

        {/* Date Slider */}
        <div className="mb-5 sm:mb-4">
          <div className="relative">
            <input
              type="range"
              min="0"
              max={maxDays}
              value={selectedDays}
              onChange={handleSliderChange}
              className="w-full h-3 sm:h-2 bg-aurora-border/30 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
            />
            <div className="flex justify-between text-sm sm:text-xs text-aurora-text-secondary mt-3 sm:mt-2">
              <span>Birth</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 sm:gap-3 gap-4">
          <button
            onClick={onClose}
            data-no-aurora
            className="px-5 py-3 sm:px-4 sm:py-2 text-base sm:text-sm text-aurora-text-secondary hover:text-aurora-text-primary active:text-aurora-text-primary transition-colors touch-manipulation min-h-[44px] sm:min-h-0"
          >
            Cancel
          </button>
          <button
            onClick={handleDateConfirm}
            data-no-aurora
            className="px-6 py-3 sm:px-4 sm:py-2 text-base sm:text-sm bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 active:bg-aurora-accent-green/40 text-aurora-accent-green rounded-xl sm:rounded-lg transition-colors touch-manipulation min-h-[44px] sm:min-h-0"
          >
            Confirm Date
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1a1d2e;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1a1d2e;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        @media (min-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
          }
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
          }
        }

        .slider::-webkit-slider-track {
          background: linear-gradient(to right, 
            rgba(16, 185, 129, 0.3) 0%,
            rgba(139, 92, 246, 0.3) 100%);
        }
      `}</style>
    </div>
  );
};

export default DateSlider;