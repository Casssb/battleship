let hits = [];

const clearHitsArray = () => {
  hits.length = 0;
};

const removeSuccessfullHits = (hit, enemyBoard) => {
  const sunkArray = enemyBoard.getSunkCoords(hit);
  hits.forEach((hit, index) => {
    if (sunkArray.includes(hit)) {
      hits.splice(index, 1);
    }
  });
};

const checkHitsArray = (enemyBoard) => {
  hits.forEach((hit) => {
    if (enemyBoard.hasCausedSinking(hit)) {
      removeSuccessfullHits(hit, enemyBoard);
    }
  });
};

const aiMove = (enemyBoard) => {
  checkHitsArray(enemyBoard);
  console.log(hits);
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
    } else {
      const randomMove = potentialMoves[randomChoice];
      if (potentialHits.includes(randomMove)) {
        hits.push(randomMove);
      }
      return randomMove;
    }
  } else if (hits.length === 1) {
    const move = hits[0];
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

export { aiMove, clearHitsArray };
