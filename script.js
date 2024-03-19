const cells = document.querySelectorAll('.cell');
const turnDisplay = document.getElementById('turn');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;


function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    
    if (!gameBoard.includes('')) {
        return 'T';
    }

    return null;
}
function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || gameOver) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        gameOver = true;
        if (winner === 'T') {
            resultDisplay.textContent = 'It\'s a tie!';
        } else {
            resultDisplay.textContent = `Player ${winner} wins!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}


function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    turnDisplay.textContent = "Player X's turn";
    resultDisplay.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));

restartButton.addEventListener('click', restartGame);