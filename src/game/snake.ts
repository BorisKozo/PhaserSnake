/// <reference path="../lib/Phaser/phaser.d.ts" />
/// <reference path="level.ts" />
module PhaserSnake {

    export class Snake {
        private _snake: BoardPosition[];
        private _game: Phaser.Game;
        private _speed: number;
        private _speedCount: number;

        private _head: BoardPosition;
        
        private _direction: Direction;
        private _boardHeight: number;
        private _boardWidth: number;
        private _level: Level;

        private _createSnakePart(position: BoardPosition):Phaser.Sprite {
            var result = this._game.createSprite(position.x * 20, position.y * 20, "snake_part");
            return result;
        }

        constructor(game: Phaser.Game, options: GameOptions, level: Level) {
            this._game = game;
            this._snake = [];

            this._speed = options.speed;
            this._speedCount = 0;
            this._head = new BoardPosition(options.positionX, options.positionY);
            this._direction = options.direction;
            this._level = level;
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;

            var snakeHead = this._createSnakePart(this._head);
            this._snake.push(this._head.clone());
            this._level.boardManager.capture(this._head, snakeHead);
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
                this._head.x += 1;
                if (this._head.x === this._boardWidth) {
                    this._head.x = 0;
                }
            }

            if (this._direction === Direction.Left) {
                this._head.x -= 1;
                if (this._head.x < 0) {
                    this._head.x = this._boardWidth - 1;
                }

            }

            if (this._direction === Direction.Down) {
                this._head.y += 1;
                if (this._head.y === this._boardHeight) {
                    this._head.y = 0;
                }

            }

            if (this._direction === Direction.Up) {
                this._head.y -= 1;
                if (this._head.y < 0) {
                    this._head.y = this._boardHeight - 1;
                }
            }

            var tailPosition = this._snake[0];
            var snakeMoveResult = this._level.moveSnake(this._head, tailPosition);
            var tail;

            if (snakeMoveResult) {
                this._level.boardManager.uncapture(tailPosition).kill();
                this._snake.shift(); //OMG! This is bad idea to do this!!! I need to implement a circular list
            }
            this._snake.push(this._head.clone());
            this._level.boardManager.capture(this._head, this._createSnakePart(this._head));
        }
    }
}