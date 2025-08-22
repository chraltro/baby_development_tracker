import React, { useState } from 'react';
import { BabyProfile } from '../types';

interface FullscreenProfileProps {
  profile: BabyProfile;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onClose: () => void;
}

const FullscreenProfile: React.FC<FullscreenProfileProps> = ({
  profile,
  onProfileChange,
  onSave,
  onClose
}) => {
  const canSave = profile.name.trim() && profile.dob;

  const handleSave = () => {
    if (canSave) {
      onSave();
    }
  };

  return (
    <div className="h-full flex flex-col justify-center px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-aurora-accent-green/20 rounded-full mb-6">
          <svg className="w-10 h-10 text-aurora-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-aurora-text-primary mb-2">Set Up Baby's Profile</h2>
        <p className="text-aurora-text-secondary">Let's create memories together</p>
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
            className="block w-full px-6 py-4 text-lg bg-aurora-card/70 border border-aurora-border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora-accent-green focus:border-aurora-accent-green touch-manipulation placeholder-aurora-text-secondary/50"
            autoFocus
          />
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
            className="block w-full px-6 py-4 text-lg bg-aurora-card/70 border border-aurora-border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-aurora-accent-green focus:border-aurora-accent-green touch-manipulation"
          />
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full py-4 bg-aurora-accent-green/20 hover:bg-aurora-accent-green/30 disabled:bg-aurora-border/20 disabled:text-aurora-text-secondary text-aurora-accent-green disabled:cursor-not-allowed rounded-2xl transition-colors touch-manipulation font-bold text-lg shadow-aurora-glow-green"
        >
          Save Profile
        </button>
        
        {profile.name || profile.dob ? (
          <button
            onClick={onClose}
            className="w-full py-4 bg-aurora-border/20 hover:bg-aurora-border/30 text-aurora-text-secondary rounded-2xl transition-colors touch-manipulation font-semibold"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default FullscreenProfile;