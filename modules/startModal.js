import { generateFleet, isValidShip, shipOffsets } from './generateCoords';
import { resetBoards } from './domViews';
import { init } from './gameController';

const startModalController = () => {
  const shipsArray = [];
  let flatShipsArray = shipsArray.flat();
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
    init(shipsArray);
    startGameBtn.classList.add('go');
  };

  const placedGame = (target, ship) => {
    const shipAdded = createShipFromOffsets(target, ship);
    shipsArray.push(shipAdded);
    flatShipsArray = shipsArray.flat();
    shipChoiceCounter += 1;
    if (shipChoiceCounter > 4) {
      resetBoards();
      init(shipsArray);
      startGameBtn.classList.add('go');
    }
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

  const createShipFromOffsets = (origin, ship) => {
    const shipWithOffsets = [];

    ship.forEach((coord) => {
      shipWithOffsets.push(coord + origin);
    });

    return shipWithOffsets;
  };

  const applyClassToTile = (tile, className) => {
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.add(`${className}`);
  };

  const removeClassFromTile = (tile, className) => {
    const currentTile = document.querySelector(`[data-start="${tile}"]`);
    currentTile.classList.remove(`${className}`);
  };

  const handleMouseOver = (tile) => {
    applyClassToTile(tile, 'hover');
  };

  const handleMouseOut = (tile) => {
    removeClassFromTile(tile, 'hover');
  };

  const handleClick = (tile) => {
    applyClassToTile(tile, 'clicked');
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
      if (shipChoiceCounter > 4) return;
      const target = Number(e.currentTarget.dataset.start);
      const ship = currentlySelectedShip(axis);
      if (isValidShip(flatShipsArray, ship, target, axis)) {
        ship.forEach((coord) => {
          handleMouseOver(coord + target);
        });
      } else {
        applyClassToTile(target, 'error');
      }
    });
  });

  startTiles.forEach((tile) => {
    tile.addEventListener('mouseout', (e) => {
      if (shipChoiceCounter > 4) return;
      const target = Number(e.currentTarget.dataset.start);
      const ship = currentlySelectedShip(axis);
      if (isValidShip(flatShipsArray, ship, target, axis)) {
        ship.forEach((coord) => {
          handleMouseOut(coord + target);
        });
      } else {
        removeClassFromTile(target, 'error');
      }
    });
  });

  startTiles.forEach((tile) => {
    tile.addEventListener('click', (e) => {
      if (shipChoiceCounter > 4) return;
      const target = Number(e.currentTarget.dataset.start);
      const ship = currentlySelectedShip(axis);
      if (isValidShip(flatShipsArray, ship, target, axis)) {
        ship.forEach((coord) => {
          handleClick(coord + target);
        });
        placedGame(target, ship);
      }
    });
  });
};

export default startModalController;
