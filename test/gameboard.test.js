import Gameboard from '../modules/gameboard';
import { describe, expect, test, it } from 'vitest';

describe('gameboard methods', () => {
  it('constructor should convert array of coords into array of ship objects', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [1, 2, 7],
      [1, 77, 89, 44],
    ]);
    expect(Array.isArray(board.ships)).toBe(true);
    expect(typeof board.ships[0]).toBe('object');
  });
  it('Ship array should be the same size as coords array', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [1, 2, 7],
      [1, 77, 89, 44],
    ]);
    expect(board.ships.length).toEqual(3);
  });
  it('new instance of class should create a possibleMoves set with 100 values', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [1, 2, 7],
      [1, 77, 89, 44],
    ]);
    expect(board.possibleMoves instanceof Set).toBe(true);
    expect(board.possibleMoves.size).toBe(100);
  });
  it('receiveAttack method should return 0 if passed a value not within possibleMoves Set', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [1, 2, 7],
      [1, 77, 89, 44],
    ]);
    expect(board.receiveAttack(100)).toBe(0);
  });
  it('receiveAttack method should return 1 if a valid guess is entered', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [1, 2, 7],
      [1, 77, 89, 44],
    ]);
    expect(board.receiveAttack(99)).toBe(1);
  });
  it('receiveAttack called with a valid hit or miss should increment the hits/misses array', () => {
    const board = new Gameboard([
      [3, 4, 8],
      [9, 2, 7],
      [5, 77, 89, 44],
    ]);
    board.receiveAttack(5);
    board.receiveAttack(10);
    board.receiveAttack(99);
    board.receiveAttack(77);
    expect(board.hitsArray[0]).toBe(5);
    expect(board.hitsArray[1]).toEqual(77);
    expect(board.hitsArray[2]).toEqual(undefined);
    expect(board.missesArray[0]).toBe(10);
    expect(board.missesArray[1]).toBe(99);
    expect(board.missesArray[2]).toBe(undefined);
  });
  it('ReceiveAttack should only accept a valid move once, it should then be removed from the set', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [1, 2, 7],
      [1, 77, 89, 44],
    ]);
    board.receiveAttack(99);
    board.receiveAttack(99);
    expect(board.missesArray[0]).toBe(99);
    expect(board.missesArray[1]).toBe(undefined);
    expect(board.receiveAttack(99)).toBe(0);
    expect(board.possibleMoves.has(99)).toBe(false);
    expect(board.possibleMoves.size).toBe(99);
  });
  it('checkForWin method should return false if all ships are not sunk', () => {
    const board = new Gameboard([
      [1, 4, 8],
      [2, 10, 22],
    ]);
    board.receiveAttack(1);
    board.receiveAttack(4);
    board.receiveAttack(8);
    expect(board.checkForWin()).toBe(false);
  });
  it('checkForWin method should return true if all ships are sunk', () => {
    const board = new Gameboard([[1, 4, 8]]);
    board.receiveAttack(1);
    board.receiveAttack(4);
    board.receiveAttack(8);
    expect(board.checkForWin()).toBe(true);
  });
});
