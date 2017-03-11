
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

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $main.on('init', function() {
        console.log(">>> $main.on('init')");
        APP.model.collection.init();
        $main.trigger('render');
        console.log("<<< $main.on('init')");
    });

    $main.on('render', function() {
        console.log(">>> $main.on('render')");
        APP.model.collection.setStatus();
        APP.views.collection.renderBoard(APP.model.collection.rows, $board);
        console.log("<<< $main.on('render')");
    });

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
        console.log(">>> dragstart: $board");
        var tile = makeJson($(this));
        console.log("row "+tile.row+" column "+tile.column);
        if (APP.model.collection.isDraggable(tile)) {
            console.log("isDraggable");
            event.originalEvent.dataTransfer.effectAllowed = "copy";
            event.originalEvent.dataTransfer.setData("text/plain", JSON.stringify(tile));
        }
        console.log("<<< dragstart: $board");
    });

/*
* When dragging over an element, verify whether that element supports dropping
*/
    $board.on('dragover', '.empty, .occupied', function(event) {
        console.log(">>> dragover: $board");
        event.originalEvent.dataTransfer.dropEffect = "none";
        var tile = makeJson($(this));
        console.log("row "+tile.row+" column "+tile.column);
        if (APP.model.collection.isDroppable(tile)) {
            event.preventDefault();
            event.originalEvent.dataTransfer.dropEffect = "copy";
        }
        console.log("<<< dragover: $board");
    });

/*
* Dragging has ended - should always be cancelled
*/
    $board.on('dragend', '.droppable', function(event) {
        console.log(">>> dragend: $board");
        var tile = makeJson($(this));
        console.log("row "+tile.row+" column "+tile.column);
        console.log("dataTransfer.dropEffect "+event.originalEvent.dataTransfer.dropEffect);
        var cancelled = event.originalEvent.dataTransfer.dropEffect === 'none';
        console.log("is cancelled "+cancelled);
        console.log("<<< dragend: $board");
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
        console.log(">>> drop: $board");
        var tile = makeJson($(this));       // 1.
        console.log("row "+tile.row+" column "+tile.column);
        var data = JSON.parse(event.originalEvent.dataTransfer.getData("text"));    // 2
        console.log("data "+data);
        if (APP.model.collection.moved(data.row, data.column, tile.row, tile.column)) {     // 3
            console.log("APP.model.collection.moved");
            $main.trigger('render');        // 4
        }
        console.log("<<< drop: $board");
    });

/* ----------------------------------- */
/* New Game Button                         */
/* ----------------------------------- */

    $restart.on('click', function() {
        console.log("$restart");
        $main.trigger('init');
    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */

    $main.trigger('init');

});
