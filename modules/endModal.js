import { resetBoards } from './domViews';
import { clearHitsArray } from './aiLogic';

const endGameController = (winner) => {
  const resultText = document.querySelector('#result');
  const resetBtn = document.querySelector('#reset-btn');
  const endModal = document.querySelector('#end-modal');

  const displayWinner = (winner) => {
    endModal.style.display = 'flex';
    if (winner === 'player') resultText.textContent = 'You win!';
    if (winner === 'bot') resultText.textContent = 'You lose!';
  };

  const newGame = () => {
    const startModal = document.querySelector('#start-modal');
    resetBoards();
    endModal.style.display = 'none';
    startModal.style.display = 'flex';
    resultText.textContent = '';
    clearHitsArray();
  };

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newGame();
  });

  displayWinner(winner);
};

export default endGameController;
