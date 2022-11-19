const createBoard = (name) => {
  const board = document.createElement('div');
  board.classList.add(`${name}-board`);
  for (let i = 0; i < 100; i++) {
    const tile = document.createElement('div');
    tile.classList.add(`${name}-tile`);
    tile.setAttribute(`data-${name}`, `${i}`);
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

const appendStartBoardStyles = (playerboard) => {
  const starttiles = document.querySelectorAll('.start-tile');
  const shipCoords = playerboard.getShipCoords();
  starttiles.forEach((tile) => {
    const coords = Number(tile.dataset.start);
    if (shipCoords.includes(coords)) {
      tile.classList.add('ship');
    }
  });
};

const appendPlayerBoardStyles = (playerboard) => {
  const playertiles = document.querySelectorAll('.player-tile');
  const shipCoords = playerboard.getShipCoords();
  playertiles.forEach((tile) => {
    const coords = Number(tile.dataset.player);
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
    const coords = Number(tile.dataset.bot);
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

const appendGameboardListeners = (callback) => {
  const tiles = document.querySelectorAll('.bot-tile');
  tiles.forEach((tile) => {
    const coords = Number(tile.dataset.bot);
    tile.addEventListener('click', (e) => {
      const classes = e.currentTarget.classList;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (!classes.contains('hit') && !classes.contains('miss')) {
        callback(coords);
      }
    });
  });
};

export {
  appendBoards,
  appendStartBoardStyles,
  appendPlayerBoardStyles,
  appendBotBoardStyles,
  appendGameboardListeners,
};
