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
  const [playerBoardContainer, botBoardContainer] =
    document.querySelectorAll('.gameboard');
  const playerBoard = createBoard('player');
  const botBoard = createBoard('bot');
  playerBoardContainer.append(playerBoard);
  botBoardContainer.append(botBoard);
};

export { appendBoards };
