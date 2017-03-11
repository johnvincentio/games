
/* jshint multistr: true */
/* global APP */

APP.views.replay = (function() {
    'use strict';

return {

    getTemplate: function() {
        return '<div data-item-row={{idx}} data-item-column={{idy}} class="{{tile}}">\
                    <div class="inner"></div>\
                </div>';
    },

//    getTemplate: function() {
//        return '<div data-item-row={{1}} data-item-column={{2}} class="{{3}}"><div></div></div>';
//    },

    getTemplateOutside: function() {
        return '<div data-item-row={{idx}} data-item-column={{idy}} class="outside"><div></div></div>';
    },

    buildItem: function(idx, idy, item) {
        if (! item.legal) {
            return this.getTemplateOutside().replace('{{idx}}', idx).replace('{{idy}}', idy);
        }

        var tile = (item.occupied ? "replay-occupied " : "replay-empty ");

        return this.getTemplate()
            .replace('{{idx}}', idx)
            .replace('{{idy}}', idy)
            .replace('{{tile}}', tile);
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
