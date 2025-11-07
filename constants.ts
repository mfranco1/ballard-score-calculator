
import { BallardCriterion } from './types';

export const NEUROMUSCULAR_CRITERIA: BallardCriterion[] = [
  {
    id: 'posture',
    name: 'Posture',
    options: [
      { score: 0, description: 'Limbs extended' },
      { score: 1, description: 'Slight flexion, hips abducted' },
      { score: 2, description: 'Hips, knees more flexed' },
      { score: 3, description: 'Legs flexed and abducted' },
      { score: 4, description: 'Full flexion' },
    ],
  },
  {
    id: 'square_window',
    name: 'Square Window (Wrist)',
    options: [
      { score: -1, description: '>90°' },
      { score: 0, description: '90°' },
      { score: 1, description: '60°' },
      { score: 2, description: '45°' },
      { score: 3, description: '30°' },
      { score: 4, description: '0°' },
    ],
  },
  {
    id: 'arm_recoil',
    name: 'Arm Recoil',
    options: [
      { score: 0, description: '180° (No recoil)' },
      { score: 1, description: '140-180°' },
      { score: 2, description: '110-140°' },
      { score: 3, description: '90-110°' },
      { score: 4, description: '<90°' },
    ],
  },
  {
    id: 'popliteal_angle',
    name: 'Popliteal Angle',
    options: [
      { score: -1, description: '180°' },
      { score: 0, description: '160°' },
      { score: 1, description: '140°' },
      { score: 2, description: '120°' },
      { score: 3, description: '100°' },
      { score: 4, description: '90°' },
      { score: 5, description: '<90°' },
    ],
  },
  {
    id: 'scarf_sign',
    name: 'Scarf Sign',
    options: [
      { score: -1, description: 'Elbow to opposite axillary line' },
      { score: 0, description: 'Elbow to opposite nipple line' },
      { score: 1, description: 'Elbow to xiphoid process' },
      { score: 2, description: 'Elbow to midline' },
      { score: 3, description: 'Elbow near ipsilateral nipple line' },
      { score: 4, description: 'Elbow to ipsilateral axillary line' },
    ],
  },
  {
    id: 'heel_to_ear',
    name: 'Heel to Ear',
    options: [
      { score: -1, description: 'Heel near ear' },
      { score: 0, description: 'Heel to nose' },
      { score: 1, description: 'Heel to chin' },
      { score: 2, description: 'Heel to nipple line' },
      { score: 3, description: 'Heel to umbilical line' },
      { score: 4, description: 'Heel on thigh' },
    ],
  },
];

export const PHYSICAL_CRITERIA_BASE: BallardCriterion[] = [
    {
    id: 'skin',
    name: 'Skin',
    options: [
      { score: -1, description: 'Sticky, friable, transparent' },
      { score: 0, description: 'Gelatinous, red, translucent' },
      { score: 1, description: 'Smooth, pink, visible veins' },
      { score: 2, description: 'Superficial peeling/rash' },
      { score: 3, description: 'Cracking, pale areas, rare veins' },
      { score: 4, description: 'Parchment, deep cracking, no vessels' },
      { score: 5, description: 'Leathery, cracked, wrinkled' },
    ],
  },
  {
    id: 'lanugo',
    name: 'Lanugo',
    options: [
      { score: -1, description: 'None' },
      { score: 0, description: 'Sparse' },
      { score: 1, description: 'Abundant' },
      { score: 2, description: 'Thinning' },
      { score: 3, description: 'Bald areas' },
      { score: 4, description: 'Mostly bald' },
    ],
  },
  {
    id: 'plantar_surface',
    name: 'Plantar Surface',
    options: [
      { score: -2, description: 'Heel-toe < 40 mm' },
      { score: -1, description: 'Heel-toe 40-50 mm' },
      { score: 0, description: '> 50 mm, no crease' },
      { score: 1, description: 'Faint red marks' },
      { score: 2, description: 'Anterior transverse crease only' },
      { score: 3, description: 'Creases anterior 2/3' },
      { score: 4, description: 'Creases over entire sole' },
    ],
  },
  {
    id: 'breast',
    name: 'Breast',
    options: [
      { score: -1, description: 'Imperceptible' },
      { score: 0, description: 'Barely perceptible' },
      { score: 1, description: 'Flat areola, no bud' },
      { score: 2, description: 'Stippled areola, 1-2 mm bud' },
      { score: 3, description: 'Raised areola, 3-4 mm bud' },
      { score: 4, description: 'Full areola, 5-10 mm bud' },
    ],
  },
  {
    id: 'eye_ear',
    name: 'Eye/Ear',
    options: [
      { score: -2, description: 'Lids fused tightly' },
      { score: -1, description: 'Lids fused loosely' },
      { score: 0, description: 'Lids open; pinna flat, stays folded' },
      { score: 1, description: 'Slightly curved pinna; soft, slow recoil' },
      { score: 2, description: 'Well curved pinna; soft but ready recoil' },
      { score: 3, description: 'Formed and firm, instant recoil' },
      { score: 4, description: 'Thick cartilage, ear stiff' },
    ],
  },
];

export const GENITALS_MALE_CRITERION: BallardCriterion = {
  id: 'genitals_male',
  name: 'Genitals (Male)',
  options: [
    { score: -1, description: 'Scrotum flat, smooth' },
    { score: 0, description: 'Scrotum empty, faint rugae' },
    { score: 1, description: 'Testes in upper canal, rare rugae' },
    { score: 2, description: 'Testes descending, few rugae' },
    { score: 3, description: 'Testes down, good rugae' },
    { score: 4, description: 'Testes pendulous, deep rugae' },
  ],
};

export const GENITALS_FEMALE_CRITERION: BallardCriterion = {
  id: 'genitals_female',
  name: 'Genitals (Female)',
  options: [
    { score: -1, description: 'Clitoris prominent, labia flat' },
    { score: 0, description: 'Clitoris prominent, small labia minora' },
    { score: 1, description: 'Clitoris prominent, enlarging minora' },
    { score: 2, description: 'Majora and minora equally prominent' },
    { score: 3, description: 'Majora large, minora small' },
    { score: 4, description: 'Majora cover clitoris and minora' },
  ],
};


export const GESTATIONAL_AGE_MAP: { [key: number]: number } = {
  [-10]: 20,
  [-5]: 22,
  [0]: 24,
  [5]: 26,
  [10]: 28,
  [15]: 30,
  [20]: 32,
  [25]: 34,
  [30]: 36,
  [35]: 38,
  [40]: 40,
  [45]: 42,
  [50]: 44,
};
