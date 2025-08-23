import React from 'react';
import { MilestoneWithAchievement, DOMAIN_COLORS, Domain } from '../types';
import DomainIcon from './DomainIcon';

interface TimelineProps {
  timelineData: { month: number; milestones: MilestoneWithAchievement[] }[];
}

const GlowOrb = () => (
    <div className="absolute -left-[24px] mt-1.5 w-12 h-12 flex items-center justify-center">
        <div className="absolute w-5 h-5 bg-aurora-accent-blue rounded-full ring-8 ring-aurora-bg z-10"></div>
        <div className="absolute w-12 h-12 bg-aurora-accent-blue rounded-full opacity-30 blur-lg"></div>
    </div>
);

const Timeline: React.FC<TimelineProps> = ({ timelineData }) => {
  if (!timelineData || timelineData.length === 0) {
    return null; 
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T12:00:00').toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  }

  const domainGlowColors: Record<Domain, string> = {
    [Domain.GROSS_MOTOR]: 'shadow-[0_0_15px_2px_rgba(247,120,186,0.3)]',
    [Domain.FINE_MOTOR]: 'shadow-[0_0_15px_2px_rgba(162,139,254,0.3)]',
    [Domain.COGNITIVE]: 'shadow-[0_0_15px_2px_rgba(255,191,105,0.3)]',
    [Domain.LANGUAGE_COMMUNICATION]: 'shadow-[0_0_15px_2px_rgba(121,192,255,0.3)]',
    [Domain.SOCIAL_EMOTIONAL]: 'shadow-[0_0_15px_2px_rgba(57,211,147,0.3)]',
    [Domain.ADAPTIVE_SELF_CARE]: 'shadow-[0_0_15px_2px_rgba(88,166,255,0.3)]',
  };

  return (
    <div className="relative border-l-2 border-aurora-border ml-6 pl-10">
      {timelineData.map(({ month, milestones }, index) => (
        <div key={month} className="mb-10">
          <GlowOrb />
          <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-aurora-text-primary mb-4">
                  {month === 0 ? "First Month" : `${month} Months Old`}
              </h3>
              <div className="space-y-6">
              {milestones.map(milestone => (
                  <div 
                    key={milestone.id} 
                    className={`group bg-aurora-card/70 backdrop-blur-lg border border-aurora-border rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-aurora-accent-blue/50 ${domainGlowColors[milestone.domain]}`}
                  >
                       {milestone.photo && (
                           <img src={milestone.photo} alt={milestone.description} className="w-full h-48 object-cover" />
                       )}
                       <div className="p-4">
                           <div className="flex items-start gap-4">
                               <div className="mt-1 flex-shrink-0" style={{ color: DOMAIN_COLORS[milestone.domain] }}>
                                   <DomainIcon domain={milestone.domain} size="md" />
                               </div>
                               <div>
                                   <p className="font-semibold text-aurora-text-primary">{milestone.description}</p>
                                   <p className="text-sm text-aurora-text-secondary mt-1">
                                      {formatDate(milestone.achievedDate)}
                                   </p>
                               </div>
                           </div>
                       </div>
                  </div>
              ))}
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;