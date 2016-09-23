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

        //this.socket = io.connect('http://localhost:3000');
        this.socket = io.connect('https://game-backend-undeadjoe.c9users.io:8080');
        var socket = this.socket;
        var socketID = null;
        var path = null;
        var game = this.game;

        this.socket.on('playerConnected', function(data){
            socketID = data.id;
            path = data.path;

            game.points = path;
            game.plot();
        });

        this.socket.on('updateMap', function(data){
            path = data.path;

            game.points = path;
            game.plot();
        });
    },
    
    update: function() {
        this.socket.emit('needMap');
    }
};