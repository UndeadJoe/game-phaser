'use strict';

function Client(game) {
    this.game = game;
    this.socket = null;
    this.isActive = false;
}

Client.prototype = {
    create: function() {
        var text = "Connecting to server...";
        var style = { font: "18px Arial", fill: "#ff0044", align: "center" };
        var t = this.game.game.add.text(430, 330, text, style);

        this.socket = io.connect('http://localhost:3000');
        var game = this.game;
        var socket = this.socket;
        var socketID = null;
        var path = null;

        this.socket.on('playerConnected', function(data){
            socketID = data.id;
            path = data.path;

            console.log(path);
        });

    }
};