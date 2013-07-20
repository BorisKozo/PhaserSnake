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
    var Snake = (function () {
        function Snake(game, options) {
            this._game = game;
            this._snake = game.createGroup();
            var snakeHead = game.createSprite(0, 0, "snake_part");
            this._snake.add(snakeHead);
            this._speed = options.speed;
            this._speedCount = 0;
            this._x = options.positionX;
            this._y = options.positionY;
            this._direction = options.direction;
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;
        }
        Snake.prototype.update = function () {
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this._direction !== Direction.Left) {
                this._direction = Direction.Right;
            }
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this._direction !== Direction.Right) {
                this._direction = Direction.Left;
            }
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.UP) && this._direction !== Direction.Down) {
                this._direction = Direction.Up;
            }
            if(this._game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this._direction !== Direction.Up) {
                this._direction = Direction.Down;
            }
            this._speedCount += this._game.time.delta;
            if(this._speedCount > this._speed) {
                this._speedCount -= this._speed;
                this.move();
            }
        };
        Snake.prototype.move = function () {
            if(this._direction === Direction.Right) {
                this._x += 1;
            }
            if(this._direction === Direction.Left) {
                this._x -= 1;
            }
            if(this._direction === Direction.Down) {
                this._y += 1;
            }
            if(this._direction === Direction.Up) {
                this._y -= 1;
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
    var snake;
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
        snake = new PhaserSnake.Snake(myGame, options);
    }
    function update() {
        snake.update();
    }
    function render() {
    }
})(PhaserSnake || (PhaserSnake = {}));
