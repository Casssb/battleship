import { generateFleet } from './generateCoords';
import { init } from './gameController';

const randomGame = () => {
  init(generateFleet());
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

const appendStartModalListeners = () => {
  const randomShipBtn = document.querySelector('#random-ships');
  const startTiles = document.querySelectorAll('.start-tile');

  randomShipBtn.addEventListener('click', (e) => {
    e.preventDefault();
    randomGame();
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

export { appendStartModalListeners };
