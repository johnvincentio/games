'use strict';

var current_solution = 0;
var solutions_found = 0;            // total number of solutions
var positions_tested = 0;

function createSolutions() {
    console.log(">>> createSolutions");

    var row, c;
    var column_free = new Array(8);
    var up_free = new Array(15);
    var down_free = new Array(15);
    var col = new Array(8);

    for (c = 0; c < 8; c++) {
        column_free[c] = true;
        col[c] = 0;
    }
    for (c = 0; c < 15; c++) {
        up_free[c] = down_free[c] = true;
    }

    for (row = 0;;) {
        while (col[row] < 8) {
            c = col[row];
            if (column_free[c] && up_free[row + c] && down_free[row - c + 7]) {
                positions_tested += 1;
                column_free[c] = false;
                up_free[row + c] = false;
                down_free[row - c + 7] = false;
                if (row == 7) {
                    solutions_found += 1;
                    addSolution (solutions_found, col);     // add solution to list
                    column_free[c] = true;
                    up_free[row + c] = true;
                    down_free[row - c + 7] = true;
                    break;
                }
                else {
                    row++;
                    col[row] = 0;
                    continue;
                }
            }
            col[row]++;
        }
        col[row] = 0;
        row--;

        c = col[row];
        column_free[c] = true;
        up_free[row + c] = true;
        down_free[row - c + 7] = true;

        col[row]++;

        if (row === 0 && col[0] === 8) {
            break;
        }
    }
    console.log("<<< createSolutions");
}

function addSolution(solution, column) {
    var moves = "";
    for (var i = 0; i < 8; i++) {
        if (i > 0) {
            moves += "-";
        }
        moves += "(" + (i + 1) + "," + (column[i] + 1) + ")";
    }
    addItem(solution, moves);
}

function addItem(solution, moves) {
    var parent = document.querySelector('#solutions');
    var element = parent.firstElementChild;

    var item = document.createElement("li");
    item.setAttribute("id", "S" + solution);
    var node = document.createTextNode(moves);
    item.appendChild(node);
    element.appendChild(item);
}

function showNextSolution() {
    if (current_solution >= solutions_found) {
        return;
    }
    current_solution++;
    setMessage("Showing solution "+current_solution+" of "+solutions_found+" solutions");
    showSolution(current_solution);
}

function showPreviousSolution() {
    if (current_solution <= 1) {
        return;
    }
    current_solution--;
    showSolution(current_solution);
}

function showSolution (solution) {
    clearBoard();
    setMessage("Showing solution "+current_solution+" of "+solutions_found+" solutions");

    var str1 = document.getElementById("S" + solution).innerText;
    var str2 = str1.split("-");
    for (var i = 0; i < str2.length; i++) {
        var str3 = str2[i];
        var str4 = str3.replace(/[()]/g,"");
        var str5 = str4.split(",");
        setBox(str5[0], str5[1], "Q");
    }
}


function clearBoard() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            setBox(i + 1, j + 1, "");
        }
    }
}

function setMessage(msg) {
    document.getElementById("message").innerText = msg;
}

function setBox(row, col, val) {
    document.getElementById(getBox(row, col)).innerText = val;
}

function getBox(row, col) {
    return row + "_" + col;
}

createSolutions();

showNextSolution();
