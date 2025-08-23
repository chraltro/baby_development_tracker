import React from 'react';
import { Domain, Achievements } from '../types';
import { milestones } from '../constants/milestones';
import DomainIcon from './DomainIcon';

interface MilestoneSuggestionsProps {
  chronologicalAge: number;
  achievements: Achievements;
  onSuggestionClick: (domain: Domain) => void;
  className?: string;
}

const MilestoneSuggestions: React.FC<MilestoneSuggestionsProps> = ({
  chronologicalAge,
  achievements,
  onSuggestionClick,
  className = ''
}) => {
  // Get age-appropriate suggestions
  const getSuggestions = () => {
    const ageInMonths = chronologicalAge;
    const ageRangeStart = Math.max(0, ageInMonths - 1);
    const ageRangeEnd = ageInMonths + 3;

    // Find unachieved milestones within age range
    const suggestions = milestones
      .filter(milestone => {
        const achievementKey = milestone.canonicalId || milestone.id;
        const isNotAchieved = !achievements[achievementKey];
        const isAgeAppropriate = milestone.typicalAge >= ageRangeStart && milestone.typicalAge <= ageRangeEnd;
        
        // Check dependencies are met
        const dependenciesMet = !milestone.dependsOn || milestone.dependsOn.every(depId => {
          const dependencyMilestone = milestones.find(ms => ms.id === depId);
          if (!dependencyMilestone) return false;
          const achievementKey = dependencyMilestone.canonicalId || dependencyMilestone.id;
          return !!achievements[achievementKey];
        });

        return isNotAchieved && isAgeAppropriate && dependenciesMet;
      })
      .sort((a, b) => {
        // Sort by how close to current age, then by typical age
        const aDistance = Math.abs(a.typicalAge - ageInMonths);
        const bDistance = Math.abs(b.typicalAge - ageInMonths);
        if (aDistance !== bDistance) return aDistance - bDistance;
        return a.typicalAge - b.typicalAge;
      })
      .slice(0, 4); // Top 4 suggestions

    // Group by domain for better organization
    const suggestionsByDomain = suggestions.reduce((acc, milestone) => {
      if (!acc[milestone.domain]) {
        acc[milestone.domain] = [];
      }
      acc[milestone.domain].push(milestone);
      return acc;
    }, {} as Record<Domain, typeof suggestions>);

    return suggestionsByDomain;
  };

  const suggestions = getSuggestions();
  const domains = Object.keys(suggestions) as Domain[];

  if (domains.length === 0) {
    return (
      <div className={`bg-aurora-card/70 backdrop-blur-lg border border-aurora-border rounded-2xl p-6 shadow-aurora-glow-blue text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-aurora-accent-green/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-aurora-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-aurora-text-primary mb-2">Great Progress!</h3>
        <p className="text-sm text-aurora-text-secondary">
          You're up to date with age-appropriate milestones. Keep exploring different development areas!
        </p>
      </div>
    );
  }

  const getAgeText = (months: number) => {
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
      } else {
        return `${years}y ${remainingMonths}m`;
      }
    }
  };

  const getTimingText = (typicalAge: number) => {
    const ageDiff = typicalAge - chronologicalAge;
    if (ageDiff <= 0) {
      return 'Available now';
    } else if (ageDiff <= 2) {
      return 'Coming soon';
    } else {
      return `In ${ageDiff} month${ageDiff !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className={`bg-aurora-card/70 backdrop-blur-lg border border-aurora-border rounded-2xl p-6 shadow-aurora-glow-blue ${className}`}>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <svg className="w-6 h-6 text-aurora-accent-purple mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="text-xl font-bold text-aurora-text-primary">Milestone Suggestions</h3>
        </div>
        <p className="text-sm text-aurora-text-secondary">
          Age-appropriate milestones for {getAgeText(Math.floor(chronologicalAge))} old
        </p>
      </div>

      <div className="space-y-4">
        {domains.map(domain => (
          <button
            key={domain}
            onClick={() => onSuggestionClick(domain)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSuggestionClick(domain);
              }
            }}
            className="w-full text-left p-4 bg-aurora-card/50 hover:bg-aurora-card/70 focus:bg-aurora-card/70 border border-aurora-border hover:border-aurora-accent-purple/50 focus:border-aurora-accent-purple focus:outline-none focus:ring-2 focus:ring-aurora-accent-purple/50 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] focus:transform focus:scale-[1.02] touch-manipulation group"
            aria-label={`View ${domain.replace('_', ' and ')} milestone suggestions`}
          >
            <div className="flex items-start space-x-3">
              <DomainIcon domain={domain} size="md" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-aurora-text-primary group-hover:text-aurora-accent-purple transition-colors mb-2">
                  {domain.replace('_', ' & ')}
                </h4>
                <div className="space-y-2">
                  {suggestions[domain].map((milestone, index) => (
                    <div 
                      key={milestone.id} 
                      className="bg-aurora-accent-purple/10 border border-aurora-accent-purple/20 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-aurora-accent-purple">
                          {getTimingText(milestone.typicalAge)}
                        </span>
                        <span className="text-xs text-aurora-text-secondary">
                          ~{getAgeText(milestone.typicalAge)}
                        </span>
                      </div>
                      <p className="text-sm text-aurora-text-secondary leading-relaxed">
                        {milestone.question.length > 80 
                          ? `${milestone.question.substring(0, 80)}...` 
                          : milestone.question
                        }
                      </p>
                    </div>
                  ))}
                </div>
                
                {suggestions[domain].length > 1 && (
                  <div className="mt-3 text-xs text-aurora-text-secondary/80 bg-aurora-accent-purple/5 rounded-lg p-2">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Click to explore all {domain.replace('_', ' & ').toLowerCase()} milestones
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {domains.length > 0 && (
        <div className="mt-6 pt-6 border-t border-aurora-border">
          <div className="bg-aurora-accent-blue/10 border border-aurora-accent-blue/20 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-aurora-accent-blue mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-aurora-text-primary text-sm mb-1">Remember</h4>
                <p className="text-xs text-aurora-text-secondary leading-relaxed">
                  These are general guidelines. Every child develops at their own pace. 
                  If you have concerns about your child's development, consult your pediatrician.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilestoneSuggestions;