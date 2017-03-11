
$(function() {
    'use strict';

    var current_solution = 0;           // current solution being considered
    var solutions = [];

    function createSolutions() {
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
                    column_free[c] = false;
                    up_free[row + c] = false;
                    down_free[row - c + 7] = false;
                    if (row == 7) {
                        var jv1 = JSON.stringify(col);
                        var jv2 = JSON.parse(jv1);
                        solutions.push(jv2);     // add solution to list
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
    }

    function setBox(row, col, val) {
        var id = '#' + row + "_" + col;
        $(id).text(val);
    }
    function clearBoard() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                setBox(i + 1, j + 1, '');
            }
        }
    }
    function showNextSolution() {
        if (current_solution < solutions.length) {
            current_solution++;
            showSolution();
        }
    }
    function showPreviousSolution() {
        if (current_solution > 1) {
            current_solution--;
            showSolution(current_solution);
        }
    }
    function showSolution() {
        clearBoard();
        $message.text('Showing solution '+current_solution+' of '+solutions.length+' solutions');
        var column = solutions[current_solution - 1];
        for (var i = 0; i < 8; i++) {
            setBox(i + 1, column[i] + 1, 'Q');
        }
    }

    var $main = $('main');
    var $next = $('.js--next');
    var $previous = $('.js--previous');
    var $message = $('.js--message');

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $main.on('init', function() {
        createSolutions();
        showNextSolution();
    });

/* ----------------------------------- */
/* Events */
/* ----------------------------------- */

    $next.on('click', function() {
        showNextSolution();
    });
    $previous.on('click', function() {
        showPreviousSolution();
    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */
//
    $main.trigger('init');
});
