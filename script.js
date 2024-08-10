
const Gameboard = (() => {

    const board = Array(9).fill(null);

    const getBoard = () => board;

    const setCell = (index, value) => {
        if (!board[index]) {
            board[index] = value;
            console.log(board);
            return true;
        }
        return false;
    }

    const resetBoard = () => board.fill(null);

    return { getBoard, setCell, resetBoard };
    
})();


const Player = (name, mark) => {
    return { name, mark };
}


const GameController = (() => {
    let currentPlayer;

    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    const startGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const handleInput = (index) => {
        if (Gameboard.setCell(index, currentPlayer.mark)) {
            switchPlayer();
        }
    }

    return { startGame, handleInput };
})();

document.addEventListener('DOMContentLoaded', () => {

    GameController.startGame();

    const button = document.querySelector('.new-game');
    button.addEventListener('click', () => GameController.startGame())

    const boardElement = document.querySelector('.board');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('box')
        cell.addEventListener('click', () => GameController.handleInput(i));
        boardElement.appendChild(cell);
    }
})

