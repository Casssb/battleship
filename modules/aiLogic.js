let hits = [];

const checkHitsArray = (enemyBoard) => {
  hits.forEach((hit) => {
    if (enemyBoard.hasCausedSinking(hit)) {
      hits = [];
    }
  });
};

const aiMove = (enemyBoard) => {
  checkHitsArray(enemyBoard);
  const potentialMoves = [...enemyBoard.possibleMoves];
  const potentialHits = enemyBoard.getShipCoords();
  const randomChoice = Math.floor(Math.random() * potentialMoves.length);
  const firstHit = hits[0];
  const secondHit = hits[1];

  if (hits.length > 1) {
    let offset = Math.abs(secondHit - firstHit);
    const highestHit = Math.max(...hits);
    const lowestHit = Math.min(...hits);
    const moveHigh = highestHit + offset;
    const moveLow = lowestHit - offset;
    console.log(potentialMoves);
    console.log(hits);

    if (potentialMoves.includes(moveHigh)) {
      if (potentialHits.includes(moveHigh)) {
        hits.push(moveHigh);
      }
      return moveHigh;
    } else if (potentialMoves.includes(moveLow)) {
      if (potentialHits.includes(moveLow)) {
        hits.push(moveLow);
      }
      return moveLow;
    }
  } else if (hits.length === 1) {
    console.log(hits);
    const move = hits[0];
    console.log(move);
    if (potentialMoves.includes(move + 1)) {
      if (potentialHits.includes(move + 1)) {
        hits.push(move + 1);
      }
      return move + 1;
    } else if (potentialMoves.includes(move - 1)) {
      if (potentialHits.includes(move - 1)) {
        hits.push(move - 1);
      }
      return move - 1;
    } else if (potentialMoves.includes(move + 10)) {
      if (potentialHits.includes(move + 10)) {
        hits.push(move + 10);
      }
      return move + 10;
    } else if (potentialMoves.includes(move - 10)) {
      if (potentialHits.includes(move - 10)) {
        hits.push(move - 10);
      }
      return move - 10;
    }
  } else {
    const randomMove = potentialMoves[randomChoice];
    if (potentialHits.includes(randomMove)) {
      hits.push(randomMove);
    }
    return randomMove;
  }
};

export default aiMove;
