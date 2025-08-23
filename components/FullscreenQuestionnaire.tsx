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
  const [showDateSlider, setShowDateSlider] = useState(true); // Start with date selection immediately
  const milestoneId = milestone.canonicalId || milestone.id;
  const isAchieved = achievements[milestoneId];
  
  const nextMilestone = useMemo(() => {
    const currentIndex = MILESTONES.findIndex(m => m.id === milestone.id);
    if (currentIndex >= 0 && currentIndex < MILESTONES.length - 1) {
      return MILESTONES[currentIndex + 1];
    }
    return null;
  }, [milestone.id]);


  const handleNoClick = () => {
    if (isAchieved) {
      onAchievementChange(milestoneId, null);
    }
    if (nextMilestone) {
      // Stay in fullscreen mode and show next milestone
      window.dispatchEvent(new CustomEvent('show-milestone', { detail: { milestone: nextMilestone } }));
    } else {
      onClose();
    }
  };

  const handleDateSelect = (selectedDate: string) => {
    onAchievementChange(milestoneId, { date: selectedDate });
    
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
      <div className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
        {/* Top Action Bar with Not Yet button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-aurora-text-primary">
            When did this happen?
          </h2>
          <button
            onClick={handleNoClick}
            className="px-5 py-3 text-base text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border hover:border-aurora-border/70 rounded-xl transition-colors touch-manipulation min-h-[44px]"
          >
            {isAchieved ? 'Remove' : 'Not Yet'}
          </button>
        </div>
        
        {/* Question */}
        <div className="text-center mb-8">
          <p className="text-lg text-aurora-text-primary mb-4 leading-relaxed px-2">
            {milestone.question}
          </p>
          
          <div className="flex justify-center">
            <Tooltip text={`Typically emerges around:\n**${milestone.typicalAge} month${milestone.typicalAge !== 1 ? 's' : ''}**`}>
              <div className="inline-flex items-center text-aurora-text-secondary hover:text-aurora-text-primary transition-colors cursor-help">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Typically appears at {milestone.typicalAge} months</span>
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Date slider */}
        <div className="flex-1 flex flex-col justify-center">
          <CompactDateSlider
            dob={dob}
            onDateSelect={handleDateSelect}
            onClose={handleNoClick}
          />
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