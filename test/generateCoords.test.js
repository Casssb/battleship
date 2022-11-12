import generateFleet from '../modules/generateCoords';
import { describe, expect, it } from 'vitest';

describe('basic function output', () => {
  it('should return an array', () => {
    const fleet = generateFleet();
    console.log(fleet)
    expect(Array.isArray(fleet)).toBe(true);
  });
  it('should not contain any duplicates', () => {
    const fleet = generateFleet().flat();
    const set = new Set([...fleet]);
    expect(fleet.length).toEqual(set.size);
  });
  it('should have a length of 5 (5 ships)', () => {
    const fleet = generateFleet();
    console.log(fleet);
    expect(fleet.length).toEqual(5);
  });
});
