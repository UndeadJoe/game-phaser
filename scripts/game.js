(function() {
    'use strict';

    function Game() {
        this.car = null;
        this.road = null;

        this.path = [];
        this.pi = 0;

        this.cursors = null;

        this.mode = 2;
        this.points = [];
    }

    Game.prototype = {
        init: function () {
            this.stage.backgroundColor = '#204090';
            this.game.world.setBounds(0, 0, 1000, 1000);
        },

        preload: function () {
            this.load.image('car', 'assets/simple_car.svg');
        },

        create: function () {
            this.road = this.add.bitmapData(this.world.width, this.world.height);
            this.road.addToWorld();

            this.car = this.game.add.sprite(0, 0, 'car');
            this.car.scale.set(0.5);
            this.car.anchor.set(0.5,0.5);

            this.client = new Client(this);
            this.client.create();

            this.plot();
        },

        plot: function () {
            var x = 1 / (this.game.width/2);
            var px, py;
            var ix = 0;
            var xArr = [],
                yArr = [];

            this.path = [];
            this.road.clear();

            for (var i = 0; i < this.points.length; i++)
            {
                xArr.push(this.points[i].x);
                yArr.push(this.points[i].y);
            }

            for (var i = 0; i <= 1; i += x)
            {
                if (this.mode === 0)
                {
                    px = this.math.linearInterpolation(xArr, i);
                    py = this.math.linearInterpolation(yArr, i);
                }
                else if (this.mode === 1)
                {
                    px = this.math.bezierInterpolation(xArr, i);
                    py = this.math.bezierInterpolation(yArr, i);
                }
                else if (this.mode === 2)
                {
                    px = this.math.catmullRomInterpolation(xArr, i);
                    py = this.math.catmullRomInterpolation(yArr, i);
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
            for (var p = 0; p < xArr.length; p++)
            {
                this.road.rect(xArr[p]-3, yArr[p]-3, 6, 6, 'rgba(255, 0, 0, 1)'); // опорные точки
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
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
        }
    };

    window['phaser'] = window['phaser'] || {};
    window['phaser'].Game = Game;

}());