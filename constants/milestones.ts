import { Milestone } from '../types';
import { adaptiveMilestones } from './milestones/adaptive';
import { cognitiveMilestones } from './milestones/cognitive';
import { fineMotorMilestones } from './milestones/fineMotor';
import { grossMotorMilestones } from './milestones/grossMotor';
import { languageMilestones } from './milestones/language';
import { socialEmotionalMilestones } from './milestones/socialEmotional';

export const milestones: Milestone[] = [
    ...grossMotorMilestones,
    ...fineMotorMilestones,
    ...cognitiveMilestones,
    ...languageMilestones,
    ...socialEmotionalMilestones,
    ...adaptiveMilestones,
];

// Export as MILESTONES for consistency
export const MILESTONES = milestones;
