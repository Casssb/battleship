import Gameboard from '../modules/gameboard';
import { describe, expect, test, it } from 'vitest';

describe('gamebaord methods', () => {
  it('constructor should convert array of coords into array of ship objects', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [1, 2, 7],
      [1, 77, 89, 44],
    ]);
    expect(Array.isArray(board.ships)).toBe(true);
    expect(typeof board.ships[0]).toBe('object');
  });
});
