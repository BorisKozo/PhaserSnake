///<reference path="snake.ts"/>
///<reference path="board_manager.ts"/>
module PhaserSnake {

    export enum Direction {
        Left, Right, Up, Down
    }

    export class GameOptions {
        speed: number; //The speed of the snake (delay between two moves in milliseconds)
        positionX: number; //The initial X position of the snake on the game board
        positionY: number; //The initial Y position of the snake on the game board
        direction: Direction; //The initial direction of the snake
        boardWidth: number;  //The width (in terms of tiles) of the playing board
        boardHeight: number; //The height (in terms of tiles) of the playing board
    }

    export class Level {

        private _game: Phaser.Game;
        private _snake: Snake;
        private _boardHeight: number;
        private _boardWidth: number;
        private _foodPosition: BoardPosition;

        boardManager: BoardManager;


        constructor(game: Phaser.Game, options: GameOptions) {
            this._game = game;
            this.boardManager = new BoardManager(options);
            this._snake = new Snake(game, options, this);
            this._boardHeight = options.boardHeight;
            this._boardWidth = options.boardWidth;

            this.createFood();
        }

        update() {
            if (this._game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this._snake.Direction !== Direction.Left)
            {
                this._snake.Direction = Direction.Right;
            }

            if (this._game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this._snake.Direction !== Direction.Right)
            {
                this._snake.Direction = Direction.Left;
            }

            if (this._game.input.keyboard.isDown(Phaser.Keyboard.UP) && this._snake.Direction !== Direction.Down)
            {
                this._snake.Direction = Direction.Up;
            }

            if (this._game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this._snake.Direction !== Direction.Up)
            {
                this._snake.Direction = Direction.Down;
            }

            this._snake.update();
        }

        createFood() {
            var food;
            if (this._foodPosition) {
                food = <Phaser.Sprite> this.boardManager.getCaptured(this._foodPosition);
                food.kill();
            }


            this._foodPosition = this.boardManager.captureRandom("");
            food = this._game.createSprite(this._foodPosition.x * 20, this._foodPosition.y * 20, "food");
            this.boardManager.capture(this._foodPosition, food);
        
        }

        moveSnake(toPosition: BoardPosition, fromPosition: BoardPosition): bool {
            if (toPosition.equal(fromPosition)) {
                return true;
            }


            if (toPosition.equal(this._foodPosition)) {
                this.createFood();
                return false;
            }

            return true;
        }

    }
}