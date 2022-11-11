import Player from '../modules/player';
import { describe, expect, it } from 'vitest';

describe('test basic methods', () => {
  it('constructor should return correct properties', () => {
    let test = new Player('bob', [[2, 3, 6]]);
    expect(test.name).toBe('bob');
    expect(test.turn).toBe(false);
  });
  it('changeTurn method should change name property', () => {
    let test = new Player('bob', [[2, 3, 6]]);
    test.changeTurn();
    expect(test.turn).toBe(true);
  });
});
