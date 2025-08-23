import React, { useState } from 'react';
import { BabyProfile } from '../types';

interface WelcomeScreenProps {
  profile: BabyProfile;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isMobile: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  profile,
  onProfileChange,
  onSave,
  isMobile
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  const totalSteps = 3;
  const canProceedToStep2 = profile.name.trim().length > 0;
  const canProceedToStep3 = canProceedToStep2 && profile.dob;
  const canComplete = canProceedToStep3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (canComplete) {
      onSave();
    }
  };

  const developmentDomains = [
    {
      name: 'Gross Motor',
      description: 'Large muscle movements like rolling, sitting, walking',
      icon: '🚶‍♂️',
      color: 'aurora-accent-pink'
    },
    {
      name: 'Fine Motor', 
      description: 'Small muscle control for grasping and manipulation',
      icon: '✋',
      color: 'aurora-accent-purple'
    },
    {
      name: 'Cognitive',
      description: 'Learning, thinking, and problem-solving skills',
      icon: '🧠',
      color: 'aurora-accent-blue'
    },
    {
      name: 'Language',
      description: 'Communication through sounds, words, and gestures',
      icon: '💬',
      color: 'aurora-accent-green'
    },
    {
      name: 'Social-Emotional',
      description: 'Interacting with others and expressing emotions',
      icon: '😊',
      color: 'aurora-accent-green'
    },
    {
      name: 'Adaptive/Self-Care',
      description: 'Daily living skills like feeding and sleeping',
      icon: '🍼',
      color: 'aurora-accent-blue'
    }
  ];

  return (
    <div className="min-h-screen bg-aurora-bg flex flex-col">
      {/* Progress Indicator */}
      <div className="sticky top-0 z-20 bg-aurora-card/80 backdrop-blur-lg border-b border-aurora-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-aurora-text-primary">Welcome to Milestone Memories</h1>
            <span className="text-sm text-aurora-text-secondary">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-aurora-card rounded-full h-2">
            <div 
              className="bg-progress-gradient h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {/* Step 1: Welcome & Introduction */}
        {currentStep === 1 && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-aurora-accent-purple/20 to-aurora-accent-green/20 rounded-full mb-6">
                <svg className="w-12 h-12 text-aurora-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-button-gradient">
                Capture Every Precious Milestone
              </h2>
              <p className="text-lg text-aurora-text-secondary leading-relaxed">
                Welcome to your baby's developmental journey! This app helps you track and celebrate 
                important milestones across six key areas of development.
              </p>
            </div>

            <div className="bg-aurora-card/70 backdrop-blur-lg border border-aurora-border rounded-2xl p-6 shadow-aurora-glow-blue">
              <h3 className="text-lg font-semibold text-aurora-text-primary mb-4">What you can do:</h3>
              <div className="grid gap-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-aurora-accent-green/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-aurora-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-aurora-text-secondary">Log developmental milestones with photos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-aurora-accent-blue/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-aurora-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-aurora-text-secondary">Track progress across development areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-aurora-accent-purple/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-aurora-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-aurora-text-secondary">View a beautiful timeline of achievements</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 focus:bg-aurora-accent-green/30 focus:outline-none focus:ring-2 focus:ring-aurora-accent-green/50 text-aurora-accent-green rounded-2xl transition-all duration-300 font-bold text-lg shadow-aurora-glow-green hover:shadow-aurora-glow-green transform hover:scale-[1.02] touch-manipulation"
              aria-label="Continue to create baby profile"
            >
              Let's Get Started
            </button>
          </div>
        )}

        {/* Step 2: Baby Profile Setup */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-aurora-accent-green/20 rounded-full mb-6">
                <svg className="w-10 h-10 text-aurora-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-aurora-text-primary mb-2">Create Baby's Profile</h2>
              <p className="text-aurora-text-secondary">Let's set up your baby's information to personalize the experience</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-aurora-text-primary mb-3">
                  Baby's Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  value={profile.name} 
                  onChange={onProfileChange} 
                  placeholder="Enter baby's name"
                  className="block w-full px-6 py-4 text-lg bg-aurora-card/70 border border-aurora-border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora-accent-green focus:border-aurora-accent-green touch-manipulation placeholder-aurora-text-secondary/50 transition-all duration-300"
                  autoFocus
                  aria-describedby="name-help"
                />
                <p id="name-help" className="mt-2 text-sm text-aurora-text-secondary">
                  This will help personalize milestone tracking for your little one
                </p>
              </div>
              
              <div>
                <label htmlFor="dob" className="block text-lg font-medium text-aurora-text-primary mb-3">
                  Date of Birth
                </label>
                <input 
                  type="date" 
                  name="dob" 
                  id="dob" 
                  value={profile.dob} 
                  onChange={onProfileChange} 
                  className="block w-full px-6 py-4 text-lg bg-aurora-card/70 border border-aurora-border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora-accent-green focus:border-aurora-accent-green touch-manipulation transition-all duration-300"
                  aria-describedby="dob-help"
                />
                <p id="dob-help" className="mt-2 text-sm text-aurora-text-secondary">
                  This helps us provide age-appropriate milestone suggestions
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                className="flex-1 py-4 bg-aurora-border/20 hover:bg-aurora-border/30 text-aurora-text-secondary rounded-2xl transition-all duration-300 font-semibold touch-manipulation"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceedToStep2}
                className="flex-1 py-4 bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 focus:bg-aurora-accent-green/30 focus:outline-none focus:ring-2 focus:ring-aurora-accent-green/50 disabled:bg-aurora-border/20 disabled:text-aurora-text-secondary text-aurora-accent-green disabled:cursor-not-allowed rounded-2xl transition-all duration-300 font-bold touch-manipulation"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Development Domains Overview */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-aurora-accent-blue/20 rounded-full mb-6">
                <svg className="w-10 h-10 text-aurora-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-aurora-text-primary mb-2">
                Meet the Development Areas
              </h2>
              <p className="text-aurora-text-secondary">
                We'll track {profile.name || 'your baby'}'s progress across these six important areas
              </p>
            </div>

            <div className="grid gap-4">
              {developmentDomains.map((domain, index) => (
                <div
                  key={index}
                  className={`relative p-4 border border-aurora-border rounded-xl transition-all duration-300 cursor-pointer hover:shadow-aurora-glow-blue hover:border-aurora-border/70 ${
                    showTooltip === domain.name ? 'bg-aurora-card/70 shadow-aurora-glow-blue' : 'bg-aurora-card/50'
                  }`}
                  onClick={() => setShowTooltip(showTooltip === domain.name ? null : domain.name)}
                  onMouseEnter={() => !isMobile && setShowTooltip(domain.name)}
                  onMouseLeave={() => !isMobile && setShowTooltip(null)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={showTooltip === domain.name}
                  aria-describedby={`domain-${index}-description`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowTooltip(showTooltip === domain.name ? null : domain.name);
                    }
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl" role="img" aria-label={`${domain.name} icon`}>
                      {domain.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-aurora-text-primary">{domain.name}</h3>
                      <p 
                        id={`domain-${index}-description`}
                        className={`text-sm text-aurora-text-secondary transition-all duration-300 ${
                          showTooltip === domain.name ? 'mt-2 opacity-100' : 'opacity-70'
                        }`}
                      >
                        {domain.description}
                      </p>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-aurora-text-secondary transition-transform duration-300 ${
                        showTooltip === domain.name ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-aurora-accent-blue/10 border border-aurora-accent-blue/30 rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-aurora-accent-blue mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-aurora-text-primary mb-1">Remember</h4>
                  <p className="text-sm text-aurora-text-secondary leading-relaxed">
                    Every baby develops at their own pace. These milestones are guides to celebrate your 
                    baby's unique journey. If you have concerns, always consult your pediatrician.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                className="flex-1 py-4 bg-aurora-border/20 hover:bg-aurora-border/30 text-aurora-text-secondary rounded-2xl transition-all duration-300 font-semibold touch-manipulation"
              >
                Previous
              </button>
              <button
                onClick={handleComplete}
                disabled={!canComplete}
                className="flex-1 py-4 bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 focus:bg-aurora-accent-green/30 focus:outline-none focus:ring-2 focus:ring-aurora-accent-green/50 disabled:bg-aurora-border/20 disabled:text-aurora-text-secondary text-aurora-accent-green disabled:cursor-not-allowed rounded-2xl transition-all duration-300 font-bold shadow-aurora-glow-green hover:shadow-aurora-glow-green transform hover:scale-[1.02] touch-manipulation"
              >
                Start Tracking Milestones
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;