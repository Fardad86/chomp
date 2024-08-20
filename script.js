document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 5; // اندازه صفحه بازی
    const board = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');

    let gameBoard;
    let gameActive;

    function createBoard() {
        board.style.gridTemplateColumns = `repeat(${boardSize}, 60px)`;
        board.innerHTML = ''; // پاک کردن صفحه
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => handleCellClick(row, col));
                board.appendChild(cell);
            }
        }
        gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(true));
        gameActive = true;
        updateBoard();
    }

    function handleCellClick(row, col) {
        if (!gameActive) return;

        for (let r = row; r < boardSize; r++) {
            for (let c = col; c < boardSize; c++) {
                gameBoard[r][c] = false; // سلول مصرف شده
            }
        }

        updateBoard();

        if (gameBoard[0][0] === false) {
            gameActive = false;
            alert("Game Over! Click 'Start New Game' to play again.");
        }
    }

    function updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            if (gameBoard[row][col]) {
                cell.classList.remove('selected');
            } else {
                cell.classList.add('selected');
            }
        });
    }

    resetBtn.addEventListener('click', createBoard);

    createBoard();
});
