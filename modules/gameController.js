import Player from './player';
import generateFleet from './generateCoords';
import {
  appendBoards,
  appendBotBoardStyles,
  appendPlayerBoardStyles,
  appendBoardListeners,
} from './domViews';

const player = new Player(generateFleet(), 'bob', true);
const bot = new Player();

const changeTurns = () => {
  player.changeTurn();
  bot.changeTurn();
};

const gameLoop = (coords) => {
  player.attack(bot.board, coords);
  appendBotBoardStyles(bot.board);
  changeTurns();
  bot.attack(player.board);
  appendPlayerBoardStyles(player.board);
  changeTurns();
};

const init = () => {
  appendBoards();
  appendPlayerBoardStyles(player.board);
  appendBotBoardStyles(bot.board);
};

export { init, gameLoop };
