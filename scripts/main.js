window.onload = function () {
    'use strict';

    var game;
    var ns = window['phaser'];

    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-screen');
    //game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Game.preload);
    //game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game, true);

    //game.state.start('boot');
};