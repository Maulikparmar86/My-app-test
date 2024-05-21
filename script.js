const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.dataset.cell);

  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    displayResult(`${currentPlayer} wins!`);
    gameActive = false;
  } else if (isBoardFull()) {
    displayResult("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isBoardFull() {
  return [...cells].every(cell => {
    return cell.textContent !== '';
  });
}

function displayResult(message) {
  const resultScreen = document.getElementById('result-screen');
  const resultMessage = document.getElementById('result-message');
  resultMessage.textContent = message;
  resultScreen.classList.remove('hidden');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameActive = true;
  document.getElementById('result-screen').classList.add('hidden');
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

document.getElementById('new-game-btn').addEventListener('click', resetGame);
