import { generateFleet, isValidShip, shipOffsets } from './generateCoords';
import { resetBoards } from './domViews';
import { init } from './gameController';

const startModalController = () => {
  const shipsArray = [];
  const flatShipsArray = shipsArray.flat();
  const rotateShipBtn = document.querySelector('#rotate');
  const randomShipBtn = document.querySelector('#random-ships');
  const startGameBtn = document.querySelector('#start-btn');
  const startTiles = document.querySelectorAll('.start-tile');

  let axis = 0; //0 is horizontal, 1 vertical
  let shipChoiceCounter = 0;

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

  const rotateShip = () => {
    axis === 0 ? (axis = 1) : (axis = 0);
  };

  const currentlySelectedShip = (shipAxis) => {
    let ship;
    switch (shipChoiceCounter) {
      case 0:
        ship = shipOffsets[0][shipAxis];
        break;
      case 1:
        ship = shipOffsets[1][shipAxis];
        break;
      case 2:
        ship = shipOffsets[2][shipAxis];
        break;
      case 3:
        ship = shipOffsets[3][shipAxis];
        break;
      case 4:
        ship = shipOffsets[4][shipAxis];
        break;
      default:
        ship = 'error, exceeded offset array';
    }
    return ship;
  };

  const handleMouseOver = (tile) => {
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.add('hover');
  };

  const handleMouseOut = (tile) => {
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.remove('hover');
  };

  const handleClick = (tile) => {
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.add('clicked');
  };

  rotateShipBtn.addEventListener('click', (e) => {
    e.preventDefault();
    rotateShip();
  });

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
      const target = Number(e.currentTarget.dataset.start);
      const ship = currentlySelectedShip(axis);
      if (isValidShip(flatShipsArray, ship, target, axis)) {
        ship.forEach((coord) => {
          handleMouseOver(coord + target);
          console.log(target);
        });
      }
    });
  });

  startTiles.forEach((tile) => {
    tile.addEventListener('mouseout', (e) => {
      const target = Number(e.currentTarget.dataset.start);
      const ship = currentlySelectedShip(axis);
      if (isValidShip(flatShipsArray, ship, target, axis)) {
        ship.forEach((coord) => {
          handleMouseOut(coord + target);
        });
      }
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
