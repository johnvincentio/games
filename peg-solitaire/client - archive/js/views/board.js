
'use strict';

/*jshint multistr: true */

var APP = APP || {};
APP.views = APP.views || {};

APP.views.collection = {

    getTemplate: function() {
        return '<div data-item-row={{1}} data-item-column={{2}} class="{{3}}"><div {{4}}></div></div>';
    },

    getTemplateOutside: function() {
        return '<div data-item-row={{1}} data-item-column={{2}} class="outside"><div></div></div>';
    },

    buildItem: function(idx, idy, item) {
        if (! item.legal) {
            return this.getTemplateOutside().replace('{{1}}', idx).replace('{{2}}', idy);
        }

        var template = this.getTemplate();

        var tile = (item.occupied ? "occupied " : "empty ") +
            (item.draggable ? "draggable" : "") +
            (item.droppable ? "droppable" : "");

        var dnd = (item.draggable ? 'draggable="true"' : '') +
            (item.droppable ? 'ondragover="event.preventDefault()"' : '');

        return template
            .replace('{{1}}', idx)
            .replace('{{2}}', idy)
            .replace('{{3}}', tile)
            .replace('{{4}}', dnd);
    },

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

    renderBoard: function(data, element) {
        console.log(">>> APP.views.collection.renderBoard");
        var html = '';
        var that = this;
        if (data && data.length > 0) {
            data.forEach(function(row, idx) {
                html += that.buildRow(row, idx);
            });
        }
        element.html(html);
        console.log("<<< APP.views.collection.renderBoard");
    }
};
