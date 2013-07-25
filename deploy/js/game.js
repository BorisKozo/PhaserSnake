var PhaserSnake;
(function (PhaserSnake) {
    var Snake = (function () {
        function Snake(game, options, level) {
            this._game = game;
            this._snake = game.createGroup();
            this._speed = options.speed;
            this._speedCount = 0;
            this._position = new PhaserSnake.BoardPosition(options.positionX, options.positionY);
            this._direction = options.direction;
            this._level = level;
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;
            var snakeHead = this._createSnakePart(this._position);
            this._snake.add(snakeHead);
            this._level.boardManager.capture(this._position, "snake");
        }
        Snake.prototype._createSnakePart = function (position) {
            return this._game.createSprite(position.x * 20, position.y * 20, "snake_part");
        };
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
                this._position.x += 1;
                if(this._position.x === this._boardWidth) {
                    this._position.x = 0;
                }
            }
            if(this._direction === PhaserSnake.Direction.Left) {
                this._position.x -= 1;
                if(this._position.x < 0) {
                    this._position.x = this._boardWidth - 1;
                }
            }
            if(this._direction === PhaserSnake.Direction.Down) {
                this._position.y += 1;
                if(this._position.y === this._boardHeight) {
                    this._position.y = 0;
                }
            }
            if(this._direction === PhaserSnake.Direction.Up) {
                this._position.y -= 1;
                if(this._position.y < 0) {
                    this._position.y = this._boardHeight - 1;
                }
            }
            this._snake.remove(this._snake.members[this._snake.length - 1]).kill();
            this._snake.add(this._createSnakePart(this._position));
        };
        return Snake;
    })();
    PhaserSnake.Snake = Snake;    
})(PhaserSnake || (PhaserSnake = {}));
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
            this.boardManager = new PhaserSnake.BoardManager(options);
            this._snake = new PhaserSnake.Snake(game, options, this);
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;
            this.createFood();
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
        Level.prototype.createFood = function () {
            if(this._food && this._food.alive) {
                this._food.kill();
            }
            var position = this.boardManager.captureRandom("food");
            this._food = this._game.createSprite(position.x * 20, position.y * 20, "food");
        };
        return Level;
    })();
    PhaserSnake.Level = Level;    
})(PhaserSnake || (PhaserSnake = {}));
var PhaserSnake;
(function (PhaserSnake) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var BoardPosition = (function () {
        function BoardPosition(x, y) {
            this.x = x;
            this.y = y;
        }
        BoardPosition.prototype.hash = function () {
            return this.x.toString() + "|" + this.y.toString();
        };
        return BoardPosition;
    })();
    PhaserSnake.BoardPosition = BoardPosition;    
    var BoardManager = (function () {
        function BoardManager(options) {
            this._height = options.boardHeight;
            this._width = options.boardWidth;
            this._count = 0;
            this._data = {
            };
        }
        BoardManager.prototype._capture = function (hash, value) {
            this._data[hash] = value;
        };
        BoardManager.prototype._uncapture = function (hash) {
            delete this._data[hash];
        };
        BoardManager.prototype._getCaptured = function (hash) {
            return this._data[hash];
        };
        BoardManager.prototype.capture = function (position, value) {
            var hash = position.hash();
            if(this._getCaptured(hash)) {
                return this._data[hash];
            }
            this._capture(hash, value);
            this._count++;
            return value;
        };
        BoardManager.prototype.getCaptured = function (position) {
            var hash = position.hash();
            return this._getCaptured(hash);
        };
        BoardManager.prototype.relocate = function (fromPosition, toPosition) {
            var fromHash = fromPosition.hash();
            var toHash = toPosition.hash();
            if(!this._getCaptured(fromHash)) {
                return;
            }
            if(this._getCaptured(toHash)) {
                return;
            }
            var value = this._data[fromHash];
            this._uncapture(fromHash);
            this._capture(toHash, value);
        };
        BoardManager.prototype.captureRandom = function (value) {
            var i, j, x, y, hash, position;
            if(this._count === (this._width * this._height)) {
                throw new Error("Could not capture because there is no empty space");
            }
            for(i = 0; i < 5; i++) {
                x = getRandomInt(0, this._width - 1);
                y = getRandomInt(0, this._height - 1);
                position = new BoardPosition(x, y);
                hash = position.hash();
                if(!this._getCaptured(hash)) {
                    this._capture(hash, value);
                    return position;
                }
            }
            for(i = 0; i < this._width; i++) {
                for(j = 0; j < this._height; j++) {
                    position = new BoardPosition((x + i) % this._width, (y + j) % this._height);
                    hash = position.hash();
                    if(!this._getCaptured(hash)) {
                        this._capture(hash, value);
                        return position;
                    }
                }
            }
        };
        Object.defineProperty(BoardManager.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        return BoardManager;
    })();
    PhaserSnake.BoardManager = BoardManager;    
})(PhaserSnake || (PhaserSnake = {}));
var PhaserSnake;
(function (PhaserSnake) {
    var Food = (function () {
        function Food(game, level) {
            this._game = game;
            this._level = level;
        }
        return Food;
    })();
    PhaserSnake.Food = Food;    
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
        myGame.loader.addImageFile("food", "assets/sprites/food.png");
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
