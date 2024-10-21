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

    if (currentPlayer === 'O') {
        aiMove();
    }
}

function aiMove() {
    let availableMoves = board.map((cell, index) => (cell === '') ? index : null).filter(val => val !== null);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (randomMove !== undefined) {
        makeMove(randomMove);
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    Array.from(document.getElementById('board').children).forEach(cell => cell.innerText = '');
}

function goBack() {
    window.history.back();
}
