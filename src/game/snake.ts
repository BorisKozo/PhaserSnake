/// <reference path="../lib/Phaser/phaser.d.ts" />
/// <reference path="level.ts" />
module PhaserSnake {


    export class Snake {
        private _snake: Phaser.Group;
        private _game: Phaser.Game;
        private _speed: number;
        private _speedCount: number;

        private _position: BoardPosition;
        
        private _direction: Direction;
        private _boardHeight: number;
        private _boardWidth: number;
        private _level: Level;

        private _createSnakePart(position: BoardPosition):Phaser.Sprite {
            return this._game.createSprite(position.x * 20, position.y * 20, "snake_part");
        }

        constructor(game: Phaser.Game, options: GameOptions, level: Level) {
            this._game = game;
            this._snake = game.createGroup();

            this._speed = options.speed;
            this._speedCount = 0;
            this._position = new BoardPosition(options.positionX, options.positionY);
            this._direction = options.direction;
            this._level = level;
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;

            var snakeHead = this._createSnakePart(this._position);
            this._snake.add(snakeHead);
            this._level.boardManager.capture(this._position,"snake");
        }

        get Direction(): Direction {
            return this._direction;
        }

        set Direction(value: Direction) {
            this._direction = value;
        }

        update() {
            this._speedCount += this._game.time.delta;
            if (this._speedCount > this._speed) {
                this._speedCount -= this._speed;
                this.move();
            }
        }

        move() {
            if (this._direction === Direction.Right) {
                this._position.x += 1;
                if (this._position.x === this._boardWidth) {
                    this._position.x = 0;
                }
            }

            if (this._direction === Direction.Left) {
                this._position.x -= 1;
                if (this._position.x < 0) {
                    this._position.x = this._boardWidth - 1;
                }

            }

            if (this._direction === Direction.Down) {
                this._position.y += 1;
                if (this._position.y === this._boardHeight) {
                    this._position.y = 0;
                }

            }

            if (this._direction === Direction.Up) {
                this._position.y -= 1;
                if (this._position.y < 0) {
                    this._position.y = this._boardHeight - 1;
                }
            }

//            var tail = this._snake.members[this._snake.length - 1];
//            tail.
            this._snake.remove(this._snake.members[this._snake.length - 1]).kill();
            this._snake.add(this._createSnakePart(this._position));

        }
    }
}