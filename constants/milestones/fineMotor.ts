import { Milestone, Domain } from '../../types';

export const fineMotorMilestones: Milestone[] = [
    {
    id: 'FM_0-3_1',
    domain: Domain.FINE_MOTOR,
    ageGroup: '0-3',
    description: 'Brings hands to mouth',
    typicalAge: 3,
    question: 'Baby brings hands to mouth',
    isRedFlag: (age) => age >= 4,
  },
  {
    id: 'FM_0-3_2',
    domain: Domain.FINE_MOTOR,
    ageGroup: '0-3',
    description: 'Hands open half of time',
    typicalAge: 2,
    question: 'Baby keeps hands open (not always fisted)',
    isRedFlag: (age) => age >= 4,
  },
  {
    id: 'FM_0-3_3',
    domain: Domain.FINE_MOTOR,
    ageGroup: '0-3',
    description: 'Hands come together at midline',
    typicalAge: 2,
    question: 'Baby brings hands together at midline',
    isRedFlag: (age) => age >= 4,
    dependsOn: ['FM_0-3_2']
  },
  {
    id: 'FM_4-6_1',
    domain: Domain.FINE_MOTOR,
    ageGroup: '4-6',
    description: 'Reaches with one hand',
    typicalAge: 6,
    question: 'Baby reaches for toys with one hand',
    isRedFlag: (age) => age >= 7,
    dependsOn: ['FM_0-3_3']
  },
  {
    id: 'FM_4-6_4',
    domain: Domain.FINE_MOTOR,
    ageGroup: '4-6',
    description: 'Picks up dropped objects',
    // Picking up a dropped object is expected around 6 months【290633440464665†L84-L87】
    typicalAge: 6,
    question: 'Baby picks up a toy when dropped',
    isRedFlag: (age) => age >= 9,
    dependsOn: ['FM_4-6_1']
  },
  {
    id: 'FM_4-6_2',
    domain: Domain.FINE_MOTOR,
    ageGroup: '4-6',
    description: 'Transfers objects',
    typicalAge: 6,
    question: 'Baby passes a toy from one hand to the other',
    isRedFlag: (age) => age >= 9,
    dependsOn: ['FM_4-6_1']
  },
  {
    id: 'FM_4-6_3',
    domain: Domain.FINE_MOTOR,
    ageGroup: '4-6',
    description: 'Rakes small objects with whole hand',
    typicalAge: 6,
    question: 'Baby uses whole hand to rake or scoop up small objects',
    isRedFlag: (age) => age >= 9,
    dependsOn: ['FM_4-6_1']
  },
  {
    id: 'FM_7-9_1',
    domain: Domain.FINE_MOTOR,
    ageGroup: '7-9',
    description: 'Immature pincer grasp',
    typicalAge: 9,
    question: 'Baby picks up small objects using the side of index finger and thumb',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['FM_4-6_2', 'FM_4-6_3']
  },
  {
    id: 'FM_7-9_2',
    domain: Domain.FINE_MOTOR,
    ageGroup: '7-9',
    description: 'Bangs objects together',
    // By 12 months babies bang two blocks together【207267944887074†L94-L99】
    typicalAge: 9,
    question: 'Baby bangs two toys together to make noise',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['FM_4-6_2']
  },
  {
    id: 'FM_7-9_3',
    domain: Domain.FINE_MOTOR,
    ageGroup: '7-9',
    description: 'Puts objects in and out of container',
    typicalAge: 9,
    question: 'Baby places small items into a container and then dumps them out',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['FM_4-6_2']
  },
  {
    id: 'FM_7-9_4',
    domain: Domain.FINE_MOTOR,
    ageGroup: '7-9',
    description: 'Points with index finger',
    // Pointing emerges around 9 months【547445625177915†L135-L140】
    typicalAge: 9,
    question: 'Baby uses index finger to point at things they want',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['FM_4-6_1']
  },
  {
    id: 'FM_10-12_1',
    domain: Domain.FINE_MOTOR,
    ageGroup: '10-12',
    description: 'Fine pincer grasp',
    typicalAge: 12,
    question: 'Baby picks up a small item like a puff with the tips of thumb and forefinger',
    isRedFlag: (age) => age > 13,
    dependsOn: ['FM_7-9_1']
  },
  {
    id: 'FM_10-12_2',
    domain: Domain.FINE_MOTOR,
    ageGroup: '10-12',
    description: 'Turns pages of a board book',
    // Flipping through pages occurs around 12 months【207267944887074†L96-L99】
    typicalAge: 12,
    question: 'Baby turns pages in a board book, even if they turn several pages at once',
    isRedFlag: (age) => age > 15,
    dependsOn: ['FM_10-12_1']
  },
  {
    id: 'FM_13-18_1',
    domain: Domain.FINE_MOTOR,
    ageGroup: '13-18',
    description: 'Builds tower of 3 cubes',
    typicalAge: 18,
    question: 'Child stacks 3 blocks or cubes',
    isRedFlag: (age) => age > 18,
    dependsOn: ['FM_10-12_1']
  },
  {
    id: 'FM_13-18_3',
    domain: Domain.FINE_MOTOR,
    ageGroup: '13-18',
    description: 'Imitates scribbling',
    // Toddlers imitate scribbling around 18 months【694903796263326†L94-L100】
    typicalAge: 16,
    question: 'Child imitates scribbling by making marks or scribbles when shown how',
    isRedFlag: (age) => age >= 20,
    dependsOn: ['FM_10-12_1']
  },
  {
    id: 'FM_13-18_2',
    domain: Domain.FINE_MOTOR,
    ageGroup: '13-18',
    description: 'Stacks 4 blocks',
    // Building towers of 2–4 blocks is expected by 18 months【694903796263326†L94-L100】
    typicalAge: 15,
    question: 'Child stacks 4 small blocks on top of each other',
    isRedFlag: (age) => age >= 20,
    dependsOn: ['FM_13-18_1']
  },
  {
    id: 'FM_19-24_1',
    domain: Domain.FINE_MOTOR,
    ageGroup: '19-24',
    description: 'Scribbles spontaneously',
    typicalAge: 20,
    question: 'Child makes marks on paper with a crayon on their own',
    isRedFlag: (age) => age >= 24,
    dependsOn: ['FM_13-18_3']
  },
  {
    id: 'FM_19-24_2',
    domain: Domain.FINE_MOTOR,
    ageGroup: '19-24',
    description: 'Copies drawing a line with crayon',
    typicalAge: 24,
    question: 'Child copies a straight line when shown how to draw it',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['FM_19-24_1']
  },
  {
    id: 'FM_19-24_3',
    domain: Domain.FINE_MOTOR,
    ageGroup: '19-24',
    description: 'Builds tower of 6 blocks',
    typicalAge: 24,
    question: 'Child builds a tower of 6 or more blocks',
    isRedFlag: (age) => age > 24,
    dependsOn: ['FM_13-18_2']
  },
  {
    id: 'FM_19-24_5',
    domain: Domain.FINE_MOTOR,
    ageGroup: '19-24',
    description: 'Turns book pages one at a time',
    typicalAge: 24,
    question: 'Child turns the pages of a book one at a time rather than several at once',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['FM_10-12_2']
  },
  {
    id: 'FM_19-24_4',
    domain: Domain.FINE_MOTOR,
    ageGroup: '19-24',
    description: 'Turns door knob',
    // Turning a door knob is typical by 2 years【673093813246992†L74-L82】
    typicalAge: 24,
    question: 'Child turns a doorknob or similar knob with their hand',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['FM_4-6_2']
  },
  {
    id: 'FM_19-24_6',
    domain: Domain.FINE_MOTOR,
    ageGroup: '19-24',
    description: 'Stacks 8 blocks',
    // Building taller towers (6–8 cubes) happens between 25 and 30 months【150468658553837†L52-L64】
    typicalAge: 28,
    question: 'Child stacks about 8 small blocks without them falling',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['FM_19-24_3']
  },
  {
    id: 'FM_25-36_3',
    domain: Domain.FINE_MOTOR,
    ageGroup: '25-36',
    description: 'Holds pencil with thumb and fingers',
    // Using a pencil with thumb and forefinger (tripod grasp) emerges by 30 months【150468658553837†L52-L58】
    typicalAge: 28,
    question: 'Child holds a crayon or pencil between thumb and fingers rather than in a fist',
    isRedFlag: (age) => age > 36,
    dependsOn: ['FM_10-12_1']
  },
  {
    id: 'FM_25-36_2',
    domain: Domain.FINE_MOTOR,
    ageGroup: '25-36',
    description: 'Unbuttons large buttons',
    typicalAge: 30,
    question: 'Child unbuttons a large button',
    isRedFlag: (age) => age > 36,
    dependsOn: ['FM_10-12_1']
  },
  {
    id: 'FM_25-36_4',
    domain: Domain.FINE_MOTOR,
    ageGroup: '25-36',
    description: 'Zips and unzips large zipper',
    typicalAge: 30,
    question: 'Child pulls a large zipper up and down on a jacket or bag',
    isRedFlag: (age) => age > 36,
    dependsOn: ['FM_10-12_1']
  },
  {
    id: 'FM_25-36_1',
    domain: Domain.FINE_MOTOR,
    ageGroup: '25-36',
    description: 'Copies a circle',
    typicalAge: 36,
    question: 'Child copies a circle when shown one',
    isRedFlag: (age) => age > 36,
    dependsOn: ['FM_19-24_2', 'FM_25-36_3']
  },
  {
    id: 'FM_25-36_5',
    domain: Domain.FINE_MOTOR,
    ageGroup: '25-36',
    description: 'Builds tower of 10 blocks',
    // Building very tall towers is common around age 3【531272518406281†L96-L100】
    typicalAge: 36,
    question: 'Child stacks 10 or more blocks to make a tall tower',
    isRedFlag: (age) => age > 42,
    dependsOn: ['FM_19-24_6']
  },
];