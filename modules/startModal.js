import { generateFleet } from './generateCoords';
import { resetBoards } from './domViews';
import { init } from './gameController';

const startModalController = () => {
  const shipsArray = [];
  const randomShipBtn = document.querySelector('#random-ships');
  const startGameBtn = document.querySelector('#start-btn');
  const startTiles = document.querySelectorAll('.start-tile');

  const randomGame = () => {
    const randomShips = generateFleet();
    shipsArray.length = 0;
    shipsArray.push(...randomShips);
    resetBoards();
    init(randomShips);
    startGameBtn.classList.add('go');
  };

  const startGame = () => {
    if (shipsArray.length === 5) {
      const startModal = document.querySelector('#start-modal');
      startModal.style.display = 'none';
      startGameBtn.classList.remove('go');
      shipsArray.length = 0;
    }
  };

  const handleMouseOver = (tile) => {
    console.log(`enter tile ${tile}`);
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.add('hover');
  };

  const handleMouseOut = (tile) => {
    console.log(`exit tile ${tile}`);
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.remove('hover');
  };

  const handleClick = (tile) => {
    console.log(`${tile} clicked`);
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.add('clicked');
  };

  randomShipBtn.addEventListener('click', (e) => {
    e.preventDefault();
    randomGame();
  });

  startGameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startGame();
  });

  startTiles.forEach((tile) => {
    tile.addEventListener('mouseover', (e) => {
      const target = e.currentTarget.dataset.start;
      handleMouseOver(target);
    });
  });

  startTiles.forEach((tile) => {
    tile.addEventListener('mouseout', (e) => {
      const target = e.currentTarget.dataset.start;
      handleMouseOut(target);
    });
  });

  startTiles.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      const target = e.currentTarget.dataset.start;
      handleClick(target);
    });
  });
};

export default startModalController;
