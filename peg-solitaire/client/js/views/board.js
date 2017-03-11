
/* jshint multistr: true */
/* global APP */

APP.views.board = (function() {
    'use strict';

return {

/*
* column template for a legal tile.
*/
    getTemplate: function() {
        return '<div data-item-row={{idx}} data-item-column={{idy}} class="{{tile}}">\
                    <div class="inner" {{dnd}}>{{arrows}}</div>\
                </div>';
    },

/*
* column template for a non-legal tile.
*/
    getTemplateOutside: function() {
        return '<div data-item-row={{idx}} data-item-column={{idy}} class="outside"><div></div></div>';
    },

/*
Construct each tile (row, column).

1. if tile is not legal, format and return non-legal tile.
2. handle tile classes:
2a. set occupied/empty.
2b. set draggable if tile can be dragged (and has a droppable target).
2c. set droppable it tile can be the target of a drag ie is droppable.
3. handle draggable and droppable element attributes.
4. handle arrows rendered on a peg that is draggable. Note that each arrow is rendered using
    it's own div element, the class indicating the direction of the arrow.

*/
    buildItem: function(idx, idy, item) {
        if (! item.legal) {
            return this.getTemplateOutside().replace('{{idx}}', idx).replace('{{idy}}', idy);   // 1
        }

        var tile = (item.occupied ? "occupied " : "empty ") +   // 2a
            (item.draggable ? "draggable" : "") +               // 2b
            (item.droppable ? "droppable" : "");                // 2c

        var dnd = (item.draggable ? 'draggable="true"' : '') +
            (item.droppable ? 'ondragover="event.preventDefault()"' : '');      // 3

        var tmp = '<div class="{{1}}"></div>';          // 4
        var arrows = '';
        if (item.draggable) {
            arrows += item.up_move ? tmp.replace('{{1}}', ' up_move') : '';
            arrows += item.down_move ? tmp.replace('{{1}}', ' down_move') : '';
            arrows += item.left_move ? tmp.replace('{{1}}', ' left_move') : '';
            arrows += item.right_move ? tmp.replace('{{1}}', ' right_move') : '';
        }

        return this.getTemplate()
            .replace('{{idx}}', idx)
            .replace('{{idy}}', idy)
            .replace('{{tile}}', tile)
            .replace('{{dnd}}', dnd)
            .replace('{{arrows}}', arrows);
    },

/*
* construct each row by concatinating each column and adding a clearfix at the end.
*/
    buildRow: function(row, idx) {
        var html = '';
        var that = this;
        if (row && row.length > 0) {
            row.forEach(function(col, idy) {
                html += that.buildItem(idx, idy, col);
                if (idy === 6) {
                    html += '<div class="clearfix"></div>';
                }
            });
        }
        return html;
    },

/*
* construct the board by concatinating each row.
*/
    renderBoard: function(data, element) {
        var html = '';
        var that = this;
        if (data && data.length > 0) {
            data.forEach(function(row, idx) {
                html += that.buildRow(row, idx);
            });
        }
        element.html(html);
    }
};

})();
