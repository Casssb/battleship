import { gameLoop } from './gameController';

const createBoard = (name) => {
  const board = document.createElement('div');
  board.classList.add(`${name}-board`);
  for (let i = 0; i < 100; i++) {
    const tile = document.createElement('div');
    tile.classList.add(`${name}-tile`);
    tile.setAttribute('data-index', `${i}`);
    board.append(tile);
  }
  return board;
};

const appendBoards = () => {
  const [playerBoardContainer, botBoardContainer, startBoardContainer] =
    document.querySelectorAll('.gameboard');
  const playerBoard = createBoard('player');
  const botBoard = createBoard('bot');
  const startBoard = createBoard('start');
  playerBoardContainer.append(playerBoard);
  botBoardContainer.append(botBoard);
  startBoardContainer.append(startBoard);
};

const appendPlayerBoardStyles = (playerboard) => {
  const playertiles = document.querySelectorAll('.player-tile');
  const shipCoords = playerboard.getShipCoords();
  playertiles.forEach((tile) => {
    const coords = Number(tile.dataset.index);
    if (shipCoords.includes(coords)) {
      tile.classList.add('ship');
    }
    if (playerboard.hitsArray.includes(coords)) {
      tile.classList.add('hit');
    }
    if (playerboard.missesArray.includes(coords)) {
      tile.classList.add('miss');
    }
    if (playerboard.hasCausedSinking(coords)) {
      tile.classList.add('sunk');
    }
  });
};

const appendBotBoardStyles = (botBoard) => {
  const botTiles = document.querySelectorAll('.bot-tile');
  botTiles.forEach((tile) => {
    const coords = Number(tile.dataset.index);
    if (botBoard.hitsArray.includes(coords)) {
      tile.classList.add('hit');
    }
    if (botBoard.missesArray.includes(coords)) {
      tile.classList.add('miss');
    }
    if (botBoard.hasCausedSinking(coords)) {
      tile.classList.add('sunk');
    }
  });
};

const appendBoardListeners = () => {
  const tiles = document.querySelectorAll('.bot-tile');
  tiles.forEach((tile) => {
    const coords = Number(tile.dataset.index);
    tile.addEventListener('click', (e) => {
      const classes = e.currentTarget.classList;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (!classes.contains('hit') && !classes.contains('miss')) {
        gameLoop(coords);
      }
    });
  });
};

export {
  appendBoards,
  appendPlayerBoardStyles,
  appendBotBoardStyles,
  appendBoardListeners,
};
