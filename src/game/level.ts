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
        private _map: Phaser.Tilemap;

        boardManager: BoardManager;


        constructor(game: Phaser.Game) {
            this._game = game;

        }

        init() {
            //myGame.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            this._game.loader.addImageFile("back_tile", "assets/images/back_tile.png");
            this._game.loader.addImageFile("snake_part", "assets/sprites/snake_part.png");
            this._game.loader.addImageFile("food", "assets/sprites/food.png");
            this._game.loader.addTextFile("level_map", "assets/maps/background.csv");
            this._game.loader.load();
            // Setup loader here
        }

        create() {
            this._map = this._game.createTilemap("back_tile", "level_map", Phaser.Tilemap.FORMAT_CSV, true, 20, 20);

            var options: GameOptions = new GameOptions();
            options.direction = Direction.Right;
            options.positionX = 10;
            options.positionY = 10;
            options.speed = 200;
            options.boardWidth = this._map.width;
            options.boardHeight = this._map.height;

            this.boardManager = new BoardManager(options);
            this._snake = new Snake(this._game, options, this);

            this.createFood();
        }

        render() {
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

            var nextTile = <Phaser.Sprite> this.boardManager.getCaptured(toPosition);
            if (nextTile) {
                
            }

            return true;
        }

    }
}