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
        //this.socket = io.connect('https://game-backend-undeadjoe.c9users.io:8080');
        //var socket = this.socket;
        var socketID = null;
        var path = null;
        var game = this.game;

        game.points = [ { x: 0, y: 240 },
            { x: 228, y: 240 },
            { x: 456, y: 240 },
            { x: 684, y: 240 },
            { x: 752, y: 240 },
            { x: 1000, y: 240 } ];

        for (var i = 0; i < game.points.length; i++) {
            game.points[i].y = Math.floor(Math.random() * (800 - 32 + 1)) + 32;
        }

        game.plot();

        /*this.socket.on('playerConnected', function(data){
            socketID = data.id;
            path = data.path;

            game.points = path;
            game.plot();
        });

        this.socket.on('updateMap', function(data){
            path = data.path;

            game.points = path;
            game.plot();
        });*/
    },
    
    update: function() {
        // this.socket.emit('needMap');
    }
};