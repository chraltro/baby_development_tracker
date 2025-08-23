import React, { useMemo } from 'react';
import { Domain, Achievements, DOMAIN_COLORS } from '../types';
import { milestones } from '../constants/milestones';
import DomainIcon from './DomainIcon';

interface ProgressOverviewProps {
  achievements: Achievements;
  chronologicalAge: number;
  onDomainClick: (domain: Domain) => void;
  className?: string;
}

const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  achievements,
  chronologicalAge,
  onDomainClick,
  className = ''
}) => {
  const domainStats = useMemo(() => {
    const domains = Object.values(Domain);
    
    return domains.map(domain => {
      const domainMilestones = milestones.filter(m => m.domain === domain);
      const achievedCount = domainMilestones.filter(m => {
        const achievementKey = m.canonicalId || m.id;
        return !!achievements[achievementKey];
      }).length;
      
      const totalCount = domainMilestones.length;
      const progress = totalCount > 0 ? (achievedCount / totalCount) * 100 : 0;
      
      // Find upcoming milestones (next 1-3 milestones that could be achieved soon)
      const upcomingMilestones = domainMilestones
        .filter(m => {
          const achievementKey = m.canonicalId || m.id;
          const isNotAchieved = !achievements[achievementKey];
          const isWithinReasonableAge = m.typicalAge <= chronologicalAge + 6; // Next 6 months
          
          // Check dependencies are met
          const dependenciesMet = !m.dependsOn || m.dependsOn.every(depId => {
            const dependencyMilestone = milestones.find(ms => ms.id === depId);
            if (!dependencyMilestone) return false;
            const achievementKey = dependencyMilestone.canonicalId || dependencyMilestone.id;
            return !!achievements[achievementKey];
          });
          
          return isNotAchieved && isWithinReasonableAge && dependenciesMet;
        })
        .sort((a, b) => a.typicalAge - b.typicalAge)
        .slice(0, 2);
      
      // Recent achievements (last 30 days)
      const recentAchievements = domainMilestones
        .filter(m => {
          const achievementKey = m.canonicalId || m.id;
          const achievement = achievements[achievementKey];
          if (!achievement) return false;
          
          const achievementDate = new Date(achievement.date);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          return achievementDate >= thirtyDaysAgo;
        })
        .length;
      
      return {
        domain,
        progress,
        achievedCount,
        totalCount,
        upcomingMilestones,
        recentAchievements,
        color: DOMAIN_COLORS[domain]
      };
    });
  }, [achievements, chronologicalAge]);

  return (
    <div className={`bg-aurora-card/70 backdrop-blur-lg border border-aurora-border rounded-2xl p-6 shadow-aurora-glow-blue ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-aurora-text-primary mb-2">Development Overview</h3>
        <p className="text-sm text-aurora-text-secondary">Track progress across all developmental areas</p>
      </div>

      <div className="space-y-4">
        {domainStats.map(({ domain, progress, achievedCount, totalCount, upcomingMilestones, recentAchievements }) => (
          <button
            key={domain}
            onClick={() => onDomainClick(domain)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDomainClick(domain);
              }
            }}
            className="w-full text-left p-4 bg-aurora-card/50 hover:bg-aurora-card/70 focus:bg-aurora-card/70 border border-aurora-border hover:border-aurora-border/70 focus:border-aurora-accent-green focus:outline-none focus:ring-2 focus:ring-aurora-accent-green/50 rounded-xl transition-all duration-300 hover:shadow-aurora-glow-blue hover:transform hover:scale-[1.02] focus:transform focus:scale-[1.02] touch-manipulation group"
            role="button"
            tabIndex={0}
            aria-label={`View ${domain.replace('_', ' and ')} milestones. ${achievedCount} of ${totalCount} completed. ${progress.toFixed(0)}% progress.`}
            aria-describedby={`domain-${domain}-details`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <DomainIcon domain={domain} size="md" />
                <div>
                  <h4 className="font-semibold text-aurora-text-primary text-sm group-hover:text-aurora-accent-green transition-colors">
                    {domain.replace('_', ' & ')}
                  </h4>
                  <p className="text-xs text-aurora-text-secondary">
                    {achievedCount} of {totalCount} milestones
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {recentAchievements > 0 && (
                  <div className="bg-aurora-accent-green/20 text-aurora-accent-green px-2 py-1 rounded-full text-xs font-semibold">
                    +{recentAchievements} recent
                  </div>
                )}
                <div className="text-right">
                  <div className="text-sm font-bold bg-clip-text text-transparent bg-progress-gradient">
                    {Math.round(progress)}%
                  </div>
                  <svg className="w-4 h-4 text-aurora-text-secondary group-hover:text-aurora-accent-green transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3" id={`domain-${domain}-details`}>
              <div 
                className="w-full bg-aurora-card rounded-full h-2"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${domain.replace('_', ' and ')} progress: ${Math.round(progress)} percent`}
              >
                <div 
                  className="bg-progress-gradient h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Upcoming Milestones Preview */}
            {upcomingMilestones.length > 0 && (
              <div className="text-xs">
                <p className="text-aurora-text-secondary/80 mb-1">Next up:</p>
                <div className="space-y-1">
                  {upcomingMilestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex items-center justify-between bg-aurora-accent-blue/10 border border-aurora-accent-blue/20 rounded-lg px-2 py-1">
                      <span className="text-aurora-text-secondary text-xs truncate flex-1 mr-2">
                        {milestone.question.split('?')[0]}?
                      </span>
                      <span className="text-aurora-accent-blue text-xs font-medium whitespace-nowrap">
                        ~{milestone.typicalAge}m
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {progress === 100 && (
              <div className="flex items-center justify-center mt-3 p-2 bg-aurora-accent-green/10 border border-aurora-accent-green/20 rounded-lg">
                <svg className="w-4 h-4 text-aurora-accent-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-aurora-accent-green text-xs font-semibold">All milestones achieved!</span>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Overall Progress Summary */}
      <div className="mt-6 pt-6 border-t border-aurora-border">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-aurora-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h4 className="font-semibold text-aurora-text-primary">Overall Progress</h4>
          </div>
          <p className="text-sm text-aurora-text-secondary mb-3">
            {domainStats.reduce((sum, stat) => sum + stat.achievedCount, 0)} milestones achieved across all areas
          </p>
          <div className="text-xs text-aurora-text-secondary/80">
            Tracking development for {Math.floor(chronologicalAge)} month{chronologicalAge !== 1 ? 's' : ''} old
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;