import Ship from './ship';

class Gameboard {
  possibleMoves = new Set(...[this.createMoves()]);
  hitsArray = [];
  missesArray = [];
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
      return 0;
    } else {
      this.possibleMoves.delete(guess);
      this.handltHitOrMiss(guess);
      return 1;
    }
  }

  handltHitOrMiss(validMove) {
    this.ships.forEach((ship) => {
      if (ship.coords.includes(validMove)) {
        ship.hit();
        this.hitsArray.push(validMove);
      }
    });
    const flatShipCoords = this.getShipCoords();
    if (!flatShipCoords.includes(validMove)) {
      this.missesArray.push(validMove);
    }
  }

  checkForWin() {
    return (
      this.ships.filter((ship) => ship.isSunk()).length === this.ships.length
    );
  }

  getShipCoords() {
    return this.ships.map((ship) => ship.coords).flat();
  }

  hasCausedSinking(coord) {
    const flatSunkShipsArray = this.ships
      .filter((ship) => ship.isSunk())
      .map((ship) => ship.coords)
      .flat();
    return flatSunkShipsArray.includes(coord);
  }
}

export default Gameboard;
