'use strict';

$(document).ready(function(evt) {
    for (var i = 0; i < 8; i++) {
        var row = $("<tr class='chess-row'>");
        var rank = 8 - i;

        row.addClass("rank-" + rank).data("rank", rank);
        row.prepend("<th>" + rank + "</th>");

        for (var j = 0; j < 8; j++) {
            var square = $("<td>");
            square.data("file", j + 1);
            row.append(square);
        }
        $("tbody").append(row);
    }

    startingPosition();

    $(".draggable").draggable({
        snap: ".square",
        revert: true,
        revertDuration: 10,
        start: function() {},
        drag: function() {},
        stop: function(event, ui) {
            console.log(ui);

            var rank = Math.round((440 - (ui.offset.top - 20)) / 55);
            var file = Math.round(ui.offset.left / 55);

            console.log("stopped at: (" + rank + ", " + file + ")");
            var toSquare = getSquare(rank, file);

            if (isEmpty(toSquare) || canCapture($(this)[0], toSquare)) {
                var piece = $(this).detach();
                toSquare.empty();
                toSquare.append(piece);
            }

        }
    });
});


function canCapture(piece, toSquare) {
    console.log(piece);
    return true;
}

function isEmpty(rank, file) {
    return isEmpty(getSquare(rank, file));
}

function isEmpty(square) {
    return square.find("div.piece").length == 0;
}

function startingPosition() {
    var pieces = "rnbqkbnr";
    var pawns = "pppppppp";

    for (var i = 0; i < pieces.length; i++) {
        drawPiece(1, i + 1, 'w', pieces.charAt(i));
        drawPiece(2, i + 1, 'w', pawns.charAt(i));
        drawPiece(8, i + 1, 'b', pieces.charAt(i));
        drawPiece(7, i + 1, 'b', pawns.charAt(i));
    }
}

function drawPiece(rank, file, color, name) {
    var square = getSquare(rank, file);
    var piece = $("<div class='piece draggable " + (color + name) + "'>");
    square.empty().append(piece);
}

function getSquare(rank, file) {
    return $("tr.rank-" + rank).find("td:eq(" + (file - 1) + ")");
}

function clearBoard() {
    $("table#board span.piece").remove();
}
