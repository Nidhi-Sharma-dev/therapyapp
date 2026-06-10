import { MOOD_INTENSITY_MAP, getIntensityRange, FRONTEND_TO_BACKEND_MOOD, FRONTEND_INTENSITY_TO_NUMBER } from '../src/data/moodMappings';

describe('Mood Mapping Configuration', () => {
  it('evaluates intensity range boundaries correctly', () => {
    expect(getIntensityRange(1)).toBe('low');
    expect(getIntensityRange(2)).toBe('low');
    expect(getIntensityRange(3)).toBe('high');
    expect(getIntensityRange(5)).toBe('high');
  });

  it('returns correct high-intensity anxiety mapping', () => {
    const context = MOOD_INTENSITY_MAP['Anxious']['high'];
    expect(context.searchQuery).toBe('meditation ambient');
    expect(context.targetTags).toContain('healing');
  });

  it('maps frontend mood_ids to backend mood names', () => {
    expect(FRONTEND_TO_BACKEND_MOOD['anxious']).toBe('Anxious');
    expect(FRONTEND_TO_BACKEND_MOOD['stressed']).toBe('Stressed');
    expect(FRONTEND_TO_BACKEND_MOOD['restless']).toBe('Restless');
    expect(FRONTEND_TO_BACKEND_MOOD['unfocused']).toBe('Unfocused');
    expect(FRONTEND_TO_BACKEND_MOOD['low_energy']).toBe('Low Energy');
  });

  it('maps frontend intensity_ids to numeric values', () => {
    expect(FRONTEND_INTENSITY_TO_NUMBER['gentle']).toBe(1);
    expect(FRONTEND_INTENSITY_TO_NUMBER['mild']).toBe(2);
    expect(FRONTEND_INTENSITY_TO_NUMBER['balanced']).toBe(3);
    expect(FRONTEND_INTENSITY_TO_NUMBER['deep']).toBe(4);
    expect(FRONTEND_INTENSITY_TO_NUMBER['immersive']).toBe(5);
  });
});
