
//(function() {
    "use strict";

    /* jshint unused: false */
    function startGame() {
        for (var n = 1; n <=9; n++) {
            clearBox(n);
        }
        document.turn = 'X';
        if (Math.random() < 0.5) {
            document.turn = 'O';
        }
        document.winner = null;
        setMessage(document.turn + " gets to start");
    }

    function nextMove(square) {
        if (document.winner !== null) {
            setMessage(document.winner + " has already won the game");
        }
        else if (square.innerText === "") {
            square.innerText = document.turn;
            switchTurn();
        }
        else {
            setMessage("That square is already used");
        }
    }

    /* jshint unused: true */
    function setMessage(msg) {
        document.getElementById('message').innerText = msg;
    }

    function switchTurn() {
        if (checkForWinner(document.turn)) {
            document.winner = document.turn;
            setMessage(document.turn + " has won");
            return;
        }
        if (document.turn === "X") {
            document.turn = "O";
        }
        else {
            document.turn = "X";
        }
        setMessage("It's "+document.turn + " turn to move");
    }

    function checkForWinner(move) {
        if (checkRow(1, 2, 3, move) || checkRow(4, 5, 6, move) || checkRow(7, 8, 9, move) ||
            checkRow(1, 4, 7, move) || checkRow(2, 5, 8, move) || checkRow(3, 6, 9, move) ||
            checkRow(1, 5, 9, move) || checkRow(3, 5, 7, move)) {
            return true;
        }
        return false;
    }

    function checkRow(a, b, c, move) {
        if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
            return true;
        }
        return false;
    }

    function getBox(number) {
        return document.getElementById("s" + number).innerText;
    }

    function clearBox(number) {
        document.getElementById("s" + number).innerText = "";
    }

//})();

