import React, { useState, useCallback, useEffect } from 'react';
import { BabyProfile, Achievements, AchievementData } from './types';
import { useMilestoneTracker } from './hooks/useMilestoneTracker';
import Questionnaire from './components/Questionnaire';
import Timeline from './components/Timeline';
import FullscreenModal from './components/FullscreenModal';
import FullscreenProfile from './components/FullscreenProfile';
import FullscreenTimeline from './components/FullscreenTimeline';

const getDetailedAge = (dob: string) => {
  if (!dob) return null;
  
  const birthDate = new Date(dob);
  const today = new Date();
  const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (totalDays < 0) return null;
  
  const years = Math.floor(totalDays / 365.25);
  const remainingDaysAfterYears = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(remainingDaysAfterYears / 30.44);
  const days = Math.floor(remainingDaysAfterYears - (months * 30.44));
  
  const parts = [];
  if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
  if (days > 0 && years === 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  
  return parts.length > 0 ? parts.join(', ') + ' old' : 'Born today!';
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<BabyProfile>(() => {
    try {
      const savedProfile = localStorage.getItem('babyProfile');
      return savedProfile ? JSON.parse(savedProfile) : { name: '', dob: '' };
    } catch (error) {
      console.error("Failed to parse profile from localStorage", error);
      return { name: '', dob: '' };
    }
  });
  
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(() => {
    const savedProfile = localStorage.getItem('babyProfile');
    const parsedProfile = savedProfile ? JSON.parse(savedProfile) : { name: '', dob: '' };
    return !parsedProfile.name || !parsedProfile.dob;
  });
  
  const [showFullscreenProfile, setShowFullscreenProfile] = useState(false);
  const [showFullscreenTimeline, setShowFullscreenTimeline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const [achievements, setAchievements] = useState<Achievements>(() => {
     try {
      const savedAchievements = localStorage.getItem('babyAchievements');
      return savedAchievements ? JSON.parse(savedAchievements) : {};
    } catch (error)
    {
      console.error("Failed to parse achievements from localStorage", error);
      return {};
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem('babyProfile', JSON.stringify(profile));
    } catch (error) {
        console.error("Failed to save profile to localStorage", error);
    }
  }, [profile]);

  useEffect(() => {
    try {
        localStorage.setItem('babyAchievements', JSON.stringify(achievements));
    } catch (error) {
        console.error("Failed to save achievements to localStorage", error);
    }
  }, [achievements]);

  const { 
      chronologicalAge, 
      timelineData,
  } = useMilestoneTracker(profile.dob, achievements);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  const handleProfileSave = () => {
    if (profile.name && profile.dob) {
      setIsEditingProfile(false);
      setShowFullscreenProfile(false);
    }
  };
  
  const handleEditProfile = () => {
    if (isMobile) {
      setShowFullscreenProfile(true);
    } else {
      setIsEditingProfile(true);
    }
  };
  
  const handleAchievementChange = useCallback((milestoneId: string, data: AchievementData | null) => {
    setAchievements(prevAchievements => {
      const newAchievements = { ...prevAchievements };
      if (data) {
        // Keep existing photo if only date is updated
        const existingPhoto = newAchievements[milestoneId]?.photo;
        newAchievements[milestoneId] = { date: data.date, photo: existingPhoto };
      } else {
        delete newAchievements[milestoneId];
      }
      return newAchievements;
    });
  }, []);

  const handlePhotoChange = useCallback((milestoneId: string, photo: string | null) => {
    setAchievements(prevAchievements => {
        const newAchievements = { ...prevAchievements };
        if (newAchievements[milestoneId]) {
            if (photo) {
                newAchievements[milestoneId].photo = photo;
            } else {
                delete newAchievements[milestoneId].photo;
            }
        }
        return newAchievements;
    });
  }, []);
  
  return (
    <>
      <div className="min-h-screen text-aurora-text-primary font-sans">
      <header className="bg-aurora-card/70 border-b border-aurora-border/50 shadow-md sticky top-0 z-20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-button-gradient flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block mr-2 text-aurora-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="hidden sm:inline-block">Milestone Memories</span>
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6">
        {isEditingProfile && !isMobile ? (
          <div className="bg-aurora-card/70 backdrop-blur-lg border border-aurora-border p-6 sm:p-5 rounded-2xl shadow-aurora-glow-blue mb-8">
            <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aurora-accent-green mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <h2 className="text-xl font-semibold">Baby's Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-aurora-text-secondary mb-1">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={profile.name} 
                    onChange={handleProfileChange} 
                    placeholder="Enter baby's name"
                    className="block w-full px-4 py-3 sm:px-3 sm:py-2 text-base sm:text-sm bg-aurora-bg border border-aurora-border rounded-xl sm:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora-accent-green touch-manipulation"
                  />
              </div>
              <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-aurora-text-secondary mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    name="dob" 
                    id="dob" 
                    value={profile.dob} 
                    onChange={handleProfileChange} 
                    className="block w-full px-4 py-3 sm:px-3 sm:py-2 text-base sm:text-sm bg-aurora-bg border border-aurora-border rounded-xl sm:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora-accent-green touch-manipulation"
                  />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleProfileSave}
                  disabled={!profile.name || !profile.dob}
                  className="flex-1 px-6 py-3 sm:px-4 sm:py-2 bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 disabled:bg-aurora-border/20 disabled:text-aurora-text-secondary text-aurora-accent-green disabled:cursor-not-allowed rounded-xl sm:rounded-lg transition-colors touch-manipulation min-h-[44px] sm:min-h-0 font-semibold"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        ) : !isEditingProfile ? (
          <div className="bg-aurora-card/70 backdrop-blur-lg border border-aurora-border p-6 sm:p-5 rounded-2xl shadow-aurora-glow-blue mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-aurora-accent-green mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <div>
                  <h2 className="text-xl sm:text-lg font-bold text-aurora-text-primary">{profile.name}</h2>
                  <p className="text-sm text-aurora-text-secondary">Born {new Date(profile.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 sm:px-3 sm:py-1.5 text-sm text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border hover:border-aurora-border/70 rounded-lg transition-colors touch-manipulation"
              >
                Change
              </button>
            </div>
            <div className="bg-aurora-card/50 p-4 rounded-xl border border-aurora-border/50">
              <p className="text-lg sm:text-base font-bold bg-clip-text text-transparent bg-button-gradient text-center">
                {getDetailedAge(profile.dob) || 'Enter DOB to see age'}
              </p>
            </div>
          </div>
        ) : null}

        {profile.dob && (!isEditingProfile || !isMobile) ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-4 text-aurora-text-primary">Log Milestones</h2>
              <Questionnaire 
                chronologicalAge={chronologicalAge}
                achievements={achievements}
                onAchievementChange={handleAchievementChange}
                onPhotoChange={handlePhotoChange}
                dob={profile.dob}
              />
            </div>
            <div className="lg:col-span-1">
               <div className="flex items-center justify-between mb-4">
                 <h2 className="text-3xl font-bold text-aurora-text-primary">Baby's Timeline</h2>
                 {isMobile && (
                   <button
                     onClick={() => setShowFullscreenTimeline(true)}
                     className="px-4 py-2 text-sm text-aurora-text-secondary hover:text-aurora-text-primary border border-aurora-border hover:border-aurora-border/70 rounded-lg transition-colors touch-manipulation"
                   >
                     Fullscreen
                   </button>
                 )}
               </div>
               {timelineData.length > 0 ? (
                    <Timeline timelineData={timelineData} />
               ) : (
                    <div className="text-center py-16 px-6 bg-aurora-card/70 backdrop-blur-lg border border-aurora-border rounded-2xl shadow-aurora-glow-blue h-full flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-aurora-accent-purple mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-aurora-text-primary">Your Timeline Awaits!</h3>
                        <p className="text-aurora-text-secondary mt-2">Log your baby's "firsts" on the left to see their amazing journey unfold here.</p>
                    </div>
               )}
            </div>
          </div>
        ) : (
            <div className="text-center py-16 px-6 bg-aurora-card/70 backdrop-blur-lg border border-aurora-border rounded-2xl shadow-aurora-glow-blue">
                <h2 className="text-2xl font-semibold text-aurora-text-primary">Welcome!</h2>
                <p className="text-aurora-text-secondary mt-2">Please enter your baby's name and date of birth above to begin creating memories.</p>
            </div>
        )}
      </main>
      </div>
      
      {/* Fullscreen Profile Modal for Mobile */}
      <FullscreenModal
        isOpen={showFullscreenProfile || (isMobile && isEditingProfile)}
        onClose={() => {
          setShowFullscreenProfile(false);
          if (profile.name && profile.dob) {
            setIsEditingProfile(false);
          }
        }}
        title="Baby's Profile"
      >
        <FullscreenProfile
          profile={profile}
          onProfileChange={handleProfileChange}
          onSave={handleProfileSave}
          onClose={() => {
            setShowFullscreenProfile(false);
            if (profile.name && profile.dob) {
              setIsEditingProfile(false);
            }
          }}
        />
      </FullscreenModal>
      
      {/* Fullscreen Timeline Modal for Mobile */}
      <FullscreenModal
        isOpen={showFullscreenTimeline}
        onClose={() => setShowFullscreenTimeline(false)}
        title="Baby's Timeline"
      >
        <FullscreenTimeline
          timelineData={timelineData}
          onClose={() => setShowFullscreenTimeline(false)}
        />
      </FullscreenModal>
    </>
  );
};

export default App;