document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');
    const form = document.getElementById('settings-form');
    let boardSize = { rows: 5, cols: 5 };
    let gameBoard;
    let gameActive;

    function createBoard() {
        board.style.gridTemplateColumns = `repeat(${boardSize.cols}, 60px)`;
        board.innerHTML = ''; // پاک کردن صفحه
        for (let row = 0; row < boardSize.rows; row++) {
            for (let col = 0; col < boardSize.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => handleCellClick(row, col));
                board.appendChild(cell);
            }
        }
        gameBoard = Array.from({ length: boardSize.rows }, () => Array(boardSize.cols).fill(true));
        gameActive = true;
        updateBoard();
    }

    function handleCellClick(row, col) {
        if (!gameActive) return;

        for (let r = row; r < boardSize.rows; r++) {
            for (let c = col; c < boardSize.cols; c++) {
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

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // جلوگیری از ارسال فرم
        const rows = parseInt(document.getElementById('rows').value);
        const cols = parseInt(document.getElementById('cols').value);
        
        if (rows < 2 || rows > 10 || cols < 2 || cols > 10) {
            alert("Please enter a number between 2 and 10 for rows and columns.");
            return;
        }

        boardSize = { rows, cols };
        createBoard();
    });

    resetBtn.addEventListener('click', createBoard);

    createBoard();
});
