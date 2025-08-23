import React, { useState, useEffect } from 'react';

interface CompactDateSliderProps {
  dob: string;
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

const CompactDateSlider: React.FC<CompactDateSliderProps> = ({ dob, onDateSelect, onClose }) => {
  const [selectedDays, setSelectedDays] = useState<number>(0);
  
  const birthDate = new Date(dob);
  const today = new Date();
  const maxDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate months for milestone markers
  const totalMonths = Math.ceil(maxDays / 30.44);
  const monthMarkers = Array.from({ length: Math.min(totalMonths + 1, 12) }, (_, i) => i);

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
    if (days === 0) return 'Birth';
    if (days === maxDays) return 'Today';
    if (days === maxDays - 1) return 'Yesterday';
    
    const months = Math.floor(days / 30.44);
    const remainingDays = days - (months * 30.44);
    
    if (remainingDays < 3) {
      return months === 0 ? `${Math.round(days)}d` : `${months}m`;
    } else if (remainingDays > 27) {
      return `${months + 1}m`;
    } else {
      return months === 0 ? `${Math.round(days)}d` : `${months}m+`;
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setSelectedDays(newValue);
    
    // Provide haptic feedback on mobile if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleDateConfirm = () => {
    const selectedDate = getSelectedDate(selectedDays);
    
    // Provide haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    
    onDateSelect(selectedDate.toISOString().split('T')[0]);
  };

  const jumpToMonth = (month: number) => {
    const monthDays = Math.min(Math.round(month * 30.44), maxDays);
    setSelectedDays(monthDays);
  };

  const jumpToQuickDate = (daysFromToday: number) => {
    setSelectedDays(Math.max(0, maxDays + daysFromToday));
  };

  return (
    <div className="bg-aurora-card/80 backdrop-blur-xl border border-aurora-border rounded-2xl p-6">
      {/* Selected Date Display */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-aurora-text-primary mb-2">
          {getAgeText(selectedDays)}
        </div>
        <div className="text-sm text-aurora-text-secondary">
          {getSelectedDate(selectedDays).toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Quick Date Buttons (days ago) */}
      <div className="mb-4">
        <div className="text-sm text-aurora-text-secondary text-center mb-3 font-medium">Quick dates:</div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => jumpToQuickDate(0)}
            data-no-aurora
            className={`px-4 py-2 text-sm rounded-xl transition-all touch-manipulation min-h-[40px] ${
              selectedDays === maxDays
                ? 'bg-aurora-accent-purple/20 text-aurora-accent-purple border border-aurora-accent-purple/30'
                : 'bg-aurora-border/20 text-aurora-text-secondary hover:bg-aurora-border/40'
            }`}
          >
            Today
          </button>
          <button 
            onClick={() => jumpToQuickDate(-1)}
            data-no-aurora
            className={`px-4 py-2 text-sm rounded-xl transition-all touch-manipulation min-h-[40px] ${
              selectedDays === maxDays - 1
                ? 'bg-aurora-accent-purple/20 text-aurora-accent-purple border border-aurora-accent-purple/30'
                : 'bg-aurora-border/20 text-aurora-text-secondary hover:bg-aurora-border/40'
            }`}
          >
            Yesterday
          </button>
          <button 
            onClick={() => jumpToQuickDate(-7)}
            data-no-aurora
            className={`px-4 py-2 text-sm rounded-xl transition-all touch-manipulation min-h-[40px] ${
              Math.abs(selectedDays - (maxDays - 7)) < 3
                ? 'bg-aurora-accent-purple/20 text-aurora-accent-purple border border-aurora-accent-purple/30'
                : 'bg-aurora-border/20 text-aurora-text-secondary hover:bg-aurora-border/40'
            }`}
          >
            1 week ago
          </button>
          <button 
            onClick={() => jumpToQuickDate(-30)}
            data-no-aurora
            className={`px-4 py-2 text-sm rounded-xl transition-all touch-manipulation min-h-[40px] ${
              Math.abs(selectedDays - (maxDays - 30)) < 7
                ? 'bg-aurora-accent-purple/20 text-aurora-accent-purple border border-aurora-accent-purple/30'
                : 'bg-aurora-border/20 text-aurora-text-secondary hover:bg-aurora-border/40'
            }`}
          >
            1 month ago
          </button>
        </div>
      </div>

      {/* Age Milestones */}
      <div className="mb-6">
        <div className="text-sm text-aurora-text-secondary text-center mb-3 font-medium">Age milestones:</div>
        <div className="flex flex-wrap gap-2 justify-center">
          {monthMarkers.slice(0, 10).map(month => (
            <button
              key={month}
              onClick={() => jumpToMonth(month)}
              data-no-aurora
              className={`px-3 py-2 text-sm rounded-lg transition-all touch-manipulation min-h-[36px] ${
                Math.abs(selectedDays - (month * 30.44)) < 15
                  ? 'bg-aurora-accent-green/20 text-aurora-accent-green border border-aurora-accent-green/30'
                  : 'bg-aurora-border/20 text-aurora-text-secondary hover:bg-aurora-border/40'
              }`}
            >
              {month}m
            </button>
          ))}
        </div>
      </div>

      {/* Date Slider */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={maxDays}
          value={selectedDays}
          onChange={handleSliderChange}
          className="w-full h-3 bg-aurora-border/30 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
        />
        <div className="flex justify-between text-sm text-aurora-text-secondary mt-3">
          <span>Birth</span>
          <span>Today</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <button
          onClick={handleDateConfirm}
          data-no-aurora
          className="px-8 py-3 text-base bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 text-aurora-accent-green rounded-xl transition-colors touch-manipulation touch-feedback min-h-[48px] font-semibold shadow-aurora-glow-green"
        >
          Confirm Date
        </button>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1a1d2e;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1a1d2e;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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

export default CompactDateSlider;