import Player from './player';
import generateFleet from './generateCoords';
import {
  appendBoards,
  appendBotBoardStyles,
  appendPlayerBoardStyles,
  appendBoardListeners,
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
  appendBoardListeners();
  appendPlayerBoardStyles(player.board);
  appendBotBoardStyles(bot.board);
};

export { init, gameLoop };
