
const Gameboard = (() => {

    const board = Array(9).fill(null);

    const getBoard = () => board;

    const setCell = (index, value) => {
        if (!board[index]) {
            board[index] = value;
            console.log(board);
            renderBoard();
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        board.fill(null)
        renderBoard();
    };

    const renderBoard = () => {
        const boardElement = document.querySelector('.board');
        boardElement.innerHTML = '';
        document.querySelector('.player-name').innerText = GameController.getCurrentPlayer() + ' turn';
        board.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('box')
            cell.addEventListener('click', () => GameController.handleInput(index));
            cell.innerText = value;
            boardElement.appendChild(cell);
        })
    }

    return { getBoard, setCell, resetBoard, renderBoard };
    
})();


const Player = (name, mark) => {
    return { name, mark };
}


const GameController = (() => {
    let currentPlayer;

    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    const startGame = () => {
        currentPlayer = player1;
        Gameboard.resetBoard();
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        Gameboard.renderBoard();
    }

    const handleInput = (index) => {
        if (Gameboard.setCell(index, currentPlayer.mark)) {
            switchPlayer();
        }
    }

    const getCurrentPlayer = () => currentPlayer.name;
    
    return { startGame, handleInput, getCurrentPlayer };
})();

document.addEventListener('DOMContentLoaded', () => {
    
    const button = document.querySelector('.new-game');
    button.addEventListener('click', () => GameController.startGame())
    
    GameController.startGame();
    Gameboard.renderBoard();
})
