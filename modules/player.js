import Gameboard from './gameboard';
import generateFleet from './generateCoords';
import aiMove from './aiLogic';

class Player {
  constructor(shipArray = generateFleet(), name = null, turn = false) {
    this.board = new Gameboard(shipArray);
    this.name = name;
    this.turn = turn;
  }
  changeTurn() {
    this.turn = !this.turn;
  }
  attack(enemyBoard, coord = null) {
    if (!this.turn) return;
    if (Number.isInteger(coord)) return enemyBoard.receiveAttack(coord);
    if (coord === null)
      return enemyBoard.receiveAttack(aiMove(enemyBoard));
  }
}

export default Player;
