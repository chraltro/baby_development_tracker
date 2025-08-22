import React from 'react';
import { MilestoneWithAchievement } from '../types';
import Timeline from './Timeline';

interface FullscreenTimelineProps {
  timelineData: MilestoneWithAchievement[];
  onClose: () => void;
}

const FullscreenTimeline: React.FC<FullscreenTimelineProps> = ({ timelineData, onClose }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-6">
        {timelineData.length > 0 ? (
          <Timeline timelineData={timelineData} />
        ) : (
          <div className="h-full flex flex-col justify-center items-center text-center px-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-aurora-accent-purple mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-semibold text-aurora-text-primary mb-3">Your Timeline Awaits!</h3>
            <p className="text-aurora-text-secondary text-lg leading-relaxed">
              Log your baby's "firsts" to see their amazing journey unfold here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenTimeline;