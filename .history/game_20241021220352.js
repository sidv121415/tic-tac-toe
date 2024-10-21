let playerScore = 0;
let aiScore = 0;
const cells = document.querySelectorAll('.cell');

function makeMove(index) {
    if (cells[index].textContent === '') {
        cells[index].textContent = 'X'; // Player's move
        if (checkWin('X')) {
            alert('Player wins!');
            playerScore++;
            updateScores();
            resetGame();
            return;
        }
        aiMove(); // AI makes a move
    }
}

function aiMove() {
    // Simple AI logic (random move)
    let availableCells = Array.from(cells).filter(cell => cell.textContent === '');
    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        randomCell.textContent = 'O'; // AI's move
        if (checkWin('O')) {
            alert('AI wins!');
            aiScore++;
            updateScores();
            resetGame();
        }
    }
}

function checkWin(player) {
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
    return winningCombinations.some(combination => 
        combination.every(index => cells[index].textContent === player)
    );
}

function updateScores() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('ai-score').textContent = aiScore;
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
}

