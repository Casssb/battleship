class Ship {
  hits = 0;
  constructor(length, array = null) {
    this.length = length;
    if (array) this.coords = [...array];
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

export default Ship;
