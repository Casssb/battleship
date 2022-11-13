import Player from '../modules/player';
import { describe, expect, it } from 'vitest';

describe('test basic methods', () => {
  it('constructor should return correct properties with parameters', () => {
    let test = new Player([[2, 3, 6]], 'bob', true);
    expect(test.name).toBe('bob');
    expect(test.turn).toBe(true);
    expect(test.board.ships.length).toEqual(1);
  });
  it('constructor should return correct properties with no parameters', () => {
    let test = new Player();
    expect(test.name).toBe(null);
    expect(test.turn).toBe(false);
    expect(test.board.ships.length).toEqual(5);
  });
  it('changeTurn method should change name property', () => {
    let test = new Player([[2, 3, 6]], 'bob');
    test.changeTurn();
    expect(test.turn).toBe(true);
  });
  it('attack method should work with or without a coordinate supplied', () => {
    let test1 = new Player();
    let test2 = new Player([[1, 2, 3]], 'bob', true);
    test1.changeTurn();
    test1.attack(test2.board);
    test1.attack(test2.board);
    test1.attack(test2.board);
    test1.attack(test2.board);
    test2.attack(test1.board, 90);
    expect(test1.turn).toBe(true);
    expect(test2.board.possibleMoves.size).toBe(96);
    expect(test1.board.possibleMoves.size).toBe(99);
  });
});
