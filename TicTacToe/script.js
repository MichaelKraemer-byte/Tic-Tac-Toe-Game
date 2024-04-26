const board = document.getElementById('board');
const cells = []; // Array for cells


const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayer = X_CLASS;


const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// Function to initialize the game board
function initBoard() {
  // Add 9 cells to the game board
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div'); // Create a new cell
    board.appendChild(cell);
    cell.classList.add('cell'); // Create the new cell with css class 'cell'
    cell.dataset.cellIndex = i; // Dataset for the index of the cell. This gives each cell its own index for later access.
    cells.push(cell); // Add cell to the 'cells' array
    cell.addEventListener('click', handleClick, { once: true }); // { once: true } ensures that the event listener is removed after it's executed once (upon 'click').
  }
}


// Click event handler for cells
function handleClick(e) {
  const cellIndex = e.target.dataset.cellIndex; // Index of the clicked cell
  const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
  placeMark(cells[cellIndex], currentClass); // placeMark places the X_CLASS or O_CLASS mark at the cell clicked by the player.
  if (checkWin(currentClass)) { // Check if the current player has a winning combination.
    endGame(false); // Pass false to endGame, indicating that draw is false. This triggers the else sequence inside endGame.
  } else if (isDraw()) { // If nobody won, check if it's a draw (i.e., all cells are clicked or marked).
    endGame(true);
  } else { // If nobody won and it's not a draw, switch to the other player's turn and
    swapTurns(); // update the board to display the current player's class.
    setBoardHoverClass();
  }
}


function endGame(draw) {
  if (draw) { // Draw
    message.innerText = 'Draw!';
  } else { // Winner
    message.innerText = `${currentPlayer === X_CLASS ? "X" : "O"} wins!`;
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick); 
  });
}


// Add the appropriate mark of the player to the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}


// Switch player turns
function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}


// Update the board to display which player made the last move (but remove player classes first)
function setBoardHoverClass() {
  board.classList.remove('xTurnStyle');
  board.classList.remove('oTurnStyle');
  board.classList.add(`${currentPlayer}TurnStyle`);
}


// Check if the current player has a winning combination
function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}


// Check if all cells are filled
function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}


// Restart the game
function restart() {
  location.reload();
}