
/* ----------------------------------- */
/* Globals */
/* ----------------------------------- */

var APP = APP || {};
APP.model = APP.model || {};
APP.views = APP.views || {};

$(function() {
    'use strict';

    var $main = $('main');
    var $board = $('.js--board');
    var $restart = $('.js--restart');
    var $play_game = $('.js--play-game');

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $main.on('init', function() {
        APP.model.collection.init();
        APP.model.victories.init();
        $restart.removeAttr('disabled');
        $play_game.removeAttr('disabled');
        $main.trigger('render');
    });

    $main.on('render', function() {
        APP.model.collection.setStatus();
        APP.views.board.renderBoard(APP.model.collection.rows, $board);
    });

    $main.on('play', function() {
        APP.model.victories.getNextVictory();
        APP.model.collection.init();
        APP.views.replay.renderBoard(APP.model.collection.rows, $board);

        $restart.attr('disabled', 'disabled');
        $play_game.attr('disabled', 'disabled');
        handleNextMove();
    });

/* ----------------------------------- */
/* Moves                               */
/* ----------------------------------- */

    function handleNextMove() {
        var move = APP.model.victories.getNextMove();
        var from = $('.js--board div[data-item-row="'+move.from.row+'"][data-item-column="'+move.from.column+'"]');
        var via = $('.js--board div[data-item-row="'+move.via.row+'"][data-item-column="'+move.via.column+'"]');
        var to = $('.js--board div[data-item-row="'+move.to.row+'"][data-item-column="'+move.to.column+'"]');

        var delay = 1000;
        setTimeout(function() {from.addClass('highlighted');}, delay);
        setTimeout(function() {via.addClass('highlighted');}, delay + 100);
        setTimeout(function() {to.addClass('highlighted');}, delay + 200);

        delay = 1200;
        setTimeout(function() {via.toggleClass('replay-occupied replay-empty');}, delay + 500);

        setTimeout(function() {to.toggleClass('replay-occupied replay-empty');}, delay + 750);

        setTimeout(function() {from.toggleClass('replay-occupied replay-empty');}, delay + 900);

        delay = 2050;
        setTimeout(function() {
            from.removeClass('highlighted');
            via.removeClass('highlighted');
            to.removeClass('highlighted');
            if (! APP.model.victories.isNextMove()) {
                $restart.removeAttr('disabled');
                $play_game.removeAttr('disabled');
            }
            else {
                handleNextMove();
            }
        }, delay);

//        setTimeout(function() {
//            from.addClass('highlighted');
//            via.addClass('highlighted');
//            to.addClass('highlighted');
////            console.log("stage 2; "+Date.now());
//
//            setTimeout(function() {
//                via.toggleClass('replay-occupied replay-empty');
////                console.log("stage 3; "+Date.now());
//
//                setTimeout(function() {
//                    to.toggleClass('replay-occupied replay-empty');
////                    console.log("stage 4; "+Date.now());
//
//                    setTimeout(function() {
//                        from.toggleClass('replay-occupied replay-empty');
////                        console.log("stage 4; "+Date.now());
//
//                        setTimeout(function() {
//                            from.removeClass('highlighted');
//                            via.removeClass('highlighted');
//                            to.removeClass('highlighted');
//                            if (! APP.model.victories.isNextMove()) {
//                                $restart.removeAttr('disabled');
//                                $play_game.removeAttr('disabled');
//                            }
//                            else {
//                                handleNextMove();
//                            }
//                        }, 150);
//                    }, 150);
//                }, 250);
//            }, 500);
//        }, 1000);
    }

/* ----------------------------------- */
/* Board moves                         */
/* ----------------------------------- */

//    $board.on('drag', function() {
//        console.log("drag: $board");
//    });
//    $board.on('dragenter', function() {
//        console.log("dragenter: $board");
//    });
//    $board.on('dragexit', function() {
//        console.log("dragexit: $board");
//    });
//    $board.on('dragleave', function() {
//        console.log("dragleave: $board");
//    });

    function makeJson(element) {
        var row = parseInt(element.attr('data-item-row'));
        var column = parseInt(element.attr('data-item-column'));
        return {row: row, column: column};
    }

/*
* Begin the drag operation on a tile for which dragging is allowed
*/
    $board.on('dragstart', '.draggable', function(event) {
//        console.log(">>> dragstart: $board");
        var tile = makeJson($(this));
//        console.log("row "+tile.row+" column "+tile.column);
        if (APP.model.collection.isDraggable(tile)) {
//            console.log("isDraggable");
            event.originalEvent.dataTransfer.effectAllowed = "copy";
            event.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(tile));
        }
//        console.log("<<< dragstart: $board");
    });

/*
* When dragging over an element, verify whether that element supports dropping
*/
    $board.on('dragover', '.empty, .occupied', function(event) {
//        console.log(">>> dragover: $board");
        event.originalEvent.dataTransfer.dropEffect = "none";
        var tile = makeJson($(this));
//        console.log("row "+tile.row+" column "+tile.column);
        if (APP.model.collection.isDroppable(tile)) {
            event.preventDefault();
            event.originalEvent.dataTransfer.dropEffect = "copy";
        }
//        console.log("<<< dragover: $board");
    });

/*
* Dragging has ended - should always be cancelled
*/
    $board.on('dragend', '.droppable', function(event) {
//        console.log(">>> dragend: $board");
//        var tile = makeJson($(this));
//        console.log("row "+tile.row+" column "+tile.column);
//        console.log("dataTransfer.dropEffect "+event.originalEvent.dataTransfer.dropEffect);
/* jshint -W030 */
        event.originalEvent.dataTransfer.dropEffect === 'none';
//        console.log("is cancelled "+cancelled);
//        console.log("<<< dragend: $board");
    });

/*
* Drop has happened.
*
* 1. Get drop tile.
* 2. Get drag from tile.
* 3. Make the changes to the data model.
* 4. Render the board view.
*/
    $board.on('drop', '.droppable', function(event) {
//        console.log(">>> drop: $board");
        var tile = makeJson($(this));       // 1.
//        console.log("row "+tile.row+" column "+tile.column);
        var data = JSON.parse(event.originalEvent.dataTransfer.getData("text"));    // 2
//        console.log("data "+data);
        if (APP.model.collection.moved(data.row, data.column, tile.row, tile.column)) {     // 3
//            console.log("APP.model.collection.moved");
            $main.trigger('render');        // 4
        }
//        console.log("<<< drop: $board");
    });

/* ----------------------------------- */
/* Buttons                             */
/* ----------------------------------- */

    $restart.on('click', function() {
//        console.log("$restart");
        $main.trigger('init');
    });

    $play_game.on('click', function() {
//        console.log("$play_game");
        $main.trigger('play');
    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */

    $main.trigger('init');

});
