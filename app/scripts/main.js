window.onload = function () {
    'use strict';

    var game;
    var ns = window['phaser'];
    var config = {
        renderer: Phaser.CANVAS,
        width: 800,
        height: 700,
        parent: 'game-screen' };

    game = new Phaser.Game(config);
    //game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Game.preload);
    //game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game, true);

    //game.state.start('boot');
};