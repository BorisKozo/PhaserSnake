var PhaserSnake;
(function (PhaserSnake) {
    (function (Direction) {
        Direction._map = [];
        Direction._map[0] = "Left";
        Direction.Left = 0;
        Direction._map[1] = "Right";
        Direction.Right = 1;
        Direction._map[2] = "Up";
        Direction.Up = 2;
        Direction._map[3] = "Down";
        Direction.Down = 3;
    })(PhaserSnake.Direction || (PhaserSnake.Direction = {}));
    var Direction = PhaserSnake.Direction;
    var GameOptions = (function () {
        function GameOptions() { }
        return GameOptions;
    })();
    PhaserSnake.GameOptions = GameOptions;    
    var Level = (function () {
        function Level(game, options) {
            this._game = game;
            this._snake = new PhaserSnake.Snake(game, options, this);
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;
        }
        Level.prototype.update = function () {
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this._snake.Direction !== Direction.Left) {
                this._snake.Direction = Direction.Right;
            }
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this._snake.Direction !== Direction.Right) {
                this._snake.Direction = Direction.Left;
            }
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.UP) && this._snake.Direction !== Direction.Down) {
                this._snake.Direction = Direction.Up;
            }
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this._snake.Direction !== Direction.Up) {
                this._snake.Direction = Direction.Down;
            }
            this._snake.update();
        };
        return Level;
    })();
    PhaserSnake.Level = Level;    
})(PhaserSnake || (PhaserSnake = {}));
var PhaserSnake;
(function (PhaserSnake) {
    var Snake = (function () {
        function Snake(game, options, level) {
            this._game = game;
            this._snake = game.createGroup();
            var snakeHead = game.createSprite(0, 0, "snake_part");
            this._snake.add(snakeHead);
            this._speed = options.speed;
            this._speedCount = 0;
            this._x = options.positionX;
            this._y = options.positionY;
            this._direction = options.direction;
            this._level = level;
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;
        }
        Object.defineProperty(Snake.prototype, "Direction", {
            get: function () {
                return this._direction;
            },
            set: function (value) {
                this._direction = value;
            },
            enumerable: true,
            configurable: true
        });
        Snake.prototype.update = function () {
            this._speedCount += this._game.time.delta;
            if(this._speedCount > this._speed) {
                this._speedCount -= this._speed;
                this.move();
            }
        };
        Snake.prototype.move = function () {
            if(this._direction === PhaserSnake.Direction.Right) {
                this._x += 1;
                if(this._x === this._boardWidth) {
                    this._x = 0;
                }
            }
            if(this._direction === PhaserSnake.Direction.Left) {
                this._x -= 1;
                if(this._x < 0) {
                    this._x = this._boardWidth - 1;
                }
            }
            if(this._direction === PhaserSnake.Direction.Down) {
                this._y += 1;
                if(this._y === this._boardHeight) {
                    this._y = 0;
                }
            }
            if(this._direction === PhaserSnake.Direction.Up) {
                this._y -= 1;
                if(this._y < 0) {
                    this._y = this._boardHeight - 1;
                }
            }
            this._snake.remove(this._snake.members[this._snake.length - 1]).kill();
            this._snake.add(this._game.createSprite(this._x * 20, this._y * 20, "snake_part"));
        };
        return Snake;
    })();
    PhaserSnake.Snake = Snake;    
})(PhaserSnake || (PhaserSnake = {}));
var PhaserSnake;
(function (PhaserSnake) {
    var myGame = new Phaser.Game(window, 'game', 800, 480, init, create, update, render);
    var map;
    var level;
    function init() {
        myGame.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        myGame.loader.addImageFile("back_tile", "assets/images/back_tile.png");
        myGame.loader.addImageFile("snake_part", "assets/sprites/snake_part.png");
        myGame.loader.addTextFile("level_map", "assets/maps/background.csv");
        myGame.loader.load();
    }
    function create() {
        map = myGame.createTilemap("back_tile", "level_map", Phaser.Tilemap.FORMAT_CSV, true, 20, 20);
        var options = new PhaserSnake.GameOptions();
        options.direction = PhaserSnake.Direction.Right;
        options.positionX = 10;
        options.positionY = 10;
        options.speed = 500;
        options.boardWidth = map.width;
        options.boardHeight = map.height;
        level = new PhaserSnake.Level(myGame, options);
    }
    function update() {
        level.update();
    }
    function render() {
    }
})(PhaserSnake || (PhaserSnake = {}));
