
'use strict';

var APP = APP || {};

APP.model = APP.model || {};

APP.model.board = {
    rows : [],

/*
* initial setup of the board model
*/
    init: function() {
        this.rows = [];
        for (var x = 0; x < 7; x++) {
            var row = [];
            for (var y = 0; y < 7; y++) {
                var legal = true;
                var occupied = true;
                if (! this.isLegal(x, y)) {
                    legal = false;
                    occupied = false;
                }
                if (x === 3 && y === 3) {
                    occupied = false;
                }
                row.push({legal: legal, occupied: occupied});
            }
            this.rows.push(row);
        }
    },

/*
* The board is treated as a square, so the function is used to determine which squares are
* within the board
*/
    isLegal: function(row, column) {
        if (row < 0 || row > 6) {
            return false;
        }
        if (column < 0 || column > 6) {
            return false;
        }
        if (row === 0 || row === 1 || row === 5 || row === 6) {
            if (column === 0 || column === 1 || column === 5 || column === 6) {
                return false;
            }
        }
        return true;
    }
};
