import Player from './player';
import {
  appendStartBoardStyles,
  appendBotBoardStyles,
  appendPlayerBoardStyles,
  appendGameboardListeners,
} from './domViews';

const init = (playerShips) => {
  const player = new Player(playerShips, true);
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
  appendGameboardListeners(gameLoop);
  appendStartBoardStyles(player.board);
  appendPlayerBoardStyles(player.board);
  appendBotBoardStyles(bot.board);
};

export { init };
