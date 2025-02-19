const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');
const winnerDisplay = document.querySelector('.winner-display');
const winnerImage = document.querySelector('.winner-image');
const winnerMessage = document.querySelector('.winner-message');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Local image paths
const images = [
  'img/food1.png', // Path to food1.png
  'img/food2.png', // Path to food2.png
  'img/food3.png'  // Path to food3.png
];

// Randomly select two images for X and O
const playerImages = {
  X: images[Math.floor(Math.random() * images.length)],
  O: images[Math.floor(Math.random() * images.length)]
};

// Ensure X and O have different images
while (playerImages.X === playerImages.O) {
  playerImages.O = images[Math.floor(Math.random() * images.length)];
}

const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6]  // Diagonal
];

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = `<img src="${playerImages[currentPlayer]}" alt="${currentPlayer}">`;
  clickedCell.classList.add(currentPlayer);

  checkForWinner();
};

const checkForWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    // Hide the board and show the winner display
    board.style.display = 'none';
    winnerDisplay.style.display = 'block';
    winnerImage.src = playerImages[currentPlayer];
    winnerMessage.textContent = 'This man wins!';
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    // Handle draw
    board.style.display = 'none';
    winnerDisplay.style.display = 'block';
    winnerImage.src = ''; // No image for draw
    winnerMessage.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
};

const resetGame = () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('X', 'O');
  });

  // Reassign random images for X and O
  playerImages.X = images[Math.floor(Math.random() * images.length)];
  playerImages.O = images[Math.floor(Math.random() * images.length)];

  // Ensure X and O have different images
  while (playerImages.X === playerImages.O) {
    playerImages.O = images[Math.floor(Math.random() * images.length)];
  }

  // Reset display
  board.style.display = 'grid';
  winnerDisplay.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

// Initialize game status
statusText.textContent = `It's ${currentPlayer}'s turn`;