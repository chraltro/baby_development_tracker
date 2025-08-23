import React, { useState, useRef, useEffect, useMemo } from 'react';
import { milestones, MILESTONES } from '../constants/milestones';
import { Domain, Achievements, AchievementData, Milestone } from '../types';
import Tooltip from './Tooltip';
import DomainIcon from './DomainIcon';
import DateSlider from './DateSlider';
import FullscreenModal from './FullscreenModal';
import FullscreenQuestionnaire from './FullscreenQuestionnaire';

interface QuestionnaireProps {
  chronologicalAge: number;
  achievements: Achievements;
  onAchievementChange: (milestoneId: string, data: AchievementData | null) => void;
  onPhotoChange: (milestoneId: string, photo: string | null) => void;
  dob: string;
  activeDomain?: Domain;
  onDomainChange?: (domain: Domain) => void;
}

const domains = Object.values(Domain);

const Questionnaire: React.FC<QuestionnaireProps> = ({ chronologicalAge, achievements, onAchievementChange, onPhotoChange, dob, activeDomain: externalActiveDomain, onDomainChange }) => {
  const [internalActiveDomain, setInternalActiveDomain] = useState<Domain>(domains[0]);
  const activeDomain = externalActiveDomain || internalActiveDomain;
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [milestoneForPhoto, setMilestoneForPhoto] = useState<string | null>(null);
  const [showDateSlider, setShowDateSlider] = useState<string | null>(null);
  const [fullscreenMilestone, setFullscreenMilestone] = useState<Milestone | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Listen for milestone navigation events
    const handleShowMilestone = (event: any) => {
      setFullscreenMilestone(event.detail.milestone);
    };
    
    window.addEventListener('show-milestone', handleShowMilestone);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('show-milestone', handleShowMilestone);
    };
  }, []);

  const relevantMilestones = milestones.filter(m => {
    if (m.domain !== activeDomain) return false;
    if (m.dependsOn && m.dependsOn.length > 0) {
      return m.dependsOn.every(depId => {
        const dependencyMilestone = milestones.find(ms => ms.id === depId);
        if (!dependencyMilestone) return false;
        const achievementKey = dependencyMilestone.canonicalId || dependencyMilestone.id;
        return !!achievements[achievementKey];
      });
    }
    return true;
  }).sort((a,b) => a.typicalAge - b.typicalAge);

  const totalPossibleMilestonesInDomain = milestones.filter(m => m.domain === activeDomain).length;
  const achievedCount = milestones.filter(m => m.domain === activeDomain && achievements[m.canonicalId || m.id]).length;
  const progress = totalPossibleMilestonesInDomain > 0 ? (achievedCount / totalPossibleMilestonesInDomain) * 100 : 0;
  

  const handleLogButtonClick = (milestoneId: string) => {
    if (isMobile) {
      const milestone = relevantMilestones.find(m => m.id === milestoneId);
      if (milestone) {
        setFullscreenMilestone(milestone);
      }
    } else {
      setShowDateSlider(currentId => currentId === milestoneId ? null : milestoneId);
    }
  };

  const handleDateSelected = (milestoneId: string, dateString: string) => {
    onAchievementChange(milestoneId, { date: dateString });
    setShowDateSlider(null);
  };

  const handlePhotoUploadClick = (milestoneId: string) => {
    setMilestoneForPhoto(milestoneId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && milestoneForPhoto) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(milestoneForPhoto, reader.result as string);
        setMilestoneForPhoto(null);
      };
      reader.readAsDataURL(file);
    }
    if(event.target) event.target.value = '';
  };


  return (
    <>
      <div className="bg-aurora-card/70 backdrop-blur-lg border border-aurora-border p-4 sm:p-6 rounded-2xl shadow-aurora-glow-blue">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <div className="mb-6">
        {/* Mobile: Vertical stack of category buttons */}
        <div className="md:hidden space-y-2">
          {domains.map(domain => (
            <button
              key={domain}
              onClick={() => {
                if (onDomainChange) {
                  onDomainChange(domain);
                } else {
                  setInternalActiveDomain(domain);
                }
              }}
              data-no-aurora
              className={`w-full flex items-center py-4 px-6 font-semibold text-base rounded-xl transition-all duration-300 touch-manipulation ${
                activeDomain === domain
                  ? 'bg-aurora-accent-green/20 text-aurora-accent-green border-2 border-aurora-accent-green/30 shadow-aurora-glow-green'
                  : 'bg-aurora-card/50 text-aurora-text-secondary hover:text-aurora-text-primary active:text-aurora-text-primary border-2 border-aurora-border hover:border-aurora-border/70'
              }`}
            >
              <DomainIcon domain={domain} size="lg" />
              <span className="ml-3 text-base font-semibold">{domain.replace('_', ' ')}</span>
              {activeDomain === domain && (
                <svg className="ml-auto w-6 h-6 text-aurora-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
        
        {/* Desktop: Horizontal tabs */}
        <div className="hidden md:flex flex-wrap border-b border-aurora-border overflow-x-auto scrollbar-hide">
          {domains.map(domain => (
            <button
              key={domain}
              onClick={() => {
                if (onDomainChange) {
                  onDomainChange(domain);
                } else {
                  setInternalActiveDomain(domain);
                }
              }}
              data-no-aurora
              className={`relative flex items-center justify-center py-3 px-3 -mb-px font-semibold text-sm whitespace-nowrap focus:outline-none transition-all duration-300 touch-manipulation ${
                activeDomain === domain
                  ? 'text-aurora-text-primary'
                  : 'text-aurora-text-secondary hover:text-aurora-text-primary active:text-aurora-text-primary'
              }`}
            >
              <DomainIcon domain={domain} size="md" />
              <span className="ml-2 text-sm">{domain.replace('_', ' ')}</span>
              {activeDomain === domain && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-aurora-text-primary"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-aurora-text-primary">Category Progress</span>
                <span className="text-sm font-medium bg-clip-text text-transparent bg-progress-gradient">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-aurora-card rounded-full h-2.5">
                <div className="bg-progress-gradient h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
        
        <div className="space-y-4 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-2 sm:pr-2 -mr-2 sm:mr-0">
            {relevantMilestones.length === 0 && (
                <div className="text-center py-12 px-6 bg-aurora-card/30 backdrop-blur-sm border border-aurora-border/50 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-aurora-accent-blue/20 rounded-full mb-4">
                        <svg className="w-8 h-8 text-aurora-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-aurora-text-primary mb-2">Building Foundations First</h3>
                    <p className="text-aurora-text-secondary text-sm leading-relaxed mb-4">
                        More milestones in this category will unlock as you log foundational skills. 
                        Development builds on earlier achievements!
                    </p>
                    <div className="text-xs text-aurora-text-secondary/80 bg-aurora-accent-blue/10 rounded-lg p-3 border border-aurora-accent-blue/20">
                        Try checking other development areas for available milestones to track.
                    </div>
                </div>
            )}
            {relevantMilestones.map(milestone => {
                const milestoneId = milestone.canonicalId || milestone.id;
                const achievedData = achievements[milestoneId];
                const isExpanded = expandedMilestoneId === milestone.id;

                return (
                    <div key={milestone.id} className={`p-4 sm:p-4 p-5 border rounded-xl sm:rounded-lg transition-all duration-300 ${achievedData ? 'bg-aurora-accent-green/10 border-aurora-accent-green/30 shadow-aurora-glow-green' : 'bg-aurora-card/50 border-aurora-border'}`}>
                        <div className="flex items-start justify-between">
                            <p className={`font-medium mb-4 sm:mb-3 flex-1 text-base sm:text-sm leading-relaxed ${achievedData ? 'text-aurora-text-secondary' : 'text-aurora-text-primary'}`}>{milestone.question}</p>
                            <Tooltip text={`Typically emerges around\n${milestone.typicalAge} months`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-5 sm:w-5 text-aurora-text-secondary ml-3 sm:ml-2 cursor-pointer touch-manipulation" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </Tooltip>
                        </div>
                        {achievedData ? (
                            <div className="space-y-3 animate-fade-in">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-aurora-accent-green" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm font-semibold text-aurora-text-primary">
                                            Achieved on {new Date(achievedData.date + 'T12:00:00').toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onAchievementChange(milestoneId, null)}
                                        className="px-2 py-1 text-xs text-aurora-accent-pink bg-aurora-accent-pink/10 rounded-full hover:bg-aurora-accent-pink/20 transition-colors"
                                    >
                                        Undo
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 pt-2">
                                    {achievedData.photo && <img src={achievedData.photo} alt="Milestone" className="w-16 h-16 rounded-md object-cover border-2 border-aurora-border" />}
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => handlePhotoUploadClick(milestoneId)} className="px-3 py-1 text-xs rounded-full bg-aurora-accent-blue/20 text-aurora-accent-blue hover:bg-aurora-accent-blue/30 transition-colors">{achievedData.photo ? 'Change Photo' : 'Add Photo'}</button>
                                        {achievedData.photo && <button onClick={() => onPhotoChange(milestoneId, null)} className="px-3 py-1 text-xs rounded-full bg-aurora-border/50 text-aurora-text-secondary hover:bg-aurora-border transition-colors">Remove Photo</button>}
                                    </div>
                                </div>
                            </div>
                        ) : (
                             <div>
                                <button 
                                    onClick={() => handleLogButtonClick(milestone.id)} 
                                    className="px-6 py-3 sm:px-4 sm:py-2 text-base sm:text-sm font-semibold rounded-full bg-aurora-border text-aurora-text-primary hover:bg-aurora-border/70 active:bg-aurora-border/60 transform hover:scale-105 active:scale-95 transition-all touch-manipulation touch-feedback min-h-[44px] sm:min-h-0"
                                >
                                    {isMobile ? 'Open' : 'Log Achievement'}
                                </button>
                            </div>
                        )}
                        
                        {/* Inline Date Slider - hidden on mobile */}
                        {!isMobile && (
                          <DateSlider
                            dob={dob}
                            isExpanded={showDateSlider === milestone.id}
                            onDateSelect={(dateString) => handleDateSelected(milestone.id, dateString)}
                            onClose={() => setShowDateSlider(null)}
                          />
                        )}
                    </div>
                );
            })}
        </div>
      </div>
      </div>
      
      {/* Fullscreen Modal for Mobile */}
      <FullscreenModal
        isOpen={!!fullscreenMilestone}
        onClose={() => setFullscreenMilestone(null)}
        title={fullscreenMilestone?.domain || ''}
      >
        {fullscreenMilestone && (
          <FullscreenQuestionnaire
            milestone={fullscreenMilestone}
            achievements={achievements}
            onAchievementChange={onAchievementChange}
            onClose={() => setFullscreenMilestone(null)}
            dob={dob}
            chronologicalAge={chronologicalAge}
          />
        )}
      </FullscreenModal>
    </>
  );
};

export default Questionnaire;