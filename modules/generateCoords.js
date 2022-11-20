/* Hasbro website lists 5 ships for Battleship game
carrier- length 5
battleship- length 4
cruiser- length 3
submarine- length 3
destroyer- length 2 
grid is 100 tiles (0-99) so any horizontal coord will be num + 1
any veritcal coord will be num + 10
a horizontal carrier starting at the botoom left will be [0,1,2,3,4]
1- will need to generate a random direction choice (maybe using 0/1 or true/false)
2- will need an array of ships with 2 choices for horiz/vert offsets
3- will need a result ship array that will be eventually returned
4- start by creating a temp array and pushing first coord from first ship
5- then create a loop to push other coords with validation checks to make sure they are
not going out of bounds on grid or duplicating current coords (seems like this
function should be recursive)
6- push this into results array and then repeat for 4 other ships
7- when array.length is equal to 5 return results.*/

const shipOffsets = [
  [
    [0, 1, 2, 3, 4],
    [0, 10, 20, 30, 40],
  ],
  [
    [0, 1, 2, 3],
    [0, 10, 20, 30],
  ],
  [
    [0, 1, 2],
    [0, 10, 20],
  ],
  [
    [0, 1, 2],
    [0, 10, 20],
  ],
  [
    [0, 1],
    [0, 10],
  ],
];

const isValidShip = (flatFleetArray, ship, origin, axis) => {
  const currentAxis = axis;
  const shipLength = Number(ship.length);
  const start = ship[0] + origin;
  const end = ship[shipLength - 1] + origin;

  const taken = ship.some((coord) => flatFleetArray.includes(coord + origin)); // ship coords cannot already be present in other ships

  const badHorizontal =
    (start > 9 - shipLength && start <= 9 && end > 9) ||
    (start > 19 - shipLength && start <= 19 && end > 19) ||
    (start > 29 - shipLength && start <= 29 && end > 29) ||
    (start > 39 - shipLength && start <= 39 && end > 39) ||
    (start > 49 - shipLength && start <= 49 && end > 49) ||
    (start > 59 - shipLength && start <= 59 && end > 59) ||
    (start > 69 - shipLength && start <= 69 && end > 69) ||
    (start > 79 - shipLength && start <= 79 && end > 79) ||
    (start > 89 - shipLength && start <= 89 && end > 89);

  const outOfBounds =
    ship.some((coord) => origin + coord < 0) ||
    ship.some((coord) => origin + coord > 99);
  /* filter was originally 0-99 but this causes coords to wrap around grid. I added the above option to
  stop particular horizontal coords wrapping*/

  if (currentAxis === 1) {
    return !taken && !outOfBounds;
  } else {
    return !taken && !outOfBounds && !badHorizontal;
  }
};

const generateFleet = () => {
  const fleetArray = [];
  const generateCoords = (offset) => {
    const validShip = [];
    const flatFleetArray = fleetArray.flat();
    const direction = Math.floor(Math.random() * 2); // either 0 for x (horizontal), 1 for y (vertical)
    const axisChoice = direction === 0 ? 1 : 10;
    const shipChoice = offset[direction];
    const startChoice = Math.abs(
      Math.floor(Math.random() * 100 - shipChoice.length * axisChoice)
    );
    /* originally startChoice was just Math.floor(Math.random() * 100) but this was
    casuing problems with not balancing vert/horiz coords. Having it multiply by the 
    axis choice (1 or 10) along with the number of coords to use makes it truly 
    random but accounts for having too many of one axis in the shipChoice array  */

    if (isValidShip(flatFleetArray, shipChoice, startChoice, direction)) {
      shipChoice.forEach((coord) => {
        validShip.push(startChoice + coord);
      });
      fleetArray.push(validShip);
    } else {
      generateCoords(offset);
    }
  };
  generateCoords(shipOffsets[0]);
  generateCoords(shipOffsets[1]);
  generateCoords(shipOffsets[2]);
  generateCoords(shipOffsets[3]);
  generateCoords(shipOffsets[4]);
  return fleetArray;
};

export { generateFleet, shipOffsets, isValidShip };
