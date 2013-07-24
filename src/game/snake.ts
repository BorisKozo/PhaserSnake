/// <reference path="../lib/Phaser/phaser.d.ts" />
/// <reference path="level.ts" />
module PhaserSnake {


    export class Snake {
        private _snake: Phaser.Group;
        private _game: Phaser.Game;
        private _speed: number;
        private _speedCount: number;

        private _x: number;
        private _y: number;
        private _direction: Direction;
        private _boardHeight: number;
        private _boardWidth: number;
        private _level: Level;

        constructor(game: Phaser.Game, options: GameOptions, level: Level) {
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
                this._x += 1;
                if (this._x === this._boardWidth) {
                    this._x = 0;
                }
            }

            if (this._direction === Direction.Left) {
                this._x -= 1;
                if (this._x < 0) {
                    this._x = this._boardWidth - 1;
                }

            }

            if (this._direction === Direction.Down) {
                this._y += 1;
                if (this._y === this._boardHeight) {
                    this._y = 0;
                }

            }

            if (this._direction === Direction.Up) {
                this._y -= 1;
                if (this._y < 0 ) {
                    this._y = this._boardHeight - 1;
                }
            }

            this._snake.remove(this._snake.members[this._snake.length - 1]).kill();
            this._snake.add(this._game.createSprite(this._x * 20, this._y * 20, "snake_part"));
        }
    }
}