
export enum Domain {
    GROSS_MOTOR = 'Gross Motor',
    FINE_MOTOR = 'Fine Motor',
    COGNITIVE = 'Cognitive',
    LANGUAGE_COMMUNICATION = 'Language & Communication',
    SOCIAL_EMOTIONAL = 'Social-Emotional',
    ADAPTIVE_SELF_CARE = 'Adaptive/Self-Care',
}

export const DOMAIN_COLORS: { [key in Domain]: string } = {
    [Domain.GROSS_MOTOR]: '#F778BA', // Pink
    [Domain.FINE_MOTOR]: '#A28BFE', // Purple
    [Domain.COGNITIVE]: '#FFBF69', // Orange (as a warm contrast)
    [Domain.LANGUAGE_COMMUNICATION]: '#79C0FF', // Blue
    [Domain.SOCIAL_EMOTIONAL]: '#39D393', // Green
    [Domain.ADAPTIVE_SELF_CARE]: '#58A6FF', // Lighter Blue
};

export interface Milestone {
    id: string;
    domain: Domain;
    ageGroup: string; // e.g., '0-3'
    description: string;
    typicalAge: number; // in months
    question: string;
    isRedFlag: (chronologicalAge: number) => boolean;
    dependsOn?: string[];
    canonicalId?: string;
}

export type AchievementData = {
    date: string; // ISO Date string 'YYYY-MM-DD'
    photo?: string; // Base64 encoded image string
};

export type Achievements = Record<string, AchievementData>; // Key: milestoneId

export interface BabyProfile {
    name: string;
    dob: string;
}

export interface MilestoneWithAchievement extends Milestone {
    achievedDate: string;
    ageInMonths: number;
    photo?: string;
}