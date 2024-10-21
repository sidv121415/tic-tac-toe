let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
];

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

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // If in AI mode, make AI move
    if (currentPlayer === 'O' && window.location.search.includes('mode=AI')) {
        aiMove();
    }
}

function aiMove() {
    let availableMoves = board.map((cell, index) => (cell === '') ? index : null).filter(index => index !== null);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(randomMove);
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    Array.from(document.getElementById('board').children).forEach(cell => {
        cell.innerText = '';
    });
}
