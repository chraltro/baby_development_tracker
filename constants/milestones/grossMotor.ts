import { Milestone, Domain } from '../../types';

export const grossMotorMilestones: Milestone[] = [
  {
    id: 'GM_0-3_1',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '0-3',
    description: 'Lifts head/chest when prone',
    typicalAge: 2,
    question: 'Baby lifts head and chest when on tummy',
    isRedFlag: (age) => age >= 3,
  },
  {
    id: 'GM_0-3_2',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '0-3',
    description: 'Head steady when held',
    typicalAge: 2,
    question: 'Baby has steady head control when held upright',
    isRedFlag: (age) => age >= 4,
  },
  {
    id: 'GM_4-6_1',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '4-6',
    description: 'Rolls front to back',
    typicalAge: 4,
    question: 'Baby rolls from tummy to back',
    isRedFlag: (age) => age >= 6,
    dependsOn: ['GM_0-3_1']
  },
  {
    id: 'GM_4-6_2',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '4-6',
    description: 'Sits with support',
    // Most babies sit with support around 6 months【290633440464665†L84-L90】
    typicalAge: 6,
    question: 'Baby sits with support (pillows or high chair)',
    isRedFlag: (age) => age >= 9,
    dependsOn: ['GM_0-3_2']
  },
  {
    id: 'GM_4-6_3',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '4-6',
    description: 'Sits without support',
    // Sitting independently usually emerges around 7–8 months【694903796263326†L94-L99】
    typicalAge: 8,
    question: 'Baby sits upright without hand support',
    isRedFlag: (age) => age >= 10,
    dependsOn: ['GM_4-6_2']
  },
  {
    id: 'GM_7-9_1',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '7-9',
    description: 'Pulls to stand',
    typicalAge: 9,
    question: 'Baby pulls to standing while holding furniture',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['GM_4-6_3']
  },
  {
    id: 'GM_7-9_2',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '7-9',
    description: 'Creeps on hands and knees',
    typicalAge: 9,
    question: 'Baby crawls on hands and knees',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['GM_4-6_1']
  },
  {
    id: 'GM_10-12_1',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '10-12',
    description: 'Stands alone',
    // Standing independently usually happens around 12 months【207267944887074†L92-L99】
    typicalAge: 12,
    question: 'Baby stands alone without support',
    isRedFlag: (age) => age >= 15,
    dependsOn: ['GM_7-9_1']
  },
    {
    id: 'GM_10-12_2',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '10-12',
    description: 'Walks alone (first steps)',
    typicalAge: 12,
    question: 'Baby takes first independent steps',
    isRedFlag: (age) => age >= 18,
    dependsOn: ['GM_10-12_1']
  },
  {
    id: 'GM_13-18_1',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '13-18',
    description: 'Walks well',
    typicalAge: 15,
    question: 'Child walks well and steadily',
    isRedFlag: (age) => age >= 18,
    dependsOn: ['GM_10-12_2']
  },
   {
    id: 'GM_13-18_2',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '13-18',
    description: 'Stoops and recovers',
    typicalAge: 15,
    question: 'Child stoops to pick up toys and recovers balance',
    isRedFlag: (age) => age >= 20,
    dependsOn: ['GM_13-18_1']
  },
  {
    id: 'GM_19-24_1',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Runs well',
    typicalAge: 20,
    question: 'Child runs well without frequent falls',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['GM_13-18_1']
  },
  {
    id: 'GM_19-24_2',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Kicks a ball',
    typicalAge: 24,
    question: 'Child kicks a ball forward',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['GM_19-24_1']
  },
    {
    id: 'GM_19-24_3',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Jumps on two feet',
    typicalAge: 24,
    question: 'Child jumps in place with both feet',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['GM_19-24_1']
  },
  {
    id: 'GM_25-36_1',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '25-36',
    description: 'Walks up/down stairs alternating feet',
    typicalAge: 36,
    question: 'Child walks up/down stairs alternating feet',
    isRedFlag: (age) => age > 36,
    dependsOn: ['GM_25-36_4']
  },
  {
    id: 'GM_25-36_2',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '25-36',
    description: 'Pedals a tricycle',
    typicalAge: 36,
    question: 'Child pedals a tricycle',
    isRedFlag: (age) => age > 36,
    dependsOn: ['GM_25-36_1']
  },
  {
    id: 'GM_25-36_3',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '25-36',
    description: 'Stands on one foot briefly',
    typicalAge: 30,
    question: 'Child stands on one foot briefly',
    isRedFlag: (age) => age > 36,
    dependsOn: ['GM_19-24_3']
  },
  // Additional gross motor milestones added for improved precision
  {
    id: 'GM_0-3_3',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '0-3',
    description: 'Turns head while on tummy',
    // Newborns start lifting or turning their head briefly when lying on their tummy
    typicalAge: 1,
    question: 'Baby lifts or turns head from side to side when on tummy',
    isRedFlag: (age) => age >= 3,
  },
  {
    id: 'GM_4-6_4',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '4-6',
    description: 'Pushes up onto arms while on tummy',
    // Babies often push up onto their forearms/hands around 4 months【290633440464665†L84-L90】
    typicalAge: 4,
    question: 'Baby pushes up onto forearms or hands when on tummy',
    isRedFlag: (age) => age >= 6,
    dependsOn: ['GM_0-3_1']
  },
  {
    id: 'GM_4-6_5',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '4-6',
    description: 'Rolls from back to front',
    // Rolling from back to tummy typically occurs by 7 months【290633440464665†L84-L88】
    typicalAge: 6,
    question: 'Baby rolls from back to tummy',
    isRedFlag: (age) => age >= 8,
    dependsOn: ['GM_4-6_1']
  },
  {
    id: 'GM_4-6_6',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '4-6',
    description: 'Bears weight on legs when held',
    // By 6 months many babies support most of their weight when held standing【290633440464665†L82-L84】
    typicalAge: 6,
    question: 'Baby bears weight on legs when held upright',
    isRedFlag: (age) => age >= 8,
    dependsOn: ['GM_0-3_2']
  },
  {
    id: 'GM_7-9_3',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '7-9',
    description: 'Gets into sitting position independently',
    // Babies typically learn to get into a sitting position around 8 months【694903796263326†L84-L100】
    typicalAge: 8,
    question: 'Baby gets into sitting position independently',
    isRedFlag: (age) => age >= 10,
    dependsOn: ['GM_4-6_3']
  },
  {
    id: 'GM_7-9_4',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '7-9',
    description: 'Army crawls or creeps forward on belly',
    // Many babies begin crawling forward using their arms and legs around 8 months【694903796263326†L93-L100】
    typicalAge: 8,
    question: 'Baby moves forward on belly, using arms and legs to scoot',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['GM_4-6_5']
  },
  {
    id: 'GM_10-12_3',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '10-12',
    description: 'Cruises along furniture',
    // Cruising along furniture often occurs around 11–12 months【207267944887074†L92-L99】
    typicalAge: 11,
    question: 'Baby cruises along furniture',
    isRedFlag: (age) => age >= 14,
    dependsOn: ['GM_7-9_1']
  },
  {
    id: 'GM_10-12_4',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '10-12',
    description: 'Transitions from standing to sitting without falling',
    typicalAge: 12,
    question: 'Baby sits down from standing without falling',
    isRedFlag: (age) => age >= 15,
    dependsOn: ['GM_10-12_1']
  },
  {
    id: 'GM_13-18_3',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '13-18',
    description: 'Climbs onto low furniture',
    // Getting onto a small chair without help is seen by 18 months【694903796263326†L94-L98】
    typicalAge: 15,
    question: 'Child climbs onto low furniture independently',
    isRedFlag: (age) => age >= 20,
    dependsOn: ['GM_10-12_2']
  },
  {
    id: 'GM_13-18_4',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '13-18',
    description: 'Walks while carrying a toy',
    typicalAge: 15,
    question: 'Child walks while carrying a toy',
    isRedFlag: (age) => age >= 18,
    dependsOn: ['GM_13-18_1']
  },
  {
    id: 'GM_13-18_5',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '13-18',
    description: 'Walks backward a few steps',
    typicalAge: 18,
    question: 'Child walks backward a few steps',
    isRedFlag: (age) => age >= 24,
    dependsOn: ['GM_13-18_1']
  },
  {
    id: 'GM_13-18_6',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '13-18',
    description: 'Walks up stairs with help',
    // Holding a hand or rail to climb stairs appears around 18 months【694903796263326†L94-L98】
    typicalAge: 18,
    question: 'Child walks up stairs with help (both feet per step)',
    isRedFlag: (age) => age >= 24,
    dependsOn: ['GM_13-18_1']
  },
  {
    id: 'GM_19-24_4',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Bends down to pick up objects without falling',
    typicalAge: 20,
    question: 'Child bends down to pick up objects without falling',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['GM_19-24_1']
  },
  {
    id: 'GM_19-24_5',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Throws a ball overhand',
    // Throwing a ball overhand develops around 24 months【673093813246992†L74-L82】
    typicalAge: 24,
    question: 'Child throws a ball overhand',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['GM_19-24_1']
  },
  {
    id: 'GM_19-24_6',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Runs with improved coordination',
    typicalAge: 24,
    question: 'Child runs with improved coordination',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['GM_19-24_1']
  },
  {
    id: 'GM_19-24_7',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Walks on tiptoes',
    // Walking on tiptoes emerges by 2½ years【150468658553837†L52-L57】
    typicalAge: 28,
    question: 'Child walks on tiptoes',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['GM_19-24_1']
  },
  {
    id: 'GM_19-24_8',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Walks up and down stairs with support',
    // Going up and down stairs with both feet on each step occurs by 2 years【673093813246992†L74-L82】
    typicalAge: 24,
    question: 'Child walks up and down stairs with support (both feet per step)',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['GM_13-18_6']
  },
  {
    id: 'GM_19-24_9',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '19-24',
    description: 'Jumps off a low step',
    typicalAge: 30,
    question: 'Child jumps off a low step',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['GM_19-24_3']
  },
  {
    id: 'GM_25-36_4',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '25-36',
    description: 'Walks up and down stairs without help (both feet per step)',
    // Walking up and down stairs independently using both feet per step occurs around 30 months【150468658553837†L52-L57】
    typicalAge: 30,
    question: 'Child walks up and down stairs without help (both feet per step)',
    isRedFlag: (age) => age > 36,
    dependsOn: ['GM_19-24_8']
  },
  {
    id: 'GM_25-36_5',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '25-36',
    description: 'Walks on tiptoes without support',
    typicalAge: 30,
    question: 'Child walks on tiptoes without support',
    isRedFlag: (age) => age > 36,
    dependsOn: ['GM_19-24_7']
  },
  {
    id: 'GM_25-36_6',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '25-36',
    description: 'Stands on one foot for 3 seconds',
    typicalAge: 34,
    question: 'Child stands on one foot for 3 seconds',
    isRedFlag: (age) => age > 36,
    dependsOn: ['GM_25-36_3']
  },
  {
    id: 'GM_25-36_7',
    domain: Domain.GROSS_MOTOR,
    ageGroup: '25-36',
    description: 'Hops on one foot',
    // Hopping on one foot emerges around 36 months【531272518406281†L96-L100】
    typicalAge: 36,
    question: 'Child hops on one foot',
    isRedFlag: (age) => age > 42,
    dependsOn: ['GM_25-36_6']
  },
];