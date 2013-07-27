/// <reference path="../lib/Phaser/phaser.d.ts" />
/// <reference path="snake.ts" />

module PhaserSnake {
    // Create game instance and connect init, create, update and render methods
    var myGame = new Phaser.Game(window, 'game', 800, 480);
    myGame.switchState(Level, true, true);

}
