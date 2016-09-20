var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game-screen');

var PhaserGame = function () {
    this.car = null;
    this.road = null;

    this.path = [];
    this.pi = 0;

    this.cursors = null;

    this.mode = 2;
    this.points = {
        'x': [ 0, 228, 456, 684, 752, 1000 ],
        'y': [ 240, 240, 240, 240, 240, 240 ]
    };
};

PhaserGame.prototype = {
    init: function () {
        this.stage.backgroundColor = '#204090';
        game.world.setBounds(0, 0, 1000, 1000);
    },

    preload: function () {
        this.load.image('car', 'assets/simple_car.svg');
    },

    create: function () {
        this.road = this.add.bitmapData(this.world.width, this.world.height);
        this.road.addToWorld();
        var py = this.points.y;
        for (var i = 0; i < py.length; i++)
        {
            py[i] = this.rnd.between(32, 900);
        }

        this.car = game.add.sprite(0, 0, 'car');
        this.car.scale.set(0.5);
        this.car.anchor.set(0.5,0.5);

        this.plot();

        this.client = new Client(this);
        this.client.create();
    },

    plot: function () {
        var x = 1 / (game.width/2);
        var px, py;
        var ix = 0;

        this.path = [];
        this.road.clear();

        for (var i = 0; i <= 1; i += x)
        {
            if (this.mode === 0)
            {
                px = this.math.linearInterpolation(this.points.x, i);
                py = this.math.linearInterpolation(this.points.y, i);
            }
            else if (this.mode === 1)
            {
                px = this.math.bezierInterpolation(this.points.x, i);
                py = this.math.bezierInterpolation(this.points.y, i);
            }
            else if (this.mode === 2)
            {
                px = this.math.catmullRomInterpolation(this.points.x, i);
                py = this.math.catmullRomInterpolation(this.points.y, i);
            }
            var node = { x: px, y: py, angle: 0 };

            if (ix > 0)
            {
                node.angle = this.math.angleBetweenPoints(this.path[ix - 1], node);
            }

            this.path.push(node);
            ix++;

            this.road.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)'); // Путь
        }
        for (var p = 0; p < this.points.x.length; p++)
        {
            this.road.rect(this.points.x[p]-3, this.points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)'); // опорные точки
        }
    },

    update: function () {
        this.car.x          = this.path[this.pi].x;
        this.car.y          = this.path[this.pi].y;
        this.car.rotation   = this.path[this.pi].angle;

        this.pi++;
        if (this.pi >= this.path.length)
        {
            this.pi = 0;
        }

        if (this.game.input.activePointer.isDown) {
            if (this.game.origDragPoint) {		// move the camera by the amount the mouse has moved since last update
                this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
                this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
            }	// set new drag origin to current position
            this.game.origDragPoint = this.game.input.activePointer.position.clone();
        }
        else {
            this.game.origDragPoint = null;
        }
    },

    render: function () {
        game.debug.cameraInfo(game.camera, 32, 32);
    }
};

game.state.add('Game', PhaserGame, true);