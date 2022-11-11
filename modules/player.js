import Gameboard from './gameboard';

class Player {
  constructor(name = null, shipArray) {
    this.name = name;
    this.board = new Gameboard(shipArray);
    this.turn = false;
  }
  changeTurn() {
    this.turn = !this.turn;
  }
  attack(enemyBoard, coord) {
    if (!this.turn) return;
    return enemyBoard.receiveAttack(coord);
  }
}

export default Player;
