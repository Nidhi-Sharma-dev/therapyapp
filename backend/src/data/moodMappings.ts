export interface IntensityMapping {
  searchQuery: string;
  targetTags: string[];
}

export type IntensityRange = 'low' | 'high';

export interface MoodConfig {
  low: IntensityMapping;
  high: IntensityMapping;
}

export const MOOD_INTENSITY_MAP: Record<string, MoodConfig> = {
  Anxious: {
    low:  { searchQuery: 'ambient calm',              targetTags: ['meditation', 'healing', 'soft'] },
    high: { searchQuery: 'meditation ambient',         targetTags: ['healing', 'relaxation', 'calm'] },
  },
  Stressed: {
    low:  { searchQuery: 'ambient piano gentle',       targetTags: ['piano', 'soft', 'ambient'] },
    high: { searchQuery: 'deep relaxation drone',      targetTags: ['drone', 'healing', 'deep'] },
  },
  Restless: {
    low:  { searchQuery: 'ambient nature sleep',       targetTags: ['sleep', 'nature', 'soft'] },
    high: { searchQuery: 'binaural sleep ambient',     targetTags: ['sleep', 'binaural', 'deep'] },
  },
  Unfocused: {
    low:  { searchQuery: 'ambient focus instrumental', targetTags: ['focus', 'ambient', 'instrumental'] },
    high: { searchQuery: 'lofi study instrumental',    targetTags: ['focus', 'lofi', 'study'] },
  },
  'Low Energy': {
    low:  { searchQuery: 'uplifting acoustic instrumental', targetTags: ['uplifting', 'warm', 'acoustic'] },
    high: { searchQuery: 'warm orchestral instrumental',    targetTags: ['uplifting', 'warm', 'orchestral'] },
  },
};

export function getIntensityRange(intensity: number): IntensityRange {
  return intensity <= 2 ? 'low' : 'high';
}

export const FRONTEND_TO_BACKEND_MOOD: Record<string, string> = {
  anxious:    'Anxious',
  stressed:   'Stressed',
  restless:   'Restless',
  unfocused:  'Unfocused',
  low_energy: 'Low Energy',
};

export const FRONTEND_INTENSITY_TO_NUMBER: Record<string, number> = {
  gentle:    1,
  mild:      2,
  balanced:  3,
  deep:      4,
  immersive: 5,
};