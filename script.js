const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'Draw';
}

function updateStatus() {
    const winner = checkWinner();
    if (winner) {
        isGameOver = true;
        statusText.textContent = winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`;
        cells.forEach(cell => cell.classList.add('taken'));
    } else {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function handleCellClick(event) {
    if (isGameOver) return;

    const cell = event.target;
    const index = cell.dataset.index;

    if (!boardState[index]) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}
function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            pattern.forEach(index => {
                cells[index].classList.add('highlight');
            });
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'Draw';
}

function resetGame() {
    boardState.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'highlight'); 
    });
    currentPlayer = 'X';
    isGameOver = false;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

updateStatus();
