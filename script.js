
const Gameboard = (() => {

    const board = Array(9).fill(null);

    const getBoard = () => board;

    const setCell = (index, currentPlayer) => {
        if (!board[index]) {
            board[index] = currentPlayer.mark;
            console.log(board);
            if (GameController.checkForWin()) {
                const dialog = document.querySelector("dialog");
                dialog.innerText = currentPlayer.name + ' won'
                dialog.addEventListener('click', () => dialog.close());
                dialog.addEventListener('close', () => resetBoard());
                dialog.showModal();
            }
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        board.fill(null)
        renderBoard();
    };

    const renderScore = (player1, player2) => {
        const score = document.querySelector('.score');
        score.innerText = `${player1.name} ${player1.score} : ${player2.score} ${player2.name}`;
    }

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

    return { getBoard, setCell, resetBoard, renderBoard, renderScore };
    
})();


const Player = (name, mark, score) => {
    return { name, mark, score };
}


const GameController = (() => {
    let currentPlayer;

    const player1 = Player('Bob', 'X', 0);
    const player2 = Player('John', 'O', 0);

    const startGame = () => {
        currentPlayer = player1;
        Gameboard.resetBoard();
    }

    const handleInput = (index) => {
        if (Gameboard.setCell(index, currentPlayer)) {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            Gameboard.renderBoard();
        }
    }

    const getCurrentPlayer = () => currentPlayer.name;

    const checkForWin = () => {
        board = Gameboard.getBoard();
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
    
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                currentPlayer.score++;
                Gameboard.renderScore(player1, player2);
                return true;
            }
        }
        return false;
    }

    Gameboard.renderScore(player1, player2);
    
    return { startGame, handleInput, getCurrentPlayer, checkForWin };
})();


document.addEventListener('DOMContentLoaded', () => {
    
    const button = document.querySelector('.new-game');
    button.addEventListener('click', () => GameController.startGame())
    
    GameController.startGame();
    Gameboard.renderBoard();
})
