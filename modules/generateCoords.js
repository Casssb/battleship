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

const generateFleet = () => {
  const fleetArray = [];
  const generateCoords = (offset) => {
    const validShip = [];
    const flatFleetArray = fleetArray.flat();
    const direction = Math.floor(Math.random() * 2); // either 0 for x (horizontal), 1 for y (vertical)
    const axisChoice = direction === 0 ? 1 : 10;
    const choice = offset[direction];
    const startChoice = Math.abs(
      Math.floor(Math.random() * 100 - choice.length * axisChoice)
    );
    /* originally startChoice was just Math.floor(Math.random() * 100) but this was
    casuing problems with not balancing vert/horiz coords. Having it multiply by the 
    axis choice (1 or 10) along with the number of coords to use makes it truly 
    random but accounts for having too many of one axis in the choice array  */

    const taken = choice.some((coord) =>
      flatFleetArray.includes(coord + startChoice)
    ); // Choices cannot already be present in other ships

    const outOfBounds =
      choice.some((coord) => (startChoice + coord) % 10 === 0) ||
      choice.some((coord) => (startChoice + coord) % 10 === 9);
    /* filters out any coord over 99 */

    if (!taken && !outOfBounds) {
      choice.forEach((coord) => {
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

export { generateFleet };
