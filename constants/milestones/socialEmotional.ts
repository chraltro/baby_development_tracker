import { Milestone, Domain } from '../../types';

export const socialEmotionalMilestones: Milestone[] = [
  {
    id: 'SE_0-3_1',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '0-3',
    description: 'Social (reciprocal) smile',
    typicalAge: 2,
    question: 'Baby smiles back at you when you smile at them',
    isRedFlag: (age) => age >= 4,
  },
  {
    id: 'SE_0-3_2',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '0-3',
    description: 'Calms when comforted by caregiver',
    typicalAge: 2,
    question: 'Baby calms down when you hold, talk to or gently rock them when upset',
    isRedFlag: (age) => age >= 4,
  },
  {
    id: 'SE_0-3_3',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '0-3',
    description: 'Watches your face and responds with interest',
    typicalAge: 2,
    question: 'Baby looks at your face and seems engaged when you are talking or smiling',
    isRedFlag: (age) => age >= 4,
    dependsOn: ['SE_0-3_1']
  },
  {
    id: 'SE_4-6_1',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '4-6',
    description: 'Expresses emotions (happy, sad, mad)',
    typicalAge: 6,
    question: 'Baby shows different facial expressions for emotions like happiness, sadness, or frustration',
    isRedFlag: (age) => age >= 9,
    dependsOn: ['SE_0-3_1']
  },
  {
    id: 'SE_4-6_2',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '4-6',
    description: 'Laughs and squeals to show enjoyment',
    typicalAge: 5,
    question: 'Baby laughs out loud or squeals when playing with you or others',
    isRedFlag: (age) => age >= 8,
    dependsOn: ['SE_4-6_1']
  },
  {
    id: 'SE_4-6_3',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '4-6',
    description: 'Shows interest in social interaction and fusses when play stops',
    typicalAge: 6,
    question: 'Baby enjoys interacting with you and becomes fussy when the play stops',
    isRedFlag: (age) => age >= 9,
    dependsOn: ['SE_0-3_3']
  },
  {
    id: 'SE_7-9_1',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '7-9',
    description: 'Looks when name is called',
    typicalAge: 9,
    question: 'Baby turns their head or looks at you when you call their name',
    isRedFlag: (age) => age >= 10,
    canonicalId: 'COG_4-6_4',
    dependsOn: ['SE_4-6_3']
  },
  {
    id: 'SE_7-9_2',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '7-9',
    description: 'Displays stranger anxiety or clings to familiar caregivers',
    typicalAge: 9,
    question: 'Baby becomes shy or clingy around unfamiliar people',
    // Stranger anxiety is typical by around 9 months【32476239479808†L185-L199】,
    isRedFlag: (age) => age >= 12,
    dependsOn: ['SE_4-6_3']
  },
  {
    id: 'SE_7-9_3',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '7-9',
    description: 'Enjoys interactive games like peek‑a‑boo or pat‑a‑cake',
    typicalAge: 9,
    question: 'Baby smiles and laughs during games like peek‑a‑boo or pat‑a‑cake',
    isRedFlag: (age) => age >= 12,
    dependsOn: ['SE_4-6_2']
  },
  {
    id: 'SE_10-12_1',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '10-12',
    description: 'Points to wanted items',
    typicalAge: 12,
    question: 'Baby points with their index finger to show you things they want',
    isRedFlag: (age) => age >= 18,
    canonicalId: 'FM_7-9_4',
    dependsOn: ['SE_7-9_1']
  },
  {
    id: 'SE_10-12_2',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '10-12',
    description: 'Shows separation anxiety when caregiver leaves',
    typicalAge: 12,
    question: 'Baby shows distress or tries to follow you when you leave the room',
    isRedFlag: (age) => age >= 18,
    dependsOn: ['SE_7-9_2']
  },
  {
    id: 'SE_10-12_3',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '10-12',
    description: 'Gives hugs or kisses to familiar people',
    typicalAge: 12,
    question: 'Baby gives hugs or open‑mouthed kisses to you or other familiar people',
    isRedFlag: (age) => age >= 18,
    dependsOn: ['SE_4-6_1']
  },
  {
    id: 'SE_10-12_4',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '10-12',
    description: 'Imitates gestures like clapping and waving',
    typicalAge: 12,
    question: 'Does your baby copy gestures you make, such as clapping hands or waving?',
    isRedFlag: (age) => age >= 18,
    canonicalId: 'COG_10-12_6',
    dependsOn: ['SE_7-9_3']
  },
  {
    id: 'SE_13-18_1',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '13-18',
    description: 'Plays simple "give and take" games',
    typicalAge: 15,
    question: 'Does your child enjoy handing you items back and forth as a game?',
    isRedFlag: (age) => age >= 24,
    dependsOn: ['SE_7-9_3']
  },
  {
    id: 'SE_13-18_2',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '13-18',
    description: 'Shows frustration or temper when needs aren’t met',
    typicalAge: 18,
    question: 'Does your child have tantrums or show frustration when they can’t have something?',
    isRedFlag: (age) => age >= 24,
    dependsOn: ['SE_4-6_1']
  },
  {
    id: 'SE_13-18_3',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '13-18',
    description: 'Plays alone but enjoys the presence of others (begins parallel play)',
    typicalAge: 18,
    question: 'Does your child play independently but like to be near other children or adults?',
    isRedFlag: (age) => age >= 24,
    dependsOn: ['SE_7-9_3']
  },
  {
    id: 'SE_13-18_4',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '13-18',
    description: 'Demonstrates independence (wants to feed or dress self)',
    typicalAge: 18,
    question: 'Does your child insist on feeding or dressing themselves, even if they need help?',
    isRedFlag: (age) => age >= 24,
    dependsOn: ['ASC_10-12_2']
  },
  {
    id: 'SE_19-24_1',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '19-24',
    description: 'Notices when others are hurt/upset',
    typicalAge: 24,
    question: 'Does your child show concern or notice when others are upset?',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['SE_13-18_1']
  },
  {
    id: 'SE_19-24_2',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '19-24',
    description: 'Plays alongside other children (parallel play)',
    typicalAge: 24,
    question: 'When with other children, does your child play alongside them, perhaps with similar toys, but without much direct interaction?',
    isRedFlag: (age) => age >= 36,
    dependsOn: ['SE_13-18_3']
  },
  {
    id: 'SE_19-24_3',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '19-24',
    description: 'Engages in simple pretend play with dolls, animals or people',
    typicalAge: 24,
    question: 'Does your child pretend to feed a doll or make stuffed animals talk or walk?',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['SE_13-18_3'],
    canonicalId: 'COG_13-18_3'
  },
  {
    id: 'SE_19-24_4',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '19-24',
    description: 'Shows defiant behavior (says “no” or resists requests)',
    typicalAge: 24,
    question: 'Does your toddler frequently say “no” or show defiance when asked to do something?',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['SE_13-18_2']
  },
  {
    id: 'SE_19-24_5',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '19-24',
    description: 'Begins to share toys or take turns with adult assistance',
    typicalAge: 24,
    question: 'Does your child occasionally share toys or take turns when playing with your support?',
    isRedFlag: (age) => age >= 30,
    dependsOn: ['SE_19-24_2']
  },
  {
    id: 'SE_25-36_1',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '25-36',
    description: 'Shows affection for friends',
    typicalAge: 30,
    question: 'Does your child show affection for friends or playmates?',
    isRedFlag: (age) => age >= 48,
    dependsOn: ['SE_19-24_1']
  },
  {
    id: 'SE_25-36_2',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '25-36',
    description: 'Cooperative play',
    typicalAge: 36,
    question: 'Does your child engage in cooperative play with others, like taking turns in a game?',
    isRedFlag: (age) => age >= 48,
    dependsOn: ['SE_19-24_2', 'SE_19-24_5']
  },
  {
    id: 'SE_25-36_3',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '25-36',
    description: 'Understands concept of “mine” and “yours” and plays make‑believe with others',
    typicalAge: 30,
    question: 'Does your child talk about things being “mine” or “yours” and engage in make‑believe games with other children?',
    isRedFlag: (age) => age >= 42,
    dependsOn: ['SE_19-24_3']
  },
  {
    id: 'SE_25-36_4',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '25-36',
    description: 'Shows empathy and concern for friends who are hurt or upset',
    typicalAge: 36,
    question: 'If another child is hurt or upset, does your child show concern or try to comfort them?',
    isRedFlag: (age) => age >= 42,
    dependsOn: ['SE_25-36_1']
  },
  {
    id: 'SE_25-36_5',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '25-36',
    description: 'Enjoys being a helper and does small chores',
    typicalAge: 36,
    question: 'Does your child like to help with simple chores, like putting toys away or wiping a table?',
    isRedFlag: (age) => age >= 42,
    dependsOn: ['ASC_10-12_4']
  },
  {
    id: 'SE_25-36_6',
    domain: Domain.SOCIAL_EMOTIONAL,
    ageGroup: '25-36',
    description: 'Shows a wide range of emotions and begins to self‑regulate with support',
    typicalAge: 36,
    question: 'Does your child show many different emotions and start to calm themselves down with your help?',
    isRedFlag: (age) => age >= 42,
    dependsOn: ['SE_13-18_2']
  },
];