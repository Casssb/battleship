import Ship from '../modules/ship';
import { describe, expect, test, it } from 'vitest';

describe('basic methods/paramters', () => {
  it('length is equal to value entered to constructor', () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
  });
  it('calling hit() should increase hits value', () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.hits).toBe(1);
  });
  it('isSunk() should return false if hits value is below length value', () => {
    const ship = new Ship(4);
    expect(ship.isSunk()).toBe(false);
  });
  it('isSunk() should return true if hits is equal to length', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
