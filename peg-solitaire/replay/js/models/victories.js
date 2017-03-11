
'use strict';

var APP = APP || {};

APP.model = APP.model || {};

APP.model.victories = {
    currentVictory: 0,
    currentMove: -1,
    victory: [],

    isNextMove: function() {
        return this.currentMove >= this.victory.length - 1 ? false : true;
    },
    getNextVictory: function() {
        this.currentVictory++;
        this.currentMove = -1;
        if (this.currentVictory === 1) {
            this.victory = this.getOne();
        }
        else {
            this.victory = this.getTwo();
        }
    },

    getNextMove: function() {
        this.currentMove++;
        return this.victory[this.currentMove];
    },

    getOne: function() {
        return [{"status":"OK","from":{"row":1,"column":3},"via":{"row":2,"column":3},"to":{"row":3,"column":3},"type":3},{"status":"OK","from":{"row":2,"column":1},"via":{"row":2,"column":2},"to":{"row":2,"column":3},"type":2},{"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},{"status":"OK","from":{"row":0,"column":4},"via":{"row":0,"column":3},"to":{"row":0,"column":2},"type":4},{"status":"OK","from":{"row":2,"column":3},"via":{"row":2,"column":2},"to":{"row":2,"column":1},"type":4},{"status":"OK","from":{"row":2,"column":0},"via":{"row":2,"column":1},"to":{"row":2,"column":2},"type":2},{"status":"OK","from":{"row":2,"column":4},"via":{"row":1,"column":4},"to":{"row":0,"column":4},"type":1},{"status":"OK","from":{"row":2,"column":6},"via":{"row":2,"column":5},"to":{"row":2,"column":4},"type":4},{"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},{"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},{"status":"OK","from":{"row":3,"column":0},"via":{"row":3,"column":1},"to":{"row":3,"column":2},"type":2},{"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},{"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},{"status":"OK","from":{"row":0,"column":4},"via":{"row":1,"column":4},"to":{"row":2,"column":4},"type":3},{"status":"OK","from":{"row":3,"column":6},"via":{"row":3,"column":5},"to":{"row":3,"column":4},"type":4},{"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},{"status":"OK","from":{"row":5,"column":4},"via":{"row":4,"column":4},"to":{"row":3,"column":4},"type":1},{"status":"OK","from":{"row":4,"column":6},"via":{"row":4,"column":5},"to":{"row":4,"column":4},"type":4},{"status":"OK","from":{"row":4,"column":4},"via":{"row":3,"column":4},"to":{"row":2,"column":4},"type":1},{"status":"OK","from":{"row":1,"column":4},"via":{"row":2,"column":4},"to":{"row":3,"column":4},"type":3},{"status":"OK","from":{"row":3,"column":4},"via":{"row":3,"column":3},"to":{"row":3,"column":2},"type":4},{"status":"OK","from":{"row":4,"column":2},"via":{"row":3,"column":2},"to":{"row":2,"column":2},"type":1},{"status":"OK","from":{"row":1,"column":2},"via":{"row":2,"column":2},"to":{"row":3,"column":2},"type":3},{"status":"OK","from":{"row":4,"column":0},"via":{"row":4,"column":1},"to":{"row":4,"column":2},"type":2},{"status":"OK","from":{"row":4,"column":3},"via":{"row":4,"column":2},"to":{"row":4,"column":1},"type":4},{"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},{"status":"OK","from":{"row":3,"column":2},"via":{"row":4,"column":2},"to":{"row":5,"column":2},"type":3},{"status":"OK","from":{"row":6,"column":4},"via":{"row":6,"column":3},"to":{"row":6,"column":2},"type":4},{"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},{"status":"OK","from":{"row":4,"column":1},"via":{"row":4,"column":2},"to":{"row":4,"column":3},"type":2},{"status":"OK","from":{"row":5,"column":3},"via":{"row":4,"column":3},"to":{"row":3,"column":3},"type":1}];
    },
    getTwo: function() {
        return [{"status":"OK","from":{"row":1,"column":3},"via":{"row":2,"column":3},"to":{"row":3,"column":3},"type":3},{"status":"OK","from":{"row":2,"column":1},"via":{"row":2,"column":2},"to":{"row":2,"column":3},"type":2},{"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},{"status":"OK","from":{"row":0,"column":4},"via":{"row":0,"column":3},"to":{"row":0,"column":2},"type":4},{"status":"OK","from":{"row":2,"column":3},"via":{"row":2,"column":2},"to":{"row":2,"column":1},"type":4},{"status":"OK","from":{"row":2,"column":0},"via":{"row":2,"column":1},"to":{"row":2,"column":2},"type":2},{"status":"OK","from":{"row":2,"column":4},"via":{"row":1,"column":4},"to":{"row":0,"column":4},"type":1},{"status":"OK","from":{"row":2,"column":6},"via":{"row":2,"column":5},"to":{"row":2,"column":4},"type":4},{"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},{"status":"OK","from":{"row":0,"column":2},"via":{"row":1,"column":2},"to":{"row":2,"column":2},"type":3},{"status":"OK","from":{"row":3,"column":0},"via":{"row":3,"column":1},"to":{"row":3,"column":2},"type":2},{"status":"OK","from":{"row":3,"column":2},"via":{"row":2,"column":2},"to":{"row":1,"column":2},"type":1},{"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},{"status":"OK","from":{"row":0,"column":4},"via":{"row":1,"column":4},"to":{"row":2,"column":4},"type":3},{"status":"OK","from":{"row":3,"column":6},"via":{"row":3,"column":5},"to":{"row":3,"column":4},"type":4},{"status":"OK","from":{"row":3,"column":4},"via":{"row":2,"column":4},"to":{"row":1,"column":4},"type":1},{"status":"OK","from":{"row":5,"column":4},"via":{"row":4,"column":4},"to":{"row":3,"column":4},"type":1},{"status":"OK","from":{"row":4,"column":6},"via":{"row":4,"column":5},"to":{"row":4,"column":4},"type":4},{"status":"OK","from":{"row":4,"column":4},"via":{"row":3,"column":4},"to":{"row":2,"column":4},"type":1},{"status":"OK","from":{"row":1,"column":4},"via":{"row":2,"column":4},"to":{"row":3,"column":4},"type":3},{"status":"OK","from":{"row":3,"column":4},"via":{"row":3,"column":3},"to":{"row":3,"column":2},"type":4},{"status":"OK","from":{"row":4,"column":2},"via":{"row":3,"column":2},"to":{"row":2,"column":2},"type":1},{"status":"OK","from":{"row":1,"column":2},"via":{"row":2,"column":2},"to":{"row":3,"column":2},"type":3},{"status":"OK","from":{"row":4,"column":0},"via":{"row":4,"column":1},"to":{"row":4,"column":2},"type":2},{"status":"OK","from":{"row":4,"column":3},"via":{"row":4,"column":2},"to":{"row":4,"column":1},"type":4},{"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},{"status":"OK","from":{"row":6,"column":4},"via":{"row":6,"column":3},"to":{"row":6,"column":2},"type":4},{"status":"OK","from":{"row":3,"column":2},"via":{"row":4,"column":2},"to":{"row":5,"column":2},"type":3},{"status":"OK","from":{"row":6,"column":2},"via":{"row":5,"column":2},"to":{"row":4,"column":2},"type":1},{"status":"OK","from":{"row":4,"column":1},"via":{"row":4,"column":2},"to":{"row":4,"column":3},"type":2},{"status":"OK","from":{"row":5,"column":3},"via":{"row":4,"column":3},"to":{"row":3,"column":3},"type":1}];
    }
};
