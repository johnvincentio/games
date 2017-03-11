
var APP = APP || {};

$(function() {
    'use strict';

    var $main = $('main');
    var $board = $('.js--board');
    var $next_game = $('.js--next-game');
    var $next_move = $('.js--next-move');
    var $play_game = $('.js--play-game');

/* ----------------------------------- */
/* Custom events */
/* ----------------------------------- */

    $main.on('init', function() {
        APP.model.victories.getNextVictory();
        APP.model.board.init();
        $next_game.removeAttr('disabled');
        $next_move.removeAttr('disabled');
        $play_game.removeAttr('disabled');
        APP.views.collection.renderBoard(APP.model.board.rows, $board);
    });

/* ----------------------------------- */
/* Moves                               */
/* ----------------------------------- */

    function handleNextMove(continuous) {
        var move = APP.model.victories.getNextMove();
        var from = $('.js--board div[data-item-row="'+move.from.row+'"][data-item-column="'+move.from.column+'"]');
        var via = $('.js--board div[data-item-row="'+move.via.row+'"][data-item-column="'+move.via.column+'"]');
        var to = $('.js--board div[data-item-row="'+move.to.row+'"][data-item-column="'+move.to.column+'"]');

        $next_game.attr('disabled', 'disabled');
        $next_move.attr('disabled', 'disabled');
        $play_game.attr('disabled', 'disabled');

        from.addClass('highlighted');
        via.addClass('highlighted');
        to.addClass('highlighted');

        setTimeout(function() {
            via.toggleClass('occupied empty', 500, 'easeInCirc', function() {
                to.toggleClass('empty occupied', 250, 'easeInCirc', function() {
                    from.toggleClass('occupied empty', 100, 'easeInCirc', function() {
                        from.removeClass('highlighted');
                        via.removeClass('highlighted');
                        to.removeClass('highlighted');

                        if (! APP.model.victories.isNextMove()) {
                            $next_game.removeAttr('disabled');
                        }
                        else {
                            if (continuous) {
                                handleNextMove(true);
                            }
                            else {
                                $next_game.removeAttr('disabled');
                                $next_move.removeAttr('disabled');
                                $play_game.removeAttr('disabled');
                            }
                        }

                    });
                });
            });
        }, 750);
    }

/* ----------------------------------- */
/* Buttons                             */
/* ----------------------------------- */

    $next_game.on('click', function() {
        $main.trigger('init');
    });

    $next_move.on('click', function() {
        handleNextMove(false);
    });

    $play_game.on('click', function() {
        handleNextMove(true);
    });

/* ----------------------------------- */
/* Entry point                         */
/* ----------------------------------- */

    $main.trigger('init');

});
