let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
];

// Function to make a move based on the clicked cell
function makeMove(index) {
    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;

    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        isGameActive = false;
        return;
    } else if (board.every(cell => cell !== '')) {
        alert("It's a tie!");
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Toggle player
}

// Function to check the winner
function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    Array.from(document.getElementById('board').children).forEach(cell => cell.innerText = '');
}

// Function to navigate back to the previous page
function goBack() {
    window.history.back();
}

// Check the mode and adjust game settings accordingly
function setGameMode(mode) {
    if (mode === 'offline') {
        currentPlayer = 'X'; // Start with Player X
        isGameActive = true;
        document.querySelector('.score').innerText = "Player: X | Player: O"; // Adjust score display for PvP
    } else if (mode === 'AI') {
        currentPlayer = 'X'; // Start with Player X
        isGameActive = true;
        document.querySelector('.score').innerText = "Player: X | AI: O"; // Adjust score display for PvAI
        aiMove(); // Trigger AI's move if needed
    }
}

// Function to simulate AI move (if needed)
function aiMove() {
    let availableMoves = board.map((cell, index) => (cell === '') ? index : null).filter(val => val !== null);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (randomMove !== undefined) {
        makeMove(randomMove);
    }
}

// Call setGameMode based on URL parameters
const urlParams = new URLSearchParams(window.location.search);
const gameMode = urlParams.get('mode');
setGameMode(gameMode);
