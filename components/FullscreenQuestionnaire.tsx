import React, { useState, useMemo } from 'react';
import { Milestone, Achievements, AchievementData, Domain } from '../types';
import { MILESTONES } from '../constants/milestones';
import DomainIcon from './DomainIcon';
import CompactDateSlider from './CompactDateSlider';
import Tooltip from './Tooltip';

interface FullscreenQuestionnaireProps {
  milestone: Milestone;
  achievements: Achievements;
  onAchievementChange: (milestoneId: string, data: AchievementData | null) => void;
  onClose: () => void;
  dob: string;
  chronologicalAge: number;
}

const FullscreenQuestionnaire: React.FC<FullscreenQuestionnaireProps> = ({
  milestone,
  achievements,
  onAchievementChange,
  onClose,
  dob,
  chronologicalAge
}) => {
  const [showDateSlider, setShowDateSlider] = useState(false);
  const isAchieved = achievements[milestone.id];
  
  const nextMilestone = useMemo(() => {
    const currentIndex = MILESTONES.findIndex(m => m.id === milestone.id);
    if (currentIndex >= 0 && currentIndex < MILESTONES.length - 1) {
      return MILESTONES[currentIndex + 1];
    }
    return null;
  }, [milestone.id]);

  const handleYesClick = () => {
    setShowDateSlider(true);
  };

  const handleNoClick = () => {
    if (isAchieved) {
      onAchievementChange(milestone.id, null);
    }
    if (nextMilestone) {
      // Stay in fullscreen mode and show next milestone
      window.dispatchEvent(new CustomEvent('show-milestone', { detail: { milestone: nextMilestone } }));
    } else {
      onClose();
    }
  };

  const handleDateSelect = (selectedDate: string) => {
    onAchievementChange(milestone.id, { date: selectedDate });
    setShowDateSlider(false);
    
    if (nextMilestone) {
      // Stay in fullscreen mode and show next milestone
      window.dispatchEvent(new CustomEvent('show-milestone', { detail: { milestone: nextMilestone } }));
    } else {
      onClose();
    }
  };

  const isRedFlag = milestone.isRedFlag(chronologicalAge);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col px-4 py-4 overflow-y-auto">
        {/* Question */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-aurora-text-primary mb-2 leading-tight">
            {milestone.question}
          </h3>
          
          <div className="flex justify-center mb-4">
            <Tooltip text={`Typically emerges around:\n**${milestone.typicalAge} month${milestone.typicalAge !== 1 ? 's' : ''}**`}>
              <div className="inline-flex items-center text-aurora-text-secondary hover:text-aurora-text-primary transition-colors cursor-help">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">Typical: {milestone.typicalAge}m</span>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Date slider or buttons */}
        <div className="flex-1">
          {showDateSlider ? (
            <CompactDateSlider
              dob={dob}
              onDateSelect={handleDateSelect}
              onClose={() => setShowDateSlider(false)}
            />
          ) : (
            <div className="space-y-3 flex flex-col h-full justify-center">
              <button
                onClick={handleYesClick}
                className="w-full py-4 bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 text-aurora-accent-green font-bold text-lg rounded-xl transition-colors touch-manipulation shadow-aurora-glow-green"
              >
                {isAchieved ? `Update (${new Date(isAchieved.date).toLocaleDateString()})` : 'Yes! 🎉'}
              </button>
              
              <button
                onClick={handleNoClick}
                className="w-full py-4 bg-aurora-border/20 hover:bg-aurora-border/30 text-aurora-text-secondary font-bold text-lg rounded-xl transition-colors touch-manipulation"
              >
                {isAchieved ? 'Remove Achievement' : 'Not Yet'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex-shrink-0 bg-aurora-card/50 backdrop-blur-sm border-t border-aurora-border/50 px-6 py-4">
        <div className="flex items-center justify-between text-sm text-aurora-text-secondary">
          <span>{MILESTONES.findIndex(m => m.id === milestone.id) + 1} of {MILESTONES.length}</span>
          {nextMilestone && (
            <span className="flex items-center">
              Next: {nextMilestone.domain}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullscreenQuestionnaire;