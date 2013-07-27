/// <reference path="../lib/Phaser/phaser.d.ts" />
/// <reference path="snake.ts" />

module PhaserSnake {
    // Create game instance and connect init, create, update and render methods
    var myGame = new Phaser.Game(window, 'game', 800, 480, init, create, update, render);
    var map: Phaser.Tilemap;
    var level: Level;

    function init() {
        myGame.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        myGame.loader.addImageFile("back_tile", "assets/images/back_tile.png");
        myGame.loader.addImageFile("snake_part", "assets/sprites/snake_part.png");
        myGame.loader.addImageFile("food", "assets/sprites/food.png");
        myGame.loader.addTextFile("level_map", "assets/maps/background.csv");
        myGame.loader.load();
        // Setup loader here
    }

    function create() {
        map = myGame.createTilemap("back_tile", "level_map", Phaser.Tilemap.FORMAT_CSV, true, 20, 20);
        var options: GameOptions = new GameOptions();
        options.direction = Direction.Right;
        options.positionX = 10;
        options.positionY = 10;
        options.speed = 200;
        options.boardWidth = map.width;
        options.boardHeight = map.height;
        
        level = new Level(myGame,options);
    }


    function update() {
        level.update();
   
    }

    function render() {
    }

}
