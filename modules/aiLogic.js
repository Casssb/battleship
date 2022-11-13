const aiMove = (enemyBoard) => {
  const potentialMoves = [...enemyBoard.possibleMoves];
  const randomChoice = Math.floor(Math.random() * potentialMoves.length);
  return potentialMoves[randomChoice];
};

export default aiMove;
