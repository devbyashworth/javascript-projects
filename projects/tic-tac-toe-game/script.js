document.addEventListener("DOMContentLoaded", () => {
    let x = "x";
    let o = "o";
    let count = 0;
    let x_win = 0;
    let o_win = 0;
    let draws = 0;
    let firstPlayer = '';
    let currentPlayer = '';
    let isComputerOpponent = false;

    const gameItems = document.querySelectorAll("#game .space");
    const xWinElement = document.getElementById("x_win");
    const oWinElement = document.getElementById("o_win");
    const drawsElement = document.getElementById("draws");
    const resetButton = document.getElementById("reset");
    const overlay = document.getElementById("overlay");
    const messageBox = document.getElementById("message-box");
    const messageContent = document.getElementById("message-content");
    const messageClose = document.getElementById("message-close");
    const gameModeModal = new bootstrap.Modal(document.getElementById('gameModeModal'), { keyboard: false });
    const diceRollModal = new bootstrap.Modal(document.getElementById('diceRollModal'), { keyboard: false });

    const checkWinner = (player) => {
        return (
            (document.getElementById("one").classList.contains(player) && document.getElementById("two").classList.contains(player) && document.getElementById("three").classList.contains(player)) ||
            (document.getElementById("four").classList.contains(player) && document.getElementById("five").classList.contains(player) && document.getElementById("six").classList.contains(player)) ||
            (document.getElementById("seven").classList.contains(player) && document.getElementById("eight").classList.contains(player) && document.getElementById("nine").classList.contains(player)) ||
            (document.getElementById("one").classList.contains(player) && document.getElementById("four").classList.contains(player) && document.getElementById("seven").classList.contains(player)) ||
            (document.getElementById("two").classList.contains(player) && document.getElementById("five").classList.contains(player) && document.getElementById("eight").classList.contains(player)) ||
            (document.getElementById("three").classList.contains(player) && document.getElementById("six").classList.contains(player) && document.getElementById("nine").classList.contains(player)) ||
            (document.getElementById("one").classList.contains(player) && document.getElementById("five").classList.contains(player) && document.getElementById("nine").classList.contains(player)) ||
            (document.getElementById("three").classList.contains(player) && document.getElementById("five").classList.contains(player) && document.getElementById("seven").classList.contains(player))
        );
    };

    const resetGame = () => {
        gameItems.forEach((item) => {
            item.textContent = "+";
            item.classList.remove("disable", "o", "x", "btn-primary", "btn-info");
        });
        count = 0;
        currentPlayer = firstPlayer;
        if (isComputerOpponent && currentPlayer === 'x') {
            setTimeout(computerMove, 500);
        }
    };

    const showMessage = (message) => {
        messageContent.textContent = message;
        overlay.style.display = "block";
        messageBox.style.display = "block";
    };

    const closeMessage = () => {
        overlay.style.display = "none";
        messageBox.style.display = "none";
    };

    const computerMove = () => {
        const emptySpaces = Array.from(gameItems).filter(item => !item.classList.contains("disable"));
        if (emptySpaces.length === 0) return;

        const randomIndex = Math.floor(Math.random() * emptySpaces.length);
        const computerChoice = emptySpaces[randomIndex];
        
        computerChoice.textContent = x;
        computerChoice.classList.add("disable", "x", "btn-info");

        if (checkWinner("x")) {
            showMessage("X (Computer) has won the game. Start a new game.");
            x_win++;
            xWinElement.textContent = x_win;
            resetGame();
            return;
        }

        count++;
        if (count === 9) {
            showMessage("It's a tie. It will restart.");
            draws++;
            drawsElement.textContent = draws;
            resetGame();
        } else {
            currentPlayer = 'o';
        }
    };

    const playerMove = (event, player) => {
        event.target.textContent = player;
        event.target.classList.add("disable", player, player === "o" ? "btn-primary" : "btn-info");

        if (checkWinner(player)) {
            showMessage(`${player.toUpperCase()} has won the game. Start a new game.`);
            if (player === "o") {
                o_win++;
                oWinElement.textContent = o_win;
            } else {
                x_win++;
                xWinElement.textContent = x_win;
            }
            resetGame();
            return true;
        }

        count++;
        if (count === 9) {
            showMessage("It's a tie. It will restart.");
            draws++;
            drawsElement.textContent = draws;
            resetGame();
            return true;
        }
        return false;
    };

    gameItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            if (event.target.classList.contains("disable")) {
                showMessage("Already Selected.");
                return;
            }

            const player = currentPlayer;
            const moveCompleted = playerMove(event, player);

            if (moveCompleted) return;

            if (isComputerOpponent && player === 'o') {
                currentPlayer = 'x';
                setTimeout(computerMove, 500);
            } else {
                currentPlayer = player === 'o' ? 'x' : 'o';
            }
        });
    });

    resetButton.addEventListener("click", resetGame);
    messageClose.addEventListener("click", closeMessage);

    gameModeModal.show();

    document.getElementById('twoPlayerButton').addEventListener('click', () => {
        gameModeModal.hide();
        diceRollModal.show();
        console.log('Two Player mode selected');
    });

    document.getElementById('computerButton').addEventListener('click', () => {
        isComputerOpponent = true;
        gameModeModal.hide();
        diceRollModal.show();
        console.log('Computer mode selected');
    });

    document.getElementById('rollDiceButton').addEventListener('click', () => {
        const rollResult = Math.floor(Math.random() * 6) + 1;
        const opponentRollResult = Math.floor(Math.random() * 6) + 1;
        const diceResultElement = document.getElementById('diceResult');
        
        let resultText = `You rolled a ${rollResult}.`
        if (rollResult > opponentRollResult) {
            firstPlayer = 'x';
            resultText += `X plays first.`;
        } else if (rollResult < opponentRollResult) {
            firstPlayer = 'o';
            resultText += `O plays first.`;
        } else {
            resultText += `It's a tie! Roll again.`;
        }
        
        diceResultElement.textContent = resultText;
        if (rollResult !== opponentRollResult) {
            document.getElementById('startGameButton').style.display = 'inline-block';
        } else {
            document.getElementById('startGameButton').style.display = 'none';
        }
    });

    document.getElementById('startGameButton').addEventListener('click', () => {
        diceRollModal.hide();
        currentPlayer = firstPlayer;
        if (isComputerOpponent && firstPlayer === 'x') {
            setTimeout(computerMove, 500);
        }
        console.log(`${firstPlayer.toUpperCase()} will start the game`);
    });
});
