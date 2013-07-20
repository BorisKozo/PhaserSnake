/// <reference path="../lib/Phaser/phaser.d.ts" />

module PhaserSnake {
    export enum Direction {
        Left,Right,Up,Down
    }

    export class GameOptions {
        speed: number; //The speed of the snake (delay between two moves in milliseconds)
        positionX: number; //The initial X position of the snake on the game board
        positionY: number; //The initial Y position of the snake on the game board
        direction: Direction; //The initial direction of the snake
        boardWidth: number;  //The width (in terms of tiles) of the playing board
        boardHeight: number; //The height (in terms of tiles) of the playing board
    }

    export class Snake {
        private _snake: Phaser.Group;
        private _game: Phaser.Game;
        private _speed: number;
        private _speedCount: number;
        
        private _boardWidth: number;
        private _boardHeight: number;

        private _x: number;
        private _y: number;
        private _direction: Direction;

        constructor(game: Phaser.Game, options:GameOptions ) {
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

        update() {
            if (this._game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this._direction !== Direction.Left)
            {
                this._direction = Direction.Right;
            }

            if (this._game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this._direction !== Direction.Right)
            {
                this._direction = Direction.Left;
            }

            if (this._game.input.keyboard.isDown(Phaser.Keyboard.UP) && this._direction !== Direction.Down)
            {                                                      
                this._direction = Direction.Up;
            }

            if (this._game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this._direction !== Direction.Up)
            {
                this._direction = Direction.Down;
            }


            this._speedCount += this._game.time.delta;
            if (this._speedCount > this._speed) {
                this._speedCount -= this._speed;
                this.move();
            }
        }

        move() {
            if (this._direction === Direction.Right) {
                this._x += 1;
            }

            if (this._direction === Direction.Left) {
                this._x -= 1;
            }

            if (this._direction === Direction.Down) {
                this._y += 1;
            }

            if (this._direction === Direction.Up) {
                this._y -= 1;
            }
            this._snake.remove(this._snake.members[this._snake.length - 1]).kill();
            this._snake.add(this._game.createSprite(this._x * 20, this._y * 20, "snake_part"));
        }
    }
}