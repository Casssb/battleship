import Ship from './ship';

class Gameboard {
  possibleMoves = new Set(...[this.createMoves()]);
  misses = [];
  constructor(shipArray) {
    this.ships = this.createShips(shipArray);
  }

  createMoves(width = 10) {
    let moveList = [];
    for (let i = 0; i < width * width; i++) {
      moveList.push(i);
    }
    return moveList;
  }

  createShips(shipArray) {
    return shipArray.map((ship) => {
      return new Ship(ship.length, [...ship]);
    });
  }

  receiveAttack(guess) {
    if (!this.possibleMoves.has(guess)) {
      return 'Already tried';
    }
  }
}

export default Gameboard;
