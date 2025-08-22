import { useMemo } from 'react';
import { Achievements, Milestone, MilestoneWithAchievement } from '../types';
import { milestones } from '../constants/milestones';

const getChronologicalAgeInMonths = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);

    if (birthDate > today) return 0;

    let monthDiff = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
    
    if (today.getDate() < birthDate.getDate()) {
        monthDiff--;
    }

    return Math.max(0, monthDiff);
};

const getAgeInMonthsOnDate = (dob: string, achievementDate: string): number => {
    if (!dob || !achievementDate) return 0;
    const birthDate = new Date(dob);
    const achievedDate = new Date(achievementDate);
    
    if (isNaN(birthDate.getTime()) || isNaN(achievedDate.getTime())) return 0;

    achievedDate.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);

    if (birthDate > achievedDate) return 0;

    let monthDiff = (achievedDate.getFullYear() - birthDate.getFullYear()) * 12 + (achievedDate.getMonth() - birthDate.getMonth());
    
    if (achievedDate.getDate() < birthDate.getDate()) {
        monthDiff--;
    }
    return Math.max(0, monthDiff);
};


export const useMilestoneTracker = (dob: string, achievements: Achievements) => {
    const chronologicalAge = useMemo(() => getChronologicalAgeInMonths(dob), [dob]);

    const timelineData = useMemo(() => {
        if (!dob || Object.keys(achievements).length === 0) return [];

        const achievedMilestones = Object.entries(achievements)
            .map(([milestoneId, data]): MilestoneWithAchievement | null => {
                const milestone = milestones.find(m => (m.canonicalId || m.id) === milestoneId);
                if (!milestone) return null;
                return {
                    ...milestone,
                    achievedDate: data.date,
                    ageInMonths: getAgeInMonthsOnDate(dob, data.date),
                    photo: data.photo,
                };
            })
            .filter((m): m is MilestoneWithAchievement => m !== null)
            .sort((a, b) => new Date(a.achievedDate).getTime() - new Date(b.achievedDate).getTime());

        const groupedByMonth = achievedMilestones.reduce((acc, milestone) => {
            const month = Math.floor(milestone.ageInMonths);
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(milestone);
            return acc;
        }, {} as Record<number, MilestoneWithAchievement[]>);

        return Object.entries(groupedByMonth).map(([month, milestones]) => ({
            month: Number(month),
            milestones,
        })).sort((a,b) => a.month - b.month);

    }, [dob, achievements]);

    return {
        chronologicalAge,
        timelineData,
    };
};