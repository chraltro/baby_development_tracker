import React from 'react';
import { Domain } from '../types';

interface DomainIconProps {
  domain: Domain;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const getSizeClass = (size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): string => {
  switch (size) {
    case 'sm': return 'h-4 w-4';
    case 'md': return 'h-6 w-6';
    case 'lg': return 'h-8 w-8';
    case 'xl': return 'h-10 w-10';
    default: return 'h-6 w-6';
  }
};

const domainIconMap: Record<Domain, string> = {
    [Domain.GROSS_MOTOR]: '/images/icons/gross-motor-icon.png',
    [Domain.FINE_MOTOR]: '/images/icons/fine-motor-icon.png',
    [Domain.COGNITIVE]: '/images/icons/cognitive-icon.png',
    [Domain.LANGUAGE_COMMUNICATION]: '/images/icons/language-icon.png',
    [Domain.SOCIAL_EMOTIONAL]: '/images/icons/social-emotional-icon.png',
    [Domain.ADAPTIVE_SELF_CARE]: '/images/icons/adaptive-icon.png'
};

const domainAltTextMap: Record<Domain, string> = {
    [Domain.GROSS_MOTOR]: 'Gross Motor Development',
    [Domain.FINE_MOTOR]: 'Fine Motor Development',
    [Domain.COGNITIVE]: 'Cognitive Development',
    [Domain.LANGUAGE_COMMUNICATION]: 'Language & Communication Development',
    [Domain.SOCIAL_EMOTIONAL]: 'Social-Emotional Development',
    [Domain.ADAPTIVE_SELF_CARE]: 'Adaptive/Self-Care Development'
};

const DomainIcon: React.FC<DomainIconProps> = ({ domain, size = 'md', className = '' }) => {
  const iconPath = domainIconMap[domain];
  const altText = domainAltTextMap[domain];
  const sizeClass = getSizeClass(size);
  
  return (
    <img 
      src={iconPath}
      alt={altText}
      className={`${sizeClass} ${className}`}
      loading="lazy"
    />
  );
};

export default DomainIcon;
