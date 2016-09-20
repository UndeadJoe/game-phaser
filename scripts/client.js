'use strict';

function Client(game) {
    this.game = game;
    this.socket = null;
    this.isActive = false;
};