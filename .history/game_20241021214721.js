const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const modeTitle = document.getElementById('modeTitle');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let scoreX = 0;
let scoreO = 0;

const params = new URLSearchParams(window.location.search);
const mode = params.get('mode');

if (mode === 'ai') {
    modeTitle.textContent = "Player vs AI";
} else {
    modeTitle.textContent = "Offline Play";
}

// Game logic
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetBoard);

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] || checkWin()) return; // Prevent overwriting cells

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement.textContent = scoreX;
            alert("Player X wins!");
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
            alert("Player O wins!");
        }
        resetBoard();
    } else if (gameBoard.every(cell => cell)) {
        alert("It's a draw!");
        resetBoard();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        if (mode === 'ai' && currentPlayer === 'O') {
            aiMove();
        }
    }
}

// AI logic
function aiMove() {
    let emptyCells = gameBoard.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[randomCell] = 'O';
    cells[randomCell].textContent = 'O';

    if (checkWin()) {
        scoreO++;
        scoreOElement.textContent = scoreO;
        alert("AI wins!");
        resetBoard();
    } else if (gameBoard.every(cell => cell)) {
        alert("It's a draw!");
        resetBoard();
    } else {
        currentPlayer = 'X'; // Switch back to player X
    }
}

// Check win conditions
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Reset the board
function resetBoard() {
    gameBoard.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X'; // Reset to Player X
}
