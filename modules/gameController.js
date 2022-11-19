import Player from './player';
import generateFleet from './generateCoords';
import { appendStartModalListeners } from './placeShips';
import {
  appendBoards,
  appendBotBoardStyles,
  appendPlayerBoardStyles,
  appendGameboardListeners,
} from './domViews';

const player = new Player(generateFleet(), true);
const bot = new Player();

const changeTurns = () => {
  player.changeTurn();
  bot.changeTurn();
};

const gameLoop = (coords) => {
  player.attack(bot.board, coords);
  appendBotBoardStyles(bot.board);
  changeTurns();
  setTimeout(() => {
    bot.attack(player.board);
    appendPlayerBoardStyles(player.board);
    changeTurns();
  }, 200);
};

const init = () => {
  appendBoards();
  appendGameboardListeners();
  appendStartModalListeners();
  appendPlayerBoardStyles(player.board);
  appendBotBoardStyles(bot.board);
};

export { init, gameLoop };
