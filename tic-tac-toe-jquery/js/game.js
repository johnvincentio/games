
$(function() {
    'use strict';

    var $main = $('main');
    var $start = $('.js--start-game');
    var $tile = $('#board div div');
    var $message = $('.js--message');

    var board = new Array(9);
    var currentPlayer;
    var gameOver = false;

/* ----------------------------------- */
/* Update the GUI                      */
/* ----------------------------------- */

    function setBoard() {           // draw the board
        for (var i = 0; i < 9; i++) {
            if (board[i] === 0) {
                $('#' + i).text('');
            }
            else if (board[i] === 1) {
                $('#' + i).text('X');
            }
            else if (board[i] === 2) {
                $('#' + i).text('O');
            }
        }
    }
    function setMessage() {
        $message.text('Player '+((currentPlayer === 1) ? 'X' : 'O') + ' to play');
    }

/* ----------------------------------- */
/* Look for game result                */
/* ----------------------------------- */

    function anyMoreMoves() {       // looking for a draw
        for (var i = 0; i < 9; i++) {
            if (board[i] === 0) {
                return true;
            }
        }
        return false;
    }

    function checkForWinner(player) {   // looking for a winner
        function checkRow(a, b, c, player) {
            if (board[a] == player && board[b] == player && board[c] == player) {
                return true;
            }
            return false;
        }
        if (checkRow(0, 1, 2, player)) {return 1;}  // return the winning pattern
        if (checkRow(3, 4, 5, player)) {return 2;}
        if (checkRow(6, 7, 8, player)) {return 3;}
        if (checkRow(0, 3, 6, player)) {return 4;}
        if (checkRow(1, 4, 7, player)) {return 5;}
        if (checkRow(2, 5, 8, player)) {return 6;}
        if (checkRow(0, 4, 8, player)) {return 7;}
        if (checkRow(2, 4, 6, player)) {return 8;}
        return 0;
    }

/* ----------------------------------- */
/* Create and Draw the victory line    */
/* ----------------------------------- */

    function handleLine(type, element) {
        var width = $('#1').position().left;    // use position left of second tile as the width

        function createCoords(type, width) {    // caclulate the coords of the winning line
            var offset1 = width / 5;
            var offset2 = (width * 14) / 5;
            if (type === 1 || type === 2 || type === 3) {
                var ycoord = (width * ((type * 2) - 1)) / 2;
                return {from: {x: offset1, y: ycoord - 3},
                        to: {x: offset2, y: ycoord - 3}};
            }
            else if (type === 4 || type === 5 || type === 6) {
                var coord = (width * (((type - 3) * 2) - 1)) / 2;
                return {from: {x: coord + 1, y: offset1},
                        to: {x: coord + 1, y: offset2}};
            }
            else if (type === 7) {
                return {from: {x: offset1, y: offset1},
                        to: {x: offset2, y: offset2}};
            }
            else if (type === 8) {
                return {from: {x: offset2, y: offset1},
                        to: {x: offset1, y: offset2}};
            }
            return null;
        }

        createLine (createCoords(type, width), element);
    }

    function createLine (coords, element) {     // draw the winning line
//        console.log('>>> createLine');
        var x1 = coords.from.x;
        var x2 = coords.to.x;
        var y1 = coords.from.y;
        var y2 = coords.to.y;
//        console.log('coords '+x1+','+y1+','+x2+','+y2);
        var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        var transform = 'rotate('+angle+'deg)';
//        console.log('length '+length+' angle '+angle);

        var line = $('<div>')
        .addClass('js--line')
        .css({
            'transform-origin': '0 0',
            'height': '3px',
            'width': length,
            'background': 'red',
            'position': 'absolute',
            'left': x1,
            'top': y1,
            'transform': transform
        });
        element.append(line);
    }

/* ----------------------------------- */
/* Test Button Events */
/* ----------------------------------- */

    $main.on('test-draw-lines', function() {
        console.log('test-draw-lines');
        for (var i = 0; i < 9; i++) {
            $('#' + i).text('H');
        }

        handleLine(1, $('#board'));
        handleLine(2, $('#board'));
        handleLine(3, $('#board'));

        handleLine(4, $('#board'));
        handleLine(5, $('#board'));
        handleLine(6, $('#board'));

        handleLine(7, $('#board'));
        handleLine(8, $('#board'));
    });

/* ----------------------------------- */
/* Events */
/* ----------------------------------- */

    $start.on('click', function() {     // user selected Start Game
        $main.trigger('start');
    });

    $tile.on('click', function() {      // user clicked on a board tile.
        if (gameOver) {     // if game already over ignore the click.
            return;
        }
        var id = $(this).attr('id');    // get id of board clicked on
        if (board[id] === 0) {          // verify the tile is unoccupied
            board[id] = currentPlayer;      // occupy this tile with the currentplayer
            setBoard();                     // update the Board Gui
            var type = checkForWinner(currentPlayer);   // look for a victory
            if (type !== 0) {                           // victory found
                $message.text('Player '+((currentPlayer === 1) ? 'X' : 'O') + ' has won');
                gameOver = true;
                handleLine(type, $('#board'));   // draw the victory line
            }
            else if (! anyMoreMoves()) {            // look for a draw
                $message.text('The game is a draw');
                gameOver = true;
            }
            else {      // keep playing
                currentPlayer = currentPlayer === 1 ? 2 : 1;    // swap the current player
                setMessage();
            }
        }
    });

    $tile.on('mouseenter', function() {      // mimic :hover
        var id = $(this).attr('id');
        if (! gameOver && board[id] === 0) {
            $(this).addClass('tile-hover');
        }
    });

    $tile.on('mouseleave', function() {     // remove hover
        $(this).removeClass('tile-hover');
    });

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $main.on('start', function() {
        $('.js--line').remove();        // remove all victory lines
        for (var i = 0; i < 9; i++) {   // initialize the board
            board[i] = 0;
        }
        setBoard();                     // draw the board
        currentPlayer = Math.random() < 0.5 ? 1 : 2;    // set current player
        setMessage();
        gameOver = false;
    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */

    $main.trigger('start');

//    $main.trigger('test-draw-lines');       // used to test drawing victory lines

//    jv();
//
//    function jv() {
//        var tiles = [];
//        for (var i = 0; i < 9; i++) {
//            tiles.push($('#'+i));
//        }
//    }

});
